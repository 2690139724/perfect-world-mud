import { CultivationRealm, RealmNames, getFullRealmName, getPerfectionMaterial, PERFECTION_MATERIALS, IPlayer } from '../entities/Player';
import { ICave, CaveQuality } from '../entities/Cave';
import { IDaoHeart, calculateDaoHeartBonus, addDaoHeartExp, updateVirtue, updateDefect } from '../entities/DaoHeart';
import { getBreakthroughMaterials, getMaterialInfo, calculateMaterialBonus, IBreakthroughMaterial } from '../entities/BreakthroughMaterials';
import { GrowthFeedback } from './GrowthFeedback';
import { IHeartDemonScene, IHeartDemonChoice, IBreakthroughSession, IBreakthroughResult } from '../entities/BreakthroughSession';

export type { IHeartDemonScene, IHeartDemonChoice, IBreakthroughSession, IBreakthroughResult } from '../entities/BreakthroughSession';

const HEART_DEMON_POOL: IHeartDemonScene[] = [
  // ===== 低境界（搬血~道宫）：基础七情 =====
  {
    title: '贪欲之惑',
    description: '幻境中，无数天材地宝堆积如山，绝世功法唾手可得。一个声音在你耳边低语："突破之后，这一切都是你的..."',
    minRealm: CultivationRealm.MORTAL,
    maxRealm: CultivationRealm.ARRAY,
    choices: [
      { text: '取之有道，不贪外物', effect: 5, narrative: '你守住本心，不为外物所动，道心更加坚定。' },
      { text: '全部收下！', effect: -8, insightBonus: 2, narrative: '你被贪欲蒙蔽，道心出现裂痕，却于迷障中隐有所悟。' },
      { text: '这些不过是虚妄', effect: 8, narrative: '你看破虚妄，心境通明，突破契机大增。' },
    ],
  },
  {
    title: '恐惧之影',
    description: '四周陷入黑暗，你看到自己突破失败的场景——经脉寸断、修为尽废。恐惧如潮水般涌来...',
    minRealm: CultivationRealm.MORTAL,
    maxRealm: CultivationRealm.ARRAY,
    choices: [
      { text: '坚定信念，无所畏惧', effect: 6, narrative: '你直面恐惧，将之化为前进的动力。' },
      { text: '暂避锋芒，从长计议', effect: -5, narrative: '你心生退意，道心蒙尘。' },
      { text: '破而后立，向死而生', effect: 10, insightBonus: 1, narrative: '你领悟了破而后立的真谛，气势如虹！' },
    ],
  },
  {
    title: '傲慢之劫',
    description: '一面古镜中，你看到自己已经站在巅峰，俯瞰众生。"你已足够强大，何须再苦修？"',
    minRealm: CultivationRealm.MORTAL,
    maxRealm: CultivationRealm.VENERABLE,
    choices: [
      { text: '戒骄戒躁，不忘初心', effect: 8, narrative: '你警醒自身，放下傲慢，心境更加圆融。' },
      { text: '我本就应该如此强大', effect: -12, insightBonus: 3, narrative: '傲慢侵蚀了你的道心，但狂傲之中亦藏锋芒，悟得一丝桀骜之气。' },
      { text: '巅峰之路，永无止境', effect: 6, narrative: '你保持谦逊，但斗志不减。' },
    ],
  },
  {
    title: '怀疑之谷',
    description: '你站在一片荒芜的山谷中，一个和你一模一样的人站在对面："你确定自己能突破吗？你配得上更高的境界吗？"',
    minRealm: CultivationRealm.MORTAL,
    maxRealm: CultivationRealm.VENERABLE,
    choices: [
      { text: '我坚信自己！', effect: 8, narrative: '你的信念光芒万丈，驱散了所有怀疑。' },
      { text: '我...不确定', effect: -8, insightBonus: 2, narrative: '你的犹豫给了心魔可乘之机，但于动摇中亦窥见自身不足。' },
      { text: '无需向任何人证明', effect: 6, narrative: '你超脱了外界的评判，道心自在。' },
    ],
  },
  // ===== 中境界（铭文~天神）：世俗执念 =====
  {
    title: '执念之网',
    description: '过去的种种在你眼前浮现——未能救下的人、未能完成的约定、未能战胜的对手...',
    minRealm: CultivationRealm.INSCRIBE,
    maxRealm: CultivationRealm.DIVINE_FIRE,
    choices: [
      { text: '放下执念，轻装前行', effect: 6, narrative: '你释然了，心神前所未有的轻松。' },
      { text: '执念即动力，永不放弃', effect: 8, insightBonus: 1, narrative: '你将执念化为力量，气势暴涨！' },
      { text: '过去已逝，未来可期', effect: 4, narrative: '你平静地接受了过往，心如止水。' },
    ],
  },
  {
    title: '情劫之绊',
    description: '熟悉的身影在幻境中浮现——道侣、挚友、师长的面容一一闪过。"为了他们，何不就此止步？"',
    minRealm: CultivationRealm.INSCRIBE,
    maxRealm: CultivationRealm.SUPREME,
    choices: [
      { text: '斩断情丝，一心向道', effect: -5, insightBonus: 3, narrative: '你强行斩断情丝，道心虽伤，却悟得斩尘之妙。' },
      { text: '情之所钟，更当精进', effect: 8, narrative: '你将情意化为修行之力，心境通达。' },
      { text: '道在红尘，不弃不离', effect: 6, narrative: '你领悟红尘亦是道场，心境圆融。' },
    ],
  },
  {
    title: '权欲之渊',
    description: '幻境中你身披龙袍、手握生杀，万人跪伏。"突破之后，你可建一国、立一教，号令天下..."',
    minRealm: CultivationRealm.ARRAY,
    maxRealm: CultivationRealm.SUPREME,
    choices: [
      { text: '权势如浮云，不值一哂', effect: 6, narrative: '你视权势如粪土，道心澄澈。' },
      { text: '当立教化众生，非为权欲', effect: 5, narrative: '你以教化之心化解权欲之念。' },
      { text: '握权以行大道，有何不可', effect: -8, insightBonus: 2, narrative: '你被权欲牵引，却于权谋中悟得一丝治世之道。' },
    ],
  },
  {
    title: '生死之辩',
    description: '黑白二色化为两道身影在你面前辩论——"修道者终有一死，何苦逆天而行？"',
    minRealm: CultivationRealm.ARRAY,
    choices: [
      { text: '长生非我求，道心不可夺', effect: 8, narrative: '你超越生死之念，道心坚如磐石。' },
      { text: '纵死无悔，向道而行', effect: 10, insightBonus: 1, narrative: '你以必死之心求长生之道，气势冲霄！' },
      { text: '生死本是轮回一环', effect: 5, narrative: '你悟得生死循环之理，心境平和。' },
    ],
  },
  // ===== 高境界（真一~遁一）：道义天命 =====
  {
    title: '因果之锁',
    description: '无数因果线从你身上延伸，连接着过去未来。"你今日之突破，将牵动万灵命运，可担得起？"',
    minRealm: CultivationRealm.TRUE_ONE,
    choices: [
      { text: '一力担之，何惧因果', effect: 10, insightBonus: 2, narrative: '你以大毅力担起因果，道心圆满。' },
      { text: '顺其自然，不强求果', effect: 6, narrative: '你顺应因果流转，心境通明。' },
      { text: '斩断因果，独行其道', effect: -5, insightBonus: 4, narrative: '你强斩因果，道心受创却悟得断因之法。' },
    ],
  },
  {
    title: '苍生之问',
    description: '幻境中苍生万象浮现——一人之突破可救苍生，亦可祸乱天下。"你为何而突破？"',
    minRealm: CultivationRealm.TRUE_ONE,
    choices: [
      { text: '为苍生而修，为大道而行', effect: 8, narrative: '你心怀苍生，道意高远。' },
      { text: '为己求生，再及其余', effect: 5, narrative: '你坦诚所求，道心朴实。' },
      { text: '苍生与我何干', effect: -10, insightBonus: 2, narrative: '你独善其身，却于孤绝中悟得一丝霸绝之意。' },
    ],
  },
  {
    title: '虚空之寂',
    description: '你置身于无尽虚空，无光无声无物。"突破之后，你将独自面对永恒的寂寞，可受得了？"',
    minRealm: CultivationRealm.VOID,
    choices: [
      { text: '寂寞是道之伴侣', effect: 10, narrative: '你拥抱寂寞，道心圆融。' },
      { text: '我将于虚空中开创一切', effect: 8, insightBonus: 1, narrative: '你以开创者之姿面对虚空，气势磅礴！' },
      { text: '纵然寂寞，亦不退转', effect: 6, narrative: '你坚定道心，寂寞无法动摇你分毫。' },
    ],
  },
  {
    title: '轮回之镜',
    description: '一面巨镜中映出你无数前世——或为人、或为兽、或为草木。"哪一世才是真实的你？"',
    minRealm: CultivationRealm.VOID,
    choices: [
      { text: '当下即真，余皆虚妄', effect: 10, narrative: '你顿悟当下真我，道心通明。' },
      { text: '万世皆我，我即万世', effect: 8, insightBonus: 2, narrative: '你悟得真我遍布万世，道意深远。' },
      { text: '跳出轮回，方为真我', effect: 6, narrative: '你以超脱之心看待轮回，心境澄澈。' },
    ],
  },
  // ===== 顶境界（斩我~真仙）：超脱天命 =====
  {
    title: '斩我之问',
    description: '一个与你一模一样的身影从你体内走出——"你要斩的，是我。可下得了手？"',
    minRealm: CultivationRealm.SELF_CUT,
    choices: [
      { text: '斩我证道，义无反顾', effect: 12, insightBonus: 2, narrative: '你以雷霆之势斩去旧我，道心升华！' },
      { text: '我与本我合一，何须斩', effect: 8, narrative: '你悟得合我之道，心境圆融。' },
      { text: '保留本我，方得真我', effect: 5, narrative: '你以中庸之道对待斩我，道心稳健。' },
    ],
  },
  {
    title: '天道之约',
    description: '天道显化为一只巨眼俯视着你——"突破此境，你将与天道并列。可愿承担天道之责？"',
    minRealm: CultivationRealm.ESCAPE,
    choices: [
      { text: '愿担天道，福泽苍生', effect: 10, narrative: '你以大愿心担起天道，道意冲霄！' },
      { text: '超脱天道，不为其所缚', effect: 12, insightBonus: 1, narrative: '你以超脱之心面对天道，气势磅礴！' },
      { text: '天道有道，我行我道', effect: 8, narrative: '你坚持我行我道，不被天道所拘。' },
    ],
  },
  {
    title: '终极之境',
    description: '前方已无路可走，唯有混沌。"突破之后，世间再无对手，再无目标，再无意义...可愿？"',
    minRealm: CultivationRealm.TRUE_IMMORTAL,
    choices: [
      { text: '巅峰亦是新起点', effect: 10, narrative: '你视巅峰为起点，道心永不满足！' },
      { text: '意义在途中，不在终点', effect: 8, narrative: '你领悟过程即意义，心境通明。' },
      { text: '纵然无敌，亦当独行', effect: 6, insightBonus: 1, narrative: '你以孤绝之心面对终极，道意坚凝。' },
    ],
  },
];

