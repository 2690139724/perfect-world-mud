import { IPlayer, RealmNames, CultivationRealm } from '../entities/Player';
import {
  ICompanion, CompanionRelationship, CompanionPersonality, CompanionNation,
  PERSONALITY_INTERACTIONS, COMPANION_TASKS, calculateCompanionBonuses, updateRelationship, getAffinityChange,
  DEFAULT_INTERACTIONS, DEFAULT_STORY_NODES, DUAL_CULTIVATION_POSES, IDualCultivationPose,
  SPRING_NIGHT_IMAGERY, ICompanionStoryNode, ICompanionInteraction,
} from '../entities/Companion';
import { ITechnique } from '../entities/Technique';
import { IItem } from '../entities/Item';

export interface ICompanionInteractionResult {
  messages: string[];
  affinityChange: number;
  relationshipChanged: boolean;
  newRelationship?: CompanionRelationship;
  rewards?: { exp?: number; gold?: number; items?: IItem[] };
}

export interface ICompanionCultivationResult {
  expBonus: number;
  message: string;
  companionBonus: number;
}

/** 春宵场景结果 */
export interface ISpringNightResult {
  success: boolean;
  message: string;
  /** 描写文本（前奏 + 高潮 + 收尾，按亲密度分层） */
  narrative: string[];
  expGain: number;
  affinityGain: number;
  /** 触发的双修姿势 */
  pose?: IDualCultivationPose;
}

/** 道侣相遇结果 */
export interface IEncounterResult {
  success: boolean;
  message: string;
  companion?: ICompanion;
}

/** 道侣成长结果 */
export interface ICompanionGrowthResult {
  success: boolean;
  message: string;
  newRealm?: number;
  newRealmStage?: number;
}

/** 剧情推进结果 */
export interface IStoryAdvanceResult {
  success: boolean;
  message: string;
  /** 触发的剧情节点 */
  node?: ICompanionStoryNode;
  /** 节点奖励文本 */
  rewardTexts: string[];
}

export class CompanionService {
  // ============= 相遇/获取流程 =============

  /**
   * 尝试与指定道侣相遇（首次加入玩家道侣列表）
   * 触发条件：玩家境界达到该道侣要求、当前位置匹配、未已相遇
   */
  static encounter(player: IPlayer, candidate: ICompanion): IEncounterResult {
    if (player.companions.some(c => c.id === candidate.id)) {
      return { success: false, message: `你已与${candidate.name}相遇过。` };
    }
    if (player.realm < candidate.realm) {
      return { success: false, message: `你的境界不足以与${candidate.name}结缘。` };
    }

    // 初始化道侣数据
    const companion: ICompanion = {
      ...candidate,
      affinity: 0,
      relationship: CompanionRelationship.STRANGER,
      storyProgress: 0,
      lastInteractionTime: Date.now(),
      isOnline: true,
      isBonded: false,
      unlockedPoses: [],
      todayInteractCount: 0,
      lastInteractDate: new Date().toISOString().slice(0, 10),
      interactions: candidate.interactions?.length ? candidate.interactions : [...DEFAULT_INTERACTIONS],
      storyNodes: candidate.storyNodes?.length ? candidate.storyNodes : [...DEFAULT_STORY_NODES],
    };

    player.companions.push(companion);

    return {
      success: true,
      message: `你与${companion.name}初次相遇。${companion.faction ? `（${companion.faction}）` : ''}`,
      companion,
    };
  }

  // ============= 互动主入口 =============

