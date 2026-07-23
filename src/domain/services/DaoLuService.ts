import { IDaoLu, IDaoLuRelationship, INTIMACY_THRESHOLDS, getIntimacyLevelName } from '../entities/DaoLu';
import { IPlayer } from '../entities/Player';
import { ChunXiaoSceneGenerator, IChunXiaoScene } from './ChunXiaoService';
import { KingdomType } from '../entities/ChunXiao';
import { pickDaoLuStory, IDaoLuStory } from '../entities/DaoLuStory';

/** 玩家道侣关系存储 */
const playerRelationships = new Map<string, Map<string, IDaoLuRelationship>>();

export class DaoLuService {
  /** 获取或创建玩家与道侣的关系 */
  static getRelationship(playerId: string, daoLuId: string): IDaoLuRelationship {
    if (!playerRelationships.has(playerId)) {
      playerRelationships.set(playerId, new Map());
    }
    const relations = playerRelationships.get(playerId)!;
    if (!relations.has(daoLuId)) {
      relations.set(daoLuId, {
        daoLuId,
        intimacy: 0,
        maxIntimacy: 0,
        unlockedPoses: [],
        unlockedStories: [],
        totalDualCultivations: 0,
        lastInteractionTime: 0,
        isBonded: false,
      });
    }
    return relations.get(daoLuId)!;
  }

  /** 增加好感度 */
  static addIntimacy(playerId: string, daoLuId: string, amount: number): IDaoLuRelationship {
    const rel = this.getRelationship(playerId, daoLuId);
    rel.intimacy = Math.max(0, rel.intimacy + amount);
    if (rel.intimacy > rel.maxIntimacy) {
      rel.maxIntimacy = rel.intimacy;
    }
    return rel;
  }

  /** 获取好感度等级 */
  static getIntimacyLevel(playerId: string, daoLuId: string): string {
    const rel = this.getRelationship(playerId, daoLuId);
    return getIntimacyLevelName(rel.intimacy);
  }

  /** 检查是否解锁某个双修姿势 */
  static isPoseUnlocked(playerId: string, daoLuId: string, poseId: string): boolean {
    const rel = this.getRelationship(playerId, daoLuId);
    return rel.unlockedPoses.includes(poseId);
  }

  /** 解锁双修姿势 */
  static unlockPose(playerId: string, daoLuId: string, poseId: string): void {
    const rel = this.getRelationship(playerId, daoLuId);
    if (!rel.unlockedPoses.includes(poseId)) {
      rel.unlockedPoses.push(poseId);
    }
  }

  /** 检查是否解锁某个剧情 */
  static isStoryUnlocked(playerId: string, daoLuId: string, storyId: string): boolean {
    const rel = this.getRelationship(playerId, daoLuId);
    return rel.unlockedStories.includes(storyId);
  }

  /** 解锁剧情 */
  static unlockStory(playerId: string, daoLuId: string, storyId: string): void {
    const rel = this.getRelationship(playerId, daoLuId);
    if (!rel.unlockedStories.includes(storyId)) {
      rel.unlockedStories.push(storyId);
    }
  }