// ===== 突破配置（旧表保留，新增天劫/心魔参数）=====
interface IBreakthroughConfig {
  expRequired: number;
  successRate: number;
  hpBonus: number;
  manaBonus: number;
  attackBonus: number;
  defenseBonus: number;
  speedBonus: number;
  caveBonus: number;
  spiritBonus: number;
  tribulationRounds: number;  // 天劫轮数（0=无天劫）
  tribulationDmgPct: number;  // 每轮损失气血百分比
}

const BREAKTHROUGH_TABLE: Partial<Record<CultivationRealm, IBreakthroughConfig>> = {
  [CultivationRealm.BLOOD_MOVING]: {
    expRequired: 100, successRate: 0.90,
    hpBonus: 30, manaBonus: 20, attackBonus: 5, defenseBonus: 3, speedBonus: 1,
    caveBonus: 1, spiritBonus: 0.2,
    tribulationRounds: 0, tribulationDmgPct: 0,
  },
  [CultivationRealm.CAVE]: {
    expRequired: 300, successRate: 0.80,
    hpBonus: 50, manaBonus: 30, attackBonus: 8, defenseBonus: 5, speedBonus: 2,
    caveBonus: 1, spiritBonus: 0.2,
    tribulationRounds: 0, tribulationDmgPct: 0,
  },
  [CultivationRealm.SPIRIT]: {
    expRequired: 800, successRate: 0.70,
    hpBonus: 80, manaBonus: 50, attackBonus: 12, defenseBonus: 8, speedBonus: 2,
    caveBonus: 1, spiritBonus: 0.3,
    tribulationRounds: 0, tribulationDmgPct: 0,
  },
  [CultivationRealm.INSCRIBE]: {
    expRequired: 2000, successRate: 0.60,
    hpBonus: 120, manaBonus: 70, attackBonus: 18, defenseBonus: 12, speedBonus: 3,
    caveBonus: 1, spiritBonus: 0.3,
    tribulationRounds: 3, tribulationDmgPct: 20,
  },
  [CultivationRealm.ARRAY]: {
    expRequired: 5000, successRate: 0.50,
    hpBonus: 200, manaBonus: 100, attackBonus: 28, defenseBonus: 18, speedBonus: 4,
    caveBonus: 1, spiritBonus: 0.4,
    tribulationRounds: 3, tribulationDmgPct: 25,
  },
  [CultivationRealm.VENERABLE]: {
    expRequired: 12000, successRate: 0.40,
    hpBonus: 350, manaBonus: 150, attackBonus: 40, defenseBonus: 25, speedBonus: 5,
    caveBonus: 2, spiritBonus: 0.5,
    tribulationRounds: 4, tribulationDmgPct: 25,
  },
  [CultivationRealm.DIVINE_FIRE]: {
    expRequired: 30000, successRate: 0.35,
    hpBonus: 500, manaBonus: 200, attackBonus: 60, defenseBonus: 35, speedBonus: 6,
    caveBonus: 2, spiritBonus: 0.5,
    tribulationRounds: 5, tribulationDmgPct: 30,
  },
  [CultivationRealm.TRUE_ONE]: {
    expRequired: 60000, successRate: 0.30,
    hpBonus: 800, manaBonus: 300, attackBonus: 90, defenseBonus: 50, speedBonus: 8,
    caveBonus: 2, spiritBonus: 0.6,
    tribulationRounds: 5, tribulationDmgPct: 30,
  },
  [CultivationRealm.SACRIFICE]: {
    expRequired: 120000, successRate: 0.25,
    hpBonus: 1200, manaBonus: 400, attackBonus: 130, defenseBonus: 70, speedBonus: 10,
    caveBonus: 3, spiritBonus: 0.7,
    tribulationRounds: 6, tribulationDmgPct: 35,
  },
  [CultivationRealm.GOD]: {
    expRequired: 250000, successRate: 0.20,
    hpBonus: 2000, manaBonus: 600, attackBonus: 200, defenseBonus: 100, speedBonus: 12,
    caveBonus: 3, spiritBonus: 0.8,
    tribulationRounds: 6, tribulationDmgPct: 35,
  },
  [CultivationRealm.VOID]: {
    expRequired: 500000, successRate: 0.15,
    hpBonus: 3000, manaBonus: 800, attackBonus: 300, defenseBonus: 150, speedBonus: 15,
    caveBonus: 3, spiritBonus: 1.0,
    tribulationRounds: 7, tribulationDmgPct: 40,
  },
  [CultivationRealm.SELF_CUT]: {
    expRequired: 1000000, successRate: 0.12,
    hpBonus: 5000, manaBonus: 1200, attackBonus: 500, defenseBonus: 250, speedBonus: 20,
    caveBonus: 4, spiritBonus: 1.2,
    tribulationRounds: 7, tribulationDmgPct: 40,
  },
  [CultivationRealm.ESCAPE]: {
    expRequired: 2000000, successRate: 0.10,
    hpBonus: 8000, manaBonus: 2000, attackBonus: 800, defenseBonus: 400, speedBonus: 25,
    caveBonus: 4, spiritBonus: 1.5,
    tribulationRounds: 8, tribulationDmgPct: 45,
  },
  [CultivationRealm.SUPREME]: {
    expRequired: 5000000, successRate: 0.08,
    hpBonus: 15000, manaBonus: 4000, attackBonus: 1500, defenseBonus: 800, speedBonus: 30,
    caveBonus: 5, spiritBonus: 2.0,
    tribulationRounds: 8, tribulationDmgPct: 50,
  },
  [CultivationRealm.TRUE_IMMORTAL]: {
    expRequired: 10000000, successRate: 0.05,
    hpBonus: 30000, manaBonus: 8000, attackBonus: 3000, defenseBonus: 1500, speedBonus: 40,
    caveBonus: 5, spiritBonus: 3.0,
    tribulationRounds: 9, tribulationDmgPct: 50,
  },
  [CultivationRealm.KING]: {
    expRequired: 99999999, successRate: 0.03,
    hpBonus: 50000, manaBonus: 15000, attackBonus: 5000, defenseBonus: 3000, speedBonus: 50,
    caveBonus: 5, spiritBonus: 5.0,
    tribulationRounds: 9, tribulationDmgPct: 60,
  },
};