  static interact(player: IPlayer, companion: ICompanion, action: string, gift?: IItem): ICompanionInteractionResult {
    const result: ICompanionInteractionResult = {
      messages: [],
      affinityChange: 0,
      relationshipChanged: false,
    };

    // 每日互动次数重置
    this.resetDailyCountIfNeeded(companion);

    const oldRelationship = companion.relationship;
    let affinityChange = getAffinityChange(action, companion);

    if (gift) {
      const personality = PERSONALITY_INTERACTIONS[companion.personality];
      const giftType = this.determineGiftType(gift);
      const bonus = personality.giftBonus[giftType] || 1.0;
      affinityChange = Math.floor(affinityChange * bonus);

      if (bonus > 1.0) {
        result.messages.push(`【心意相通】${companion.name}非常喜欢这份礼物！好感度大幅提升！`);
      } else if (bonus < 1.0) {
        result.messages.push(`${companion.name}收下了礼物，但似乎不太感兴趣...`);
      }
    }

    companion.affinity = Math.min(companion.maxAffinity, companion.affinity + affinityChange);
    companion.lastInteractionTime = Date.now();
    companion.todayInteractCount += 1;

    const newRelationship = updateRelationship(companion);
    if (newRelationship !== oldRelationship) {
      companion.relationship = newRelationship;
      result.relationshipChanged = true;
      result.newRelationship = newRelationship;
      result.messages.push(`**【关系突破】** 你与${companion.name}的关系变为「${newRelationship}」！`);
    }

    result.affinityChange = affinityChange;

    switch (action) {
      case 'chat':
        result.messages.push(this.generateDialogue(companion, 'chat'));
        break;
      case 'meditate':
        result.messages.push(`${companion.name}与你一同打坐修炼，心境平和...`);
        break;
      case 'adventure':
        result.messages.push(`${companion.name}与你一同踏上冒险之旅！`);
        break;
      case 'duel':
        result.messages.push(`${companion.name}接受了你的挑战，战斗一触即发！`);
        break;
      case 'play':
        result.messages.push(`${companion.name}开心地与你玩耍...`);
        break;
      case 'exchange':
        result.messages.push(`${companion.name}与你交流修炼心得，收获颇丰！`);
        break;
      case 'protect':
        result.messages.push(`**【守护】** 你舍身保护了${companion.name}！`);
        break;
    }

    this.checkTaskCompletion(player, companion, action);
    this.tryAdvanceStory(player, companion);

    return result;
  }

  static determineGiftType(item: IItem): string {
    const keywords = {
      'jewelry': ['玉', '珠', '宝', '饰', '戒', '链'],
      'weapons': ['剑', '刀', '枪', '弓', '刃', '器'],
      'potions': ['丹', '药', '液', '膏', '丸'],
      'flowers': ['花', '草', '香', '瓣'],
      'food': ['食', '果', '肉', '酒', '茶'],
      'clothes': ['衣', '服', '袍', '裙'],
      'books': ['书', '卷', '典', '录'],
      'toys': ['玩', '戏', '偶'],
      'mystical': ['灵', '妖', '魔', '鬼', '神'],
      'ancient': ['古', '遗', '老', '旧'],
      'rare': ['珍', '稀', '奇'],
    };

    const name = item.name.toLowerCase();
    for (const [type, words] of Object.entries(keywords)) {
      if (words.some(word => name.includes(word))) {
        return type;
      }
    }

    return 'novelty';
  }

