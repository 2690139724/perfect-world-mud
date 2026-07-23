import {
  CHUNXIAO_ACTION_LIBRARY,
  IChunXiaoAction,
  KINGDOM_AMBIENCE,
  KingdomType,
} from '../entities/ChunXiao';
import {
  getMetaphorScenesByIntimacy,
  pickMetaphorScenes,
  IMetaphorAtmosphereScene,
} from '../entities/MetaphorAtmosphere';

/** 春宵场景生成选项 */
export interface IChunXiaoOptions {
  /** 国家类型（决定场景意象） */
  kingdom?: KingdomType;
  /** 抽取动作段数（1-3） */
  actionCount?: 1 | 2 | 3;
  /** 是否显示开场过渡 */
  withOpening?: boolean;
  /** 是否显示结束语 */
  withClosing?: boolean;
  /** 男主名字（用于引用） */
  maleName?: string;
  /** 女主名字（用于引用） */
  femaleName?: string;
  /** 排除已使用的动作ID（避免重复） */
  excludeActionIds?: number[];
}

/** 春宵场景结果 */
export interface IChunXiaoScene {
  /** 开场场景描述 */
  opening?: string;
  /** 动作段落 */
  actions: IChunXiaoAction[];
  /** 结束语 */
  closing?: string;
  /** 完整文本（含分段） */
  fullText: string;
}

/** 开场过渡模板 */
const OPENING_TEMPLATES = [
  '烛影摇红，春帐初暖。',
  '烛火跳动，纱帐低垂，映得满室生辉。',
  '夜色渐深，{curtain}徐徐落下，{candle}的暖光将满室笼罩。',
  '月华如水，{bedding}之上，两道身影交叠。',
  '云鬓花颜，{incense}的气息在室内缓缓流转。',
];

/** 结束语模板 */
const CLOSING_TEMPLATES = [
  '良久，烛火渐暗，室内归于平静。',
  '云收雨歇，{curtain}之后传来均匀的呼吸声。',
  '夜已深沉，{candle}燃尽，{bedding}之上两人相拥而眠。',
  '春宵苦短，{femaleName}轻靠在他怀中，唇角含笑。',
  '烛影摇曳间，一夜悄然过去。',
];

/** 春宵场景生成器 */
export class ChunXiaoSceneGenerator {
  /**
   * 生成春宵场景
   */
  static generate(options: IChunXiaoOptions = {}): IChunXiaoScene {
    const {
      kingdom = KingdomType.HUMAN,
      actionCount = 2,
      withOpening = true,
      withClosing = true,
      maleName = '他',
      femaleName = '她',
      excludeActionIds = [],
    } = options;

    const ambience = KINGDOM_AMBIENCE[kingdom];

    // 生成开场
    const opening = withOpening ? this.generateOpening(ambience) : undefined;

    // 抽取动作
    const actions = this.pickActions(actionCount, excludeActionIds);

    // 生成结束语
    const closing = withClosing ? this.generateClosing(ambience, femaleName) : undefined;

    // 组装完整文本
    const fullText = this.assembleText(opening, actions, closing, ambience, femaleName);

    return {
      opening,
      actions,
      closing,
      fullText,
    };
  }

  /**
   * 生成开场场景
   */
  private static generateOpening(ambience: typeof KINGDOM_AMBIENCE[KingdomType]): string {
    const openings = [
      ...ambience.openingScene,
      ...OPENING_TEMPLATES.map(tpl =>
        tpl
          .replace('{curtain}', ambience.curtain)
          .replace('{candle}', ambience.candle)
          .replace('{bedding}', ambience.bedding)
          .replace('{incense}', ambience.incense)
      ),
    ];
    return openings[Math.floor(Math.random() * openings.length)];
  }

  /**
   * 生成结束语
   */
  private static generateClosing(
    ambience: typeof KINGDOM_AMBIENCE[KingdomType],
    femaleName: string
  ): string {
    const closings = CLOSING_TEMPLATES.map(tpl =>
      tpl
        .replace('{curtain}', ambience.curtain)
        .replace('{candle}', ambience.candle)
        .replace('{bedding}', ambience.bedding)
        .replace('{femaleName}', femaleName)
    );
    return closings[Math.floor(Math.random() * closings.length)];
  }