// ===== Service =====
export class BreakthroughService {
  /**
   * 开始突破流程：检查前置、生成心魔、创建会话
   */
  static startBreakthrough(player: IPlayer): { ok: true; session: IBreakthroughSession; messages: string[] } | { ok: false; message: string } {
    const currentRealm = player.realm;
    if (currentRealm >= CultivationRealm.KING) {
      return { ok: false, message: '已达王者之境，世间再无更高境界可破。' };
    }

    if (player.cultivationExp < player.maxCultivationExp) {
      const remaining = Math.ceil(player.maxCultivationExp - player.cultivationExp);
      return { ok: false, message: `修为不足，还需 ${remaining} 修为方可尝试突破。` };
    }

    const config = BREAKTHROUGH_TABLE[currentRealm];
    if (!config) {
      return { ok: false, message: '当前境界无法突破。' };
    }

    const targetRealm = (currentRealm + 1) as CultivationRealm;
    const targetName = RealmNames[targetRealm] || '未知';

    const messages: string[] = [];
    messages.push(`修为已满，你盘膝而坐，准备冲击 **${targetName}**！`);
    messages.push('');

    const materialRequirements = getBreakthroughMaterials(currentRealm);
    const materialsUsed: string[] = [];
    
    if (materialRequirements) {
      const matInfo = getMaterialInfo(materialRequirements.mainMaterial);
      if (matInfo) {
        const matIdx = player.inventory.findIndex(i => i.id === matInfo.id);
        if (matIdx !== -1) {
          materialsUsed.push(matInfo.id);
          messages.push(`你取出【${matInfo.name}】，${matInfo.description}`);
          player.inventory.splice(matIdx, 1);
        } else {
          messages.push(`缺少主材料【${matInfo.name}】，突破难度增加。`);
        }
      }
      
      for (const auxMat of materialRequirements.auxiliaryMaterials) {
        const auxInfo = getMaterialInfo(auxMat.id);
        if (auxInfo) {
          let countFound = 0;
          while (countFound < auxMat.count) {
            const idx = player.inventory.findIndex(i => i.id === auxInfo.id);
            if (idx === -1) break;
            player.inventory.splice(idx, 1);
            countFound++;
          }
          if (countFound > 0) {
            materialsUsed.push(auxInfo.id);
            messages.push(`消耗【${auxInfo.name}】x${countFound}`);
          }
        }
      }
    }

    const materialBonuses = calculateMaterialBonus(materialsUsed);
    const daoHeartBonus = player.daoHeart ? calculateDaoHeartBonus(player.daoHeart) : 0;

    const caveBonus = Math.min(0.1, player.caveCount * 0.01);
    const baseRate = Math.min(0.95, config.successRate + caveBonus);

    const eligible = HEART_DEMON_POOL.filter(s =>
      (s.minRealm === undefined || currentRealm >= s.minRealm) &&
      (s.maxRealm === undefined || currentRealm <= s.maxRealm)
    );
    const pool = eligible.length > 0 ? eligible : HEART_DEMON_POOL;
    const heartDemon = pool[Math.floor(Math.random() * pool.length)];

    let tribulation: IBreakthroughSession['tribulation'] | undefined;
    if (config.tribulationRounds > 0) {
      const dmgPerRound = Math.floor(player.maxHp * config.tribulationDmgPct / 100);
      const reducedDmg = Math.floor(dmgPerRound * (1 - materialBonuses.damageReduction / 100));
      tribulation = {
        totalDamage: reducedDmg * config.tribulationRounds,
        damagePerRound: reducedDmg,
        rounds: config.tribulationRounds,
        currentRound: 0,
        damageReduction: materialBonuses.damageReduction,
      };
    }

    const session: IBreakthroughSession = {
      step: 'heart_demon',
      targetRealm,
      targetName,
      baseRate,
      rateModifier: materialBonuses.successRateBonus,
      heartDemon,
      tribulation,
      materialsUsed,
      materialBonuses,
      daoHeartBonus,
    };

    if (daoHeartBonus > 0) {
      messages.push(`道心加持，突破成功率 +${daoHeartBonus}%`);
    }

    messages.push('━━━ 心魔考验 ━━━');
    messages.push(`**${heartDemon.title}**`);
    messages.push(heartDemon.description);
    messages.push('');
    for (let i = 0; i < heartDemon.choices.length; i++) {
      messages.push(`◆ ${heartDemon.choices[i].text}`);
    }
    messages.push('');
    messages.push('请做出选择。');

    return { ok: true, session, messages };
  }