  static generateDialogue(companion: ICompanion, context: string): string {
    const personality = PERSONALITY_INTERACTIONS[companion.personality];

    const dialogues: Record<CompanionPersonality, Record<string, string[]>> = {
      [CompanionPersonality.COLD]: {
        chat: ['"...嗯。"', '"有事？"', '"修炼要紧。"', '"...你来了。"'],
        gift: ['"...谢谢。"', '"收下了。"', '"不必如此。"'],
        adventure: ['"...走吧。"', '"注意安全。"'],
      },
      [CompanionPersonality.WARM]: {
        chat: ['"你来了，真开心！"', '"今天过得怎么样？"', '"修炼辛苦了，休息一下吧。"'],
        gift: ['"哇！好喜欢！谢谢你！"', '"你真贴心~"', '"这是我收到过最好的礼物！"'],
        adventure: ['"好耶！一起出发吧！"', '"有你在，我什么都不怕！"'],
      },
      [CompanionPersonality.FIERY]: {
        chat: ['"嘿！来得正好！"', '"别磨磨唧唧的！"', '"走，找个地方比划比划！"'],
        gift: ['"好东西！够意思！"', '"哈哈，果然没看错你！"'],
        adventure: ['"刺激！我喜欢！"', '"让我们大闹一场吧！"'],
      },
      [CompanionPersonality.CALM]: {
        chat: ['"请坐，喝杯茶吧。"', '"今日感悟颇深。"', '"修炼之道，在于持之以恒。"'],
        gift: ['"多谢厚礼。"', '"君子之交淡如水，这份心意我收下了。"'],
        adventure: ['"万事小心。"', '"结伴而行，也好互相照应。"'],
      },
      [CompanionPersonality.PLAYFUL]: {
        chat: ['"抓到你啦！"', '"猜猜我刚才在干嘛？"', '"好无聊呀，陪我玩嘛~"'],
        gift: ['"哇哦！这个好有趣！"', '"你怎么知道我喜欢这个？"', '"爱你哦~"'],
        adventure: ['"探险探险！我最喜欢了！"', '"会不会遇到好玩的东西呢？"'],
      },
      [CompanionPersonality.MYSTERIOUS]: {
        chat: ['"...你来了。"', '"命运的丝线交织着..."', '"有些事情，时机未到。"'],
        gift: ['"...有趣。"', '"你似乎知道些什么。"'],
        adventure: ['"前方迷雾重重..."', '"真相，就在前方。"'],
      },
    };

    const lines = dialogues[companion.personality][context] || dialogues[companion.personality].chat;
    return `${companion.name}${personality.dialogueStyle}地说道：「${lines[Math.floor(Math.random() * lines.length)]}」`;
  }

  static checkTaskCompletion(player: IPlayer, companion: ICompanion, action: string): void {
    const completedTasks = player.completedQuests || [];

    for (const task of COMPANION_TASKS) {
      if (completedTasks.includes(task.id)) continue;

      let completed = false;

      switch (task.id) {
        case 'task_companion_1':
          completed = companion.relationship >= CompanionRelationship.ACQUAINTANCE;
          break;
        case 'task_companion_2':
          completed = action === 'meditate';
          break;
        case 'task_companion_3':
          completed = action === 'gift';
          break;
        case 'task_companion_4':
          completed = action === 'adventure';
          break;
        case 'task_companion_5':
          completed = action === 'exchange';
          break;
        case 'task_companion_6':
          completed = action === 'adventure' && companion.realm >= 3;
          break;
        case 'task_companion_7':
          completed = action === 'protect';
          break;
        case 'task_companion_8':
          completed = companion.relationship === CompanionRelationship.SOULMATE;
          break;
      }

      if (completed) {
        player.completedQuests = [...completedTasks, task.id];
        if (task.reward.exp) {
          player.cultivationExp += task.reward.exp;
        }
      }
    }
  }

  // ============= 春宵场景（双修悟道） =============