  /**
   * 随机抽取动作段落（避免重复）
   */
  private static pickActions(count: 1 | 2 | 3, exclude: number[] = []): IChunXiaoAction[] {
    const available = CHUNXIAO_ACTION_LIBRARY.filter(a => !exclude.includes(a.id));
    const pool = [...available];
    const picked: IChunXiaoAction[] = [];

    for (let i = 0; i < count && pool.length > 0; i++) {
      const idx = Math.floor(Math.random() * pool.length);
      picked.push(pool.splice(idx, 1)[0]);
    }

    return picked;
  }

  /**
   * 组装完整文本
   */
  private static assembleText(
    opening: string | undefined,
    actions: IChunXiaoAction[],
    closing: string | undefined,
    ambience: typeof KINGDOM_AMBIENCE[KingdomType],
    femaleName: string
  ): string {
    const lines: string[] = [];

    if (opening) {
      lines.push(opening);
      lines.push('');
    }

    for (const action of actions) {
      lines.push(action.text);
      lines.push('');
    }

    if (closing) {
      lines.push(closing);
    }

    return lines.join('\n');
  }

  /**
   * 根据道侣的当前好感度等级，生成对应层次的春宵描写
   * 好感度越高，动作越亲密、动作段数越多
   */
  static generateForIntimacy(
    intimacy: number,
    options: Omit<IChunXiaoOptions, 'actionCount'> = {}
  ): IChunXiaoScene {
    let actionCount: 1 | 2 | 3 = 1;
    if (intimacy >= 200) actionCount = 3;
    else if (intimacy >= 50) actionCount = 2;
    else actionCount = 1;

    return this.generate({
      ...options,
      actionCount,
    });
  }

  /**
   * 生成纯自然意象隐喻氛围场景（无直接身体描写）
   * 使用藤蔓、月光、溪流、云等自然意象隐喻亲密时刻
   */
  static generateMetaphor(
    intimacy: number,
    options: {
      /** 抽取场景段数（1-3） */
      sceneCount?: 1 | 2 | 3;
      /** 排除已使用的场景ID */
      excludeIds?: number[];
    } = {}
  ): { scenes: IMetaphorAtmosphereScene[]; fullText: string } {
    const { sceneCount = 1, excludeIds = [] } = options;

    const scenes = pickMetaphorScenes(intimacy, sceneCount, excludeIds);

    const fullText = scenes.map(s => s.fullText).join('\n\n');

    return { scenes, fullText };
  }

  /**
   * 生成混合模式：国家意象开场 + 自然隐喻高潮 + 温存收尾
   * 结合原有场景氛围与自然意象隐喻
   */
  static generateHybrid(
    intimacy: number,
    options: {
      kingdom?: KingdomType;
      femaleName?: string;
      maleName?: string;
    } = {}
  ): { atmosphere: string; metaphor: string; fullText: string } {
    const { kingdom = KingdomType.HUMAN, femaleName = '她', maleName = '他' } = options;

    // 国家意象开场
    const ambience = KINGDOM_AMBIENCE[kingdom];
    const opening = ambience.openingScene[Math.floor(Math.random() * ambience.openingScene.length)];

    // 自然隐喻高潮
    const metaphorResult = this.generateMetaphor(intimacy, { sceneCount: 1 });

    // 温存收尾
    const closings = [
      '良久，夜色渐深，呼吸声在静谧中融为一体。',
      '月光洒落，天地间一片安宁，仿佛刚才的一切都未曾发生。',
      '夜风轻拂，烛火摇曳，室内只剩下彼此均匀的呼吸。',
      `${femaleName}靠在${maleName}怀中，眼皮渐渐沉重，沉入温柔的梦乡。`,
      '窗外月华如水，室内春光正好，一夜悠长。',
    ];
    const closing = closings[Math.floor(Math.random() * closings.length)];

    const fullText = `${opening}\n\n${metaphorResult.fullText}\n\n${closing}`;

    return {
      atmosphere: opening,
      metaphor: metaphorResult.fullText,
      fullText,
    };
  }
}