  /**
   * 处理心魔选择
   */
  static processHeartDemon(player: IPlayer, session: IBreakthroughSession, choiceIndex: number): { updated: IBreakthroughSession; messages: string[] } {
    const choice = session.heartDemon.choices[choiceIndex];
    if (!choice) {
      return { updated: session, messages: ['无效的选择。'] };
    }

    session.rateModifier += choice.effect;

    const messages: string[] = [];
    messages.push(`你选择了：${choice.text}`);
    messages.push(choice.narrative);

    // 应用额外突破感悟
    if (choice.insightBonus && choice.insightBonus > 0) {
      player.breakthroughInsight = (player.breakthroughInsight || 0) + choice.insightBonus;
      messages.push(`突破感悟 +${choice.insightBonus}（当前 ${player.breakthroughInsight}）`);
    }

    // 如果效果为负，显示道心受损
    if (choice.effect < 0) {
      messages.push(`道心受损，突破成功率 **${choice.effect}%**。`);
    } else if (choice.effect > 0) {
      messages.push(`道心坚定，突破成功率 **+${choice.effect}%**。`);
    }

    // 判断下一步
    if (session.tribulation) {
      session.step = 'tribulation';
      messages.push('');
      messages.push('━━━ 天劫降临 ━━━');
      messages.push(`天穹色变，劫云汇聚！${session.tribulation.rounds}道天雷即将劈落！`);
      messages.push('你运转全身修为，准备硬抗天劫...');
    } else {
      session.step = 'final';
      messages.push('');
      messages.push('心魔已破，开始最后的突破...');
    }

    return { updated: session, messages };
  }