  /**
   * 春宵场景：与道侣共度春宵
   * 严格按亲密度分层生成描写：
   *   - 50-199: 1段（仅前奏）
   *   - 200-499: 2段（前奏 + 高潮）
   *   - ≥500: 3段（前奏 + 高潮 + 收尾）
   * 6国差异化意象，禁用直接身体部位描写
   */
  static springNight(player: IPlayer, companion: ICompanion, poseId?: string): ISpringNightResult {
    if (companion.relationship < CompanionRelationship.LOVER) {
      return { success: false, message: '只有成为道侣后才能共度春宵。', narrative: [], expGain: 0, affinityGain: 0 };
    }
    if (!companion.isBonded) {
      return { success: false, message: '尚未正式结缘，无法共度春宵。', narrative: [], expGain: 0, affinityGain: 0 };
    }

    // 选择双修姿势
    let pose: IDualCultivationPose | undefined;
    if (poseId) {
      pose = DUAL_CULTIVATION_POSES.find(p => p.id === poseId);
      if (!pose) {
        return { success: false, message: '未知的双修姿势。', narrative: [], expGain: 0, affinityGain: 0 };
      }
      if (companion.relationship < pose.requiredRelationship || companion.affinity < pose.requiredAffinity) {
        return { success: false, message: `「${pose.name}」需要${pose.requiredRelationship}阶段且好感≥${pose.requiredAffinity}。`, narrative: [], expGain: 0, affinityGain: 0 };
      }
      if (player.mana < pose.manaCost) {
        return { success: false, message: `法力不足，需要 ${pose.manaCost} 点法力。`, narrative: [], expGain: 0, affinityGain: 0 };
      }
    } else {
      // 自动选择当前可用的最高倍率姿势
      pose = DUAL_CULTIVATION_POSES
        .filter(p => companion.relationship >= p.requiredRelationship && companion.affinity >= p.requiredAffinity && player.mana >= p.manaCost)
        .sort((a, b) => b.expMultiplier - a.expMultiplier)[0];
    }

    // 按亲密度分层生成描写
    const narrative: string[] = [];
    const imagery = SPRING_NIGHT_IMAGERY[companion.nation] || SPRING_NIGHT_IMAGERY[CompanionNation.NONE];

    // 前奏（所有层级都有）
    narrative.push(`【前奏】${this.pickRandom(imagery.prelude)}。${companion.name}的目光在烛影中渐次柔和。`);

    // 高潮层（亲密度 ≥ 200 才显示）
    if (companion.affinity >= 200) {
      const climaxCount = companion.affinity >= 500 ? 3 : 2;
      for (let i = 0; i < climaxCount && i < imagery.climax.length; i++) {
        narrative.push(`【高潮】${imagery.climax[i]}。`);
      }
    }

    // 收尾（亲密度 ≥ 500 才显示）
    if (companion.affinity >= 500) {
      narrative.push(`【收尾】${this.pickRandom(imagery.ending)}。`);
    }

    // 计算修为与好感收益
    const baseExp = 200;
    const multiplier = pose?.expMultiplier ?? 1.0;
    const expGain = Math.floor(baseExp * multiplier + companion.affinity * 0.3);
    const affinityGain = 30 + Math.floor(companion.affinity * 0.02);

    // 扣除法力
    if (pose) {
      player.mana -= pose.manaCost;
      if (!companion.unlockedPoses.includes(pose.id)) {
        companion.unlockedPoses.push(pose.id);
      }
    }

    // 增加修为与好感
    player.cultivationExp += expGain;
    companion.affinity = Math.min(companion.maxAffinity, companion.affinity + affinityGain);
    companion.lastInteractionTime = Date.now();

    // 检查关系阶段变化
    const newRel = updateRelationship(companion);
    if (newRel !== companion.relationship) {
      companion.relationship = newRel;
      narrative.push(`**【关系突破】** 你与${companion.name}的关系升至「${newRel}」！`);
    }

    // 尝试解锁 bondSkill
    if (companion.relationship >= CompanionRelationship.LOVER && companion.bondSkillId) {
      if (!player.bondSkills.includes(companion.bondSkillId)) {
        player.bondSkills.push(companion.bondSkillId);
        narrative.push(`【道侣共鸣】你领悟了道侣羁绊之法：${companion.bondSkillId}`);
      }
    }

    return {
      success: true,
      message: `你与${companion.name}共度春宵，云在暮色交融，道心相契。`,
      narrative,
      expGain,
      affinityGain,
      pose,
    };
  }

  // ============= 道侣成长（境界提升） =============

  /**
   * 道侣境界成长
   * 触发条件：玩家突破大境界时，道侣有概率跟随突破
   */
  static growCompanion(player: IPlayer, companion: ICompanion): ICompanionGrowthResult {
    // 道侣境界不超过玩家境界 + 1
    if (companion.realm > player.realm + 1) {
      return { success: false, message: `${companion.name}境界已超出你能引导的范围。` };
    }

    // 道侣境界达到玩家境界时，不再自动突破
    if (companion.realm >= player.realm) {
      return { success: false, message: `${companion.name}境界与你相当，需自行感悟。` };
    }

    // 9层巅峰才能突破大境界
    if (companion.realmStage < 9) {
      // 小境界提升
      companion.realmStage += 1;
      return {
        success: true,
        message: `${companion.name}在你身旁感悟天地灵机，境界小成，进入${companion.realmStage}层。`,
        newRealmStage: companion.realmStage,
      };
    }

    // 大境界突破（需关系达到 LOVER 才会触发）
    if (companion.relationship < CompanionRelationship.LOVER) {
      return { success: false, message: `${companion.name}九层巅峰已至，但道心未稳，需更深的羁绊方能突破。` };
    }

    companion.realm += 1;
    companion.realmStage = 1;
    companion.cultivationBonus += 0.02;
    companion.combatBonus += 0.02;

    return {
      success: true,
      message: `**【道侣突破】** ${companion.name}在你双修助力下突破大境界，进入${this.getRealmName(companion.realm)}！`,
      newRealm: companion.realm,
      newRealmStage: companion.realmStage,
    };
  }