  /** 执行双修 */
  static performDualCultivation(
    playerId: string,
    daoLu: IDaoLu,
    poseId: string,
    playerName: string = '他',
    kingdom: KingdomType = KingdomType.HUMAN
  ): {
    success: boolean;
    messages: string[];
    cultivationGain: number;
    hpGain: number;
    manaGain: number;
    scene?: IChunXiaoScene;
  } {
    const rel = this.getRelationship(playerId, daoLu.id);
    const pose = daoLu.dualCultivationPoses.find(p => p.id === poseId);

    if (!pose) {
      return { success: false, messages: ['未找到该双修姿势'], cultivationGain: 0, hpGain: 0, manaGain: 0 };
    }

    if (rel.intimacy < pose.requiredIntimacy) {
      return {
        success: false,
        messages: [`好感度不足，需要 ${pose.requiredIntimacy} 点好感度才能进行「${pose.name}」`],
        cultivationGain: 0,
        hpGain: 0,
        manaGain: 0,
      };
    }

    // 解锁姿势
    this.unlockPose(playerId, daoLu.id, poseId);

    // 增加双修次数
    rel.totalDualCultivations++;
    rel.lastInteractionTime = Date.now();

    // 增加少量好感度
    rel.intimacy += 2;

    // 生成春宵场景（好感度≥50才展示）
    let scene: IChunXiaoScene | undefined;
    if (rel.intimacy >= 50) {
      scene = ChunXiaoSceneGenerator.generateForIntimacy(rel.intimacy, {
        kingdom,
        maleName: playerName,
        femaleName: daoLu.name,
        excludeActionIds: [],
      });
    }

    const messages: string[] = [
      `◆ 双修「${pose.name}」`,
      '',
      pose.detailText,
      '',
    ];

    if (scene) {
      messages.push('◆ 春宵一梦：');
      messages.push('');
      messages.push(scene.fullText);
      messages.push('');
    }

    messages.push(`◆ 修炼效果：修为 +${pose.cultivationBonus}，气血 +${pose.hpBonus}，法力 +${pose.manaBonus}，好感度 +2`);

    return {
      success: true,
      messages,
      cultivationGain: pose.cultivationBonus,
      hpGain: pose.hpBonus,
      manaGain: pose.manaBonus,
      scene,
    };
  }

  /** 执行交互动作 */
  static performInteraction(
    playerId: string,
    daoLu: IDaoLu,
    interactionId: string
  ): { success: boolean; messages: string[]; intimacyChange: number } {
    const rel = this.getRelationship(playerId, daoLu.id);
    const interaction = daoLu.interactions.find(i => i.id === interactionId);

    if (!interaction) {
      return { success: false, messages: ['未找到该交互动作'], intimacyChange: 0 };
    }

    if (rel.intimacy < interaction.requiredIntimacy) {
      return {
        success: false,
        messages: [`好感度不足，需要 ${interaction.requiredIntimacy} 点好感度才能进行「${interaction.name}」`],
        intimacyChange: 0,
      };
    }

    // 检查冷却
    const now = Date.now();
    const timeSinceLast = now - rel.lastInteractionTime;
    if (timeSinceLast < interaction.cooldown * 1000 && interaction.cooldown > 0) {
      const remaining = Math.ceil((interaction.cooldown * 1000 - timeSinceLast) / 1000);
      return {
        success: false,
        messages: [`该动作正在冷却中，还需 ${remaining} 秒`],
        intimacyChange: 0,
      };
    }

    // 执行交互
    rel.intimacy += interaction.intimacyChange;
    if (rel.intimacy > rel.maxIntimacy) {
      rel.maxIntimacy = rel.intimacy;
    }
    rel.lastInteractionTime = now;

    // 检查是否达到结契条件
    if (interactionId === 'interact_bond' && rel.intimacy >= INTIMACY_THRESHOLDS.BONDED) {
      rel.isBonded = true;
      rel.bondDate = now;
    }

    return {
      success: true,
      messages: [
        `◆ ${interaction.name}`,
        '',
        interaction.detailText,
        '',
        `◆ 好感度 ${interaction.intimacyChange > 0 ? '+' : ''}${interaction.intimacyChange}（当前：${rel.intimacy}）`,
      ],
      intimacyChange: interaction.intimacyChange,
    };
  }