  /**
   * 执行一轮天劫
   */
  static processTribulation(player: IPlayer, session: IBreakthroughSession): { updated: IBreakthroughSession; messages: string[]; finished: boolean } {
    if (!session.tribulation) {
      return { updated: session, messages: [], finished: true };
    }

    const trib = session.tribulation;
    trib.currentRound++;
    const dmg = trib.damagePerRound;
    player.hp = Math.max(0, player.hp - dmg);

    const messages: string[] = [];
    messages.push(`第 ${trib.currentRound}/${trib.rounds} 道天雷轰然而下！`);
    messages.push(`雷霆之力贯穿全身，损失 **${dmg}** 气血。`);

    if (player.hp <= 0) {
      // 天劫失败 - 优化惩罚机制
      player.hp = 1;
      player.breakthroughAttempts = (player.breakthroughAttempts || 0) + 1;
      
      const retentionRate = Math.min(0.85, 0.75 + (player.breakthroughInsight || 0) * 0.02);
      const expLoss = Math.floor(player.cultivationExp * (1 - retentionRate));
      player.cultivationExp = Math.max(0, player.cultivationExp - expLoss);
      
      player.breakthroughInsight = (player.breakthroughInsight || 0) + 2;

      messages.push(`你未能扛过天劫，重伤倒地！修为损失 ${expLoss} 点，保留 ${Math.floor(retentionRate * 100)}%。`);
      messages.push(`突破感悟 +2（当前 ${player.breakthroughInsight}）`);
      return { updated: session, messages, finished: true };
    }

    if (trib.currentRound >= trib.rounds) {
      messages.push('天劫已过！你成功扛住了所有雷霆，肉身在劫雷中淬炼，更加强大！');
      session.step = 'final';
      return { updated: session, messages, finished: true };
    }

    messages.push(`还剩 ${trib.rounds - trib.currentRound} 道天雷...准备迎接下一道！`);
    return { updated: session, messages, finished: trib.currentRound >= trib.rounds };
  }