  // ============= 剧情推进 =============

  /**
   * 尝试推进道侣专属剧情
   * 触发条件：达到剧情节点所需关系阶段与好感度
   */
  static tryAdvanceStory(player: IPlayer, companion: ICompanion): IStoryAdvanceResult {
    const currentNode = companion.storyNodes[companion.storyProgress];
    if (!currentNode) {
      return { success: false, message: '已无可推进的剧情。', rewardTexts: [] };
    }

    const relOrder = [
      CompanionRelationship.STRANGER,
      CompanionRelationship.ACQUAINTANCE,
      CompanionRelationship.FRIEND,
      CompanionRelationship.CLOSE_FRIEND,
      CompanionRelationship.LOVER,
      CompanionRelationship.SOULMATE,
    ];
    const currentRelIdx = relOrder.indexOf(companion.relationship);
    const requiredRelIdx = relOrder.indexOf(currentNode.requiredRelationship);

    if (currentRelIdx < requiredRelIdx) {
      return { success: false, message: '关系阶段不足，无法触发剧情。', rewardTexts: [] };
    }
    if (companion.affinity < currentNode.requiredAffinity) {
      return { success: false, message: `好感度不足 ${currentNode.requiredAffinity}，无法触发剧情。`, rewardTexts: [] };
    }

    // 推进剧情
    companion.storyProgress += 1;
    const rewardTexts: string[] = [];

    // 发放奖励
    if (currentNode.reward) {
      if (currentNode.reward.affinity) {
        companion.affinity = Math.min(companion.maxAffinity, companion.affinity + currentNode.reward.affinity);
        rewardTexts.push(`好感 +${currentNode.reward.affinity}`);
      }
      if (currentNode.reward.exp) {
        player.cultivationExp += currentNode.reward.exp;
        rewardTexts.push(`修为 +${currentNode.reward.exp}`);
      }
      if (currentNode.reward.techniqueId && companion.bondSkillId !== currentNode.reward.techniqueId) {
        companion.bondSkillId = currentNode.reward.techniqueId;
        if (companion.relationship >= CompanionRelationship.LOVER && !player.bondSkills.includes(currentNode.reward.techniqueId)) {
          player.bondSkills.push(currentNode.reward.techniqueId);
          rewardTexts.push(`领悟羁绊之法：${currentNode.reward.techniqueId}`);
        }
      }
    }

    // 渲染剧情文本（替换占位符）
    const content = currentNode.content
      .replace(/\{companionName\}/g, companion.name)
      .replace(/\{faction\}/g, companion.faction || '修仙界')
      .replace(/\{ta\}/g, companion.personality === CompanionPersonality.COLD ? '她' : '她');

    return {
      success: true,
      message: `**【道侣剧情·${currentNode.title}】**`,
      node: { ...currentNode, content },
      rewardTexts,
    };
  }

  // ============= 修炼/战斗加成 =============

  static calculateCultivationBonus(player: IPlayer, companions: ICompanion[]): ICompanionCultivationResult {
    let totalBonus = 0;
    let message = '';
    const activeCompanions = companions.filter(c => c.isOnline && c.relationship >= CompanionRelationship.FRIEND);

    if (activeCompanions.length === 0) {
      return { expBonus: 0, message: '', companionBonus: 0 };
    }

    for (const companion of activeCompanions) {
      const bonuses = calculateCompanionBonuses(companion);
      totalBonus += bonuses.cultivation;
    }

    message = `【道侣加成】${activeCompanions.map(c => c.name).join('、')}与你心灵相通，修炼效率提升 ${(totalBonus * 100).toFixed(1)}%`;

    return { expBonus: totalBonus, message, companionBonus: totalBonus };
  }