  /** 触发剧情节点 */
  static triggerStoryNode(
    playerId: string,
    daoLu: IDaoLu,
    storyId: string,
    choiceIndex: number
  ): { success: boolean; messages: string[]; intimacyChange: number; reward?: string } {
    const rel = this.getRelationship(playerId, daoLu.id);
    const story = daoLu.storyNodes.find(s => s.id === storyId);

    if (!story) {
      return { success: false, messages: ['未找到该剧情'], intimacyChange: 0 };
    }

    if (rel.intimacy < story.requiredIntimacy) {
      return {
        success: false,
        messages: [`好感度不足，需要 ${story.requiredIntimacy} 点好感度才能触发「${story.title}」`],
        intimacyChange: 0,
      };
    }

    if (this.isStoryUnlocked(playerId, daoLu.id, storyId)) {
      return { success: false, messages: ['该剧情已经触发过了'], intimacyChange: 0 };
    }

    const choice = story.choices[choiceIndex];
    if (!choice) {
      return { success: false, messages: ['无效的选择'], intimacyChange: 0 };
    }

    // 模拟玩家对象（简化版）
    const mockPlayer = {} as IPlayer;
    const result = choice.effect(mockPlayer);

    // 解锁剧情
    this.unlockStory(playerId, daoLu.id, storyId);

    // 应用好感度变化
    if (result.intimacyChange) {
      rel.intimacy += result.intimacyChange;
      if (rel.intimacy > rel.maxIntimacy) {
        rel.maxIntimacy = rel.intimacy;
      }
    }

    return {
      success: true,
      messages: [
        `◆ 剧情：${story.title}`,
        '',
        story.description,
        '',
        `◆ 你的选择：${choice.text}`,
        '',
        ...result.messages,
        ...(result.intimacyChange ? [`◆ 好感度 ${result.intimacyChange > 0 ? '+' : ''}${result.intimacyChange}`] : []),
      ],
      intimacyChange: result.intimacyChange || 0,
      reward: result.reward,
    };
  }

  /** 获取道侣的可用双修姿势 */
  static getAvailablePoses(playerId: string, daoLu: IDaoLu): IDaoLu['dualCultivationPoses'] {
    const rel = this.getRelationship(playerId, daoLu.id);
    return daoLu.dualCultivationPoses.filter(pose => rel.intimacy >= pose.requiredIntimacy);
  }

  /** 获取道侣的可用交互动作 */
  static getAvailableInteractions(playerId: string, daoLu: IDaoLu): IDaoLu['interactions'] {
    const rel = this.getRelationship(playerId, daoLu.id);
    return daoLu.interactions.filter(interaction => rel.intimacy >= interaction.requiredIntimacy);
  }

  /** 获取道侣的可用剧情 */
  static getAvailableStories(playerId: string, daoLu: IDaoLu): IDaoLu['storyNodes'] {
    const rel = this.getRelationship(playerId, daoLu.id);
    return daoLu.storyNodes.filter(
      story => rel.intimacy >= story.requiredIntimacy && !rel.unlockedStories.includes(story.id)
    );
  }

  /** 获取玩家所有道侣关系 */
  static getPlayerRelationships(playerId: string): IDaoLuRelationship[] {
    if (!playerRelationships.has(playerId)) return [];
    return Array.from(playerRelationships.get(playerId)!.values());
  }

  /**
   * 触发道侣剧情 - 从已审批剧情库中随机抽取一条直接输出
   * 不做任何生成或修改，仅做随机抽取输出
   */
  static triggerRandomStory(
    playerId: string,
    daoLu: IDaoLu,
    excludeIds: string[] = []
  ): { story: IDaoLuStory; messages: string[] } {
    const rel = this.getRelationship(playerId, daoLu.id);
    const story = pickDaoLuStory(excludeIds);

    // 记录已输出的剧情ID
    if (!rel.unlockedStories.includes(story.id)) {
      rel.unlockedStories.push(story.id);
    }

    return {
      story,
      messages: [
        `◆ 道侣剧情 · ${daoLu.name}`,
        '',
        story.text,
      ],
    };
  }

  /** 清除玩家道侣关系（转世重修等） */
  static clearPlayerRelationships(playerId: string): void {
    playerRelationships.delete(playerId);
  }
}