  /**
   * 执行最终突破判定
   */
  static performBreakthrough(player: IPlayer, session: IBreakthroughSession): { result: IBreakthroughResult; messages: string[] } {
    const config = BREAKTHROUGH_TABLE[player.realm];
    if (!config) {
      return { result: { success: false, message: '突破配置缺失。' }, messages: [] };
    }

    const insightBonus = Math.floor((player.breakthroughInsight || 0) * 0.5);
    const pastLifeBonus = player.pastLifeMemory || 0;

    const maxAttemptsForGuarantee = Math.max(3, 10 - player.realm);
    const isGuaranteed = (player.breakthroughAttempts || 0) >= maxAttemptsForGuarantee;

    const totalRateModifier = session.rateModifier + session.daoHeartBonus + insightBonus + pastLifeBonus;
    const baseRateWithInsight = Math.min(0.95, Math.max(0.05, session.baseRate + totalRateModifier / 100));
    const finalRate = isGuaranteed ? 1.0 : baseRateWithInsight;
    const roll = Math.random();
    const messages: string[] = [];

    messages.push('━━━ 最终突破 ━━━');
    messages.push(`你摒除杂念，引动全身修为冲击瓶颈...`);
    if (pastLifeBonus > 0) {
      messages.push(`前世记忆流转，道心稳固（+${pastLifeBonus}%）。`);
    }
    if (session.daoHeartBonus > 0) {
      messages.push(`道心加持（+${session.daoHeartBonus}%）。`);
    }
    
    if (isGuaranteed) {
      messages.push(`⚠️ 保底触发！突破必定成功！`);
    } else {
      messages.push(`成功率: **${(finalRate * 100).toFixed(1)}%**`);
      if (insightBonus > 0) {
        messages.push(`突破感悟加成: **+${insightBonus}%**`);
      }
      if (session.materialBonuses.successRateBonus > 0) {
        messages.push(`材料加成: **+${session.materialBonuses.successRateBonus}%**`);
      }
    }

    if (roll < finalRate) {
      const newRealm = session.targetRealm;
      const realmName = session.targetName;

      player.maxHp += config.hpBonus;
      player.hp = player.maxHp;
      player.maxMana += config.manaBonus;
      player.mana = player.maxMana;
      player.attack += config.attackBonus;
      player.defense += config.defenseBonus;
      player.speed += config.speedBonus;
      player.caveCount += config.caveBonus;
      player.spiritAbsorbRate += config.spiritBonus;
      player.realm = newRealm;
      player.realmStage = 1;
      player.realmPerfection = false;
      player.cultivationExp = 0;
      player.maxCultivationExp = this.getStageMaxExp(newRealm, 1);
      
      player.breakthroughInsight = Math.floor((player.breakthroughInsight || 0) * 0.3);
      player.breakthroughAttempts = 0;

      if (player.daoHeart) {
        const daoHeartResult = addDaoHeartExp(player.daoHeart, 50 + session.materialBonuses.insightBonus * 10);
        if (daoHeartResult.leveledUp) {
          messages.push(`\n【道心提升！】道心境界提升至 ${daoHeartResult.newLevel}！`);
        }
        updateVirtue(player.daoHeart, 'virtue_perseverance', 1);
      }

      if (newRealm === CultivationRealm.CAVE && !player.cave) {
        player.cave = {
          id: 'cave_initial',
          name: '凡洞天',
          quality: CaveQuality.MORTAL,
          realm: CultivationRealm.CAVE,
          spiritDensity: 1.0,
          size: 3,
          plants: [],
          pets: [],
          decorations: [],
          lastVisitTime: Date.now(),
        };
        messages.push('');
        messages.push('━━━ 洞天开辟 ━━━');
        messages.push('体内洞天初开，灵气汇聚，你获得了自己的洞天福地！');
        messages.push('使用【洞天】命令查看和管理你的洞天。');
      }

      const phenomena = this.getBreakthroughPhenomena(newRealm);
      messages.push('');
      messages.push(`**轰——！** ${phenomena}`);
      messages.push('');
      
      const phenomenaExtra = this.getBreakthroughPhenomenaExtra(newRealm);
      if (phenomenaExtra) {
        messages.push(phenomenaExtra);
      }
      
      messages.push(`**突破成功！你已晋级为 ${realmName}！**`);
      messages.push(`气血+${config.hpBonus} 法力+${config.manaBonus} 攻击+${config.attackBonus} 防御+${config.defenseBonus} 速度+${config.speedBonus}`);

      setTimeout(() => {
        GrowthFeedback.showBreakthroughSuccess(realmName);
      }, 100);

      return {
        result: {
          success: true,
          newRealm,
          realmName,
          message: `突破成功！你已晋级为 **${realmName}**！`,
        },
        messages,
      };
    } else {
      player.breakthroughAttempts = (player.breakthroughAttempts || 0) + 1;

      const diff = finalRate - roll;
      let failLevel: 'minor' | 'medium' | 'major';
      if (diff < 0.15) {
        failLevel = 'minor';
      } else if (diff < 0.4) {
        failLevel = 'medium';
      } else {
        failLevel = 'major';
      }

      let loss = 0;
      let insightGain = 0;
      let hpLossPct = 0;
      let stageDrop = false;
      let description = '';
      let title = '';

      const retentionRate = Math.min(0.85, 0.75 + (session.materialBonuses.expRetention / 100));

      switch (failLevel) {
        case 'minor':
          title = '**惜败**';
          description = '瓶颈差之毫厘，几乎就要成功...';
          loss = Math.floor(player.cultivationExp * (1 - retentionRate) * 0.05);
          insightGain = 5;
          hpLossPct = 0.05;
          break;
        case 'medium':
          title = '**失败**';
          description = '瓶颈纹丝不动，反震之力让你气血翻涌...';
          loss = Math.floor(player.cultivationExp * (1 - retentionRate) * 0.2);
          insightGain = 3;
          hpLossPct = player.realm >= CultivationRealm.INSCRIBE ? 0.12 : 0.05;
          break;
        case 'major':
          title = '**惨败**';
          description = '瓶颈如同天堑，真气逆行，经脉受损！';
          loss = Math.floor(player.cultivationExp * (1 - retentionRate) * 0.4);
          insightGain = 1;
          hpLossPct = player.realm >= CultivationRealm.INSCRIBE ? 0.25 : 0.1;
          if (player.realm >= CultivationRealm.ARRAY && player.realmStage > 1 && Math.random() < 0.3) {
            stageDrop = true;
          }
          break;
      }

      player.cultivationExp = Math.max(0, player.cultivationExp - loss);
      player.breakthroughInsight = (player.breakthroughInsight || 0) + insightGain + session.materialBonuses.insightBonus;

      const hpLoss = Math.floor(player.maxHp * hpLossPct);
      player.hp = Math.max(1, player.hp - hpLoss);

      if (stageDrop) {
        player.realmStage--;
        player.maxCultivationExp = this.getStageMaxExp(player.realm, player.realmStage);
        player.cultivationExp = Math.min(player.cultivationExp, player.maxCultivationExp);
      }

      if (player.daoHeart) {
        addDaoHeartExp(player.daoHeart, insightGain * 5);
        if (failLevel === 'major') {
          updateDefect(player.daoHeart, 'defect_doubt', 1);
        } else {
          updateVirtue(player.daoHeart, 'virtue_perseverance', 1);
        }
      }

      const insightBonusVal = Math.floor((player.breakthroughInsight || 0) * 0.5);
      const maxAttemptsForGuaranteeVal = Math.max(3, 10 - player.realm);
      const attemptsRemaining = maxAttemptsForGuaranteeVal - player.breakthroughAttempts;

      messages.push('');
      messages.push(title);
      messages.push(description);
      messages.push(`突破失败！修为损失 ${loss} 点（保留 ${Math.floor(retentionRate * 100)}%）。`);
      if (stageDrop) {
        messages.push(`**境界跌落！** 从第 ${player.realmStage + 1} 层跌回第 ${player.realmStage} 层。`);
      }
      messages.push(`气血损失 ${hpLoss} 点。`);
      messages.push(`突破感悟 +${insightGain + session.materialBonuses.insightBonus}（当前 ${player.breakthroughInsight}，提升成功率 ${insightBonusVal}%）`);

      if (attemptsRemaining > 0) {
        messages.push(`连续失败 ${player.breakthroughAttempts} 次，再失败 ${attemptsRemaining} 次后下次必定成功！`);
      } else {
        messages.push(`⚠️ 保底触发！下次突破必定成功！`);
      }

      return {
        result: {
          success: false,
          failLevel,
          message: `突破失败！修为损失 ${loss} 点。`,
        },
        messages,
      };
    }
  }

