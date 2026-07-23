// talent_stories.ts - 金色以上天赋/体质专属剧情数据
// 每个金色以上天赋都有一段专属机缘剧情，触发后有概率加强或失去

import { getTalent, ITalent } from './talent_data';

export interface ITalentStoryChoice {
  label: string;
  description: string;
}

export interface ITalentStoryOutcome {
  type: 'enhance' | 'lose' | 'blessing' | 'nothing';
  probability: number;
  title: string;
  narrative: string;
  enhanceMultiplier?: number;
}

export interface ITalentStory {
  talentId: string;
  title: string;
  narrative: string[];
  choices: ITalentStoryChoice[];
  outcomes: {
    enhance: ITalentStoryOutcome;
    lose: ITalentStoryOutcome;
    blessing: ITalentStoryOutcome;
    nothing: ITalentStoryOutcome;
  };
  cooldownHours: number;
}

export const TALENT_STORIES: ITalentStory[] = [
  {
    talentId: 'supreme_bone',
    title: '至尊骨之劫',
    narrative: [
      '你静坐调息，忽觉体内至尊骨微微发热，一股古老的意志从骨中苏醒。',
      '那是至尊骨的本源意志，它在审视你——审视你是否配得上这份传承。',
      '虚空之中，一尊虚影缓缓浮现，看不清面容，只觉威压如天。',
      '"此骨乃无上至宝，非大机缘者不可持。你，敢接下我的考验吗？"',
    ],
    choices: [
      { label: '接受考验', description: '直面至尊骨的本源意志，胜则升华，败则骨碎。' },
      { label: '温养不扰', description: '以自身精血温养至尊骨，不求激进，但求无过。' },
    ],
    outcomes: {
      enhance: {
        type: 'enhance',
        probability: 0.45,
        title: '至尊认可',
        narrative: '虚影微微颔首，一道金色符文没入你体内。至尊骨轰鸣震颤，纹路愈发深邃，威力大增。',
        enhanceMultiplier: 1.5,
      },
      lose: {
        type: 'lose',
        probability: 0.25,
        title: '骨碎道消',
        narrative: '你终究没能扛住至尊意志的威压，只听咔嚓一声，至尊骨裂开数道缝隙，光辉渐渐黯淡……',
      },
      blessing: {
        type: 'blessing',
        probability: 0.15,
        title: '至尊赐法',
        narrative: '虚影见你心性坚毅，哈哈大笑，指尖一点灵光没入你眉心："传你一道至尊术，好自为之。"',
        enhanceMultiplier: 1.3,
      },
      nothing: {
        type: 'nothing',
        probability: 0.15,
        title: '无功无过',
        narrative: '虚影沉默片刻，最终消散于无形。至尊骨恢复如常，仿佛什么都没发生过。',
      },
    },
    cooldownHours: 24,
  },
  {
    talentId: 'double_pupils',
    title: '重瞳开天',
    narrative: [
      '你闭目凝神，双瞳之中忽然金光大作，眼前世界竟出现层层叠叠的虚妄幻象。',
      '重瞳之力自主运转，你看见自己的过去、现在，还有……无数条未来的岔路。',
      '其中一条路光芒万丈，却险象环生；另一条平稳无奇，却终究平庸。',
      '重瞳在替你择路——而你，敢选那条荆棘遍布的大道吗？',
    ],
    choices: [
      { label: '逆天改命', description: '选择那条光芒万丈的路，与天争命。' },
      { label: '顺势而为', description: '平稳之道，虽无奇却也安稳。' },
    ],
    outcomes: {
      enhance: {
        type: 'enhance',
        probability: 0.4,
        title: '重瞳全开',
        narrative: '你咬破舌尖，以精血浇灌重瞳。双瞳旋转如太极，天地万物在你眼中无所遁形，弱点纤毫毕现。',
        enhanceMultiplier: 1.5,
      },
      lose: {
        type: 'lose',
        probability: 0.3,
        title: '瞳力反噬',
        narrative: '强行窥探天机遭到反噬，双瞳剧痛如刀割，金光寸寸消散，重瞳渐渐合拢归于平凡……',
      },
      blessing: {
        type: 'blessing',
        probability: 0.15,
        title: '破妄之瞳',
        narrative: '冥冥之中似有大能叹息一声，随即一缕清气注入你双瞳："小小年纪，便有此心志，助你一把。"',
        enhanceMultiplier: 1.4,
      },
      nothing: {
        type: 'nothing',
        probability: 0.15,
        title: '幻象消散',
        narrative: '当你睁开眼时，一切归于平静。重瞳之力似乎增长了一丝，却也不甚明显。',
      },
    },
    cooldownHours: 24,
  },
  {
    talentId: 'reincarnation_body',
    title: '轮回门前',
    narrative: [
      '你修炼之际，神魂不由自主地飘离肉身，来到一座宏伟的古门前。',
      '门上刻着两个苍劲古字——轮回。门半开着，里面传出阵阵梵唱与哀嚎交织之声。',
      '一尊黑衣老者立于门前，浑浊的双眼看向你："轮回之体，你终于来了。是要入轮回看前世，还是转身回去？"',
    ],
    choices: [
      { label: '踏入轮回', description: '进入轮回之门，一窥前世奥秘。' },
      { label: '转身离去', description: '今生已是今生，何必执着前世。' },
    ],
    outcomes: {
      enhance: {
        type: 'enhance',
        probability: 0.4,
        title: '前世觉醒',
        narrative: '你踏入轮回之门，无数前世记忆如潮水涌来。前世的修行感悟融入今生，轮回之体大放光明。',
        enhanceMultiplier: 1.5,
      },
      lose: {
        type: 'lose',
        probability: 0.25,
        title: '迷失轮回',
        narrative: '你在轮回中迷失了方向，无数前世记忆错乱交织。等你回过神来，轮回之体的力量已大半消散……',
      },
      blessing: {
        type: 'blessing',
        probability: 0.2,
        title: '守轮回者',
        narrative: '黑衣老者深深看了你一眼，递过来一盏古灯："持此灯，轮回路上不迷路。"轮回之力大增。',
        enhanceMultiplier: 1.4,
      },
      nothing: {
        type: 'nothing',
        probability: 0.15,
        title: '黄粱一梦',
        narrative: '老者挥了挥手，你如遭重击般清醒过来。方才种种，恍如一梦，什么也没改变。',
      },
    },
    cooldownHours: 36,
  },
  {
    talentId: 'innate_dao_fetus',
    title: '道胎共鸣',
    narrative: [
      '你盘坐于地，体内先天道胎忽然剧烈跳动，如同心脏一般有节律地搏动。',
      '四周灵气疯狂涌来，在你头顶形成一个巨大的灵气漩涡。天地之间，似有大道之音回响。',
      '道胎在呼唤——它想与天地大道更深层次地共鸣。但这一步踏出，可能是升华，也可能是反噬。',
    ],
    choices: [
      { label: '引动共鸣', description: '放开全部心神，与天地大道深度共鸣。' },
      { label: '缓缓图之', description: '稳扎稳打，不急于一时。' },
    ],
    outcomes: {
      enhance: {
        type: 'enhance',
        probability: 0.5,
        title: '道胎天成',
        narrative: '你彻底放开身心，任由大道之力冲刷洗礼。先天道胎绽放无量光，与天地的契合度更上一层楼。',
        enhanceMultiplier: 1.4,
      },
      lose: {
        type: 'lose',
        probability: 0.2,
        title: '道胎受损',
        narrative: '大道之力太过磅礴，道胎承受不住，出现了细密的裂纹。修炼速度大不如前……',
      },
      blessing: {
        type: 'blessing',
        probability: 0.15,
        title: '道音灌顶',
        narrative: '一道恢弘道音从虚空中传来，似有大能讲法。你听得如痴如醉，道胎随之茁壮成长。',
        enhanceMultiplier: 1.6,
      },
      nothing: {
        type: 'nothing',
        probability: 0.15,
        title: '共鸣平息',
        narrative: '共鸣渐渐平息，道胎恢复了常态。虽然没有突破，但似乎根基更稳固了一些。',
      },
    },
    cooldownHours: 24,
  },
  {
    talentId: 'indestructible_golden_body',
    title: '金身劫火',
    narrative: [
      '天降异象，一团金色神火凭空出现在你面前，熊熊燃烧。',
      '一个古老的声音从火中传出："不灭金身，需经万火锤炼。敢入我金身劫火一遭否？"',
      '火中隐约可见无数刀山剑林，那是锤炼肉身的无上法门，也是九死一生的险地。',
    ],
    choices: [
      { label: '投身劫火', description: '进入金身劫火，以烈火锻真身。' },
      { label: '暂避锋芒', description: '时机未到，他日再来。' },
    ],
    outcomes: {
      enhance: {
        type: 'enhance',
        probability: 0.4,
        title: '金身大成',
        narrative: '你在劫火中咬牙坚持，肉身被反复灼烧、重塑。当劫火熄灭时，你肌肤泛着金色光泽，坚不可摧。',
        enhanceMultiplier: 1.5,
      },
      lose: {
        type: 'lose',
        probability: 0.25,
        title: '金身死劫',
        narrative: '劫火之猛烈远超想象，你的金身被烧得裂痕密布，金色光泽黯淡下去……',
      },
      blessing: {
        type: 'blessing',
        probability: 0.15,
        title: '火中仙莲',
        narrative: '劫火深处竟然生长出一朵金色莲花，花瓣片片飞入你体内。金身之力暴涨。',
        enhanceMultiplier: 1.4,
      },
      nothing: {
        type: 'nothing',
        probability: 0.2,
        title: '劫火退散',
        narrative: '劫火渐渐熄灭，你毫发无损，但也没有收获。或许，这只是一次试探。',
      },
    },
    cooldownHours: 24,
  },
  {
    talentId: 'ten_ferocious_blood',
    title: '十凶血脉觉醒',
    narrative: [
      '你体内的十凶血脉突然沸腾起来，兽吼之声在你经脉中回荡。',
      '眼前出现了太古十凶的虚影——真龙、鲲鹏、神蚕、麒麟……它们或睥睨，或冷漠，或狂暴。',
      '十凶血脉在争夺你的身体主导权。你是要压制它们，还是放任血脉觉醒？',
    ],
    choices: [
      { label: '放任觉醒', description: '任由十凶血脉觉醒，看谁能胜出。' },
      { label: '以意御之', description: '以自身意志统御十凶血脉。' },
    ],
    outcomes: {
      enhance: {
        type: 'enhance',
        probability: 0.4,
        title: '血脉沸腾',
        narrative: '你放手让血脉自由觉醒，最终一道最为炽盛的血脉胜出，与你完美融合。力量大增！',
        enhanceMultiplier: 1.5,
      },
      lose: {
        type: 'lose',
        probability: 0.3,
        title: '血脉反噬',
        narrative: '十凶血脉互相争斗，你的身体成了战场。等一切平息，血脉之力大打折扣……',
      },
      blessing: {
        type: 'blessing',
        probability: 0.1,
        title: '十凶归一',
        narrative: '奇迹发生了——十凶血脉竟然相融归一，形成一种前所未有的全新血脉！',
        enhanceMultiplier: 2.0,
      },
      nothing: {
        type: 'nothing',
        probability: 0.2,
        title: '血脉蛰伏',
        narrative: '闹腾了一阵后，十凶血脉渐渐蛰伏下去，恢复了平静。',
      },
    },
    cooldownHours: 36,
  },
  {
    talentId: 'evergreen_body',
    title: '长青秘境',
    narrative: [
      '你做了一个梦——梦里是一片万古长青的神树林，每一株都高达万丈，枝叶垂落如绿色瀑布。',
      '树林深处有一座石台，石台上放着一枚青色果实，散发着勃勃生机。',
      '一道苍老的声音响起："此乃长青神果，食之可长生。但……你确定要摘取吗？"',
    ],
    choices: [
      { label: '摘取神果', description: '走上石台，摘取长青神果。' },
      { label: '只求参悟', description: '不贪神果，只求参悟长青之道。' },
    ],
    outcomes: {
      enhance: {
        type: 'enhance',
        probability: 0.35,
        title: '长青道果',
        narrative: '你并未摘取神果，而是盘坐在树下悟道。不知过了多久，你睁开眼，眼中满是生机盎然。',
        enhanceMultiplier: 1.5,
      },
      lose: {
        type: 'lose',
        probability: 0.3,
        title: '神果有毒',
        narrative: '你摘下神果一口吞下，不料神果入口化作一道青气，在你体内横冲直撞。长青体质受损！',
      },
      blessing: {
        type: 'blessing',
        probability: 0.2,
        title: '树灵赐福',
        narrative: '神树之灵现身，见你心性淡泊，哈哈大笑，亲手摘下一枚神果递与你："有缘人，收下吧。"',
        enhanceMultiplier: 1.8,
      },
      nothing: {
        type: 'nothing',
        probability: 0.15,
        title: '梦醒时分',
        narrative: '你从梦中醒来，神树、神果都消失了。只有鼻尖似乎还残留着一缕青草的芬芳。',
      },
    },
    cooldownHours: 48,
  },
  {
    talentId: 'chaos_body',
    title: '混沌开天',
    narrative: [
      '你体内的混沌体忽然不受控制，周围的天地灵气开始紊乱，形成一个微型的混沌漩涡。',
      '漩涡之中，似有阴阳二气交缠，五行之力流转，仿佛要重演开天辟地的景象。',
      '这是混沌体的一次机缘——若能引导得当，可开天创世；若失败，则可能归于虚无。',
    ],
    choices: [
      { label: '开天辟地', description: '引导混沌之力，尝试开天辟地。' },
      { label: '混沌归藏', description: '将混沌之力收回体内，归于平静。' },
    ],
    outcomes: {
      enhance: {
        type: 'enhance',
        probability: 0.35,
        title: '混沌初开',
        narrative: '你引导着混沌之力缓缓旋转，清者上升为天，浊者下沉为地。混沌体开辟出一片小天地，威能大增！',
        enhanceMultiplier: 1.6,
      },
      lose: {
        type: 'lose',
        probability: 0.35,
        title: '重归混沌',
        narrative: '混沌之力失控，你的身体几乎被重新搅成混沌。虽勉强保住性命，但混沌体质大损……',
      },
      blessing: {
        type: 'blessing',
        probability: 0.1,
        title: '大道之基',
        narrative: '混沌中竟然孕育出一枚大道种子，落入你丹田。混沌体从此有了根基，前途不可限量！',
        enhanceMultiplier: 2.0,
      },
      nothing: {
        type: 'nothing',
        probability: 0.2,
        title: '风平浪静',
        narrative: '混沌漩涡渐渐平息，一切恢复如初。你隐约觉得，刚才只差一点……',
      },
    },
    cooldownHours: 48,
  },
  {
    talentId: 'heavenly_gift',
    title: '天纵之劫',
    narrative: [
      '天象骤变，乌云压顶，一道惊雷在你头顶炸开。',
      '九天之上，似有威严目光俯视而下："天纵之资？哼，天道最忌一步登天。你，配得上吗？"',
      '那是天妒之劫——自古天纵奇才多夭折，便是因为这天劫的存在。',
    ],
    choices: [
      { label: '硬抗天劫', description: '以肉身硬抗天妒之劫，证明自己配得上这份天资。' },
      { label: '藏锋守拙', description: '收敛气息，躲过这一劫。' },
    ],
    outcomes: {
      enhance: {
        type: 'enhance',
        probability: 0.4,
        title: '天赐加身',
        narrative: '你咬牙硬抗，天劫一道接一道落下。当最后一道雷劫消散，你周身灵光璀璨，资质更上一层！',
        enhanceMultiplier: 1.4,
      },
      lose: {
        type: 'lose',
        probability: 0.25,
        title: '天妒英才',
        narrative: '天劫太过猛烈，你被劈得焦头烂额。虽保住性命，但天资受损，不复当年之锐……',
      },
      blessing: {
        type: 'blessing',
        probability: 0.15,
        title: '天人感应',
        narrative: '天劫过后，一道紫气从九天垂落，没入你体内。天道认可了你的资质，赐下天人感应！',
        enhanceMultiplier: 1.6,
      },
      nothing: {
        type: 'nothing',
        probability: 0.2,
        title: '劫云散去',
        narrative: '你收敛气息，劫云在头顶盘旋一阵后渐渐散去。什么也没发生，却也什么都没失去。',
      },
    },
    cooldownHours: 48,
  },
  {
    talentId: 'talent_shengti_daoji',
    title: '圣体道胎·万古无一',
    narrative: [
      '你盘坐修炼，忽然体内轰鸣不止，先天圣体道胎自主复苏。',
      '你看到了一片浩瀚的星海，星海中盘坐着一尊伟岸身影，看不清面容，只觉其与天地合道、与日月同辉。',
      '"孩子，你继承了这万古无一的体质……但你可知，每一代圣体道胎，都要经历一场大劫？"',
      '那身影伸出一只手，掌心托着一团光："这是我的一缕道火，你敢接吗？"',
    ],
    choices: [
      { label: '承接道火', description: '伸手承接那缕道火，接受先贤的传承考验。' },
      { label: '叩首谢过', description: '恭敬叩首，不敢妄受传承。' },
    ],
    outcomes: {
      enhance: {
        type: 'enhance',
        probability: 0.3,
        title: '道火淬体',
        narrative: '你伸手接过道火，那团火焰瞬间融入你体内。圣体道胎在道火淬炼下，越发璀璨夺目！',
        enhanceMultiplier: 1.5,
      },
      lose: {
        type: 'lose',
        probability: 0.2,
        title: '道火焚身',
        narrative: '道火太过猛烈，你的圣体道胎承受不住，几乎被焚毁殆尽。体质大衰……',
      },
      blessing: {
        type: 'blessing',
        probability: 0.2,
        title: '先贤认可',
        narrative: '那身影见你心性坚定，微微点头，伸手在你眉心一点："好，好，好！我这一脉，后继有人了。"一股浩瀚之力注入你体内！',
        enhanceMultiplier: 2.0,
      },
      nothing: {
        type: 'nothing',
        probability: 0.3,
        title: '道音渺渺',
        narrative: '那身影渐渐消散，星海也随之淡去。你醒来时，只觉得精神格外清明。',
      },
    },
    cooldownHours: 72,
  },
  {
    talentId: 'talent_ba_ti',
    title: '苍天霸体·霸道无双',
    narrative: [
      '你行走于旷野，忽然迎面走来一个身材魁梧的中年汉子，双目如电。',
      '"小子，你也有霸体之资？"汉子咧嘴一笑，露出一口白牙，"霸体之道，在于一个霸字——不服天，不服地，只服自己的拳头！"',
      '"来，接我三拳。接得住，我传你霸体真意；接不住……就别怪我不客气了！"',
    ],
    choices: [
      { label: '迎战接拳', description: '摆开架势，硬接三拳。' },
      { label: '避其锋芒', description: '此人实力深不可测，暂避为上。' },
    ],
    outcomes: {
      enhance: {
        type: 'enhance',
        probability: 0.35,
        title: '霸体真意',
        narrative: '你咬牙接下三拳，每一拳都让你气血翻涌。第三拳过后，汉子哈哈大笑："好小子！这霸体真意，归你了！"',
        enhanceMultiplier: 1.5,
      },
      lose: {
        type: 'lose',
        probability: 0.25,
        title: '霸体碎裂',
        narrative: '第二拳你就扛不住了，被打得倒飞出去，霸体根基受损……',
      },
      blessing: {
        type: 'blessing',
        probability: 0.15,
        title: '霸血沸腾',
        narrative: '三拳过后，你非但没倒下，反而战意沸腾，霸体在压力下自主进化！汉子眼中闪过一丝惊异。',
        enhanceMultiplier: 1.8,
      },
      nothing: {
        type: 'nothing',
        probability: 0.25,
        title: '不打不相识',
        narrative: '你选择避战，汉子也不恼，哈哈一笑便消失在原地。只留下一句："下次见面，再讨教。"',
      },
    },
    cooldownHours: 48,
  },
  {
    talentId: 'talent_huang_ti',
    title: '荒天体·战之极境',
    narrative: [
      '你陷入一场苦战，对手修为远在你之上。',
      '遍体鳞伤之际，体内的荒天体似乎被唤醒——它从一次次战斗中走来，它的名字叫不屈。',
      '一个沙哑的声音在你脑海响起："荒天体，是打出来的！站起来，继续战！"',
    ],
    choices: [
      { label: '燃烧气血', description: '燃烧全部气血，催动荒天体全力一战。' },
      { label: '保存实力', description: '留得青山在，不怕没柴烧。' },
    ],
    outcomes: {
      enhance: {
        type: 'enhance',
        probability: 0.4,
        title: '越战越强',
        narrative: '你燃烧气血，越战越勇。对手震惊地发现，你在战斗中不断变强。荒天体再上一层！',
        enhanceMultiplier: 1.5,
      },
      lose: {
        type: 'lose',
        probability: 0.25,
        title: '油尽灯枯',
        narrative: '气血燃烧过度，你终究撑不住了。荒天体的力量也随之衰退……',
      },
      blessing: {
        type: 'blessing',
        probability: 0.15,
        title: '荒古战魂',
        narrative: '你不屈的意志竟然引来了荒古战魂的共鸣！一道战魂没入你体内，荒天体彻底觉醒！',
        enhanceMultiplier: 1.8,
      },
      nothing: {
        type: 'nothing',
        probability: 0.2,
        title: '死里逃生',
        narrative: '你找准机会脱身而去。虽然没有突破，但好歹保住了性命。',
      },
    },
    cooldownHours: 36,
  },
  {
    talentId: 'talent_long_xue',
    title: '真龙试炼',
    narrative: [
      '你体内的真龙血脉躁动不安，将你的意识带入一片浩瀚的龙宫之中。',
      '龙椅上盘坐着一条五爪金龙，鳞片如刀，龙角如剑。它缓缓睁开龙眼，金色瞳孔直视着你。',
      '"渺小的人类，身上竟有我龙族血脉。"金龙的声音如雷鸣，"想要真龙之力？通过我的试炼再说。"',
    ],
    choices: [
      { label: '接受试炼', description: '接受真龙的试炼，挑战不可能。' },
      { label: '恭敬退下', description: '真龙不可力敌，恭敬退去为上。' },
    ],
    outcomes: {
      enhance: {
        type: 'enhance',
        probability: 0.35,
        title: '龙血沸腾',
        narrative: '你在试炼中展现出惊人的意志，金龙微微颔首，一道真龙之血没入你体内。血脉浓度暴增！',
        enhanceMultiplier: 1.5,
      },
      lose: {
        type: 'lose',
        probability: 0.25,
        title: '龙威镇压',
        narrative: '真龙之威太过恐怖，你的血脉直接被压得沉寂下去。真龙血脉大损……',
      },
      blessing: {
        type: 'blessing',
        probability: 0.15,
        title: '龙女赠丹',
        narrative: '龙宫深处走出一位龙女，偷偷塞给你一枚龙元丹："你很有趣，这个给你。"',
        enhanceMultiplier: 1.8,
      },
      nothing: {
        type: 'nothing',
        probability: 0.25,
        title: '试炼未启',
        narrative: '你恭敬退下，金龙也不为难你，只是嗤笑一声。龙宫景象渐渐消散。',
      },
    },
    cooldownHours: 72,
  },
  {
    talentId: 'talent_kunpeng_xue',
    title: '鲲鹏化形',
    narrative: [
      '你在海边修炼，忽闻海天一色之处传来一声嘹亮的鸟鸣。',
      '一只遮天蔽日的大鹏从海面升起，翅膀展开不知几万里。它低头看向你，眼中透着古老的沧桑。',
      '"鲲鹏血脉？有趣。"大鹏口吐人言，"你是想化鹏扶摇九万里，还是化鲲潜游归墟之底？"',
    ],
    choices: [
      { label: '化鹏登天', description: '化作大鹏，扶摇直上九万里。' },
      { label: '化鲲潜渊', description: '化作巨鲲，潜入深海归墟。' },
    ],
    outcomes: {
      enhance: {
        type: 'enhance',
        probability: 0.35,
        title: '鲲鹏展翅',
        narrative: '你化作大鹏，直冲云霄。在云层之上，你感受到了真正的极速。鲲鹏血脉觉醒更深一层！',
        enhanceMultiplier: 1.5,
      },
      lose: {
        type: 'lose',
        probability: 0.25,
        title: '化形失败',
        narrative: '化形失败，你从高空坠落，摔得不轻。鲲鹏血脉因此受损……',
      },
      blessing: {
        type: 'blessing',
        probability: 0.15,
        title: '鲲鹏授法',
        narrative: '大鹏见你天赋异禀，亲自传授了一式鲲鹏宝术。你血脉与宝术共鸣，力量暴涨！',
        enhanceMultiplier: 1.8,
      },
      nothing: {
        type: 'nothing',
        probability: 0.25,
        title: '南柯一梦',
        narrative: '你从幻境中醒来，海风拂面。方才是真是幻，已分不清。',
      },
    },
    cooldownHours: 72,
  },
  {
    talentId: 'talent_shenyuan',
    title: '神源之眼·窥天',
    narrative: [
      '你用神源之眼遥望星空，目光穿透了层层天幕。',
      '你看到了远古的战场，看到了诸神的陨落，看到了纪元的更迭。',
      '突然，一双巨大的眼睛在星空中睁开，与你对视。那眼睛的主人，似乎是一位上古的神。',
      '"凡人，你在看什么？"声音宏大如天鼓。',
    ],
    choices: [
      { label: '坦然对视', description: '不卑不亢，坦然与神明对视。' },
      { label: '闭目收神', description: '立即收回目光，不敢窥探神明。' },
    ],
    outcomes: {
      enhance: {
        type: 'enhance',
        probability: 0.35,
        title: '神源开悟',
        narrative: '神明见你心性坦然，微微颔首，一道神光射入你眼中。神源之眼威力大增！',
        enhanceMultiplier: 1.5,
      },
      lose: {
        type: 'lose',
        probability: 0.3,
        title: '神罚之眼',
        narrative: '神明大怒，以神念重创你的神源之眼。眼睛剧痛，神力大损……',
      },
      blessing: {
        type: 'blessing',
        probability: 0.15,
        title: '上古传承',
        narrative: '那神明竟然是上古神源之主，见你有此眼缘，便将神源真意传于你。',
        enhanceMultiplier: 1.8,
      },
      nothing: {
        type: 'nothing',
        probability: 0.2,
        title: '幻视而已',
        narrative: '你收回目光，星空恢复平静。刚才那一幕，或许只是你的幻觉。',
      },
    },
    cooldownHours: 48,
  },
  {
    talentId: 'talent_huang_gu',
    title: '荒古战体·战魂觉醒',
    narrative: [
      '你误入一座上古战场遗址，白骨遍地，杀伐之气冲天。',
      '战魂从白骨中爬出，嘶吼着冲向你。它们都是荒古时代的战体修士，死后执念不散。',
      '战魂之首是一尊身披残破战甲的将军，他冷冷地看着你："后辈，你也有战体？那就证明给我们看！"',
    ],
    choices: [
      { label: '以战养战', description: '与战魂搏杀，在战斗中淬炼战体。' },
      { label: '恭敬参拜', description: '向前辈战魂行礼，求其指点。' },
    ],
    outcomes: {
      enhance: {
        type: 'enhance',
        probability: 0.4,
        title: '战魂加身',
        narrative: '你杀了无数战魂，越战越勇。将军战魂最终颔首："好样的！我等战魂，助你一臂之力！"',
        enhanceMultiplier: 1.5,
      },
      lose: {
        type: 'lose',
        probability: 0.25,
        title: '战体受创',
        narrative: '战魂太过凶猛，你被打得节节败退。荒古战体的根基受到了损伤……',
      },
      blessing: {
        type: 'blessing',
        probability: 0.15,
        title: '荒古秘典',
        narrative: '将军战魂见你进退有据，心性上佳，便将一部荒古战体秘典传于你。战体突飞猛进！',
        enhanceMultiplier: 1.8,
      },
      nothing: {
        type: 'nothing',
        probability: 0.2,
        title: '幻境消散',
        narrative: '你恭敬行礼，将军战魂沉默片刻，挥了挥手。战场消散，你站在一片空地之上。',
      },
    },
    cooldownHours: 48,
  },
  {
    talentId: 'life_wheel',
    title: '生命之轮·生死一线',
    narrative: [
      '你修炼时出了岔子，肉身瞬间崩溃，神魂飘出体外。',
      '你的面前悬浮着那枚生命之轮，一半生，一半灭。它缓缓旋转，决定着你的生死。',
      '一个童颜鹤发的老者坐在轮旁，拨弄着轮盘："小友，你的命数未定。要不要……赌一把？"',
    ],
    choices: [
      { label: '赌一把', description: '以生命为注，赌生命之轮停在生的一面。' },
      { label: '谢过不赌', description: '生死由命，何必强求。' },
    ],
    outcomes: {
      enhance: {
        type: 'enhance',
        probability: 0.35,
        title: '生死由我',
        narrative: '你伸手拨动生命之轮。轮盘疯狂旋转，最终停在生的一面，且是生面中最璀璨的那道刻痕！生命力暴增！',
        enhanceMultiplier: 1.6,
      },
      lose: {
        type: 'lose',
        probability: 0.25,
        title: '轮盘倒转',
        narrative: '轮盘停在了灭的一面。你感觉生命力飞速流失，生命之轮黯淡了许多……',
      },
      blessing: {
        type: 'blessing',
        probability: 0.15,
        title: '生死之主',
        narrative: '老者抚掌大笑："好胆色！老夫便送你一场造化！"生命之轮光芒大放，竟诞生了灵智！',
        enhanceMultiplier: 2.0,
      },
      nothing: {
        type: 'nothing',
        probability: 0.25,
        title: '黄粱一梦',
        narrative: '你悠然醒来，肉身完好如初。方才的生死一线，似乎只是一场梦魇。',
      },
    },
    cooldownHours: 72,
  },
  {
    talentId: 'phoenix_body',
    title: '凤凰宝体·涅槃劫',
    narrative: [
      '你体内的凤凰宝体忽然燃起熊熊烈火，整个人化作一团火焰。',
      '剧痛传来，你感觉自己在被一点点焚毁。这是凤凰涅槃之劫——要么浴火重生，要么化为灰烬。',
      '火海深处，有一只凤凰虚影在盘旋，它在观察你，判断你是否配得上凤凰宝体。',
    ],
    choices: [
      { label: '涅槃重生', description: '承受焚身之痛，寻求涅槃重生。' },
      { label: '压制火焰', description: '以法力强行压制火焰，躲过这一劫。' },
    ],
    outcomes: {
      enhance: {
        type: 'enhance',
        probability: 0.4,
        title: '涅槃新生',
        narrative: '你在烈火中被烧得只剩骨架，然后……从灰烬中重生了！新生的凤凰宝体，比以前更加强大！',
        enhanceMultiplier: 1.5,
      },
      lose: {
        type: 'lose',
        probability: 0.25,
        title: '火焚宝体',
        narrative: '涅槃失败，你被烧得奄奄一息。凤凰宝体的力量十不存一……',
      },
      blessing: {
        type: 'blessing',
        probability: 0.15,
        title: '真凰降临',
        narrative: '一只真正的凤凰从虚空中飞来，它低头看了你一眼，一滴凰血滴落，融入你体内。宝体升华！',
        enhanceMultiplier: 1.8,
      },
      nothing: {
        type: 'nothing',
        probability: 0.2,
        title: '火焰渐熄',
        narrative: '你勉强压制了火焰，但也因此错过了涅槃的机缘。凤凰宝体没有变化。',
      },
    },
    cooldownHours: 48,
  },
  {
    talentId: 'primeval_spirit',
    title: '远古神魂·前世今生',
    narrative: [
      '你闭目入定，神魂不由自主地飘向远古。',
      '你看到了一个伟岸的身影——那是远古时代的大能，正在与天道抗衡。那身影，与你有几分相似。',
      '大能似乎察觉到了你的目光，转过头来，微微一笑："后世之身……你终于来了。"',
      '"愿意继承我的意志吗？还是……你要走自己的路？"',
    ],
    choices: [
      { label: '继承意志', description: '继承远古大能的意志，承接其道统。' },
      { label: '我道自行', description: '前辈之路可敬，但我有我自己的道。' },
    ],
    outcomes: {
      enhance: {
        type: 'enhance',
        probability: 0.35,
        title: '神魂共鸣',
        narrative: '大能的意志与你的神魂完美融合。远古神魂觉醒更深，神识暴涨！',
        enhanceMultiplier: 1.5,
      },
      lose: {
        type: 'lose',
        probability: 0.25,
        title: '意志冲突',
        narrative: '你想要走自己的路，却与远古意志产生剧烈冲突。神魂受损……',
      },
      blessing: {
        type: 'blessing',
        probability: 0.2,
        title: '独立道心',
        narrative: '大能闻言哈哈大笑："好！好一个我道自行！你的心性，比继承我的道统更可贵！"说罢，一道清气注入你神魂。',
        enhanceMultiplier: 1.8,
      },
      nothing: {
        type: 'nothing',
        probability: 0.2,
        title: '大梦一场',
        narrative: '大能的身影渐渐淡去，你从定中醒来。恍惚间，似乎什么都没有改变。',
      },
    },
    cooldownHours: 72,
  },
  {
    talentId: 'nine_secret',
    title: '九秘传承·合一',
    narrative: [
      '你体内的九秘之力忽然躁动起来，九种秘术在你体内互相冲撞。',
      '九种秘术，对应九种大道。它们各自为政，谁也不服谁。',
      '一个古老的声音在你脑海回响："九秘归一，万法皆通。但这条路……不好走。你，敢试吗？"',
    ],
    choices: [
      { label: '尝试归一', description: '尝试将九种秘术融为一体。' },
      { label: '各自为战', description: '九秘各自为战也足够强大，不必强求。' },
    ],
    outcomes: {
      enhance: {
        type: 'enhance',
        probability: 0.3,
        title: '九秘初融',
        narrative: '你费尽心力，终于让九秘有了一丝融合的迹象。虽然远未归一，但威力已大增！',
        enhanceMultiplier: 1.5,
      },
      lose: {
        type: 'lose',
        probability: 0.3,
        title: '九秘反噬',
        narrative: '九秘冲突太过剧烈，你的神魂遭到重创。九秘之力大打折扣……',
      },
      blessing: {
        type: 'blessing',
        probability: 0.1,
        title: '九秘归真',
        narrative: '奇迹发生了！九秘竟然真的融合为一，形成了一种全新的、前所未有的大神通！',
        enhanceMultiplier: 2.0,
      },
      nothing: {
        type: 'nothing',
        probability: 0.3,
        title: '九秘平息',
        narrative: '九秘闹腾了一阵后，渐渐平息下去。虽然没有融合，但似乎也更默契了一些。',
      },
    },
    cooldownHours: 96,
  },
];

export function getTalentStory(talentId: string): ITalentStory | undefined {
  return TALENT_STORIES.find(s => s.talentId === talentId);
}

export function rollStoryOutcome(story: ITalentStory): ITalentStoryOutcome {
  const roll = Math.random();
  let cumulative = 0;

  const outcomes = [
    story.outcomes.enhance,
    story.outcomes.blessing,
    story.outcomes.lose,
    story.outcomes.nothing,
  ];

  for (const outcome of outcomes) {
    cumulative += outcome.probability;
    if (roll <= cumulative) {
      return outcome;
    }
  }

  return story.outcomes.nothing;
}
