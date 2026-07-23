import { INPC } from './NPC';
import { IPlayer } from './Player';

/** 道侣势力类型 */
export enum DaoLuFactionType {
  SECT = '宗门',
  CLAN = '家族',
  DYNASTY = '皇朝',
  HIDDEN = '隐世',
  WANDERER = '散修',
  DEMON = '魔道',
  MONSTER = '妖族',
  BUDDHIST = '佛门',
  DAOIST = '道统',
}

/** 道侣势力 */
export interface IDaoLuFaction {
  name: string;
  type: DaoLuFactionType;
  description: string;
  power: string;
  location: string;
  leader?: string;
}

/** 道侣专属剧情节点 */
export interface IDaoLuStoryNode {
  id: string;
  title: string;
  requiredIntimacy: number;
  description: string;
  choices: {
    text: string;
    effect: (player: IPlayer) => { messages: string[]; intimacyChange?: number; reward?: string };
  }[];
}

/** 双修姿势/功法（修仙世界观下的正经修炼方式） */
export interface IDualCultivationPose {
  id: string;
  name: string;
  requiredIntimacy: number;
  description: string;
  detailText: string;
  cultivationBonus: number;
  hpBonus: number;
  manaBonus: number;
}

/** 道侣交互动作 */
export interface IDaoLuInteraction {
  id: string;
  name: string;
  requiredIntimacy: number;
  description: string;
  detailText: string;
  intimacyChange: number;
  cooldown: number;
}

/** 道侣数据接口（扩展INPC） */
export interface IDaoLu extends INPC {
  /** 所属势力 */
  faction: IDaoLuFaction;
  /** 当前状态：散修或势力成员 */
  status: '散修' | '势力成员' | '被逐出' | '隐居';
  /** 专属剧情线 */
  storyNodes: IDaoLuStoryNode[];
  /** 双修姿势/功法列表 */
  dualCultivationPoses: IDualCultivationPose[];
  /** 交互动作列表 */
  interactions: IDaoLuInteraction[];
  /** 好感度等级描述 */
  intimacyLabels: Record<number, string>;
  /** 初次相遇剧情 */
  firstMeeting: string;
  /** 背景故事 */
  backgroundStory: string;
  /** 性格特征 */
  personalityTraits: string[];
  /** 喜好 */
  likes: string[];
  /** 厌恶 */
  dislikes: string[];
  /** 专属礼物列表 */
  favoriteGifts: string[];
}

/** 玩家道侣关系记录 */
export interface IDaoLuRelationship {
  daoLuId: string;
  intimacy: number;
  maxIntimacy: number;
  unlockedPoses: string[];
  unlockedStories: string[];
  totalDualCultivations: number;
  lastInteractionTime: number;
  isBonded: boolean;
  bondDate?: number;
}

/** 好感度等级阈值 */
export const INTIMACY_THRESHOLDS = {
  STRANGER: 0,
  ACQUAINTED: 20,
  FAMILIAR: 50,
  INTIMATE: 100,
  SOULMATE: 200,
  BONDED: 500,
};

/** 获取好感度等级名称 */
export function getIntimacyLevelName(intimacy: number): string {
  if (intimacy >= INTIMACY_THRESHOLDS.BONDED) return '结为道侣';
  if (intimacy >= INTIMACY_THRESHOLDS.SOULMATE) return '心有灵犀';
  if (intimacy >= INTIMACY_THRESHOLDS.INTIMATE) return '亲密无间';
  if (intimacy >= INTIMACY_THRESHOLDS.FAMILIAR) return '相识相知';
  if (intimacy >= INTIMACY_THRESHOLDS.ACQUAINTED) return '初识好感';
  return '素不相识';
}