  static calculateCombatBonus(player: IPlayer, companions: ICompanion[]): number {
    let totalBonus = 0;
    const activeCompanions = companions.filter(c => c.isOnline && c.relationship >= CompanionRelationship.FRIEND);

    for (const companion of activeCompanions) {
      const bonuses = calculateCompanionBonuses(companion);
      totalBonus += bonuses.combat;
    }

    return totalBonus;
  }

  static unlockBondSkill(player: IPlayer, companion: ICompanion, skill: ITechnique): void {
    if (companion.relationship >= CompanionRelationship.LOVER && !player.bondSkills.includes(skill.id)) {
      player.bondSkills.push(skill.id);
      companion.bondSkillId = skill.id;
    }
  }

  static companionAssistCombat(player: IPlayer, companion: ICompanion): { damage?: number; heal?: number; buff?: string; message: string } {
    if (companion.relationship < CompanionRelationship.FRIEND || !companion.isOnline) {
      return { message: '' };
    }

    const bonuses = calculateCompanionBonuses(companion);
    const assistType = Math.random();

    if (assistType < 0.4) {
      const damage = Math.floor(player.attack * bonuses.combat * 0.5);
      return { damage, message: `${companion.name}出手相助，造成 ${damage} 点伤害！` };
    } else if (assistType < 0.7) {
      const heal = Math.floor(player.maxHp * 0.1);
      player.hp = Math.min(player.maxHp, player.hp + heal);
      return { heal, message: `${companion.name}为你疗伤，恢复 ${heal} 点生命！` };
    } else {
      const buff = 'combat_power';
      return { buff, message: `${companion.name}为你加持，攻击力提升！` };
    }
  }

  static getCompanionTasks(): typeof COMPANION_TASKS {
    return COMPANION_TASKS;
  }

  // ============= 辅助方法 =============

  /** 每日互动次数重置 */
  static resetDailyCountIfNeeded(companion: ICompanion): void {
    const today = new Date().toISOString().slice(0, 10);
    if (companion.lastInteractDate !== today) {
      companion.todayInteractCount = 0;
      companion.lastInteractDate = today;
    }
  }

  /** 获取今日剩余互动次数（基础每日5次，道侣+5次） */
  static getRemainingInteractions(companion: ICompanion): number {
    this.resetDailyCountIfNeeded(companion);
    const baseLimit = 5;
    const bondedBonus = companion.isBonded ? 5 : 0;
    return Math.max(0, baseLimit + bondedBonus - companion.todayInteractCount);
  }

  /** 获取当前可用的双修姿势列表 */
  static getAvailablePoses(companion: ICompanion): IDualCultivationPose[] {
    return DUAL_CULTIVATION_POSES.filter(p =>
      companion.relationship >= p.requiredRelationship && companion.affinity >= p.requiredAffinity
    );
  }

  /** 获取当前可用的交互动作 */
  static getAvailableInteractions(companion: ICompanion): ICompanionInteraction[] {
    const relOrder = [
      CompanionRelationship.STRANGER,
      CompanionRelationship.ACQUAINTANCE,
      CompanionRelationship.FRIEND,
      CompanionRelationship.CLOSE_FRIEND,
      CompanionRelationship.LOVER,
      CompanionRelationship.SOULMATE,
    ];
    const currentIdx = relOrder.indexOf(companion.relationship);
    return (companion.interactions || DEFAULT_INTERACTIONS).filter(i =>
      relOrder.indexOf(i.requiredRelationship) <= currentIdx
    );
  }

  /** 获取当前剧情节点 */
  static getCurrentStoryNode(companion: ICompanion): ICompanionStoryNode | undefined {
    return companion.storyNodes?.[companion.storyProgress];
  }

  private static pickRandom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  private static getRealmName(realm: CultivationRealm): string {
    return RealmNames[realm] || '未知';
  }
}