  private static getBreakthroughPhenomenaExtra(realm: CultivationRealm): string | null {
    const pool: string[] | null = (() => {
      switch (realm) {
        case CultivationRealm.BLOOD_MOVING: 
          return ['方圆百里灵气汇聚而来，形成一道巨大的灵气漩涡！', '天地异象引动了附近的妖兽纷纷朝拜！'];
        case CultivationRealm.CAVE: 
          return ['洞天之力扩散开来，影响了整片区域的灵气分布！', '天空中浮现出玄妙的道纹，一闪而逝！'];
        case CultivationRealm.SPIRIT: 
          return ['元神之光冲天而起，照亮了整片夜空！', '方圆千里内的生灵都感受到了这股气息！'];
        case CultivationRealm.INSCRIBE: 
          return ['道纹铭刻于虚空，形成了一幅巨大的画卷！', '天降异象，万道霞光笼罩大地！'];
        case CultivationRealm.ARRAY: 
          return ['阵纹交织，演化出一方小世界！', '天地法则共鸣，形成了一座天然的大阵！'];
        case CultivationRealm.VENERABLE: 
          return ['尊者威压席卷四方，无数生灵顶礼膜拜！', '天地变色，风云涌动！'];
        case CultivationRealm.DIVINE_FIRE: 
          return ['神火焚天，九重天都被照亮！', '道火燃烧，净化了周围的一切杂质！'];
        case CultivationRealm.TRUE_ONE: 
          return ['真我合一，与天地融为一体！', '大道法则显现，形成了一尊巨大的虚影！'];
        case CultivationRealm.SACRIFICE: 
          return ['祭道之火燃遍苍穹，照亮了无数位面！', '天地大道为之震动！'];
        case CultivationRealm.GOD: 
          return ['神威浩荡，诸天万界都在颤抖！', '降下神雷，洗练万物！'];
        case CultivationRealm.VOID: 
          return ['虚道开辟，混沌初分！', '时空扭曲，形成了一方独立的空间！'];
        case CultivationRealm.SELF_CUT: 
          return ['斩我明道，超脱轮回！', '一道巨大的刀光划破了虚空！'];
        case CultivationRealm.ESCAPE: 
          return ['遁去的一，超脱天地！', '天地间的一切法则都为你让路！'];
        case CultivationRealm.SUPREME: 
          return ['至尊出世，万古无敌！', '无尽岁月的积累在这一刻爆发！'];
        case CultivationRealm.TRUE_IMMORTAL: 
          return ['真仙临世，长生不死！', '仙光普照，万物复苏！'];
        case CultivationRealm.KING: 
          return ['王者无敌，镇压一个时代！', '天地间响起了万道赞歌！'];
        default: 
          return null;
      }
    })();
    
    if (!pool) return null;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  /**
   * 计算当前大境界下某小境界所需的修为上限
   * Stage 1-9: 前几层轻松、后几层渐难（权重 0.6 + 0.1*stage）
   * Stage 10 (大圆满): 等于原 expRequired
   */
  static getStageMaxExp(realm: CultivationRealm, stage: number): number {
    const config = BREAKTHROUGH_TABLE[realm];
    if (!config) return 100;
    if (stage <= 9) {
      // 累积权重：s=1:0.7, s=2:0.8, ... s=9:1.5，总权重 = 9.9
      // 归一化到 expRequired，stage 9 时约为 70% 总值
      let cumulative = 0;
      for (let s = 1; s <= stage; s++) {
        cumulative += 0.6 + 0.1 * s; // s=1:0.7, s=2:0.8, ... s=9:1.5
      }
      const totalWeight = 9.9; // sum(0.7+0.8+...+1.5)
      return Math.floor(config.expRequired * cumulative / totalWeight * 0.7); // stage 9 ≈ 70% expRequired
    }
    return config.expRequired; // 大圆满用完整值
  }

  /**
   * 晋升小境界（同大境界内 stage 1→9）
   * 简单突破，只需修为足够
   */
  static advanceStage(player: IPlayer): { success: boolean; message: string; messages: string[] } {
    const messages: string[] = [];
    if (player.realmPerfection) {
      return { success: false, message: '已达大圆满之境，需冲击更高境界！', messages: [] };
    }
    if (player.realmStage >= 9) {
      return { success: false, message: '已达九层巅峰，需冲击大圆满！', messages: [] };
    }
    if (player.cultivationExp < player.maxCultivationExp) {
      const remaining = Math.ceil(player.maxCultivationExp - player.cultivationExp);
      return { success: false, message: `修为不足，还需 ${remaining} 修为方可突破。`, messages: [] };
    }

    // 晋升小境界 - 保留部分修为进度作为基础
    player.realmStage++;
    const newMaxExp = this.getStageMaxExp(player.realm, player.realmStage);
    player.cultivationExp = Math.floor(newMaxExp * 0.1);
    player.maxCultivationExp = newMaxExp;

    const oldName = getFullRealmName(player.realm, player.realmStage - 1, false);
    const newName = getFullRealmName(player.realm, player.realmStage, false);
    messages.push(`你冲破瓶颈，从 ${oldName} 晋升至 ${newName}！`);
    messages.push(`气血 +${Math.floor(5 + player.realm * 3)}，法力 +${Math.floor(3 + player.realm * 2)}`);

    // 小境界突破也有小幅属性提升
    player.maxHp += Math.floor(5 + player.realm * 3);
    player.hp = player.maxHp;
    player.maxMana += Math.floor(3 + player.realm * 2);
    player.mana = player.maxMana;

    return { success: true, message: `晋升至 ${newName}！`, messages };
  }

  /**
   * 冲击大圆满（十境）
   * 需要特殊材料
   */
  static advanceToPerfection(player: IPlayer): { success: boolean; message: string; messages: string[] } {
    const messages: string[] = [];
    if (player.realmPerfection) {
      return { success: false, message: '已达大圆满之境！', messages: [] };
    }
    if (player.realmStage < 9) {
      return { success: false, message: '未达九层巅峰，无法冲击大圆满。', messages: [] };
    }
    if (player.cultivationExp < player.maxCultivationExp) {
      const remaining = Math.ceil(player.maxCultivationExp - player.cultivationExp);
      return { success: false, message: `修为不足，还需 ${remaining} 修为。`, messages: [] };
    }

    // 检查特殊材料
    const material = getPerfectionMaterial(player.realm);
    const matIdx = player.inventory.findIndex(i => i.id === material.id);
    if (matIdx === -1) {
      return { success: false, message: `冲击大圆满需要【${material.name}】！${material.description}。请收集后再来。`, messages: [] };
    }

    // 消耗材料
    player.inventory.splice(matIdx, 1);
    player.realmPerfection = true;
    const newMaxExp = this.getStageMaxExp(player.realm, 10);
    player.cultivationExp = Math.floor(newMaxExp * 0.15);
    player.maxCultivationExp = newMaxExp;

    const realmName = getFullRealmName(player.realm, 9, true);
    messages.push(`你服下【${material.name}】，引动天地异象！`);
    messages.push(`**突破成功！你已达到 ${realmName}！**`);
    messages.push(`大量属性提升！方可冲击更高境界！`);

    // 大圆满额外属性奖励
    const bonusHp = Math.floor(20 + player.realm * 10);
    const bonusMana = Math.floor(10 + player.realm * 5);
    player.maxHp += bonusHp;
    player.hp = player.maxHp;
    player.maxMana += bonusMana;
    player.mana = player.maxMana;
    player.attack += Math.floor(3 + player.realm);
    player.defense += Math.floor(2 + player.realm);

    return { success: true, message: `已达 ${realmName}！`, messages };
  }

  /**
   * 修改 startBreakthrough 逻辑：
   * 只有在大圆满时才能冲击更高大境界
   */
  static startBreakthroughForMajorRealm(player: IPlayer): { ok: true; session: IBreakthroughSession; messages: string[] } | { ok: false; message: string } {
    if (!player.realmPerfection) {
      return { ok: false, message: '尚未达到大圆满之境，无法冲击更高境界。先突破至大圆满吧！' };
    }

    const currentRealm = player.realm;
    if (currentRealm >= CultivationRealm.KING) {
      return { ok: false, message: '已达王者之境，世间再无更高境界可破。' };
    }

    if (player.cultivationExp < player.maxCultivationExp) {
      const remaining = Math.ceil(player.maxCultivationExp - player.cultivationExp);
      return { ok: false, message: `修为不足，还需 ${remaining} 修为方可尝试突破。` };
    }

    const config = BREAKTHROUGH_TABLE[currentRealm];
    if (!config) {
      return { ok: false, message: '当前境界无法突破。' };
    }

    const targetRealm = (currentRealm + 1) as CultivationRealm;
    const targetName = RealmNames[targetRealm] || '未知';

    const messages: string[] = [];
    messages.push(`大圆满已至，你引动全身修为，冲击 **${targetName}**！`);
    messages.push('');

    // 检查是否有突破丹药
    let pillBonus = 0;
    const pillIdx = player.inventory.findIndex(i => i.id === 'breakthrough_pill');
    if (pillIdx !== -1) {
      messages.push('你取出珍藏的破境丹，吞服下去，药力在体内化开，经脉畅通了几分。');
      pillBonus = 15;
      player.inventory.splice(pillIdx, 1);
    }

    // 计算基础成功率（洞天加成）
    const caveBonus = Math.min(0.1, player.caveCount * 0.01);
    const baseRate = Math.min(0.95, config.successRate + caveBonus);

    // 选择心魔场景：按当前境界过滤
    const eligible = HEART_DEMON_POOL.filter(s =>
      (s.minRealm === undefined || currentRealm >= s.minRealm) &&
      (s.maxRealm === undefined || currentRealm <= s.maxRealm)
    );
    const pool = eligible.length > 0 ? eligible : HEART_DEMON_POOL;
    const heartDemon = pool[Math.floor(Math.random() * pool.length)];

    // 判断是否需要天劫
    let tribulation: IBreakthroughSession['tribulation'] | undefined;
    if (config.tribulationRounds > 0) {
      const dmgPerRound = Math.floor(player.maxHp * config.tribulationDmgPct / 100);
      tribulation = {
        totalDamage: dmgPerRound * config.tribulationRounds,
        damagePerRound: dmgPerRound,
        rounds: config.tribulationRounds,
        currentRound: 0,
        damageReduction: 0,
      };
    }

    const session: IBreakthroughSession = {
      step: 'heart_demon',
      targetRealm,
      targetName,
      baseRate,
      rateModifier: pillBonus,
      heartDemon,
      tribulation,
      materialsUsed: [],
      materialBonuses: {
        successRateBonus: 0,
        damageReduction: 0,
        expRetention: 0,
        insightBonus: 0,
      },
      daoHeartBonus: 0,
    };

    // 显示心魔开场
    messages.push('━━━ 心魔考验 ━━━');
    messages.push(`**${heartDemon.title}**`);
    messages.push(heartDemon.description);
    messages.push('');
    for (let i = 0; i < heartDemon.choices.length; i++) {
      messages.push(`◆ ${heartDemon.choices[i].text}`);
    }
    messages.push('');
    messages.push('请做出选择。');

    return { ok: true, session, messages };
  }

  private static getBreakthroughPhenomena(realm: CultivationRealm): string {
    const pool: string[] = (() => {
      switch (realm) {
        case CultivationRealm.MORTAL: return ['平凡无奇，但迈出了第一步。'];
        case CultivationRealm.BLOOD_MOVING: return ['气血如龙，在体内奔涌不息！', '血液沸腾如浆，骨骼发出雷鸣般的响声！'];
        case CultivationRealm.CAVE: return ['周身穴窍洞开，如星辰般璀璨！', '体内洞天初开，吞吐天地灵气！'];
        case CultivationRealm.SPIRIT: return ['元神蜕变，灵光冲霄！', '精神识海扩张，万象纷呈！'];
        case CultivationRealm.INSCRIBE: return ['道纹浮现，铭刻于骨！', '天地法则化为符文，烙印在血肉之中！'];
        case CultivationRealm.ARRAY: return ['阵纹交织，演化天地！', '体内阵法自成，一花一世界！'];
        case CultivationRealm.VENERABLE: return ['天地共鸣，万法朝宗！', '尊者威压席卷四方，众生颤栗！'];
        case CultivationRealm.DIVINE_FIRE: return ['神火燃起，焚烧九重天！'];
        case CultivationRealm.TRUE_ONE: return ['真我合一，道法自然！'];
        case CultivationRealm.SACRIFICE: return ['祭道之火燃遍苍穹！'];
        case CultivationRealm.GOD: return ['神威浩荡，诸天震动！'];
        case CultivationRealm.VOID: return ['虚道开辟，混沌初分！'];
        case CultivationRealm.SELF_CUT: return ['斩我明道，超脱轮回！'];
        case CultivationRealm.ESCAPE: return ['遁去的一，超脱天地！'];
        case CultivationRealm.SUPREME: return ['至尊出世，万古无敌！'];
        case CultivationRealm.TRUE_IMMORTAL: return ['真仙临世，长生不死！'];
        case CultivationRealm.KING: return ['王者无敌，镇压一个时代！'];
        default: return ['天地异象纷呈！'];
      }
    })();
    return pool[Math.floor(Math.random() * pool.length)];
  }
}