/** 双修修炼姿势库 */
export const DUAL_CULTIVATION_POSE_TEMPLATES: IDualCultivationPose[] = [
  {
    id: 'pose_face_to_face',
    name: '阴阳对坐',
    requiredIntimacy: 0,
    description: '二人相对盘坐，掌心相抵，灵气互通',
    detailText: '你与她对坐于静室之中，四目相对，掌心轻抵。她闭上双眸，轻声引导你运转功法。阴阳二气在你们之间流转，如两条灵蛇交缠。她的额头渗出细密香汗，呼吸渐渐与你同步。灵气在两人之间形成一个小漩涡，温养经脉，洗涤杂质。',
    cultivationBonus: 5,
    hpBonus: 0,
    manaBonus: 10,
  },
  {
    id: 'pose_back_to_back',
    name: '背靠背运转',
    requiredIntimacy: 10,
    description: '背靠背而坐，督脉相通，真气循环',
    detailText: '你与她背靠背盘坐，感受到她后背传来的温热。督脉相接，真气在两人体内形成大周天循环。她的发丝拂过你的颈间，带来淡淡幽香。随着功法运转，两人的气息逐渐融为一体，如胶似漆，却又清澄纯净。',
    cultivationBonus: 8,
    hpBonus: 5,
    manaBonus: 15,
  },
  {
    id: 'pose_palm_transfer',
    name: '掌心传功',
    requiredIntimacy: 20,
    description: '双掌相贴，真气互通，阴阳调和',
    detailText: '你伸出双掌，与她四掌相对。她轻启朱唇，念诵双修口诀。真气从掌心涌入，如暖流般流遍全身。她的手掌微微颤抖，脸色泛起红晕，显然也在承受着你传来的真气冲击。两股真气在交汇处融合，产生奇异的共鸣。',
    cultivationBonus: 12,
    hpBonus: 10,
    manaBonus: 20,
  },
  {
    id: 'pose_embrace_cultivation',
    name: '环抱修炼',
    requiredIntimacy: 50,
    description: '轻拥入怀，心口相贴，心跳共鸣',
    detailText: '你轻轻将她拥入怀中，她的心口紧贴你的胸膛。你能感受到她急促的心跳，如小鹿乱撞。两人同时运转心法，心跳渐渐趋于一致。她的体温透过衣衫传来，让你心神荡漾，但很快被她引导的灵气拉回正轨。',
    cultivationBonus: 20,
    hpBonus: 15,
    manaBonus: 30,
  },
  {
    id: 'pose_spirit_union',
    name: '神识交融',
    requiredIntimacy: 100,
    description: '神识相交，灵魂触碰，心意相通',
    detailText: '你们相对而坐，额头轻触。她放开神识，向你敞开识海。你的神识小心翼翼地探入，感受到她灵魂深处的温柔。两人神识交缠，如两条游鱼在水中嬉戏。你看到了她的记忆碎片，她也窥见了你的心事。这种赤裸相对的信任，比肌肤相亲更加亲密。',
    cultivationBonus: 35,
    hpBonus: 25,
    manaBonus: 50,
  },
  {
    id: 'pose_yin_yang_cauldron',
    name: '阴阳鼎炉',
    requiredIntimacy: 200,
    description: '以身为鼎，以气为药，阴阳炼化',
    detailText: '你们按照上古秘法，摆出阴阳鼎炉之姿。她为阴鼎，你为阳炉。两人功法互补，在体内炼化出一缕阴阳和合之气。这缕气息精纯无比，所过之处经脉尽皆畅通。她全身被一层淡淡的光晕笼罩，宛如仙子临凡。你握住她的手，两人同时引导这缕阴阳之气完成最后一个大周天。',
    cultivationBonus: 60,
    hpBonus: 40,
    manaBonus: 80,
  },
  {
    id: 'pose_unity_heaven',
    name: '天人合一',
    requiredIntimacy: 500,
    description: '身心合一，天人合一，共参大道',
    detailText: '达到此境，双修已非简单的功法互补，而是两魂一体的玄妙状态。你们随意而坐，无需刻意引导，灵气自然流转。她的每一个念头你都能感知，你的每一次心跳她都了然。两人共同参悟天地大道，在阴阳交汇中触摸到更高层次的法则。这一刻，你们即是彼此，彼此即是你。',
    cultivationBonus: 100,
    hpBonus: 60,
    manaBonus: 120,
  },
];

/** 交互动作模板 */
export const DAO_LU_INTERACTION_TEMPLATES: IDaoLuInteraction[] = [
  {
    id: 'interact_gift',
    name: '赠送礼物',
    requiredIntimacy: 0,
    description: '赠送她喜欢的礼物，提升好感',
    detailText: '你取出一物，双手奉上。她接过礼物，眼中闪过惊喜，"这...这是我一直想要的东西，你怎么知道？"她珍而重之地将礼物收好，看向你的目光柔和了几分。',
    intimacyChange: 5,
    cooldown: 3600,
  },
  {
    id: 'interact_talk',
    name: '促膝长谈',
    requiredIntimacy: 0,
    description: '与她闲聊，增进了解',
    detailText: '你与她并肩而坐，从修炼心得聊到江湖趣事，又从童年回忆谈到未来抱负。她渐渐放下防备，言语间多了几分真性情。月光洒在两人身上，气氛温馨而静谧。',
    intimacyChange: 3,
    cooldown: 1800,
  },
  {
    id: 'interact_protect',
    name: '出手相护',
    requiredIntimacy: 10,
    description: '在她遇到危险时挺身而出',
    detailText: '危险降临，你不假思索地挡在她身前。她望着你的背影，眼中闪过复杂神色。事后，她轻声道："为什么要保护我？"你笑而不答，她低下头，耳尖微红。',
    intimacyChange: 10,
    cooldown: 7200,
  },
  {
    id: 'interact_promise',
    name: '许下承诺',
    requiredIntimacy: 50,
    description: '对她许下重要的承诺',
    detailText: '你郑重其事地向她承诺。她听完后沉默良久，而后抬起头来，目光灼灼："你可知道，修仙之人最重承诺？你若负我..."她没有说完，但眼中的信任与期待已说明一切。',
    intimacyChange: 15,
    cooldown: 86400,
  },
  {
    id: 'interact_confession',
    name: '表露心迹',
    requiredIntimacy: 100,
    description: '向她表露真心实意',
    detailText: '你鼓足勇气，将心中所想尽数倾诉。她听完后面红耳赤，转身欲走，却被你拉住手腕。她回头看你，眼波流转："你这人...怎的如此直接..."话虽如此，她却没有挣脱你的手。',
    intimacyChange: 25,
    cooldown: 86400,
  },
  {
    id: 'interact_bond',
    name: '结契为侣',
    requiredIntimacy: 500,
    description: '正式结为道侣，共参大道',
    detailText: '你们在天地见证下，立下道侣之誓。她含羞带怯，却坚定地与你十指相扣。从此，生死与共，不离不弃。阴阳调和，大道可期。',
    intimacyChange: 100,
    cooldown: 0,
  },
];
