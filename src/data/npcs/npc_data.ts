import { INPC, INPCDialogue } from '../../domain/entities/NPC';
import { IPlayer } from '../../domain/entities/Player';
import { NPCRelationshiptatus } from '../../domain/entities/NPCRelationship';
import { generateDynamicNPCs } from '../../domain/entities/DynamicNPC';
import { WorldId } from '../../domain/entities/WorldDefinition';
import { NPCLifeLogicGenerator } from '../../domain/services/NPCLifeLogicGenerator';
import { getCharacterLifeLogic, hasCharacterLifeLogic } from '../../domain/services/NPCCharacterLifeLogic';
import { DAOLU_NPCS } from './npc_data_daolu';

const npcRegistry = new Map<string, INPC>();
const dynamicNPCsCache = new Map<string, INPC[]>();
const loadedWorlds = new Set<WorldId>();

const worldNpcImporters: Record<WorldId, (() => Promise<{ NPCS: INPC[] }>) | null> = {
  [WorldId.PERFECT_WORLD]: null,
  [WorldId.ZHE_TIAN]: () => import('./npc_data_zhetian').then(m => ({ NPCS: m.ZHETIAN_NPCS })),
  [WorldId.SHENG_XU]: () => import('./npc_data_shengxu').then(m => ({ NPCS: m.SHENGXU_NPCS })),
  [WorldId.DOU_PO]: () => import('./npc_data_doupo').then(m => ({ NPCS: m.DOUPO_NPCS })),
  [WorldId.SHEN_MU]: () => import('./npc_data_shenmu').then(m => ({ NPCS: m.SHENMU_NPCS })),
  [WorldId.FAN_REN]: () => import('./npc_data_fanren').then(m => ({ NPCS: m.FANREN_NPCS })),
  [WorldId.XIAN_NI]: () => import('./npc_data_xianni').then(m => ({ NPCS: m.XIANNI_NPCS })),
};

export async function loadWorldNPCs(worldId: WorldId): Promise<void> {
  if (loadedWorlds.has(worldId)) return;
  const importer = worldNpcImporters[worldId];
  if (!importer) {
    loadedWorlds.add(worldId);
    return;
  }
  const { NPCS } = await importer();
  for (const npc of NPCS) {
    if (!npc.lifeLogic) {
      if (hasCharacterLifeLogic(npc.id)) {
        npc.lifeLogic = getCharacterLifeLogic(npc.id)!;
      } else {
        const npcType = NPCLifeLogicGenerator.detectNPCType(npc.title);
        npc.lifeLogic = NPCLifeLogicGenerator.generateForType(npcType, npc.roomId);
      }
    }
    npcRegistry.set(npc.id, npc);
  }
  loadedWorlds.add(worldId);
}

export function isWorldNPCsLoaded(worldId: WorldId): boolean {
  return loadedWorlds.has(worldId);
}

export function registerNPC(npc: INPC): void {
  if (!npc.lifeLogic) {
    if (hasCharacterLifeLogic(npc.id)) {
      npc.lifeLogic = getCharacterLifeLogic(npc.id)!;
    } else {
      const npcType = NPCLifeLogicGenerator.detectNPCType(npc.title);
      npc.lifeLogic = NPCLifeLogicGenerator.generateForType(npcType, npc.roomId);
    }
  }
  npcRegistry.set(npc.id, npc);
}

export function getNPC(id: string): INPC | undefined {
  return npcRegistry.get(id) || Array.from(dynamicNPCsCache.values()).flat().find(n => n.id === id);
}

export function getNPCsByRoom(roomId: string, roomDescription?: string): INPC[] {
  const result: INPC[] = [];
  
  for (const npc of npcRegistry.values()) {
    if (npc.roomId === roomId) result.push(npc);
  }
  
  if (!dynamicNPCsCache.has(roomId)) {
    const desc = roomDescription || '';
    const dynamicNPCs = generateDynamicNPCs(desc, roomId);
    dynamicNPCsCache.set(roomId, dynamicNPCs);
  }
  result.push(...dynamicNPCsCache.get(roomId)!);
  
  return result;
}

export function clearDynamicNPCsCache(): void {
  dynamicNPCsCache.clear();
}

export function getAllNPCs(): INPC[] {
  return Array.from(npcRegistry.values());
}

// ===== 石城 NPC =====

// 柳老 - 守门老人
registerNPC({
  id: 'liu_old',
  name: '柳老',
  title: '守门老人',
  description: '一位须发皆白的老人，靠在城门边打盹，看似老迈但目光偶尔闪过一丝精光。',
  greeting: '柳老缓缓睁开眼："年轻人，第一次来石城？这城外可不太平，蛮荒之地凶兽横行，量力而行啊。"',
  personality: ['wise', 'kind', 'cautious'],
  greetingVariants: [
    { status: NPCRelationshiptatus.HOSTILE, text: '柳老冷冷瞥了你一眼，别过头去，一副懒得搭理的样子。' },
    { status: NPCRelationshiptatus.UNFRIENDLY, text: '柳老哼了一声："又是你啊。老老实实进城，别惹事。"' },
    { status: NPCRelationshiptatus.NEUTRAL, text: '柳老缓缓睁开眼："年轻人，第一次来石城？这城外可不太平，蛮荒之地凶兽横行，量力而行啊。"' },
    { status: NPCRelationshiptatus.FRIENDLY, text: '柳老见是你，露出了笑容："小友又来了？最近修炼得怎么样？老头子我可看好你。"' },
    { status: NPCRelationshiptatus.TRUSTED, text: '柳老连忙起身迎上来："好孩子，你可算来了！来来来，老头子我新泡了壶好茶，陪我唠唠。"' },
    { status: NPCRelationshiptatus.ALLY, text: '柳老眼中精光一闪，压低声音："你来了？我这有件事，也只有你能托付了……"' },
  ],
  roomId: 'stone_city_gate',
  dialogues: [
    {
      id: 'liu_history',
      topic: '打听石城历史',
      text: '柳老捋了捋胡须："石城建城已有三百年，当年火皇曾在此驻扎，城墙上还留有他的阵纹。城中心那口古井，据说是通往地脉的灵眼。"',
      favorabilityChange: 2,
    },
    {
      id: 'liu_history2',
      topic: '再讲些石城往事',
      text: '"说起来，三十年前这石城差点被兽潮攻破。那时候守将是个姓秦的将军，一人一枪守了三天三夜，最后战死在城头。唉……英雄命短啊。"柳老叹了口气，眼中满是追忆。',
      condition: (p: IPlayer) => p.realm >= 1,
      favorabilityChange: 3,
    },
    {
      id: 'liu_advice',
      topic: '请教修炼建议',
      text: '"你如今不过是搬血境，先别急着往深处走。去后山猎几只灵狐，采些草药，攒够本钱去集市买几颗培元丹。修炼一途，急不得。"',
      condition: (p: IPlayer) => p.realm <= 1,
      favorabilityChange: 3,
    },
    {
      id: 'liu_advice2',
      topic: '请教修炼建议',
      text: '"洞天境了？不错。但须知天外有天，火皇城中有真正的强者，若想更进一步，不妨去火皇城见识见识。"',
      condition: (p: IPlayer) => p.realm >= 2,
      favorabilityChange: 3,
    },
    {
      id: 'liu_firecity',
      topic: '询问火皇城',
      text: '"穿过蛮荒之地，一直向北走，就能抵达火皇城。那里是火国的都城，高手如云，机缘也更多。不过路上要小心，越往北走，凶兽越强。"',
      favorabilityChange: 1,
    },
    {
      id: 'liu_self',
      topic: '柳老您当年是做什么的？',
      text: '柳老愣了一下，随即苦笑着摆手："老头子我？就是个看城门的呗，还能做什么。老了，老啦……"他望向远方，眼神有些飘忽，似乎想起了什么往事。',
      favorabilityChange: 5,
    },
    {
      id: 'liu_secret',
      topic: '柳老您是不是不简单？',
      text: '柳老的目光骤然锐利起来，如刀锋般扫过你。片刻后，他又恢复了那副老态龙钟的样子："小娃娃，有些事，知道得太多可不是什么好事。去吧去吧，该干嘛干嘛去。"',
      condition: (p: IPlayer) => p.realm >= 3,
      favorabilityChange: -2,
      relationshipRequired: NPCRelationshiptatus.FRIENDLY,
    },
    {
      id: 'liu_gift',
      topic: '给柳老带了些酒',
      text: '柳老眼睛一亮："哟，还带酒了？你小子有心了！"他接过酒葫芦，拔开塞子闻了闻，满脸陶醉："好酒！好久没喝到这么地道的烧刀子了。"',
      favorabilityChange: 10,
      onSelect: (p: IPlayer) => {
        return { messages: ['柳老喝了一口酒，红光满面。他偷偷塞给你一张泛黄的纸条："拿去，别让别人看见。这是老头子我年轻时收藏的一处秘藏地点。"'] };
      },
    },
    {
      id: 'liu_gossip',
      topic: '最近城里有什么新鲜事？',
      text: '"新鲜事？嗨，还不就是那些。王胖子又在忽悠外地人了，铁柱和小翠那对小年轻眉来眼去的，守夜人最近总在祭坛那边待着……对了，最近夜里城外总传来奇怪的吼声，你出城小心点。"',
      favorabilityChange: 2,
    },
    {
      id: 'liu_weather',
      topic: '今天天气不错',
      text: '"是啊，难得的好天气。"柳老抬头看了看天，"不过这天气……太反常了。这个时节本该多雨的。我总觉得，要变天了。"',
      favorabilityChange: 1,
    },
  ],
});

// 铁柱 - 铁匠
registerNPC({
  id: 'tie_zhu',
  name: '铁柱',
  title: '铁匠铺老板',
  description: '一个精壮的青年，赤裸上身，古铜色的皮肤上布满汗珠。铁锤在他手中仿佛没有重量。',
  greeting: '铁柱擦了把汗，咧嘴一笑："想要兵器？我铁柱打造的兵器，在这石城方圆百里都是有名的！"',
  personality: ['honest', 'diligent', 'brave'],
  greetingVariants: [
    { status: NPCRelationshiptatus.HOSTILE, text: '铁柱冷冷地看了你一眼，继续打铁，火星四溅，一副不想理你的样子。' },
    { status: NPCRelationshiptatus.UNFRIENDLY, text: '铁柱头也不抬："买东西就说，不买别挡着我干活。"' },
    { status: NPCRelationshiptatus.NEUTRAL, text: '铁柱擦了把汗，咧嘴一笑："想要兵器？我铁柱打造的兵器，在这石城方圆百里都是有名的！"' },
    { status: NPCRelationshiptatus.FRIENDLY, text: '铁柱见是你，放下铁锤："兄弟你来了！正好，我刚打了把新刀，你帮我试试手？"' },
    { status: NPCRelationshiptatus.TRUSTED, text: '铁柱大喜："你可算来了！来来来，我跟你说个事——后山的影铁矿脉，我一个人拿不下，你陪我走一趟？"' },
    { status: NPCRelationshiptatus.ALLY, text: '铁柱放下铁锤，郑重地拍了拍你的肩膀："兄弟，有你这句话，我铁柱这辈子认你这个兄弟了！"' },
  ],
  roomId: 'stone_city_blacksmith',
  dialogues: [
    {
      id: 'tie_work',
      topic: '夸赞手艺',
      text: '铁柱咧嘴一笑，眼中带着自豪："我这手艺是祖传的，我爷爷当年给火皇的亲卫队打造过兵器！可惜……后来家道中落了。"说到后面，神色有些黯淡。',
      favorabilityChange: 3,
    },
    {
      id: 'tie_crush',
      topic: '打听小翠',
      text: '铁柱脸一红，假装专注地敲打铁块："咳咳……小翠那丫头，在集市卖灵药呢。她……她做的药确实不错。你要是见到她，别说我提她。"',
      favorabilityChange: 5,
    },
    {
      id: 'tie_material',
      topic: '询问好材料',
      text: '"好材料？后山暗影洞深处有种矿石，叫影铁，要是能弄来几块，我能给你打把好兵器。不过那地方凶险，你自己掂量。"',
      favorabilityChange: 2,
    },
    {
      id: 'tie_training',
      topic: '你也修炼吗？',
      text: '铁柱挠了挠头："嘿嘿，练过几年，就是没啥天赋，现在也就搬血境巅峰。不过我这身子骨，力气可比同境的大得多！"他说着鼓起胳膊上的肌肉。',
      favorabilityChange: 3,
    },
    {
      id: 'tie_dream',
      topic: '你有什么梦想？',
      text: '铁柱停下手中的活，望着窗外："梦想啊……我想重振家族的荣光，让铁柱这个名号，重新在火国响起来。还有……"他脸又红了，没再说下去。',
      favorabilityChange: 8,
      relationshipRequired: NPCRelationshiptatus.FRIENDLY,
    },
    {
      id: 'tie_spar',
      topic: '来切磋一下？',
      text: '铁柱眼睛一亮："好啊！正愁没人陪我练手呢！来吧，我让你三招！"他拿起一根木棍，摆开架势。',
      favorabilityChange: 5,
      onSelect: (p: IPlayer) => {
        return { messages: ['你们你来我往打了几十回合，铁柱虽然修为不高，但力大无穷，招式刚猛。最后以平手告终。"痛快！好久没这么痛快了！"铁柱哈哈大笑。'] };
      },
    },
    {
      id: 'tie_help',
      topic: '需要帮忙吗？',
      text: '铁柱有些不好意思地摸了摸头："嗨，我能有啥需要帮忙的……不过说起来，最近店里生意好，我一个人有点忙不过来。你要是有空，帮我拉拉风箱？工钱少不了你的！"',
      favorabilityChange: 4,
    },
    {
      id: 'tie_gossip',
      topic: '最近有什么传闻吗？',
      text: '"传闻？哦对，王胖子最近好像在倒腾什么见不得光的东西，神神秘秘的。还有守夜人，最近总是半夜出城，不知道去干嘛。哎，你可别说是我说的啊！"',
      favorabilityChange: 3,
    },
    {
      id: 'tie_weapon',
      topic: '你最得意的作品是什么？',
      text: '铁柱来了精神，从柜台底下拿出一把乌黑的短刀："看这个！这是我用三年时间，反复锻打了三万六千次才成的。可惜啊，没有好的材料，不然它能更好。"',
      favorabilityChange: 4,
    },
  ],
});

// 小翠 - 灵药商
registerNPC({
  id: 'xiao_cui',
  name: '小翠',
  title: '灵药摊主',
  description: '一个清秀的少女，扎着简单的发髻，面前摆着各种灵药和丹丸。笑容温和，让人如沐春风。',
  greeting: '见你走近，少女微微一笑："这位道友，要看看灵药吗？都是 fresh 采的，效果上佳。"',
  personality: ['kind', 'gentle', 'hardworking'],
  greetingVariants: [
    { status: NPCRelationshiptatus.HOSTILE, text: '小翠看到你，脸色顿时冷了下来，扭过头去假装整理药材，摆明了不想理你。' },
    { status: NPCRelationshiptatus.UNFRIENDLY, text: '小翠淡淡地点了点头："要看灵药自己看，价钱都标着。"' },
    { status: NPCRelationshiptatus.NEUTRAL, text: '见你走近，少女微微一笑："这位道友，要看看灵药吗？都是新鲜采的，效果上佳。"' },
    { status: NPCRelationshiptatus.FRIENDLY, text: '小翠见是你，眼睛弯成了月牙："是你呀！今天新采了一批灵草，品质特别好，我给你留着呢！"' },
    { status: NPCRelationshiptatus.TRUSTED, text: '小翠脸微微一红，小声说："你来了……我、我刚做了些糕点，你要不要尝尝？"' },
    { status: NPCRelationshiptatus.ALLY, text: '小翠放下手中的药材，快步走到你面前，眼中满是关切："你可算回来了，我……我很担心你。"' },
  ],
  roomId: 'stone_city_market',
  dialogues: [
    {
      id: 'cui_herbs',
      topic: '询问灵药来源',
      text: '"这些灵药大多是我自己去后山采的。后山虽然有些灵狐，但只要不深入，还算安全。偶尔……铁柱哥会陪我一起去。"说到铁柱，她脸颊微红。',
      favorabilityChange: 2,
    },
    {
      id: 'cui_brother',
      topic: '提起铁柱',
      text: '小翠掩嘴轻笑："铁柱哥啊，他整天就知道打铁，也不注意休息。上次给他送药，他手上又被烫伤了……你要是见着他，帮我劝劝他。"',
      favorabilityChange: 3,
    },
    {
      id: 'cui_recipe',
      topic: '请教炼丹',
      text: '"炼丹之道，重在火候与配比。我这点本事只是皮毛，若想真正学得丹道，得去火皇城的灵药阁，那里有位丹老，据说能炼出四品丹药。"',
      favorabilityChange: 2,
    },
    {
      id: 'cui_family',
      topic: '你家里人呢？',
      text: '小翠的神色黯淡了一下："我爹娘……在我很小的时候就走了。是村里的王婆婆把我养大的。后来王婆婆也走了，我就自己出来讨生活了。"她勉强笑了笑。',
      favorabilityChange: 5,
    },
    {
      id: 'cui_dream',
      topic: '你有什么心愿吗？',
      text: '小翠望着远方，眼神温柔："我啊……希望有一天能成为真正的丹师，炼出能救死扶伤的丹药。还有……"她的声音越来越小，"希望在意的人，都能平平安安的。"',
      favorabilityChange: 8,
      relationshipRequired: NPCRelationshiptatus.FRIENDLY,
    },
    {
      id: 'cui_heal',
      topic: '我受伤了，能帮我看看吗？',
      text: '小翠连忙拿出药箱："快坐下让我看看！哎呀，怎么伤得这么重……你等等，我给你敷药，会有点疼，你忍着点。"她小心翼翼地为你处理伤口，动作轻柔。',
      favorabilityChange: 6,
      onSelect: (p: IPlayer) => {
        return { messages: ['小翠细心地为你包扎好伤口，又给你服下一颗疗伤丹。暖暖的药力在体内散开，伤势好转了不少。"以后要小心点呀。"她轻声说。'] };
      },
    },
    {
      id: 'cui_gift',
      topic: '这朵花送给你',
      text: '小翠愣了一下，随即脸上绽开灿烂的笑容："这……这是给我的？好漂亮！谢谢你！"她小心翼翼地接过花，插在发间，脸红红的。',
      favorabilityChange: 12,
      relationshipRequired: NPCRelationshiptatus.FRIENDLY,
    },
    {
      id: 'cui_gossip',
      topic: '最近有什么新鲜事吗？',
      text: '"新鲜事呀……我听说百断山那边最近不太平，好多修士都往那边去。还有，王胖子最近鬼鬼祟祟的，不知道在倒腾什么。对了，柳老最近好像身体不太好，你有空去看看他吧。"',
      favorabilityChange: 2,
    },
    {
      id: 'cui_weather',
      topic: '今天天气真好',
      text: '小翠抬头看了看天，微笑着说："是呀，这样的天气最适合晒药了。你看，这些草药晒一晒，药效会更好呢。"她指了指旁边竹匾里的药材。',
      favorabilityChange: 1,
    },
    {
      id: 'cui_study',
      topic: '能教我辨认草药吗？',
      text: '"当然可以呀！"小翠高兴地说，"你看，这是血参，用来补气血的；这是凝露草，能凝神静气；还有这个，是断肠草，有剧毒的，可千万别碰……"她耐心地一一讲解。',
      favorabilityChange: 7,
      relationshipRequired: NPCRelationshiptatus.FRIENDLY,
      onSelect: (p: IPlayer) => {
        return { messages: ['小翠花了大半个时辰，教你辨认了十几种常见的草药。你受益匪浅，对药性的理解更深了一层。'] };
      },
    },
  ],
});

// 王胖子 - 奸商
registerNPC({
  id: 'wang_pangzi',
  name: '王胖子',
  title: '市井商贩',
  description: '一个圆滚滚的胖子，穿着绸缎衣裳，手指上戴着好几个玉扳指。一双小眼睛滴溜溜地转，透着精明。',
  greeting: '王胖子笑眯眯地凑过来："哎哟，这位道友面生啊！我王胖子最是好客，来来来，看看我这批新到的货，保证物美价廉！"',
  personality: ['cunning', 'greedy', 'sociable'],
  greetingVariants: [
    { status: NPCRelationshiptatus.HOSTILE, text: '王胖子看到你，脸色一变，转身就想收拾摊子走人。"哼，是你啊。我这儿不做你的生意，哪儿凉快哪儿待着去！"' },
    { status: NPCRelationshiptatus.UNFRIENDLY, text: '王胖子皮笑肉不笑："哟，来了啊。看在老熟人的份上，给你打个九五折。怎么样，够意思吧？"' },
    { status: NPCRelationshiptatus.NEUTRAL, text: '王胖子笑眯眯地凑过来："哎哟，这位道友面生啊！我王胖子最是好客，来来来，看看我这批新到的货，保证物美价廉！"' },
    { status: NPCRelationshiptatus.FRIENDLY, text: '王胖子眼睛一亮，快步迎上来："兄弟你可算来了！我跟你说，刚到一批好东西，别人我都不给看，专门给你留着！"' },
    { status: NPCRelationshiptatus.TRUSTED, text: '王胖子左右看了看，压低声音："你来了？正好，有笔大买卖，做成了咱们五五分成。走，里屋说。"' },
    { status: NPCRelationshiptatus.ALLY, text: '王胖子拍着你的肩膀，一脸豪气："兄弟！咱俩谁跟谁！我的就是你的！看上什么尽管拿，提钱就见外了！"——当然，他说这话时，手还是下意识地捂住了储物袋。' },
  ],
  roomId: 'stone_city_market',
  dialogues: [
    {
      id: 'wang_bargain',
      topic: '讨价还价',
      text: '王胖子一脸肉痛地摆手："哎哟喂，道友你这是要我的命啊！这价我已经是亏本卖了……罢了罢了，看你面善，给你抹个零头，可千万别跟别人说！"',
      favorabilityChange: 2,
      onSelect: (p: IPlayer) => {
        return { messages: ['王胖子极不情愿地给你便宜了几个铜板。虽然你怀疑他其实还是赚了。'] };
      },
    },
    {
      id: 'wang_rumor',
      topic: '打听消息',
      text: '王胖子压低声音，神秘兮兮地说："我听说啊，百断山那边最近有异动，夜里能看到灵光冲天。有人说是上古遗迹出世了，也有人说是凶兽在渡劫……反正这事儿，火皇城那边已经派人去查了。"',
      favorabilityChange: 3,
    },
    {
      id: 'wang_goods',
      topic: '看看好货',
      text: '"嘿嘿，我这可有好东西！"王胖子从怀里摸出一块玉佩："这是我从一处古墓中淘来的，据说是某位大能的信物，佩戴可安心神。不过嘛……价钱可不便宜。"',
      favorabilityChange: 1,
    },
    {
      id: 'wang_background',
      topic: '王老板怎么会来石城？',
      text: '王胖子叹了口气："嗨，别提了。在火皇城得罪了人，待不下去了，只好跑到这小地方来混口饭吃。不过话说回来，石城这地方，藏龙卧虎啊……"他意味深长地笑了笑。',
      favorabilityChange: 4,
      relationshipRequired: NPCRelationshiptatus.FRIENDLY,
    },
    {
      id: 'wang_secret',
      topic: '有没有更赚钱的路子？',
      text: '王胖子左右看了看，凑到你耳边："路子倒是有……就看你敢不敢干了。百断山深处有个古墓，里面宝贝不少。就是危险了点。怎么样，有没有兴趣合伙？"',
      favorabilityChange: 5,
      relationshipRequired: NPCRelationshiptatus.FRIENDLY,
    },
    {
      id: 'wang_flatter',
      topic: '王老板真是能人',
      text: '王胖子笑得眼睛都眯成了一条缝："哪里哪里，我就是个小生意人。不过嘛，论眼光，我王胖子还没服过谁！我一看你就知道，你将来必成大器！"他这话说得真心实意——至少看起来是。',
      favorabilityChange: 6,
    },
    {
      id: 'wang_help',
      topic: '能帮我找样东西吗？',
      text: '王胖子摸了摸下巴："找东西？那得看是什么东西了。只要价钱到位，天上的星星我都能给你弄来半颗！当然了，太出格的不行，我可是守法的好商人。"',
      favorabilityChange: 3,
    },
    {
      id: 'wang_truth',
      topic: '你卖的这些是真货吗？',
      text: '王胖子表情一肃，竖起三根手指："我王胖子做生意，讲的就是一个诚信！童叟无欺！当然了……偶尔有那么一两件……高仿品，那也是为了满足不同客户的需求嘛！"',
      favorabilityChange: 4,
      relationshipRequired: NPCRelationshiptatus.FRIENDLY,
    },
    {
      id: 'wang_gossip',
      topic: '最近城里有什么八卦？',
      text: '"八卦？那可太多了！"王胖子来了精神，"铁柱和小翠那点事，全石城谁不知道？还有守夜人，据说他以前是火皇城的大官，后来犯了事才逃到这里的。柳老更不得了，听说他当年……哎，算了算了，有些事不能说不能说。"',
      favorabilityChange: 3,
    },
  ],
});

// 老村长
registerNPC({
  id: 'old_village_head',
  name: '石伯',
  title: '石城村长',
  description: '一位精神矍铄的老人，腰杆挺直，双目有神。虽然年迈，但言谈举止间透着一股威严。',
  greeting: '石伯正在院子里打拳，见你进来收了势："年轻人，有什么事？石城虽小，但规矩不能坏。"',
  roomId: 'stone_city_residential',
  dialogues: [
    {
      id: 'head_city',
      topic: '询问石城现状',
      text: '石伯叹了口气："最近城外不太平，蛮荒之地的凶兽越来越活跃了。前些天还有狼群靠近城墙，多亏守夜人及时发现。你若是有能力，出城历练时多杀些凶兽，也算是为城民除害。"',
    },
    {
      id: 'head_quest',
      topic: '询问任务',
      text: '"你若是想历练，集市那边需要人帮忙收集狼皮，后山的灵狐也有些泛滥。去找小翠或者王胖子，他们总有活计给人做。"',
      condition: (p: IPlayer) => p.realm < 2,
    },
    {
      id: 'head_firecity',
      topic: '关于火皇城',
      text: '"火皇城是火国的中心，那里有真正的强者坐镇。你若在石城历练够了，就往北走。不过记住，到了火皇城，言行需谨慎，那里不比石城。"',
    },
  ],
});

// 守夜人 - 祭坛守护者
registerNPC({
  id: 'night_watcher',
  name: '守夜人',
  title: '祭坛守护者',
  description: '一个身穿黑袍的中年人，面容隐藏在兜帽下，只露出一双深邃的眼睛。他静静站在祭坛旁，仿佛与阴影融为一体。',
  greeting: '守夜人微微抬头，声音沙哑："你来了……这座祭坛年代久远，连我也说不清它的来历。只知道，它连接着某些……不可言说的存在。"',
  roomId: 'stone_city_temple',
  dialogues: [
    {
      id: 'watcher_temple',
      topic: '询问祭坛来历',
      text: '"这座祭坛早在石城建城之前就存在了。上面的铭文是一种古老的文字，我研究多年也只破译了一小部分。大意是……「封印」、「守护」之类的意思。"',
    },
    {
      id: 'watcher_warning',
      topic: '询问警告',
      text: '"我能感觉到，最近祭坛的灵脉有些异动。百断山那边……怕是要出什么事了。你若是要去火皇城，替我带句话给火皇：「古老的封印在松动。」"',
    },
  ],
});

// ===== 火皇城 NPC =====

// 火皇
registerNPC({
  id: 'fire_emperor',
  name: '火皇',
  title: '火国之主',
  description: '一个威严的中年男子，身穿赤红龙袍，头戴金冠，双目如炬。仅仅是站在那里，就散发出令人窒息的威压。',
  greeting: '火皇端坐于宝座之上，目光如电："来者何人？报上名来。"',
  roomId: 'fire_throne_hall',
  dialogues: [
    {
      id: 'emperor_identity',
      topic: '自报姓名',
      text: '火皇微微颔首："能走到这里，也算有些本事。火国广纳贤才，你若愿意，可在城中修行。"',
      onSelect: (p: IPlayer) => ({
        messages: [`火皇记住了你的名字：${p.name}。你感到一股无形的气机锁定了你，又很快消散。`],
      }),
    },
    {
      id: 'emperor_warning',
      topic: '报告封印异动',
      text: '火皇神色一凝："守夜人那老家伙还在守着祭坛？这件事我知道了。百断山的封印确实在减弱，我已派人去查探。你修为尚浅，暂时不要掺和。"',
      condition: (p: IPlayer) => p.realm < 5,
    },
    {
      id: 'emperor_quest',
      topic: '请求任务',
      text: '"你倒是积极。百断山深处有座古洞府，传闻有上古传承。你若能到达那里，将里面的情况探查清楚，本皇必有重赏。"',
      condition: (p: IPlayer) => p.realm >= 3,
    },
    {
      id: 'emperor_advice',
      topic: '请教修炼',
      text: '"修炼之道，根基为重。你如今境界尚浅，可去城中灵药阁找丹老，他那里有助你稳固根基的丹药。也可去演武场与人对练，实战方能突破。"',
    },
  ],
});

// 火皇女
registerNPC({
  id: 'fire_princess',
  name: '火灵儿',
  title: '火皇之女',
  description: '一袭红衣的少女，明眸皓齿，眉宇间带着几分骄纵。腰间挂着一柄赤红短剑，显然身份不凡。',
  greeting: '火灵儿挑眉打量你："咦？面生得很，新来的？石城那种小地方来的吧？"',
  roomId: 'fire_plaza',
  dialogues: [
    {
      id: 'princess_retort',
      topic: '回敬她的轻视',
      text: '火灵儿哼了一声："倒是有几分胆色。不过光有胆量可不够，这火皇城里随便拉出一个侍卫，都能把你打得满地找牙。"',
      onSelect: () => ({ messages: ['火灵儿虽然嘴上不饶人，但眼中闪过一丝欣赏。'] }),
    },
    {
      id: 'princess_ask',
      topic: '询问火皇城',
      text: '"火皇城分为内城和外城。外城是集市和民居，内城是皇宫和重地。东边有个拍卖行，经常有好东西出手。西边的演武场可以切磋，城中有不少高手。"',
    },
    {
      id: 'princess_break',
      topic: '提及百断山',
      text: '"百断山？那儿可好玩了！"火灵儿眼睛一亮："我小时候偷溜进去过，里面有很多奇怪的遗迹。不过父皇说最近那里不太平，不让我去。哼，我偏要去！"',
    },
  ],
});

// 丹老 - 炼丹大师
registerNPC({
  id: 'dan_lao',
  name: '丹老',
  title: '灵药阁大师',
  description: '一个干瘦的老者，穿着宽大的丹袍，须发皆白。身上散发着浓郁的草药味，手指被药草染成了暗黄色。',
  greeting: '丹老头也不抬，专注地盯着丹炉："嘘……别说话，这炉丹正在关键时刻。"',
  roomId: 'fire_pharmacy',
  dialogues: [
    {
      id: 'dan_learning',
      topic: '请教炼丹',
      text: '丹老终于抬起头，打量了你一番："想学炼丹？首先得认得药性，其次要掌握火候。你连草药都认不全吧？先从基础学起，去给我采几株灵草来。"',
      condition: (p: IPlayer) => p.realm < 3,
    },
    {
      id: 'dan_alchemy',
      topic: '谈论丹药之道',
      text: '"炼丹如修行，急不得。一炉好丹，需要天时、地利、人和。你看这炉「破境丹」，需七七四十九道工序，少一道都不行。"丹老指着丹炉，滔滔不绝地说起来。',
      condition: (p: IPlayer) => p.realm >= 3,
    },
    {
      id: 'dan_break',
      topic: '询问破境丹',
      text: '丹老露出一个高深莫测的笑容："破境丹？那是我最得意的作品之一。不过材料难寻，需要百断山深处的「龙涎草」作为主药。你有本事弄来，我倒是可以给你炼一炉。"',
    },
  ],
});

// 拍卖师
registerNPC({
  id: 'auctioneer',
  name: '金算子',
  title: '拍卖行主持',
  description: '一个穿着讲究的中年人，笑容可掬，手指飞快地拨弄着算盘。一看就是精明能干的生意人。',
  greeting: '金算子笑容满面地迎上来："欢迎欢迎！火皇城拍卖行，每月初一十五开拍。平时也有精品寄售，道友有兴趣看看？"',
  roomId: 'fire_auction',
  dialogues: [
    {
      id: 'auction_info',
      topic: '询问拍卖规则',
      text: '"本行拍卖，价高者得。不过嘛……"金算子压低声音："若是道友有什么好东西想出手，也可以私下找我，我认识不少大主顾。"',
    },
    {
      id: 'auction_items',
      topic: '看看本期拍品',
      text: '"这一期有不少好东西！有一柄「赤炎剑」，据说是火皇年轻时用过的；还有一瓶「三转凝神丹」，能大幅提升修为。不过嘛……价格都不便宜。"',
    },
    {
      id: 'auction_secret',
      topic: '打听秘密消息',
      text: '金算子四下看了看，压低声音："我听说，百断山深处有人发现了一座上古洞府，里面可能有「宝术传承」。这事儿知道的人不多，你可别到处说。"',
    },
  ],
});

// 守城将军
registerNPC({
  id: 'guard_general',
  name: '烈山',
  title: '镇守将军',
  description: '一个虎背熊腰的壮汉，身穿铁甲，腰悬大刀。脸上有一道刀疤，从眉梢斜到嘴角，平添几分凶悍。',
  greeting: '烈山将军单手叉腰，声如洪钟："站住！面生得很，可有通行令牌？"',
  roomId: 'fire_gate',
  dialogues: [
    {
      id: 'general_pass',
      topic: '请求通行',
      text: '烈山上下打量你一番："嗯……修为虽然一般，但眼神还算干净。进去吧，不过记住，城内禁止私斗，违者重罚！"',
      onSelect: () => ({ messages: ['烈山将军让开道路，你得以进入火皇城。'] }),
    },
    {
      id: 'general_news',
      topic: '打听边境消息',
      text: '"最近蛮荒之地不太平，有凶兽在集结。我怀疑有人在背后操控。"烈山皱眉："你从石城来的？路上可有什么异常？"',
    },
    {
      id: 'general_training',
      topic: '请求切磋',
      text: '烈山咧嘴一笑，露出森白的牙齿："想切磋？好！我正好手痒了。不过拳脚无眼，伤了可别怨我。"',
      condition: (p: IPlayer) => p.realm >= 3,
      onSelect: () => {
        const dmg = Math.floor(Math.random() * 30) + 20;
        return { messages: [`烈山将军与你切磋了一番，你被狠狠教训了一顿，掉了 ${dmg} 点气血。不过他也指点了几招，你感觉对战斗有了新的领悟。`] };
      },
    },
  ],
});

// ===== 石城新增 NPC（生活气息） =====

// 张婶 - 卖包子的妇人
registerNPC({
  id: 'zhang_shen',
  name: '张婶',
  title: '包子铺老板娘',
  description: '一个圆脸的中年妇人，腰间系着围裙，手上沾着面粉。笑起来眼睛眯成一条缝，嗓门大得整条街都听得见。',
  greeting: '张婶扯着嗓门招呼你："哟！这位小道友面生啊，刚来石城的吧？来来来，尝尝婶子刚蒸好的肉包子，热乎着呢！"',
  roomId: 'stone_city_residential',
  dialogues: [
    {
      id: 'zhang_bun',
      topic: '买个包子',
      text: '张婶麻利地用油纸包了两个包子塞给你："拿着吃！不要钱，算婶子请你的。出门在外不容易，我看你瘦得跟竹竿似的，多吃点。"',
      onSelect: () => ({ messages: ['热腾腾的包子，里面的肉馅香味扑鼻。你咬了一口，觉得这大概是石城最好吃的东西了。'] }),
    },
    {
      id: 'zhang_gossip',
      topic: '打听街坊邻里',
      text: '张婶一边揉面一边絮叨："你问铁柱那小子？唉，那孩子可怜，爹娘走得早，一个人撑着铁匠铺。小翠倒是经常去照顾他，俩孩子都不小了，愣是谁也不捅破那层窗户纸……"',
    },
    {
      id: 'zhang_complain',
      topic: '抱怨日子',
      text: '"唉，这日子是越来越难过了。面粉又涨价了，那些蛮荒之地出来的凶兽皮子倒是便宜，可谁有那闲钱买啊？我老伴说要去火皇城闯闯，我看他是老糊涂了！"',
    },
    {
      id: 'zhang_advice',
      topic: '询问修炼的事',
      text: '"我一个妇道人家哪懂什么修炼啊！不过我听说啊，后山那片儿灵气足，好多修士都去那儿打坐。你要是想去，早点去早点回，天黑之后可不安全。"',
    },
  ],
});

// 二狗子 - 调皮小孩
registerNPC({
  id: 'ergouzi',
  name: '二狗子',
  title: '顽皮孩童',
  description: '一个七八岁的小男孩，脸上脏兮兮的，衣服上全是泥巴。手里拿着一根树枝当剑耍，嘴里还发出"嘿哈"的声音。',
  greeting: '二狗子猛地跳到路中间，用树枝指着你："站住！此路是我开，此树是我栽！要想从此过……哎哟！"话没说完就被他娘拎走了。',
  roomId: 'stone_city_residential',
  dialogues: [
    {
      id: 'ergou_play',
      topic: '陪他玩',
      text: '二狗子眼巴巴地看着你："大哥哥，你陪我玩会儿呗！我爹说等我长大了也要去当修士，打凶兽！你看我这招「猛虎下山」帅不帅？"说着又挥舞起树枝。',
      onSelect: () => ({ messages: ['你陪二狗子玩了一会儿，他开心得不行，临走时还送了你一颗在路边捡到的亮晶晶的石头。'] }),
    },
    {
      id: 'ergou_secret',
      topic: '打听秘密',
      text: '二狗子神秘兮兮地压低声音："我告诉你一个秘密，你可别告诉别人！"他左右看看："后山那个山洞里，我上次看到有蓝色的光，可好看了！不过我不敢进去……"',
    },
    {
      id: 'ergou_dream',
      topic: '问他长大想做什么',
      text: '"我长大了要当石城最厉害的修士！"二狗子挺起胸膛："比铁柱哥还厉害！然后……然后我要娶小翠姐姐当媳妇！"说完自己先不好意思地跑了。',
    },
  ],
});

// 酒老 - 醉汉
registerNPC({
  id: 'jiu_lao',
  name: '酒老',
  title: '醉醺醺的老酒鬼',
  description: '一个邋遢的老头，穿着打了补丁的旧袍子，手里永远拎着一个酒葫芦。脸红扑扑的，说话大舌头，但偶尔会说出一些让人琢磨不透的话。',
  greeting: '酒老打了个酒嗝，晃晃悠悠地凑过来："嗝……小友，有酒吗？没有？那……那你有钱吗？借我几个买酒，改天……改天还你十倍的！"',
  roomId: 'stone_city_plaza',
  dialogues: [
    {
      id: 'jiu_loan',
      topic: '借他钱买酒',
      text: '酒老接过钱，眼睛一亮，酒似乎醒了大半："嘿嘿，够意思！老夫也不是白拿你的。听好了——「月圆之夜，紫气东来，百断山中有大机缘」。记住了，别告诉别人是我说的。"',
      onSelect: (p: IPlayer) => {
        p.gold -= 5;
        return { messages: ['你给了酒老 5 枚原始币。他神秘兮兮地说了句话，然后摇摇晃晃地走了。你总觉得这老头不简单。'] };
      },
      condition: (p: IPlayer) => p.gold >= 5,
    },
    {
      id: 'jiu_refuse',
      topic: '婉拒他',
      text: '酒老撇撇嘴："小气！"然后又灌了一口酒，眼神迷离地望向远方："我当年啊……可是上过百断山主峰的人。那上面的风景……嗝……真美。"',
    },
    {
      id: 'jiu_story',
      topic: '听他讲故事',
      text: '酒老眯着眼，仿佛在回忆什么："三十年前，我在火皇城见过真正的强者对决。那一掌拍下去，半边天都红了！火皇那老小子……呃，我是说火皇陛下，那时候还只是个太子呢。"',
    },
  ],
});

// 采药人老陈
registerNPC({
  id: 'caiyao_chen',
  name: '老陈',
  title: '采药人',
  description: '一个精瘦的中年人，背着一个大竹篓，里面装满了各种草药。手上全是被荆棘划出的伤痕，但精神头很好。',
  greeting: '老陈正在整理背篓里的草药，头也不抬地说："药材刚采回来，新鲜着呢，要买趁早。"',
  roomId: 'stone_city_hill',
  dialogues: [
    {
      id: 'chen_herb',
      topic: '看看采了什么药',
      text: '老陈得意地展示他的背篓："今天运气不错，在后山北坡发现了几株上了年份的灵草。还有这个——"他小心翼翼地拿出一株紫色的草药："这玩意儿叫紫纹草，市面上能卖个好价钱。"',
    },
    {
      id: 'chen_danger',
      topic: '打听后山情况',
      text: '老陈压低声音："后山最近不太平。我前几天在深处看到了一只巨大的灵狐，毛色都泛银光了，起码活了百年以上。这种级别的灵兽，咱们可惹不起。"',
    },
    {
      id: 'chen_advice',
      topic: '请教采药技巧',
      text: '"采药啊，讲究的是眼力、手力和脚力。灵草大多长在灵气充沛的地方，但越好的灵草，旁边越可能有凶兽守着。你看这株——"他拔起一株不起眼的草："这叫伪装草，专门长在灵草旁边混淆视听的。"',
    },
  ],
});

// 王小二 - 樵夫
registerNPC({
  id: 'wang_xiaoer',
  name: '王小二',
  title: '砍柴的樵夫',
  description: '一个憨厚的年轻汉子，肩上扛着一捆柴，光着膀子，晒得黝黑。咧嘴一笑露出一口白牙。',
  greeting: '王小二放下柴，擦了把汗："嘿，你好！你是新来的修士吧？我经常看到修士们去后山修炼，可厉害了！"',
  roomId: 'stone_city_hill',
  dialogues: [
    {
      id: 'wang_work',
      topic: '聊砍柴的事',
      text: '"我每天天不亮就上山砍柴，趁太阳晒到屁股之前下山。后山的柴火好啊，耐烧烟少，城里的人都爱买我的柴。"王小二朴实地笑着。',
    },
    {
      id: 'wang_rumor',
      topic: '打听山里的动静',
      text: '王小二神秘兮兮地说："前几天我在山里砍柴，听到了一声奇怪的吼叫，震得树叶子哗哗掉。我还看到远处有一道金光闪过……你说会不会是有什么宝贝要出世了？"',
    },
    {
      id: 'wang_life',
      topic: '问他日子过得怎么样',
      text: '"还行吧，虽然赚不了几个钱，但好歹饿不死。"王小二挠挠头："我攒了点钱，打算明年去火皇城看看，听说那边赚钱的机会多。要是能攒够老婆本就好了……"说着不好意思地笑了。',
    },
  ],
});

// 补鞋匠老孙头
registerNPC({
  id: 'sun_tou',
  name: '老孙头',
  title: '补鞋匠',
  description: '一个弯腰驼背的老头，坐在广场角落的小马扎上，面前摆着几双修好的鞋。手里拿着锥子和线，动作虽然慢但很稳当。',
  greeting: '老孙头抬眼看了看你，又低头继续手里的活："鞋坏了？拿来吧。半个时辰后来取。"',
  roomId: 'stone_city_plaza',
  dialogues: [
    {
      id: 'sun_talk',
      topic: '闲聊',
      text: '老孙头一边穿针引线一边慢悠悠地说："我在这广场上坐了四十年了，看着石城一天天变样。以前啊，这里哪有这么多修士，都是些普通人。现在倒好，满大街都是飞来飞去的。"',
    },
    {
      id: 'sun_observation',
      topic: '问问最近看到什么',
      text: '"我眼神不好，但耳朵尖。"老孙头压低声音："前两天晚上，我听到广场上有动静，偷偷一看，是那个守夜人在跟一个黑衣人说话。说什么「封印」、「来不及了」……反正我是没听懂。"',
    },
  ],
});

// 蛮荒之地 - 猎户老赵
registerNPC({
  id: 'liehu_zhao',
  name: '老赵',
  title: '蛮荒猎户',
  description: '一个满脸风霜的中年汉子，穿着兽皮衣，背着一张巨大的铁弓。腰间挂着几个兽皮袋，散发着血腥味。目光锐利如鹰。',
  greeting: '老赵正在检查捕兽夹，听到脚步声警觉地抬头，看清是你后放松了些："小心脚下，我这附近下了几个套子，别踩着了。"',
  roomId: 'wasteland_gate',
  dialogues: [
    {
      id: 'zhao_hunting',
      topic: '问问打猎的事',
      text: '"这蛮荒之地啊，我打了二十年猎了。"老赵摇摇头："以前凶兽没这么多，这几年越来越多了。特别是那种野狼，成群结队的，我一个人都不敢走太远。"',
    },
    {
      id: 'zhao_warning',
      topic: '打听前方危险',
      text: '"你要往北走？那可要当心。碎石坡那边有石巨人出没，枯木林里的碧磷蛇毒性很强。要是看到沼泽地上的雾气变成紫色，赶紧跑，那是毒瘴。"',
    },
    {
      id: 'zhao_sell',
      topic: '看看猎物',
      text: '老赵从腰间接下一个皮袋，倒出几颗还带着血的兽牙："这些狼牙品质不错，可以磨成护身符，也可以入药。你要是想要，便宜点卖给你。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 3) {
          p.gold -= 3;
          return { messages: ['你花了 3 枚原始币买了三颗狼牙。老赵点点头："有眼光，拿着防身吧。"'] };
        }
        return { messages: ['你摸了摸口袋，钱不够。老赵摆摆手："算了，下次再说。"'] };
      },
    },
  ],
});

// 流浪修士
registerNPC({
  id: 'wander_monk',
  name: '云游散人',
  title: '流浪修士',
  description: '一个穿着破旧道袍的中年人，盘腿坐在一块大石头上闭目打坐。身边放着一柄锈迹斑斑的铁剑，看似普通，却隐隐透着一股凌厉的气息。',
  greeting: '流浪修士缓缓睁开眼，目光平静如水："这位道友，也是来此地历练的？"',
  roomId: 'wasteland_01',
  dialogues: [
    {
      id: 'wander_experience',
      topic: '问道友来历',
      text: '"我本是火皇城人士，年轻时游历四方，去过不少地方。"他笑了笑，有些自嘲："可惜资质平庸，修行多年仍卡在化灵境。如今四处走走，权当散心。"',
    },
    {
      id: 'wander_tip',
      topic: '请教修炼心得',
      text: '"修炼之道，重在积累，急不得。我看你根基尚可，但气血稍显不足。不妨多寻些灵药固本培元，比一味追求境界提升要稳妥得多。"',
      condition: (p: IPlayer) => p.realm < 3,
    },
    {
      id: 'wander_battle',
      topic: '聊战斗经验',
      text: '流浪修士眼神一凝："我曾在百断山与一只铁甲兽搏斗三天三夜，最后靠着一招「声东击西」才得以取胜。记住，与凶兽搏斗，光靠蛮力是不够的，要动脑子。"',
    },
  ],
});

// 采药女阿苓
registerNPC({
  id: 'a_ling',
  name: '阿苓',
  title: '采药女',
  description: '一个约莫二十岁的女子，穿着朴素的布衣，背篓里装满了草药。虽然面容清秀，但眼神中透着一股不服输的倔强。',
  greeting: '阿苓警觉地握紧了手中的药锄，看清你后才放松了些："你是修士？太好了……我刚刚在那边看到一条碧磷蛇，你能帮我赶走它吗？"',
  roomId: 'wasteland_02',
  dialogues: [
    {
      id: 'aling_help',
      topic: '帮她赶蛇',
      text: '阿苓松了口气："多谢道友！这碧磷蛇毒性极强，我本来想绕道走的，但这片林子里的灵草最多，舍不得走。"她低头看了看背篓："今天的收获不错，分你一些吧。"',
      onSelect: () => {
        return { messages: ['阿苓分了几株灵草给你，你感到一阵暖意。'] };
      },
    },
    {
      id: 'aling_story',
      topic: '为什么一个人来采药',
      text: '阿苓沉默了一下："我爹是石城的药师，去年在采药时被凶兽所伤，腿脚不便了。家里就靠我一个人采药维持生计。"她抬起头，倔强地笑了笑："我可不比那些男儿差。"',
    },
    {
      id: 'aling_herbs',
      topic: '请教草药知识',
      text: '阿苓眼睛一亮，如数家珍地说起来："这株是凝血草，外敷可以止血；这是清心花，泡茶喝可以静心凝神；最难得的是这个——"她小心地拿出一株泛着微光的草药："这叫月光草，只在月圆之夜才会发光，是炼制凝神丹的重要材料。"',
    },
  ],
});

// 古战场 - 老兵
registerNPC({
  id: 'old_soldier',
  name: '老兵',
  title: '古战场守墓人',
  description: '一个独臂的老人，穿着残破的铠甲，站在古战场边缘。虽然只剩一条手臂，但腰杆挺得笔直，目光坚毅。',
  greeting: '老兵用独臂向你行了一个军礼："来者何人？此处是古战场，亡魂安息之所，请勿惊扰。"',
  roomId: 'wasteland_06',
  dialogues: [
    {
      id: 'soldier_battle',
      topic: '询问古战场历史',
      text: '老兵的目光变得深邃："三十年前，这里发生过一场大战。火国的军队在此阻击凶兽潮，那一战，三千将士只剩下不到三百人。我的这条手臂，就是在那场战斗中失去的。"',
    },
    {
      id: 'soldier_soul',
      topic: '关于游荡的亡魂',
      text: '老兵叹了口气："那些亡魂，都是战死的将士。他们不甘心啊……每到夜晚，你还能听到他们的呐喊声。我守在这里，就是怕他们惊扰过往的行人。"',
    },
    {
      id: 'soldier_respect',
      topic: '表达敬意',
      text: '老兵微微动容："你有这份心，很好。这些将士们当年为了保护家园而战死，值得后人铭记。你若是要往北走，替我向火皇城的烈山将军带句话——就说「老赵头的兵，没给他丢人」。"',
      onSelect: () => ({ messages: ['你郑重地向老兵点了点头。他回了一礼，眼中似乎有泪光闪动。'] }),
    },
  ],
});

// ===== 火皇城新增 NPC =====

// 卖糖葫芦的老陈
registerNPC({
  id: 'tanghulu_chen',
  name: '糖葫芦陈',
  title: '街边小贩',
  description: '一个裹着厚棉袄的老汉，插着一根草靶子，上面扎满了红艳艳的糖葫芦。吆喝声悠长："糖葫芦——又甜又脆的糖葫芦——"',
  greeting: '老汉笑呵呵地拔下一根糖葫芦递过来："尝尝？不甜不要钱！我老陈的糖葫芦，火皇城一绝！"',
  roomId: 'fire_plaza',
  dialogues: [
    {
      id: 'tanghulu_buy',
      topic: '买一根糖葫芦',
      text: '你接过糖葫芦咬了一口，外层糖衣咔嚓脆响，里面的山楂酸甜可口。老陈得意地说："怎么样？我这糖葫芦的秘诀在于糖浆的火候，多一分则焦，少一分则粘牙。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 2) {
          p.gold -= 2;
          return { messages: ['你花了 2 枚原始币买了一根糖葫芦，味道出奇地好。'] };
        }
        return { messages: ['老陈摆摆手："没钱？没事，这根算我请你的，下次记得照顾我生意就行。"'] };
      },
    },
    {
      id: 'tanghulu_gossip',
      topic: '打听城里的消息',
      text: '老陈压低声音："你看到广场上那个红衣姑娘没？那是火皇的女儿，火灵儿公主。唉，那丫头脾气可大了，上次我吆喝声大了点，她差点把我的摊子掀了。"',
    },
    {
      id: 'tanghulu_life',
      topic: '聊聊日子',
      text: '"这年头生意不好做啊。"老陈叹气："城里修士越来越多，但这些修士一个个都忙着修炼，谁有闲心吃糖葫芦？也就那些小孩子，还有像你这样念旧的人会买。"',
    },
  ],
});

// 刘大娘 - 茶摊老板娘
registerNPC({
  id: 'liu_daniang',
  name: '刘大娘',
  title: '茶摊老板娘',
  description: '一个干练的中年妇人，围裙上绣着茶花。手脚麻利地给客人倒茶，嘴上也不闲着，跟每个喝茶的人都能聊上几句。',
  greeting: '刘大娘利落地给你倒了杯茶："新来的吧？一看你就知道。来来来，喝杯茶歇歇脚，这杯算大娘的。"',
  roomId: 'fire_plaza',
  dialogues: [
    {
      id: 'liu_tea',
      topic: '尝尝这茶',
      text: '你端起茶杯，一股清香扑鼻而来。刘大娘得意地说："这可是我特制的灵茶，用后山的灵泉水泡的，能提神醒脑。那些修士们都爱来我这喝上一杯再走。"',
    },
    {
      id: 'liu_rumor',
      topic: '打听最近的新鲜事',
      text: '刘大娘压低声音，兴致勃勃地说："你听说了吗？前些天丹老炼丹又炸炉了，把灵药阁的屋顶都掀了！还有啊，火灵儿公主又偷偷溜出城去了，火皇气得摔了好几个杯子。"',
    },
    {
      id: 'liu_advice',
      topic: '请教城里的事',
      text: '"在火皇城混，你得记住几件事：第一，别在城里惹事，烈山将军的拳头可不是吃素的；第二，去拍卖行买东西要货比三家，金算子那家伙精着呢；第三——"她神秘一笑："有空多来我这喝茶，消息最灵通。"',
    },
  ],
});

// 小武 - 演武场常客
registerNPC({
  id: 'xiao_wu',
  name: '小武',
  title: '好斗的修士',
  description: '一个二十出头的年轻人，穿着短打劲装，肌肉结实。脸上带着几道新伤，但双眼炯炯有神，浑身散发着战意。',
  greeting: '小武刚从擂台上下来，满头大汗，看到你眼睛一亮："嘿！新面孔！要不要上擂台切磋切磋？放心，我会手下留情的！"',
  roomId: 'fire_arena',
  dialogues: [
    {
      id: 'wu_battle',
      topic: '答应切磋',
      text: '你上了擂台，小武兴奋地大吼一声就扑了上来。几个回合后，你被他一记扫堂腿放倒。他伸手拉你起来："哈哈哈！不错不错，比那些软脚虾强多了！下次再来，我教你几招。"',
      condition: (p: IPlayer) => p.realm >= 2,
      onSelect: () => {
        const dmg = Math.floor(Math.random() * 20) + 10;
        return { messages: [`切磋结束，你掉了 ${dmg} 点气血，但学到了不少实战经验。`] };
      },
    },
    {
      id: 'wu_refuse',
      topic: '婉拒切磋',
      text: '小武有些失望地耸耸肩："好吧，下次有机会再说。对了，你要是想学几手，可以去找将军府的人，他们经常指点新人。"',
      condition: (p: IPlayer) => p.realm < 2,
    },
    {
      id: 'wu_gossip',
      topic: '聊聊演武场的事',
      text: '小武擦了擦汗，坐到一旁："这演武场每天都有不少人，我基本都认识。最厉害的是烈山将军，他要是下场，没人能撑过三招。不过最近他忙着守城，很少来了。"',
    },
    {
      id: 'wu_news',
      topic: '打听消息',
      text: '"我听说啊，火皇城最近在招募勇士，说是要探索百断山深处的一个遗迹。"小武兴奋地说："我肯定要去！你要是有兴趣，咱们可以组队。"',
    },
  ],
});

// 铁牛 - 士兵
registerNPC({
  id: 'tie_niu',
  name: '铁牛',
  title: '将军府士兵',
  description: '一个憨厚壮实的年轻士兵，穿着制式铠甲，站得笔直。但眼神中透着几分稚气，看起来刚入伍不久。',
  greeting: '铁牛看到你走近，有些紧张地握紧了手中的长枪："站……站住！此处是将军府重地，闲人免入！"话虽这么说，但他声音都在发抖。',
  roomId: 'fire_barracks',
  dialogues: [
    {
      id: 'tieniu_fluster',
      topic: '安慰他别紧张',
      text: '铁牛松了口气，不好意思地挠挠头："嘿嘿，我刚入伍没多久，还不太习惯……烈山将军说我了，说我太怂，不像个当兵的。可我就是忍不住紧张嘛。"',
    },
    {
      id: 'tieniu_food',
      topic: '聊军营伙食',
      text: '"军营里的饭还不错，虽然比不上我娘做的。"铁牛憨厚地笑了："我最喜欢吃炊事班老张炖的肉，听说那肉是从蛮荒之地猎来的铁甲兽，吃了能壮筋骨。"',
    },
    {
      id: 'tieniu_dream',
      topic: '问他的理想',
      text: '铁牛挺起胸膛："我最大的梦想就是能跟着烈山将军上战场，杀几只凶兽，立几个功，将来回家也能跟我爹娘吹吹牛！"说着又不好意思地笑了。',
    },
  ],
});

// 白衣书生
registerNPC({
  id: 'baiyi_shusheng',
  name: '白秋然',
  title: '白衣书生',
  description: '一个身着白衣的年轻男子，手持折扇，风度翩翩。眉宇间透着一股书卷气，但眼神中偶尔闪过的精光说明他并非表面看起来那么简单。',
  greeting: '白衣书生合上折扇，微微拱手："这位道友有礼了。在下白秋然，游历四方，途经此地。"',
  roomId: 'fire_auction',
  dialogues: [
    {
      id: 'baiyi_identity',
      topic: '问其来历',
      text: '白秋然轻摇折扇，微微一笑："在下来自东域的一个小家族，不值一提。此番游历，是想见识见识各地的风土人情，增长见闻。"',
    },
    {
      id: 'baiyi_book',
      topic: '聊书籍见闻',
      text: '"我最近在研读一本古籍，上面记载了上古时期的一些秘闻。"白秋然压低声音："其中提到，这片大地上曾经存在过比现在更辉煌的文明，只是不知为何湮灭了。"',
    },
    {
      id: 'baiyi_advice',
      topic: '请教见闻',
      text: '"以道友的修为，在火皇城已可立足。但若想更进一步，就需要去更危险的地方历练。"白秋然展开折扇："百断山只是开始，真正的强者，都在更广阔的天地中。"',
    },
  ],
});

// 盲眼算命先生
registerNPC({
  id: 'blind_fortuneteller',
  name: '盲眼先生',
  title: '算命先生',
  description: '一个瞎眼的老者，坐在城门口的地上，面前摆着一张破旧的布幡，上面写着"卜算天机"四个字。虽然眼睛看不见，但似乎能"看"到一些别人看不到的东西。',
  greeting: '盲眼先生抬起头，空洞的眼睛"望"向你："来了……我等你很久了。"',
  roomId: 'fire_gate',
  dialogues: [
    {
      id: 'fortune_tell',
      topic: '算一卦',
      text: '盲眼先生掐指算了片刻，突然皱起眉头："奇怪……你的命数很奇怪。按理说，你这样的人不该出现在这里。但既然来了，说明变数已经开始。记住——「水满则溢，月满则亏」。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 10) {
          p.gold -= 10;
          return { messages: ['你给了 10 枚原始币作为卦资。盲眼先生收起钱，低声说了一句："向北走，那里有你的机缘。"'] };
        }
        return { messages: ['盲眼先生摆摆手："卦资随心，不给也行。该说的我已经说了。"'] };
      },
    },
    {
      id: 'fortune_question',
      topic: '问他为什么在这里',
      text: '"我在等一个人。"盲眼先生淡淡地说："等一个能改变这片天地的人。是不是你，我也不知道。但命运的线，已经开始交织了。"',
    },
    {
      id: 'fortune_future',
      topic: '问未来的事',
      text: '盲眼先生摇摇头："未来不是用来问的，是用来走的。你问我明天会发生什么，我告诉你，不如你明天自己去看。"',
    },
  ],
});

// 灵药阁学徒
registerNPC({
  id: 'pharmacy_apprentice',
  name: '小药童',
  title: '灵药阁学徒',
  description: '一个十来岁的少年，穿着略大的丹袍，脸上沾着药渣。正在认真地研磨药材，嘴里念念有词。',
  greeting: '小药童抬头看了你一眼，又低头继续磨药："丹老在楼上炼丹，闲人勿扰……哦，你是客人啊？那随便看看，别碰那些名贵的药材就行。"',
  roomId: 'fire_pharmacy',
  dialogues: [
    {
      id: 'apprentice_work',
      topic: '问他学炼丹累不累',
      text: '小药童叹了口气："累啊！每天天不亮就要起来生炉子，研磨药材，打扫丹房。丹老脾气又大，一个不满意就骂人。不过……"他眼睛一亮："丹老确实有本事，我跟着他学了不少。"',
    },
    {
      id: 'apprentice_secret',
      topic: '打听丹老的秘密',
      text: '小药童左右看看，压低声音："我告诉你，你别到处说。丹老最近在研究一种新丹药，据说能让人突破瓶颈。但是材料太难找了，他天天愁得掉头发。"',
    },
  ],
});

// 演武场观众老张
registerNPC({
  id: 'lao_zhang',
  name: '老张',
  title: '看热闹的闲汉',
  description: '一个穿着普通的中年人，翘着二郎腿坐在演武场边，手里捧着一把瓜子，津津有味地看着擂台上的人打架。',
  greeting: '老张头也不回，眼睛盯着擂台："别挡着别挡着！正精彩呢！哎哟，这一拳打得好！"',
  roomId: 'fire_arena',
  dialogues: [
    {
      id: 'laozhang_comment',
      topic: '问他在看什么',
      text: '老张兴奋地指着擂台："看到那个穿蓝衣服的没？那是将军府的人，今天已经连胜五场了！啧啧，烈山将军带出来的人就是不一样。"',
    },
    {
      id: 'laozhang_gossip',
      topic: '闲聊',
      text: '老张嗑着瓜子，慢悠悠地说："我天天在这看，就没看腻过。昨天还有个女修士上台，把一个大汉打得满地找牙！哈哈哈，那场面，笑死我了。"',
    },
    {
      id: 'laozhang_advice',
      topic: '打听怎么变强',
      text: '"你想变强啊？"老张上下打量你："那就多上擂台打！输了不丢人，不敢打才丢人。我虽然只是个看热闹的，但我知道一个道理——拳头是打出来的，不是练出来的。"',
    },
  ],
});

// ===== 百断山新增 NPC =====

// 受伤的修士
registerNPC({
  id: 'wounded_monk',
  name: '刘元',
  title: '受伤的修士',
  description: '一个年轻修士靠在树边，腿上缠着染血的布条。脸色苍白，但看到有人来了，还是努力挤出一个笑容。',
  greeting: '年轻修士虚弱地抬起手："道友……请留步……我被凶兽袭击了，腿受了伤。能否……帮我去附近的猎户那里讨些伤药？"',
  roomId: 'hundred_breaks_path',
  dialogues: [
    {
      id: 'wounded_help',
      topic: '帮助他',
      text: '你帮刘元重新包扎了伤口，又给了他一些清水和干粮。他感激地说："多谢道友！在下刘元，火皇城人士。这次来百断山本想找些机缘，没想到遇到了铁甲兽，差点把命搭进去。"',
      onSelect: () => ({ messages: ['刘元感激涕零，连连道谢。他告诉你，前面不远处有一片灵草园，但被一只凶兽守着，如果你有实力可以去看看。'] }),
    },
    {
      id: 'wounded_warning',
      topic: '问前面有什么危险',
      text: '刘元脸色一白："前面有几只铁甲兽，皮糙肉厚，普通攻击根本打不动。我建议你绕道走密林那边，虽然远一些，但安全得多。"',
    },
    {
      id: 'wounded_advice',
      topic: '请教百断山经验',
      text: '"我也是第一次来百断山，不过我打听过了。"刘元喝了口水："山里的凶兽白天活动较少，晚上比较活跃。最好在白天赶路，傍晚前找安全的地方扎营。"',
    },
  ],
});

// 古墓盗贼
registerNPC({
  id: 'tomb_robber',
  name: '侯三',
  title: '鬼鬼祟祟的盗墓者',
  description: '一个瘦小的中年男子，穿着一身夜行衣，腰间挂满了各种工具——铁锹、绳索、钩爪。眼神闪烁，一看就不是正经人。',
  greeting: '侯三正在遗迹的角落里挖什么东西，听到动静猛地回头，手里攥着一把铲子，警惕地盯着你："你……你是谁？这里是我先发现的！"',
  roomId: 'hundred_breaks_ruins',
  dialogues: [
    {
      id: 'robber_deny',
      topic: '说你不是来抢东西的',
      text: '侯三稍微放松了些，但手里的铲子还是没放下："哼，算你识相。我侯三干这行二十年了，这遗迹里的东西，都是有主儿的——当然，主人早就死光了，所以归我了。"',
    },
    {
      id: 'robber_find',
      topic: '问他在挖什么',
      text: '侯三神秘兮兮地压低声音："我找到一个暗格，里面可能有好东西。不过机关太复杂，我不敢乱动。"他眼珠一转："要不咱们合作？你帮我破机关，得了宝贝五五分！"',
    },
    {
      id: 'robber_warning',
      topic: '劝他别盗墓了',
      text: '侯三不以为然地撇撇嘴："你懂什么？这遗迹里的东西，放着也是放着，不如让我拿去换钱。再说了——"他压低声音："这地方邪门得很，晚上经常有怪声，与其让那些东西烂在这里，不如让我带走研究研究。"',
    },
  ],
});

// 老药农
registerNPC({
  id: 'old_herbalist',
  name: '药农老翁',
  title: '隐居采药的老人',
  description: '一个白发苍苍的老人，背着一个巨大的竹篓，里面装满了各种珍稀草药。虽然年迈，但手脚麻利，在山路上健步如飞。',
  greeting: '老人正在小心翼翼地采摘一株长在悬崖边的金色草药，头也不回地说："别出声……这株金线莲我等了三年才等到它开花。"',
  roomId: 'hundred_breaks_dense',
  dialogues: [
    {
      id: 'herbalist_knowledge',
      topic: '请教草药知识',
      text: '老人得意地展示他的收获："这株金线莲，百年难得一见。还有这个——"他指着一株不起眼的灰色蘑菇："这叫隐息菇，吃了能暂时隐藏气息，躲避凶兽的追踪。"',
    },
    {
      id: 'herbalist_secret',
      topic: '问山里的秘密',
      text: '老人神秘地说："这百断山里有个秘密——在最深处有一处灵泉，泉水能洗筋伐髓。不过那地方有王者级凶兽守着，我这把老骨头可不敢去。"',
      condition: (p: IPlayer) => p.realm >= 3,
    },
    {
      id: 'herbalist_life',
      topic: '问他为什么隐居',
      text: '老人叹了口气："我年轻时也是火皇城灵药阁的药师，后来厌倦了城里的勾心斗角，就跑到山里来隐居了。山里清净，药草也多，比城里舒坦多了。"',
    },
  ],
});

// ===== 石城新增 NPC（生活气息） =====

// 周夫子 - 教书先生
registerNPC({
  id: 'zhou_fuzi',
  name: '周夫子',
  title: '私塾先生',
  description: '一位穿着青色长衫的老学究，手持戒尺，须发花白。虽然只是个私塾先生，但谈吐不凡，眼神中透着智慧。',
  greeting: '周夫子正在教几个孩童念书，见你来了，微微颔首："有朋自远方来，不亦乐乎。这位道友，可是来听老夫讲学的？"',
  roomId: 'stone_city_residential',
  dialogues: [
    {
      id: 'zhou_teach',
      topic: '听讲学',
      text: '周夫子清了清嗓子，开始讲道："天地之道，阴阳相生。修炼亦是如此，刚柔并济，方为正道。你可知为何许多修士卡在瓶颈难以突破？便是因为只知进不知退，只知刚不知柔。"',
      onSelect: () => ({ messages: ['听了周夫子一席话，你感觉对修炼之道有了新的领悟，修为略有精进。'] }),
    },
    {
      id: 'zhou_history',
      topic: '请教石城历史',
      text: '周夫子捋须道："石城虽小，但历史悠久。三百年前，火皇在此建城，以巨石筑墙，抵御蛮荒凶兽。城中的古祭坛，更是远在石城建城之前就存在了，据说是上古先民所建。"',
    },
    {
      id: 'zhou_children',
      topic: '问这些孩童',
      text: '周夫子慈爱地看着那些孩子："这些孩子都是石城居民的孩子，有的是猎户之子，有的是商贾之后。老夫虽不能教他们修炼之法，但教他们识字明理，也算尽一份心力。"',
    },
  ],
});

// 阿秀 - 豆腐西施
registerNPC({
  id: 'a_xiu',
  name: '阿秀',
  title: '豆腐西施',
  description: '一个容貌清丽的年轻女子，穿着素净的布衣，围裙上沾着水渍。面前的豆腐摊上摆着白嫩嫩的豆腐，散发着淡淡的豆香。',
  greeting: '阿秀见你走近，微微一笑："要买豆腐吗？今早刚做的，新鲜着呢。"',
  roomId: 'stone_city_market',
  dialogues: [
    {
      id: 'xiu_tofu',
      topic: '买块豆腐',
      text: '阿秀利落地切了一块豆腐，用荷叶包好递给你："拿好，三文钱。这豆腐是用后山的灵泉水做的，比普通豆腐好吃多了。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 3) {
          p.gold -= 3;
          return { messages: ['你尝了一口豆腐，口感嫩滑，带着淡淡的灵气，确实比普通豆腐好吃。'] };
        }
        return { messages: ['阿秀笑了笑："没关系，下次再来。"'] };
      },
    },
    {
      id: 'xiu_gossip',
      topic: '闲聊',
      text: '阿秀一边擦手一边说："你听说了吗？铁柱哥昨天又给小翠姐打了一把新匕首，说是让她采药时防身用。啧啧，铁柱哥那点心思，整条街的人都看出来了。"',
    },
    {
      id: 'xiu_life',
      topic: '问她的日子',
      text: '"我爹娘走得早，我一个人守着这个豆腐摊，日子虽然清苦，但也自在。"阿秀笑了笑："城里的修士们都很照顾我，尤其是石伯，经常帮我修摊子。"',
    },
  ],
});

// 老周头 - 巡夜人
registerNPC({
  id: 'lao_zhou',
  name: '老周头',
  title: '巡夜老人',
  description: '一个裹着旧棉袄的老头，手里提着一盏灯笼，腰间挂着一个铜锣。脸上布满皱纹，但精神矍铄，步伐稳健。',
  greeting: '老周头敲了敲铜锣，声音沙哑："天干物燥，小心火烛——"他看了你一眼："年轻人，这么晚了还在外面晃悠？"',
  roomId: 'stone_city_gate',
  dialogues: [
    {
      id: 'zhou_night',
      topic: '聊巡夜的事',
      text: '"我巡夜四十年了，风雨无阻。"老周头有些得意："这石城的一草一木，我都熟悉得很。哪家的狗爱叫，哪家的烟囱该修了，我都门儿清。"',
    },
    {
      id: 'zhou_strange',
      topic: '问最近有没有怪事',
      text: '老周头压低声音："前几天晚上，我在城墙上看到北边有金光闪过，一闪就没了。还有一次，我听到后山有奇怪的吼声，震得手里的灯笼都在晃。唉，这世道不太平啊。"',
    },
  ],
});

// 卖糖人的老李
registerNPC({
  id: 'tangren_li',
  name: '糖人李',
  title: '捏糖人的手艺人',
  description: '一个精瘦的老头，坐在小马扎上，面前摆着一个小炭炉和一口小锅。锅里熬着金黄色的糖稀，他手指翻飞，一个个栩栩如生的糖人就在他手中诞生了。',
  greeting: '糖人李头也不抬，专注地捏着手中的糖人："稍等稍等，这个马上就好……好了！"他举起一个栩栩如生的糖凤凰，满意地笑了。',
  roomId: 'stone_city_plaza',
  dialogues: [
    {
      id: 'tangren_buy',
      topic: '买个糖人',
      text: '糖人李咧嘴一笑："你想要什么样的？龙？凤？还是老虎？"他手指飞快地捏弄着糖稀，不一会儿就做出一个小巧玲珑的糖麒麟："这个送你了，好看又好吃！"',
      onSelect: () => ({ messages: ['你接过糖麒麟，不忍心吃，决定先收起来。糖人李的手艺确实精湛。'] }),
    },
    {
      id: 'tangren_skill',
      topic: '夸赞他的手艺',
      text: '糖人李得意地说："我这手艺是祖传的，我爷爷的爷爷就是给王公贵族捏糖人的。不过到了我这一辈，也就哄哄小孩子了。"他叹了口气，又笑了笑。',
    },
    {
      id: 'tangren_rumor',
      topic: '打听消息',
      text: '糖人李神秘兮兮地说："我在广场上摆摊，什么人都见过。昨天我看到几个穿黑袍的人从祭坛那边出来，脸色都不太好。守夜人那老家伙也在，好像在说什么「封印越来越弱了」。"',
    },
  ],
});

// 柳婶 - 洗衣妇
registerNPC({
  id: 'liu_shen',
  name: '柳婶',
  title: '河边洗衣的妇人',
  description: '一个壮实的中年妇人，挽着袖子，蹲在溪边用力搓洗着衣服。身边放着一个大木盆，里面堆满了衣物。',
  greeting: '柳婶抬头看了你一眼，又低头继续洗衣服："小伙子，帮我把那件衣裳拿过来——哎，算了，看你也不是干这活的料。"',
  roomId: 'stone_city_residential',
  dialogues: [
    {
      id: 'liushen_gossip',
      topic: '闲聊家常',
      text: '柳婶一边搓衣服一边絮叨："你说这日子，男人都跑去修炼了，家里的事全扔给女人。我那口子也是，非要去火皇城闯荡，结果呢？半年了，连个信儿都没有。"',
    },
    {
      id: 'liushen_advice',
      topic: '打听石城的事',
      text: '"你要是在石城长住，记住几件事：别得罪王胖子，那家伙表面上笑嘻嘻的，背地里心眼多着呢；多照顾照顾小翠的生意，那丫头不容易；还有——"她压低声音："晚上别去后山。"',
    },
  ],
});

// ===== 火皇城新增 NPC =====

// 赵掌柜 - 客栈老板
registerNPC({
  id: 'zhao_zhanggui',
  name: '赵掌柜',
  title: '悦来客栈掌柜',
  description: '一个圆脸的中年人，穿着一身干净的绸缎衣裳，手里拿着一把算盘。笑容可掬，一看就是做生意的老手。',
  greeting: '赵掌柜笑容满面地迎上来："客官住店？我们悦来客栈是火皇城最好的客栈，干净舒适，还有灵茶供应！"',
  roomId: 'fire_plaza',
  dialogues: [
    {
      id: 'zhao_inn',
      topic: '住店',
      text: '"一晚 5 枚原始币，包早中晚三餐，还有热水沐浴。"赵掌柜搓着手："你要是常住，可以给你打个折。我们这很多修士都常住，互相交流修炼心得，氛围可好了。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 5) {
          p.gold -= 5;
          p.hp = Math.min(p.hp + 50, p.maxHp);
          p.mana = Math.min(p.mana + 50, p.maxMana);
          return { messages: ['你在悦来客栈住了一晚，恢复了不少气血和法力。床铺很舒服，你睡了个好觉。'] };
        }
        return { messages: ['赵掌柜尴尬地笑了笑："没事没事，下次再来。"'] };
      },
    },
    {
      id: 'zhao_gossip',
      topic: '打听城里消息',
      text: '赵掌柜压低声音："最近城里来了不少生面孔，都是冲着百断山去的。听说那边出了个上古遗迹，好多修士都想去碰碰运气。不过依我看啊，没点本事去了也是送死。"',
    },
    {
      id: 'zhao_story',
      topic: '听他说故事',
      text: '"说起这火皇城啊，最有意思的就是火灵儿公主了。"赵掌柜笑着摇头："那丫头三天两头闯祸，上个月把丹老的丹炉踢翻了，上上个月差点把演武场点了。火皇拿她一点办法都没有。"',
    },
  ],
});

// 说书人张先生
registerNPC({
  id: 'storyteller_zhang',
  name: '张先生',
  title: '茶馆说书人',
  description: '一个穿着长衫的中年人，手里拿着一把折扇，面前放着一碗茶。眉飞色舞，声音洪亮，正唾沫横飞地讲着故事。',
  greeting: '张先生一拍醒木："话说那上古年间，天地初开，万族并立……"见你坐下，他点头示意："这位道友来得巧，正讲到精彩处！"',
  roomId: 'fire_plaza',
  dialogues: [
    {
      id: 'zhang_story1',
      topic: '听上古传说',
      text: '张先生一拍醒木，朗声道："话说上古时期，有一尊真仙降临荒域，一掌拍碎了百断山的主峰！那等神通，当真是惊天动地！"他喝了口茶："可惜啊，如今这个时代，连尊者都难寻了。"',
      onSelect: () => ({ messages: ['你听得入神，仿佛看到了上古时期的辉煌景象。'] }),
    },
    {
      id: 'zhang_story2',
      topic: '听英雄故事',
      text: '"要说这火皇城最出名的人物，那自然是火皇陛下了。"张先生摇着折扇："三十年前，火皇还是太子时，单枪匹马杀入百断山，斩杀了一头王者级凶兽，救出了被困的采药人。那一战，打得天昏地暗！"',
    },
    {
      id: 'zhang_advice',
      topic: '请教修炼之道',
      text: '张先生笑了笑："我一个说书的，哪懂什么修炼之道。不过书读多了，倒是明白一个道理——修炼如读书，贵在坚持。你看那些大能，哪个不是熬出来的？"',
    },
  ],
});

// 小张侍卫
registerNPC({
  id: 'xiaozhang_guard',
  name: '小张',
  title: '守城侍卫',
  description: '一个年轻的士兵，穿着崭新的铠甲，站得笔直。虽然努力装出严肃的样子，但眼神中透着年轻人的好奇和热忱。',
  greeting: '小张严肃地握着长枪，但声音有些紧张："站……站住！请出示通行令！"',
  roomId: 'fire_gate',
  dialogues: [
    {
      id: 'xiaozhang_relax',
      topic: '让他别紧张',
      text: '小张松了口气，不好意思地挠挠头："嘿嘿，我刚上岗没几天，还不太习惯。烈山将军说了，守城门要威严，可我总是装不像。"',
    },
    {
      id: 'xiaozhang_dream',
      topic: '问他的梦想',
      text: '小张眼睛一亮："我最大的梦想是加入烈山将军的亲卫队！不过我现在的修为还不够，得再练练。我每天下班后都去演武场看人切磋，学了不少招式。"',
    },
  ],
});

// 老乞丐
registerNPC({
  id: 'old_beggar',
  name: '老乞丐',
  title: '城门口的老乞丐',
  description: '一个蓬头垢面的老乞丐，蜷缩在城门口的角落里，面前放着一个破碗。虽然衣衫褴褛，但眼神清明，不像普通人。',
  greeting: '老乞丐伸出破碗，沙哑地说："行行好，给口饭吃吧……"',
  roomId: 'fire_gate',
  dialogues: [
    {
      id: 'beggar_give',
      topic: '施舍一些钱',
      text: '老乞丐接过钱，眼睛一亮，随即又恢复了那副可怜相："多谢好心人……"等旁人走远，他低声说："我看你面善，告诉你一个消息——百断山深处有座古洞府，但入口有禁制，需用「破禁符」才能打开。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 3) {
          p.gold -= 3;
          return { messages: ['你给了老乞丐 3 枚原始币。他神秘地告诉了你一个关于百断山的秘密。'] };
        }
        return { messages: ['你摸了摸口袋，没钱。老乞丐又缩回了角落。'] };
      },
    },
    {
      id: 'beggar_identity',
      topic: '问他的来历',
      text: '老乞丐笑了笑，露出一口黄牙："我？一个糟老头子罢了。年轻时也闯荡过，去过不少地方。后来嘛……老了，跑不动了，就在这儿混口饭吃。"',
    },
  ],
});

// 陈大娘 - 卖烧饼的
registerNPC({
  id: 'chen_daniang',
  name: '陈大娘',
  title: '烧饼摊主',
  description: '一个手脚麻利的中年妇人，面前摆着一个烤炉，正熟练地往炉壁上贴烧饼。烧饼的香味飘散在空气中，引得路人驻足。',
  greeting: '陈大娘热情地招呼："烧饼——刚出炉的烧饼——又香又脆的烧饼——小伙子来一个？"',
  roomId: 'fire_plaza',
  dialogues: [
    {
      id: 'chen_buy',
      topic: '买个烧饼',
      text: '陈大娘用油纸包了一个热腾腾的烧饼递给你："小心烫！这可是我独门秘方，用的是灵麦粉和山泉水，吃了能补气养血！"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 2) {
          p.gold -= 2;
          p.hp = Math.min(p.hp + 10, p.maxHp);
          return { messages: ['烧饼外酥里嫩，还带着一股淡淡的灵气，确实好吃。你感觉体力恢复了一些。'] };
        }
        return { messages: ['陈大娘笑了笑："没事，下次再来。"'] };
      },
    },
    {
      id: 'chen_gossip',
      topic: '闲聊',
      text: '陈大娘一边揉面一边说："你看到那边那个说书的张先生没？他讲的故事可好听了，我每天忙完了都要去听一段。不过这家伙最爱吹牛，说他自己见过真仙，谁信呢！"',
    },
  ],
});

// ===== 蛮荒之地新增 NPC =====

// 行脚商人马三
registerNPC({
  id: 'ma_san',
  name: '马三',
  title: '行脚商人',
  description: '一个风尘仆仆的中年汉子，赶着一头驮着货物的老驴。脸上满是风霜，但双眼有神，透着一股生意人的精明。',
  greeting: '马三正在路边歇脚，见你来了，热情地招手："道友！来来来，我这有从火皇城带来的好货，价格公道！"',
  roomId: 'wasteland_03',
  dialogues: [
    {
      id: 'masan_goods',
      topic: '看看有什么货',
      text: '马三麻利地打开一个包裹："这是火皇城的灵茶，提神醒脑；这是上好的金疮药，疗伤效果一流；还有这个——"他拿出一块玉佩："这是开了光的护身符，能辟邪。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 10) {
          p.gold -= 10;
          return { messages: ['你花了 10 枚原始币买了一包灵茶和一瓶金疮药。马三笑着说："道友走好，路上小心！"'] };
        }
        return { messages: ['马三也不介意："没事，下次再照顾我生意。"'] };
      },
    },
    {
      id: 'masan_news',
      topic: '打听路上的消息',
      text: '马三压低声音："我这一路走来，听说百断山那边出了大事。有修士在遗迹里发现了一卷上古宝术，结果走漏了风声，现在好多人都往那边赶。你也要去？那可得多加小心。"',
    },
    {
      id: 'masan_life',
      topic: '聊行商的日子',
      text: '"唉，这年头生意不好做啊。"马三叹气："蛮荒之地的凶兽越来越多了，每次走货都提心吊胆的。上个月我的一个同伴就被狼群袭击了，货全丢了，人差点没救回来。"',
    },
  ],
});

// 迷路的书生李清
registerNPC({
  id: 'li_qing',
  name: '李清',
  title: '迷路的书生',
  description: '一个穿着白色长衫的年轻书生，手里拿着一卷书，但神色慌张，四处张望。衣服上沾满了泥土和草屑，显然在路上摔了不少跤。',
  greeting: '书生看到你，如见救星："道……道友！救命啊！我迷路了！这到底是什么鬼地方？我怎么走了两天还没走出去？"',
  roomId: 'wasteland_04',
  dialogues: [
    {
      id: 'liqing_help',
      topic: '帮他指路',
      text: '李清感激涕零："多谢道友！我本是去火皇城投奔亲戚的，谁知走错了路，误入了这片蛮荒之地。要不是遇到你，我恐怕要葬身兽腹了。"',
      onSelect: () => ({ messages: ['你给李清指出了去火皇城的路。他千恩万谢地走了，临走时还送了你一本书作为谢礼。'] }),
    },
    {
      id: 'liqing_book',
      topic: '问他在看什么书',
      text: '李清举起手中的书："这是我祖传的一本古籍，记载了一些上古秘闻。我本想带着它去火皇城找人鉴定，结果……唉，不提了。"他翻开书页，上面画着一些奇怪的符文。',
    },
    {
      id: 'liqing_warning',
      topic: '问他路上看到了什么',
      text: '李清脸色一白："我……我在沼泽那边看到了一只巨大的怪物，浑身漆黑，眼睛像两个灯笼。它看了我一眼，我差点吓晕过去。幸好它没追我……"',
    },
  ],
});

// ===== 百断山新增 NPC =====

// 木道人 - 山中炼丹师
registerNPC({
  id: 'mu_daoren',
  name: '木道人',
  title: '隐居炼丹师',
  description: '一个清瘦的老道，穿着青色道袍，坐在山崖边的一块大石头上。面前摆着一座小丹炉，炉火正旺，药香四溢。',
  greeting: '木道人缓缓睁开眼，目光平静："此山是我开辟的丹房，道友若是路过，不妨稍坐片刻，品一品老夫炼制的新丹。"',
  roomId: 'hundred_breaks_mid',
  dialogues: [
    {
      id: 'mu_dan',
      topic: '品尝丹药',
      text: '木道人从丹炉中取出一枚温润的丹药："这是「清心丹」，能静心凝神，去除杂念。你且试试。"',
      onSelect: (p: IPlayer) => {
        p.cultivationExp = Math.min(p.cultivationExp + 50, p.maxCultivationExp);
        return { messages: ['你服下清心丹，只觉得神台清明，修为略有精进。'] };
      },
    },
    {
      id: 'mu_alchemy',
      topic: '请教炼丹之道',
      text: '木道人捋须道："炼丹之道，重在火候与心性。心浮气躁之人，永远炼不出上品丹药。"他指着丹炉："你看这炉火，看似猛烈，实则温而不燥，这才是炼丹的真谛。"',
    },
    {
      id: 'mu_history',
      topic: '问他的来历',
      text: '"老夫本是火皇城灵药阁的长老，因厌倦了俗世纷争，便隐居于此。"木道人淡然一笑："山中无岁月，一转眼就是二十年。这百断山的一草一木，我都了如指掌。"',
    },
  ],
});

// 百断山 - 采参人
registerNPC({
  id: 'cai_shen_ren',
  name: '孙把头',
  title: '采参把头',
  description: '一个精瘦的汉子，腰间挂着一根红绳，手里拿着一把药锄。眼神锐利，在山林间行走如履平地。',
  greeting: '孙把头正在一棵古树下挖掘什么，听到动静警惕地回头："谁？！"看清是你后放松了些："吓我一跳，我还以为是凶兽呢。"',
  roomId: 'hundred_breaks_dense',
  dialogues: [
    {
      id: 'suns_work',
      topic: '问他在挖什么',
      text: '孙把头得意地展示手中的收获："看，一株百年野山参！这玩意儿可遇不可求，我在这山里转了半个月才找到。"他小心翼翼地将人参包好："拿到火皇城能卖个好价钱。"',
    },
    {
      id: 'suns_danger',
      topic: '问山里的情况',
      text: '"这百断山啊，越往里走越危险。"孙把头摇头："我干了二十年采参，从来不敢深入。那些传说中的灵药虽然诱人，但也得有命享用才行。你要进山的话，听我一句劝——见好就收。"',
    },
  ],
});

// ===== 补天阁 NPC =====

// 补天阁主
registerNPC({
  id: 'butian_leader',
  name: '补天阁主',
  title: '补天阁掌门',
  description: '一个仙风道骨的中年男子，身穿白色长袍，头戴紫金冠，面容威严。举手投足间散发着强大的气息，令人不敢直视。',
  greeting: '补天阁主负手而立，目光深邃地看着远方，淡淡道："你来了。本座已等你多时。"',
  roomId: 'butian_ge_hall',
  dialogues: [
    {
      id: 'butian_identity',
      topic: '询问补天阁',
      text: '"补天阁立派八百年，传承自上古补天术。本座乃第八代阁主。"他转过身，目光如电："你能走到这里，说明有些本事。可愿入我补天阁？"',
    },
    {
      id: 'butian_advice',
      topic: '请教修炼',
      text: '"修炼一途，天赋固然重要，但心性更为关键。"补天阁主负手道："你根基尚可，但缺少系统的传承。若愿入阁，可去藏经阁选取功法。"',
      condition: (p: IPlayer) => p.realm < 5,
    },
    {
      id: 'butian_secret',
      topic: '询问上古秘闻',
      text: '补天阁主神色凝重："天地将有大变，古老的封印在松动。百断山下的遗迹，不过是冰山一角。你若想在這乱世中生存，需尽快提升实力。"',
      condition: (p: IPlayer) => p.realm >= 5,
    },
  ],
});

// 守阁长老
registerNPC({
  id: 'butian_elder',
  name: '霍长老',
  title: '守阁长老',
  description: '一个白发苍苍的老者，面容枯槁，但双目如电。身穿灰色长老袍，手中拄着一根黑铁拐杖，看似老迈，实则气息深沉。',
  greeting: '霍长老缓缓睁开眼，声音沙哑："年轻人，补天阁重地，不可乱闯。"',
  roomId: 'butian_ge_gate',
  dialogues: [
    {
      id: 'butian_elder_intro',
      topic: '询问补天阁情况',
      text: '"补天阁弟子三百，分为内门和外门。外门弟子在广场习武，内门弟子在藏经阁研习功法。"霍长老顿了顿："你若是想入阁，需通过考验。"',
    },
    {
      id: 'butian_elder_test',
      topic: '询问入门考验',
      text: '"考验很简单——去百断山猎杀一头铁甲兽，取回它的内丹。"霍长老淡淡地说："若是连这都做不到，就不必谈入阁的事了。"',
      condition: (p: IPlayer) => p.realm >= 2,
    },
    {
      id: 'butian_elder_warning',
      topic: '打听最近的事',
      text: '"最近百断山不太平，有几个弟子进去历练，至今未归。"霍长老皱眉："你若要去百断山，务必小心。山中似乎有异动。"',
    },
  ],
});

// 藏经阁执事
registerNPC({
  id: 'butian_librarian',
  name: '陈执事',
  title: '藏经阁执事',
  description: '一个戴着方巾的中年文士，正坐在藏经阁门口翻阅一本古籍。身边堆满了各种书卷，看起来是个饱学之士。',
  greeting: '陈执事头也不抬："藏经阁重地，非本阁弟子不得入内。"',
  roomId: 'butian_ge_library',
  dialogues: [
    {
      id: 'butian_lib_enter',
      topic: '请求入内查阅',
      text: '陈执事抬起头，打量你一番："你不是本阁弟子吧？不过……"他沉吟片刻："如果你能回答我一个问题，我可以破例让你进去一次。"',
      onSelect: () => ({ messages: ['陈执事问了你一个关于上古符文的问题，你勉强答了上来。他满意地点点头，让你进了藏经阁。'] }),
    },
    {
      id: 'butian_lib_books',
      topic: '问藏经阁有什么书',
      text: '"藏经阁共三层，一层存放基础功法，二层存放中级功法，三层……"陈执事压低声音："三层存放的是补天阁的镇阁之宝——「补天术」残卷。不过我劝你别打它的主意，有禁制守护。"',
    },
  ],
});

// 丹房长老
registerNPC({
  id: 'butian_dan_elder',
  name: '云长老',
  title: '补天阁丹房长老',
  description: '一个胖乎乎的老者，穿着宽大的丹袍，脸上总是笑眯眯的。身上散发着浓郁的丹药香味，手指被药草染成了暗褐色。',
  greeting: '云长老正在丹房忙碌，看到你咧嘴一笑："哎呀，来客人了！正好正好，我刚炼了一炉新丹，你来帮我尝尝。"',
  roomId: 'butian_ge_danfang',
  dialogues: [
    {
      id: 'butian_dan_taste',
      topic: '品尝丹药',
      text: '云长老塞给你一枚温热的丹药："这是「培元丹」，固本培元的好东西。外面卖的可没我这纯正！"',
      onSelect: (p: IPlayer) => {
        p.cultivationExp = Math.min(p.cultivationExp + 30, p.maxCultivationExp);
        p.hp = Math.min(p.hp + 20, p.maxHp);
        return { messages: ['你服下培元丹，一股暖流在体内流转，修为和气血都略有提升。'] };
      },
    },
    {
      id: 'butian_dan_chat',
      topic: '闲聊炼丹',
      text: '"炼丹啊，最重要的是开心。"云长老笑呵呵地说："有些人整天愁眉苦脸地炼丹，炼出来的丹都是苦的。你看我，每天都开开心心的，炼出来的丹都是甜的！"',
    },
  ],
});

// 补天阁小师弟
registerNPC({
  id: 'butian_xiaoshidi',
  name: '小松',
  title: '补天阁小师弟',
  description: '一个十二三岁的少年，穿着略显宽大的弟子服，脸上脏兮兮的，但眼睛明亮有神。手里拿着一把木剑，正在有模有样地练剑。',
  greeting: '小松看到你，好奇地跑过来："你是谁？是新来的师兄吗？太好了！终于有人陪我玩了！"',
  roomId: 'butian_ge_square',
  dialogues: [
    {
      id: 'xiaosong_play',
      topic: '陪他练剑',
      text: '小松兴奋地挥舞着木剑："师兄你看我这一招！"他笨拙地比划了几下："师父说我这招「仙人指路」使得不对，但我觉得挺好的呀！"',
      onSelect: () => ({ messages: ['你指点了一下小松的剑法，他开心得不得了，说以后要请你吃糖葫芦。'] }),
    },
    {
      id: 'xiaosong_life',
      topic: '问他在阁里的日子',
      text: '"补天阁可好了！"小松眼睛亮晶晶的："有好多师兄师姐，还有好吃的。不过霍长老好凶，我上次偷偷溜进藏经阁，被他抓到了，罚我抄了十遍门规。"',
    },
    {
      id: 'xiaosong_dream',
      topic: '问他的梦想',
      text: '"我以后要成为像阁主那样的大人物！"小松挺起胸膛："到时候我要去百断山深处看看，听说那里有宝藏！不过师父说我现在修为不够，得先练好基本功。"',
    },
  ],
});

// ===== 逐鹿书院 NPC =====

// 书院院长孟夫子
registerNPC({
  id: 'meng_fuzi',
  name: '孟夫子',
  title: '逐鹿书院院长',
  description: '一位须发皆白的老者，身穿素色长袍，手持竹简。面容慈祥，但眉宇间透着一股不怒自威的气势。',
  greeting: '孟夫子放下竹简，微笑道："有朋自远方来，不亦说乎。小友可是来我逐鹿书院求学的？"',
  roomId: 'zhulu_shuyuan_hall',
  dialogues: [
    {
      id: 'meng_intro',
      topic: '询问逐鹿书院',
      text: '"逐鹿书院立院五百年，以「教化天下」为己任。不同于那些闭门造车的宗门，我书院兼收并蓄，广纳贤才。"孟夫子捋须道。',
    },
    {
      id: 'meng_teach',
      topic: '请教学问',
      text: '"修炼之道，始于心，终于心。"孟夫子缓缓道："许多人一味追求力量的提升，却忽略了心性的修炼。须知，心不正则气不顺，气不顺则力不达。"',
      onSelect: () => ({ messages: ['孟夫子的话让你受益匪浅，你感觉对修炼之道有了更深的理解。'] }),
    },
    {
      id: 'meng_quest',
      topic: '请求任务',
      text: '"你若是想历练，可以去后山看看。最近有几只灵兽在那边作乱，伤了不少采药的弟子。"孟夫子沉吟道："若是你能解决此事，老夫必有重谢。"',
      condition: (p: IPlayer) => p.realm >= 3,
    },
  ],
});

// 教习陈先生
registerNPC({
  id: 'chen_jiaoxi',
  name: '陈教习',
  title: '武道教习',
  description: '一个身材魁梧的中年男子，穿着一身劲装，肌肉结实。脸上有几道伤疤，一看就是身经百战之人。',
  greeting: '陈教习正在指导弟子们练拳，看到你来了，大声道："新来的？去跑十圈热热身！"',
  roomId: 'zhulu_shuyuan_arena',
  dialogues: [
    {
      id: 'chen_teach',
      topic: '请教拳法',
      text: '陈教习摆开架势："看好了，这一招「开山拳」的要诀在于腰马合一！"他猛地一拳打出，拳风呼啸："你试试？"',
      onSelect: () => ({ messages: ['你跟着陈教习练了一会儿拳，感觉身体舒展了不少，气血也活跃了。'] }),
    },
    {
      id: 'chen_advice',
      topic: '请教战斗经验',
      text: '"战斗不是过家家，一招一式都关系到生死。"陈教习严肃地说："我年轻时在蛮荒之地历练，差点被一只铁甲兽撕成两半。从那以后我就明白了一个道理——永远不要轻视你的对手。"',
    },
  ],
});

// 藏书楼管理员
registerNPC({
  id: 'zhulu_librarian',
  name: '老书虫',
  title: '藏书楼管理员',
  description: '一个戴着老花镜的瘦小老头，坐在藏书楼门口，手里捧着一本厚厚的书。身边堆满了各种书籍，仿佛与书融为一体。',
  greeting: '老书虫从书堆中探出头来，推了推老花镜："唔……新面孔。来找书的？左转是功法区，右转是史书区，别走错了。"',
  roomId: 'zhulu_shuyuan_library',
  dialogues: [
    {
      id: 'zhulu_lib_books',
      topic: '找书看',
      text: '老书虫从书堆里抽出一本发黄的古籍："这本《荒域异闻录》记载了荒域各处的奇闻异事，对你应该有用。看完记得还回来。"',
      onSelect: () => ({ messages: ['你翻看《荒域异闻录》，里面记载了许多关于百断山、蛮荒之地和更远地域的传闻。'] }),
    },
    {
      id: 'zhulu_lib_secret',
      topic: '打听秘密',
      text: '老书虫压低声音："我告诉你一个秘密——藏书楼地下还有一层，里面存放着一些禁书。不过钥匙在孟夫子手里，你可别去打主意。"',
    },
  ],
});

// 书院大师兄
registerNPC({
  id: 'zhulu_dashixiong',
  name: '赵无极',
  title: '逐鹿书院大师兄',
  description: '一个二十多岁的青年，身材挺拔，面容俊朗。穿着书院弟子服，腰间挂着一柄长剑，英气逼人。',
  greeting: '赵无极正在树下打坐，看到你睁开眼睛："新来的师弟？欢迎欢迎。有什么不懂的可以问我。"',
  roomId: 'zhulu_shuyuan_hall',
  dialogues: [
    {
      id: 'zhaowu_guide',
      topic: '请教书院情况',
      text: '"书院目前有弟子五十余人，分为初级班和高级班。"赵无极耐心地介绍："陈教习负责武课，孟夫子负责文课。你要是想学东西，每天准时来听课就行。"',
    },
    {
      id: 'zhaowu_battle',
      topic: '请求切磋',
      text: '赵无极微微一笑："切磋？好啊，正好我也想活动活动筋骨。放心，我会手下留情的。"',
      condition: (p: IPlayer) => p.realm >= 3,
      onSelect: () => {
        const dmg = Math.floor(Math.random() * 25) + 15;
        return { messages: [`你和赵无极切磋了一番，他虽然留了手，但你仍然被压制得死死的。掉了 ${dmg} 点气血，但也学到了不少技巧。`] };
      },
    },
    {
      id: 'zhaowu_news',
      topic: '打听最近的消息',
      text: '"最近书院里都在议论百断山的事。"赵无极皱眉："据说有上古遗迹出世，已经有不少修士赶过去了。我打算过几天也去看看，你要不要一起？"',
    },
  ],
});

// 书院扫地老伯
registerNPC({
  id: 'zhulu_saodi',
  name: '老伯',
  title: '扫地老伯',
  description: '一个穿着朴素的老者，拿着一把竹扫帚，不紧不慢地扫着院子里的落叶。动作虽然缓慢，但每一步都很有节奏。',
  greeting: '老伯不紧不慢地扫着地，头也不抬："该扫的叶子总要扫，该走的路总要走的。年轻人，你也在找自己的路吗？"',
  roomId: 'zhulu_shuyuan_gate',
  dialogues: [
    {
      id: 'saodi_philosophy',
      topic: '听他说话',
      text: '老伯停下手中的扫帚，看着飘落的树叶："你看这叶子，春天发芽，夏天茂盛，秋天飘落，冬天归根。人生也是如此，有起有落，有盛有衰。"',
      onSelect: () => ({ messages: ['老伯的话虽然简单，但似乎蕴含着某种道理。你若有所思。'] }),
    },
    {
      id: 'saodi_secret',
      topic: '问他的来历',
      text: '老伯笑了笑："我在这书院扫了三十年的地了。来来往往的弟子，有的成了大人物，有的……唉，不提了。你既然来了，就好好学，别辜负了这大好时光。"',
    },
  ],
});
// 百断山入口 - 商人
registerNPC({
  id: 'mountain_merchant',
  name: '驼背老吴',
  title: '山脚杂货商',
  description: '一个驼背的老人，在百断山入口处支了个小摊，卖一些干粮、水、绳索和简易的伤药。虽然东西简陋，但在这种地方显得格外珍贵。',
  greeting: '驼背老吴看到你，热情地招呼："来来来，进山之前准备充分了没有？我这有干粮、清水、绳索、火折子，还有上好的金疮药！"',
  roomId: 'hundred_breaks_entrance',
  dialogues: [
    {
      id: 'merchant_buy',
      topic: '看看有什么好东西',
      text: '老吴麻利地给你介绍："这是蛮牛肉干，吃一块顶一天不饿；这是防虫粉，撒在身上能驱赶毒虫；还有这个——"他神秘地拿出一卷羊皮纸："这是百断山的简易地图，我花了好几年才画出来的。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 15) {
          p.gold -= 15;
          return { messages: ['你花了 15 枚原始币买了一份百断山地图。虽然画得粗糙，但至少能帮你认路。'] };
        }
        return { messages: ['你摸了摸口袋，钱不够。老吴也不介意："没事，下次再来。"'] };
      },
    },
    {
      id: 'merchant_gossip',
      topic: '打听进山的人',
      text: '老吴压低声音："最近进山的人不少啊。昨天还有一队火皇城的侍卫进去了，说是要探查什么遗迹。还有几个看起来不好惹的散修……总之，这山里最近热闹得很。"',
    },
    {
      id: 'merchant_advice',
      topic: '请教进山建议',
      text: '"第一次进百断山？那我劝你：第一，别贪心，见好就收；第二，带足干粮和水；第三——"老吴认真地竖起三根手指："天黑之前一定要找到安全的地方过夜，否则……"他做了个抹脖子的动作。',
    },
  ],
});
// ===== 石城集市新增 NPC =====

// 卖糖葫芦的小贩
registerNPC({
  id: 'stone_city_tanghulu',
  name: '糖葫芦张',
  title: '糖葫芦小贩',
  description: '一个中年汉子，肩上扛着一个草靶子，上面插满了红艳艳的糖葫芦。吆喝声响亮："糖葫芦——又甜又脆的糖葫芦——"',
  greeting: '糖葫芦张看到你，热情地招呼："来来来，刚出炉的糖葫芦，又甜又脆！"',
  roomId: 'stone_city_center',
  dialogues: [
    {
      id: 'tanghulu_buy',
      topic: '买一串糖葫芦',
      text: '你花了 2 枚原始币买了一串糖葫芦，咬一口酸甜可口，味道很好。',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 2) {
          p.gold -= 2;
          return { messages: ['你花了 2 枚原始币买了一串糖葫芦，咬一口酸甜可口，味道很好。'] };
        }
        return { messages: ['你摸了摸口袋，钱不够。'] };
      },
    },
    {
      id: 'tanghulu_gossip',
      topic: '闲聊',
      text: '糖葫芦张一边插糖葫芦一边说："今天生意不错，刚出炉的糖葫芦一会儿就卖完了。你看那边那个小姑娘，每天都来买一串，说是要送给铁柱哥。"',
    },
  ],
});

// 说书艺人
registerNPC({
  id: 'stone_city_storyteller',
  name: '李说书',
  title: '茶馆说书人',
  description: '一个穿着长衫的中年人，手里拿着一把折扇，面前放着一块醒木。正在唾沫横飞地讲着故事，周围围了一群听众。',
  greeting: '李说书看到你，一拍醒木："这位客官，来听一段故事吧！"',
  roomId: 'stone_city_center',
  dialogues: [
    {
      id: 'story_listen',
      topic: '听一段故事',
      text: '李说书一拍醒木："话说那火皇当年，单枪匹马杀入百断山，斩杀王者级凶兽，那场面……"他滔滔不绝地讲了起来，你听得入神。',
      onSelect: () => ({ messages: ['你听了一段精彩的故事，感觉心情舒畅。'] }),
    },
    {
      id: 'story_next',
      topic: '听下一段',
      text: '"且说那凶兽被杀后，火皇在百断山深处发现了一座古洞府……"李说书继续讲着，周围的人都聚精会神地听着。',
    },
  ],
});

// 卖艺的小姑娘
registerNPC({
  id: 'stone_city_performer',
  name: '小蝶',
  title: '卖艺姑娘',
  description: '一个约莫十五六岁的小姑娘，穿着鲜艳的衣裳，正在广场上表演杂耍。她身手灵活，翻着跟头，引得围观的人阵阵喝彩。',
  greeting: '小蝶看到你，停下表演，甜甜地一笑："这位大哥，来看表演吗？"',
  roomId: 'stone_city_center',
  dialogues: [
    {
      id: 'performer_watch',
      topic: '看表演',
      text: '小蝶表演了一套精彩的杂耍，翻跟头、抛彩球、转火圈，看得人眼花缭乱。表演结束后，她向观众鞠躬致谢。',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 5) {
          p.gold -= 5;
          return { messages: ['你给了 5 枚原始币赏钱，小蝶感激地看了你一眼，继续表演。'] };
        }
        return { messages: ['你欣赏了一场精彩的表演。'] };
      },
    },
    {
      id: 'performer_story',
      topic: '问她的来历',
      text: '小蝶擦了擦汗："我是从南边来的，家乡遭了灾，只能出来卖艺谋生。不过还好，大家都很照顾我，每天能挣几个钱，够吃饭了。"',
    },
  ],
});

// 算命先生
registerNPC({
  id: 'stone_city_fortuneteller',
  name: '半仙',
  title: '算命先生',
  description: '一个戴着墨镜的老者，坐在街边，面前摆着一张破旧的布幡，上面写着"铁口神算"四个字。手里拿着一根竹签，正在闭目推算。',
  greeting: '半仙睁开眼睛，神秘地一笑："这位道友，贫道观你印堂发亮，近日必有奇遇。要不要算一卦？"',
  roomId: 'stone_city_center',
  dialogues: [
    {
      id: 'fortune_divine',
      topic: '算一卦',
      text: '半仙让你抽了一根签，看了看："此签为吉。道友最近运势不错，有望在修炼上有所突破。记住，机会是留给有准备的人的。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 5) {
          p.gold -= 5;
          return { messages: ['你花了 5 枚原始币算了一卦，半仙的话让你若有所思。'] };
        }
        return { messages: ['半仙摆摆手："没钱？那就别算了。"'] };
      },
    },
    {
      id: 'fortune_rumor',
      topic: '打听消息',
      text: '半仙压低声音："我告诉你一个秘密……后山那个山洞里，好像有什么东西在发光。你要是敢去看看，说不定能捡到宝贝。"',
    },
  ],
});

// 卖药材的大妈
registerNPC({
  id: 'stone_city_herb_seller',
  name: '王大妈',
  title: '草药摊主',
  description: '一个慈眉善目的大妈，面前摆着一个竹篮，里面装满了各种草药。她正在热情地招呼着过往的行人。',
  greeting: '王大妈看到你，热情地招呼："小伙子，来看看草药吧？各种药材都有！"',
  roomId: 'stone_city_center',
  dialogues: [
    {
      id: 'herb_buy',
      topic: '看看草药',
      text: '王大妈热情地介绍："这是解毒草，遇到蛇毒时有用；这是清心花，泡茶喝可以静心凝神；这是止血草，外敷可以止血。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 5) {
          p.gold -= 5;
          return { messages: ['你花了 5 枚原始币买了一些草药。王大妈笑眯眯地说："以后常来啊！"'] };
        }
        return { messages: ['王大妈说："没钱也没关系，看看也行。"'] };
      },
    },
    {
      id: 'herb_gossip',
      topic: '闲聊',
      text: '王大妈一边整理草药一边说："你听说了吗？小翠那丫头最近好像有心上人了，天天往铁匠铺跑。铁柱那小子倒是木讷，还没开窍呢。"',
    },
  ],
});

// ===== 火皇城广场新增 NPC =====

// 卖艺的武师
registerNPC({
  id: 'fire_city_warrior',
  name: '铁虎',
  title: '街头武师',
  description: '一个身材魁梧的汉子，正在广场上表演硬气功。他运气于胸，胸口碎大石，引得围观的人阵阵叫好。',
  greeting: '铁虎看到你，大声道："这位道友，来看看我的硬气功！"',
  roomId: 'fire_plaza',
  dialogues: [
    {
      id: 'warrior_watch',
      topic: '看表演',
      text: '铁虎表演了胸口碎大石、铁头功等硬气功，看得人惊心动魄。表演结束后，他向观众抱拳致谢。',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 10) {
          p.gold -= 10;
          return { messages: ['你给了 10 枚原始币赏钱，铁虎感激地看了你一眼。'] };
        }
        return { messages: ['你欣赏了一场精彩的硬气功表演。'] };
      },
    },
    {
      id: 'warrior_challenge',
      topic: '挑战他',
      text: '铁虎眼睛一亮："挑战？好！我正好手痒了。不过拳脚无眼，伤了可别怨我。"',
      condition: (p: IPlayer) => p.realm >= 2,
      onSelect: () => {
        const win = Math.random() > 0.4;
        return { messages: win ? ['你击败了铁虎！他敬佩地说："你是一个真正的勇士！"'] : ['铁虎轻松击败了你。他笑着说："继续努力！"'] };
      },
    },
  ],
});

// 卖香囊的姑娘
registerNPC({
  id: 'fire_city_perfume',
  name: '香儿',
  title: '香囊摊主',
  description: '一个清秀的姑娘，面前摆着一个小木盒，里面放着各种精美的香囊。香囊散发着淡淡的香气，吸引了不少女修士驻足。',
  greeting: '香儿看到你，微微一笑："这位道友，来看看香囊吧？都是我亲手做的。"',
  roomId: 'fire_plaza',
  dialogues: [
    {
      id: 'perfume_buy',
      topic: '买一个香囊',
      text: '香儿拿出一个精致的香囊："这是用灵草制成的，能提神醒脑，还能防虫。只要 10 枚原始币。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 10) {
          p.gold -= 10;
          return { messages: ['你花了 10 枚原始币买了一个香囊，香气宜人。'] };
        }
        return { messages: ['香儿笑了笑："没钱也没关系，看看也行。"'] };
      },
    },
    {
      id: 'perfume_story',
      topic: '问她的来历',
      text: '香儿轻声说："我是火皇城本地人，从小就喜欢制作香囊。这些香囊都是我自己做的，用的都是上好的灵草。"',
    },
  ],
});

// 说书人
registerNPC({
  id: 'fire_city_storyteller',
  name: '周说书',
  title: '广场说书人',
  description: '一个穿着华丽的中年人，手里拿着一把折扇，面前放着一块醒木。正在唾沫横飞地讲着上古传说，周围围了一群听众。',
  greeting: '周说书看到你，一拍醒木："这位客官，来听一段上古传说吧！"',
  roomId: 'fire_plaza',
  dialogues: [
    {
      id: 'fire_story_listen',
      topic: '听一段故事',
      text: '周说书一拍醒木："话说那上古年间，真仙降临荒域，一掌拍碎百断山主峰……"他滔滔不绝地讲了起来，你听得入神。',
      onSelect: () => ({ messages: ['你听了一段精彩的上古传说。'] }),
    },
  ],
});

// ===== 地图通用NPC注册（补充地图蓝图中引用的NPC） =====

// 石城守卫
registerNPC({
  id: 'stone_city_guard_south',
  name: '石头',
  title: '南门守卫',
  description: '一个身材高大的士兵，穿着制式铠甲，手持长枪，站在南门守卫。眼神锐利，警惕地观察着来往的行人。',
  greeting: '石头看到你，严肃地说："站住！出示身份！"',
  roomId: 'stone_city_gate_south',
  dialogues: [
    {
      id: 'guard_check',
      topic: '出示身份',
      text: '石头检查了你的身份，点点头："原来是道友。城内禁止私斗，违者重罚。你要是有什么事，可以去城主府找石伯。"',
    },
    {
      id: 'guard_news',
      topic: '打听消息',
      text: '"最近城外不太平，凶兽越来越多了。城主已经下令加强戒备，你出城的时候也要小心。"',
    },
  ],
});

registerNPC({
  id: 'stone_city_guard_north',
  name: '铁柱',
  title: '北门守卫',
  description: '一个精壮的士兵，穿着制式铠甲，手持长枪，站在北门守卫。',
  greeting: '铁柱看到你，点点头："道友要出城？城北是蛮荒之地，小心点。"',
  roomId: 'stone_city_gate_north',
  dialogues: [
    {
      id: 'north_guard_check',
      topic: '出示身份',
      text: '铁柱检查了你的身份，点点头："原来是道友。城北是蛮荒之地，出去的时候小心点。"',
    },
  ],
});

registerNPC({
  id: 'stone_city_guard_east',
  name: '阿虎',
  title: '东门守卫',
  description: '一个年轻的士兵，穿着制式铠甲，手持长枪，站在东门守卫。',
  greeting: '阿虎看到你，微微一笑："道友进城？城东很安全。"',
  roomId: 'stone_city_gate_east',
  dialogues: [
    {
      id: 'east_guard_check',
      topic: '出示身份',
      text: '阿虎检查了你的身份，点点头："原来是道友。城东是居民区，很安全。"',
    },
  ],
});

registerNPC({
  id: 'stone_city_guard_west',
  name: '大壮',
  title: '西门守卫',
  description: '一个魁梧的士兵，穿着制式铠甲，手持长枪，站在西门守卫。',
  greeting: '大壮看到你，点点头："道友要出城？城西是蛮荒之地，小心点。"',
  roomId: 'stone_city_gate_west',
  dialogues: [
    {
      id: 'west_guard_check',
      topic: '出示身份',
      text: '大壮检查了你的身份，点点头："原来是道友。城西是蛮荒之地，出去的时候小心点。"',
    },
  ],
});

// 石城居民
registerNPC({
  id: 'stone_city_shopkeeper',
  name: '张老板',
  title: '杂货铺老板',
  description: '一个精明的商人，站在杂货铺门口，热情地招呼着顾客。',
  greeting: '张老板看到你，热情地招呼："道友，来看看有什么需要的？"',
  roomId: 'stone_city_main_south',
  dialogues: [
    {
      id: 'shop_goods',
      topic: '看看有什么货',
      text: '张老板热情地介绍："我这有各种日用品、工具、药材，应有尽有！道友想要什么？"',
    },
  ],
});

registerNPC({
  id: 'stone_city_passerby',
  name: '路人甲',
  title: '路人',
  description: '一个普通的路人，正在街上闲逛。',
  greeting: '路人甲看了你一眼，点点头："道友好。"',
  roomId: 'stone_city_main_south',
  dialogues: [
    {
      id: 'passerby_chat',
      topic: '闲聊',
      text: '路人甲看了你一眼："道友也是来石城的？石城虽小，但很热闹。你可以去集市看看，那里什么都有。"',
    },
  ],
});

registerNPC({
  id: 'stone_city_elder',
  name: '陈老',
  title: '城中老者',
  description: '一个白发苍苍的老者，正在广场上晒太阳。',
  greeting: '陈老看到你，微微一笑："年轻人，来坐坐。"',
  roomId: 'stone_city_center',
  dialogues: [
    {
      id: 'elder_story',
      topic: '听他讲故事',
      text: '陈老缓缓道："我在石城住了五十年了，看着石城一天天变样。以前这里只是个小村庄，现在已经成了一座城镇了。"',
    },
  ],
});

registerNPC({
  id: 'stone_city_town_crier',
  name: '老王',
  title: '镇中更夫',
  description: '一个中年男子，手里拿着一面小锣，正在街上敲锣报时。',
  greeting: '老王敲了敲锣："各位注意防火防盗！"',
  roomId: 'stone_city_center',
  dialogues: [
    {
      id: 'crier_time',
      topic: '问时间',
      text: '老王敲了敲锣："现在是巳时三刻！各位注意防火防盗！"',
    },
  ],
});

registerNPC({
  id: 'stone_city_priest',
  name: '柳道长',
  title: '祭灵祠道士',
  description: '一个穿着道袍的道士，正在祭灵祠中主持祭祀。',
  greeting: '柳道长看到你，点点头："道友有礼了。"',
  roomId: 'stone_city_temple',
  dialogues: [
    {
      id: 'priest_pray',
      topic: '参拜祭灵',
      text: '柳道长点点头："道友有心了。柳神保佑你平安顺遂。"',
    },
  ],
});

registerNPC({
  id: 'stone_city_temple_guard',
  name: '小方',
  title: '祠前守卫',
  description: '一个年轻的士兵，正在祭灵祠前守卫。',
  greeting: '小方看到你，点点头："道友要进祠堂？请便。"',
  roomId: 'stone_city_temple',
  dialogues: [
    {
      id: 'temple_guard_check',
      topic: '进入祠堂',
      text: '小方点点头："请进吧，祠内安静，请勿喧哗。"',
    },
  ],
});

registerNPC({
  id: 'stone_city_magistrate',
  name: '王大人',
  title: '镇长',
  description: '一个穿着官服的中年人，正在镇公所处理政务。',
  greeting: '王大人看到你，点点头："道友有什么事？"',
  roomId: 'stone_city_yamen',
  dialogues: [
    {
      id: 'magistrate_business',
      topic: '请求办事',
      text: '王大人点点头："道友有什么事？本镇虽小，但一应俱全。你可以去集市购买所需，也可以去后山历练。"',
    },
  ],
});

registerNPC({
  id: 'stone_city_clerk',
  name: '刘师爷',
  title: '文书',
  description: '一个戴着眼镜的中年人，正在处理公文。',
  greeting: '刘师爷推了推眼镜："道友有什么事？"',
  roomId: 'stone_city_yamen',
  dialogues: [
    {
      id: 'clerk_help',
      topic: '询问事务',
      text: '刘师爷推了推眼镜："道友有什么事？我可以帮你办理户籍、通行证等事务。"',
    },
  ],
});

registerNPC({
  id: 'stone_city_drummer',
  name: '老周',
  title: '鼓楼鼓手',
  description: '一个老者，正在鼓楼值班。',
  greeting: '老周看到你，点点头："道友有事？"',
  roomId: 'stone_city_drum',
  dialogues: [
    {
      id: 'drummer_time',
      topic: '问时间',
      text: '老周看了看日晷："现在是午时。击鼓报时，提醒城中百姓吃饭休息。"',
    },
  ],
});

registerNPC({
  id: 'stone_city_blacksmith',
  name: '铁师傅',
  title: '铁匠',
  description: '一个精壮的汉子，正在铁匠铺打铁。',
  greeting: '铁师傅擦了擦汗："道友要打兵器？"',
  roomId: 'stone_city_blacksmith',
  dialogues: [
    {
      id: 'blacksmith_weapon',
      topic: '打造兵器',
      text: '铁师傅擦了擦汗："道友需要什么兵器？刀、剑、斧、锤，我都能打！"',
    },
  ],
});

registerNPC({
  id: 'stone_city_doctor',
  name: '李大夫',
  title: '药铺大夫',
  description: '一个穿着药袍的老者，正在药铺坐诊。',
  greeting: '李大夫看到你，点点头："道友哪里不舒服？"',
  roomId: 'stone_city_herbal',
  dialogues: [
    {
      id: 'doctor_treat',
      topic: '看病',
      text: '李大夫看了看你的脉象："道友气血尚可，只是有些疲劳。吃几副药调理一下就好了。"',
    },
  ],
});

registerNPC({
  id: 'stone_city_innkeeper',
  name: '孙掌柜',
  title: '客栈老板',
  description: '一个圆脸的中年人，正在客栈招呼客人。',
  greeting: '孙掌柜看到你，热情地招呼："客官住店还是吃饭？"',
  roomId: 'stone_city_inn',
  dialogues: [
    {
      id: 'inn_stay',
      topic: '住店',
      text: '孙掌柜热情地说："客官住店？我们客栈干净舒适，价格公道！一晚 5 枚原始币。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 5) {
          p.gold -= 5;
          return { messages: ['你在客栈住了一晚，休息得很好。'] };
        }
        return { messages: ['孙掌柜说："没钱？那下次再来。"'] };
      },
    },
  ],
});

registerNPC({
  id: 'stone_city_tavern_keeper',
  name: '赵老板',
  title: '酒馆老板',
  description: '一个豪爽的汉子，正在酒馆招呼客人。',
  greeting: '赵老板看到你，大声道："来，喝一杯！"',
  roomId: 'stone_city_tavern',
  dialogues: [
    {
      id: 'tavern_drink',
      topic: '喝一杯',
      text: '赵老板给你倒了一杯酒："来，喝一杯！这是我珍藏的美酒，味道很好！"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 3) {
          p.gold -= 3;
          return { messages: ['你喝了一杯美酒，感觉心情舒畅。'] };
        }
        return { messages: ['赵老板说："没钱？那喝杯茶吧，免费的。"'] };
      },
    },
  ],
});

registerNPC({
  id: 'stone_city_drunkard',
  name: '酒鬼',
  title: '醉汉',
  description: '一个醉醺醺的汉子，正在酒馆喝酒。',
  greeting: '酒鬼打了个酒嗝："嗝……你也是来喝酒的？"',
  roomId: 'stone_city_tavern',
  dialogues: [
    {
      id: 'drunkard_talk',
      topic: '闲聊',
      text: '酒鬼打了个酒嗝："嗝……你也是来喝酒的？好！来，干杯！"',
    },
  ],
});

registerNPC({
  id: 'stone_city_resident',
  name: '张婶',
  title: '居民',
  description: '一个中年妇人，正在居民区门口晒太阳。',
  greeting: '张婶看到你，热情地招呼："年轻人，来坐坐。"',
  roomId: 'stone_city_residential',
  dialogues: [
    {
      id: 'resident_chat',
      topic: '闲聊',
      text: '张婶热情地说："道友是新来的吧？石城虽然小，但很热闹。你可以去集市看看，那里什么都有。"',
    },
  ],
});

registerNPC({
  id: 'stone_city_child',
  name: '小石头',
  title: '孩童',
  description: '一个七八岁的小男孩，正在居民区玩耍。',
  greeting: '小石头看到你，兴奋地跑过来："大哥哥，陪我玩一会儿吧！"',
  roomId: 'stone_city_residential',
  dialogues: [
    {
      id: 'child_play',
      topic: '陪他玩',
      text: '小石头开心地说："大哥哥，陪我玩一会儿吧！"',
      onSelect: () => ({ messages: ['你陪小石头玩了一会儿，他很开心。'] }),
    },
  ],
});

registerNPC({
  id: 'stone_city_bath_attendant',
  name: '澡堂伙计',
  title: '澡堂伙计',
  description: '一个年轻的伙计，正在澡堂门口招呼客人。',
  greeting: '澡堂伙计看到你，热情地招呼："客官洗澡？里面请！"',
  roomId: 'stone_city_bath',
  dialogues: [
    {
      id: 'bath_enter',
      topic: '洗澡',
      text: '澡堂伙计说："客官洗澡？一位 3 枚原始币，里面有热水池和冷水池。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 3) {
          p.gold -= 3;
          return { messages: ['你在澡堂洗了个澡，感觉浑身舒爽。'] };
        }
        return { messages: ['澡堂伙计说："没钱？那下次再来。"'] };
      },
    },
  ],
});

registerNPC({
  id: 'stone_city_market_vendor',
  name: '李小贩',
  title: '小贩',
  description: '一个中年汉子，正在集市上摆摊卖货。',
  greeting: '李小贩看到你，热情地招呼："来看看，新鲜的水果！"',
  roomId: 'stone_city_market',
  dialogues: [
    {
      id: 'vendor_goods',
      topic: '看看有什么货',
      text: '李小贩热情地介绍："我这有各种新鲜的水果、蔬菜、肉类，应有尽有！"',
    },
  ],
});

registerNPC({
  id: 'stone_city_beggar',
  name: '乞丐',
  title: '乞丐',
  description: '一个衣衫褴褛的乞丐，正在集市上乞讨。',
  greeting: '乞丐看到你，伸出手："好心人，给点钱吧。"',
  roomId: 'stone_city_market',
  dialogues: [
    {
      id: 'beggar_give',
      topic: '施舍',
      text: '乞丐感激地说："多谢好心人！祝你身体健康，万事如意！"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 1) {
          p.gold -= 1;
          return { messages: ['你给了乞丐 1 枚原始币，他感激地看着你。'] };
        }
        return { messages: ['乞丐叹了口气："唉，这年头，好心人不多了。"'] };
      },
    },
  ],
});

registerNPC({
  id: 'mysterious_old',
  name: '无名老者',
  title: '百断山引路人',
  description: '一个衣衫褴褛的老者，坐在路边石头上，手里拿着一根竹杖。看似平平无奇，但细看之下，他周围的空间似乎有些扭曲。',
  greeting: '老者抬头看了你一眼，浑浊的眼睛深处闪过一丝精光："年轻人，也是来百断山碰运气的？"',
  roomId: 'hundred_breaks_entrance',
  dialogues: [
    {
      id: 'mysterious_intro',
      topic: '询问百断山',
      text: '"百断山，顾名思义，山有百断，每一断都是一道险关。但危机与机遇并存，山中多古遗迹，曾有修士在此获得上古传承，一步登天。"',
    },
    {
      id: 'mysterious_warning',
      topic: '询问危险',
      text: '"山中凶兽众多，且越深处越强。最深处甚至有「王者级」凶兽盘踞。你若没有列阵境的修为，最好不要深入。"',
      condition: (p: IPlayer) => p.realm < 4,
    },
    {
      id: 'mysterious_hint',
      topic: '请求指点',
      text: '"老夫在此多年，略知一二。山中有一处飞瀑，瀑布后藏着一座洞府。能不能找到，就看你的机缘了。"',
      condition: (p: IPlayer) => p.realm >= 3,
    },
  ],
});

// ===== 柳神 - 小说核心角色 =====
registerNPC({
  id: 'liu_shen',
  name: '柳神',
  title: '柳树神',
  description: '一株巨大的柳树，树干粗壮，枝叶繁茂。柳条轻轻摆动，散发着柔和的绿光。树身上有许多眼睛，每一只都深邃如星辰。这是传说中的柳神，曾是上界的至尊强者。',
  greeting: '柳神的声音轻柔如春风："小友，你终于来了。我等你很久了。"',
  roomId: 'stone_city_temple',
  dialogues: [
    {
      id: 'liushen_intro',
      topic: '询问柳神来历',
      text: '"我曾是上界的至尊，名为柳神。因某些原因陨落，魂魄寄托于这株柳树之中。"柳神的声音带着一丝沧桑："此地是我选择的安息之地，没想到……你找到了这里。"',
    },
    {
      id: 'liushen_teach',
      topic: '请求传授宝术',
      text: '"宝术？你倒是有眼光。"柳神微微一笑："我这里有一门「柳神法」，是我毕生所学。此术可模仿任何见过的宝术，威力无穷。不过……你可有足够的悟性？"',
      condition: (p: IPlayer) => p.realm >= 3,
      onSelect: (p: IPlayer) => {
        return { messages: ['柳神传授了你「柳神法」！这是一门可模仿万物的至尊宝术，你感到一股浩瀚的力量涌入脑海。'] };
      },
    },
    {
      id: 'liushen_advice',
      topic: '请教修炼之道',
      text: '"修炼之道，在于顺应自然，而非强求。"柳神的柳条轻轻摆动："你看这柳树，春天发芽，夏天生长，秋天落叶，冬天休眠。修炼也是如此，有张有弛，方能长久。"',
      onSelect: () => ({ messages: ['柳神的话让你豁然开朗，你感觉对修炼之道有了更深的理解。'] }),
    },
    {
      id: 'liushen_future',
      topic: '询问未来',
      text: '柳神沉默片刻："你的未来……充满了变数。我看到了一些模糊的画面，你将经历无数生死考验，但最终会走向一条伟大的道路。记住——「以身为炉，以心为火，以道为药」。"',
    },
    {
      id: 'liushen_blessing',
      topic: '请求赐福',
      text: '"赐福？你的路需要自己走，旁人无法代劳。"柳神温和地说："不过……我可以给你一滴「柳神之泪」，关键时刻或许能保你一命。"',
      condition: (p: IPlayer) => p.realm >= 2,
      onSelect: () => ({ messages: ['柳神赐予你一滴「柳神之泪」！这滴泪水蕴含着柳神的力量，关键时刻可保你一命。'] }),
    },
  ],
});

// ===== 小塔 - 小说核心角色 =====
registerNPC({
  id: 'xiao_ta',
  name: '小塔',
  title: '神秘塔灵',
  description: '一座巴掌大小的九层宝塔，悬浮在空中。塔身散发着淡淡的金光，塔身上刻满了神秘的符文。塔的顶端有一只小小的眼睛，正好奇地打量着你。这是传说中的小塔，来历神秘，实力深不可测。',
  greeting: '小塔发出清脆的童音："叽叽喳喳！又来一个小家伙！你身上的气息……很特别哦！"',
  roomId: 'hundred_breaks_peak',
  dialogues: [
    {
      id: 'xiaota_intro',
      topic: '询问小塔来历',
      text: '"来历？我忘了……"小塔歪了歪头："我只记得我很厉害很厉害！以前好像有好多大人物抢着要我呢！不过我跑出来了，在这里睡了好多年。"',
    },
    {
      id: 'xiaota_help',
      topic: '请求小塔帮忙',
      text: '"帮忙？可以啊！"小塔开心地转了几圈："不过你得给我找些好东西吃！比如……灵晶、神源什么的。我饿了好多好多年了！"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 50) {
          p.gold -= 50;
          return { messages: ['你给了小塔 50 枚原始币。小塔开心地吞了下去，金光一闪："好吃！以后你就是我的朋友了！有什么事叫我！"'] };
        }
        return { messages: ['小塔失望地说："没钱啊……那算了，等你有钱了再来找我吧。"'] };
      },
    },
    {
      id: 'xiaota_teach',
      topic: '请求小塔传授法则',
      text: '"法则？那是什么好吃的吗？"小塔歪着头想了想："哦！你说那个啊！我会空间法则哦！我教你怎么瞬移，很快很快的！"',
      condition: (p: IPlayer) => p.realm >= 5,
      onSelect: () => ({ messages: ['小塔传授了你「空间法则」的入门知识！你感觉对空间有了新的理解。'] }),
    },
    {
      id: 'xiaota_story',
      topic: '听小塔讲故事',
      text: '"我以前啊，跟着一个很厉害很厉害的人！"小塔兴奋地说："他能一拳打穿星空！不过后来……他不见了。我找了好久好久都没找到他。你见过他吗？他叫……叫什么来着……我忘了！"',
    },
    {
      id: 'xiaota_protect',
      topic: '请求小塔保护',
      text: '"保护你？没问题！"小塔拍着胸脯（虽然它没有胸脯）："谁敢欺负你，我就把他收进塔里！我的塔里可大了，能装好多好多东西！"',
    },
  ],
});

// ===== 曹雨生 - 小说核心角色 =====
registerNPC({
  id: 'cao_yusheng',
  name: '曹雨生',
  title: '胖子',
  description: '一个圆滚滚的胖子，穿着一身华丽的衣裳，手里拿着一把扇子。脸上总是挂着笑容，看起来人畜无害，但眼神深处透着精明。他是石昊的好友，后来转世为段德。',
  greeting: '曹雨生看到你，眼睛一亮："哎哟！这位道友面生啊！来来来，认识一下，在下曹雨生，人称雨仙！"',
  roomId: 'fire_plaza',
  dialogues: [
    {
      id: 'caoyusheng_intro',
      topic: '自我介绍',
      text: '"曹雨生，就是我！"胖子得意地说："你可能没听过我的名字，但你一定听说过雨仙！没错，就是我！我可是未来要成仙的男人！"',
    },
    {
      id: 'caoyusheng_gamble',
      topic: '和他赌一把',
      text: '"赌一把？好啊好啊！"曹雨生眼睛放光："我们来猜骰子！输了的请喝酒！来来来，开赌开赌！"',
      onSelect: () => {
        const win = Math.random() > 0.5;
        return { messages: win ? ['你赢了！曹雨生一脸肉痛地请你喝了一杯酒。'] : ['你输了！曹雨生得意地笑着："哈哈哈，愿赌服输，喝酒喝酒！"'] };
      },
    },
    {
      id: 'caoyusheng_news',
      topic: '打听消息',
      text: '"消息？我曹雨生别的没有，消息最多！"曹雨生压低声音："我听说百断山深处有一座古墓，里面可能有太古传承。不过那地方邪门得很，进去的人没几个活着出来的。"',
    },
    {
      id: 'caoyusheng_adventure',
      topic: '邀请一起冒险',
      text: '"一起冒险？好主意！"曹雨生一拍大腿："我正好想去百断山看看，有你陪着，安全多了。不过丑话说在前头，宝贝要五五分！"',
      condition: (p: IPlayer) => p.realm >= 2,
    },
    {
      id: 'caoyusheng_story',
      topic: '听他吹牛',
      text: '"想当年，我曹雨生在火皇城那也是一号人物！"曹雨生唾沫横飞："我曾经和火皇喝过酒，和丹老聊过炼丹，和……哎呀，不说了，好汉不提当年勇！"',
    },
  ],
});

// ===== 石昊父母 =====
registerNPC({
  id: 'shi_zhongtian',
  name: '石中天',
  title: '石昊祖父',
  description: '一个身材高大的中年男子，面容刚毅，眼神锐利如鹰。身穿黑色铠甲，腰间挂着一柄石斧。他是石族的先祖，曾是石城最强大的修士之一。',
  greeting: '石中天正在院中修炼，见你来了，停下动作："你来了。我一直在等你。"',
  roomId: 'stone_city_residential',
  dialogues: [
    {
      id: 'shizhongtian_intro',
      topic: '询问石中天',
      text: '"我是石中天，石族的先祖。"石中天目光深邃："当年我外出历练，多年未归，没想到石城已经变成了这个样子。"',
    },
    {
      id: 'shizhongtian_training',
      topic: '请求指点修炼',
      text: '"修炼之道，在于体魄和意志。"石中天挥舞着石斧："你看这石斧，看似沉重，但在我手中轻如鸿毛。这就是力量的真谛——以力破巧。"',
      onSelect: () => ({ messages: ['石中天指点了你几招，你感觉对力量有了新的理解。'] }),
    },
    {
      id: 'shizhongtian_quest',
      topic: '请求任务',
      text: '"你若是想历练，可以去后山暗影洞深处。那里有我当年留下的一些东西。"石中天淡淡地说："不过那里凶险，你要有心理准备。"',
      condition: (p: IPlayer) => p.realm >= 2,
    },
    {
      id: 'shizhongtian_story',
      topic: '听他讲过去的事',
      text: '"当年我年轻时，也像你一样四处闯荡。"石中天陷入回忆："我去过百断山，闯过蛮荒之地，甚至见过真正的强者对决。那些日子……真是令人怀念。"',
    },
  ],
});

// ===== 石城店铺NPC =====

// 客栈掌柜王有福
registerNPC({
  id: 'wang_youfu',
  name: '王有福',
  title: '石城客栈店主',
  description: '一个富态的中年人，穿着绸缎长袍，红光满面。总是笑眯眯的，看起来很好说话，但算盘打得很精。',
  greeting: '王店主满脸堆笑地迎上来："道友，欢迎欢迎！本店有上好的灵酿和灵气微薄的静室，保证让您修得舒心！"',
  roomId: 'stone_city_inn',
  dialogues: [
    {
      id: 'wang_room',
      topic: '寻一处静室',
      text: '王店主麻利地拿出钥匙："好嘞！三楼天字三号静室，窗户朝南，视野开阔。一晚十枚原始币。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 10) {
          p.gold -= 10;
          return { messages: ['你交了灵币，王店主领你上楼。静室干净整洁，床上铺着柔软的灵蚕丝被褥，空气中弥漫着淡淡的灵气。'] };
        }
        return { messages: ['王店主脸色一变："没有灵币？那……那您先看看？"'] };
      },
    },
    {
      id: 'wang_drink',
      topic: '来一壶灵酿',
      text: '王店主吆喝一声："小二，上一壶灵酿！"不一会儿，一壶散发着灵气的美酒端了上来。王店主笑眯眯地说："这可是后山灵泉酿的，饮之可润经脉。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 15) {
          p.gold -= 15;
          return { messages: ['你品尝了灵酿，一股温热的力量涌入体内，法力似乎恢复了一些。'] };
        }
        return { messages: ['王店主摆摆手："下次再来。"'] };
      },
    },
    {
      id: 'wang_gossip',
      topic: '打听消息',
      text: '王店主压低声音："道友，我跟你说个事儿。昨天夜里，我听到客栈后面有动静，好像有人翻墙出去了。我偷偷一看，是……算了，这事不能乱说。"',
    },
    {
      id: 'wang_advice',
      topic: '请教石城好去处',
      text: '"石城好去处？"王店主想了想："后山有个灵泉，听说饮之能强身健体。集市那边有个药草摊，草药品质不错！对了，藏经阁有不少典籍，道友若有兴趣可以去看看。"',
    },
  ],
});

// 宝阁掌柜陈算盘
registerNPC({
  id: 'chen_suanpan',
  name: '陈算盘',
  title: '石城宝阁掌柜',
  description: '一个穿着体面的老者，戴着老花镜，手里总拿着一个算盘。眼神精明，说话慢条斯理，但每句话都透着算计。',
  greeting: '陈掌柜推了推眼镜，笑眯眯地说："道友，是要寄放灵石还是换取原始币？利息优厚，安全无忧。"',
  roomId: 'stone_city_bank',
  dialogues: [
    {
      id: 'chen_deposit',
      topic: '寄放灵石',
      text: '陈掌柜拨弄着算盘："寄放好！月息一分，稳赚不赔。存得多，利息更高。道友打算寄放多少？"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 100) {
          p.gold -= 100;
          return { messages: ['你寄放了100枚原始币。陈掌柜递给你一张玉符："一个月后来取，连本带利110枚。"'] };
        }
        return { messages: ['陈掌柜摇摇头："太少了，至少寄放100枚。"'] };
      },
    },
    {
      id: 'chen_loan',
      topic: '借贷',
      text: '陈掌柜上下打量你："借贷？可以。不过利息是月息三分，三个月内还清。道友能拿出什么做抵押？"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 50) {
          p.gold += 100;
          return { messages: ['你借了100枚原始币，三个月后需归还109枚。陈掌柜提醒你："到期不还，后果自负。"'] };
        }
        return { messages: ['陈掌柜摇摇头："道友这点身家，不够抵押。"'] };
      },
    },
    {
      id: 'chen_vault',
      topic: '租用藏宝库',
      text: '陈掌柜点头："藏宝库好啊，以阵法封印，安全可靠。一年50枚原始币，可存放贵重物品。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 50) {
          p.gold -= 50;
          return { messages: ['你租了一个藏宝库。陈掌柜带你去地下室，打开一个以阵法封印的石室："放进去吧，绝对安全。"'] };
        }
        return { messages: ['陈掌柜耸耸肩："没钱租不了。"'] };
      },
    },
    {
      id: 'chen_rumor',
      topic: '打听城里的事',
      text: '陈掌柜压低声音："我跟你说，最近火皇城那边来人了，好像在收购灵矿石。还有啊，石城那个守夜人，最近经常半夜去祭坛，不知道在搞什么鬼。"',
    },
  ],
});

// 锦绣坊林巧手
registerNPC({
  id: 'lin_qiaoshou',
  name: '林巧手',
  title: '锦绣坊坊主',
  description: '一个瘦小的中年人，戴着老花镜，手指灵活得惊人。正在裁剪一块灵蚕丝布料，动作行云流水。',
  greeting: '林坊主头也不抬，专注地裁剪灵蚕丝："道友要裁新衣？量体裁衣，保证合身。"',
  roomId: 'stone_city_tailor',
  dialogues: [
    {
      id: 'lin_make',
      topic: '裁一件道袍',
      text: '林坊主放下剪刀，拿出尺子："来，先量尺寸。道友这身材……得用两匹灵蚕丝。款式呢？是要轻便的练功服，还是正式的道袍？"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 50) {
          p.gold -= 50;
          return { messages: ['你定制了一件灵蚕丝道袍。林坊主承诺三天后来取。'] };
        }
        return { messages: ['林坊主摇摇头："灵蚕丝可不便宜，至少50枚原始币。"'] };
      },
    },
    {
      id: 'lin_repair',
      topic: '修补法器',
      text: '林坊主接过你递来的衣物，看了看："这破损不大，五枚原始币，半个时辰修好。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 5) {
          p.gold -= 5;
          return { messages: ['林坊主巧手翻飞，很快就把破损补好了，几乎看不出来。'] };
        }
        return { messages: ['林坊主摆摆手："没钱补不了。"'] };
      },
    },
    {
      id: 'lin_material',
      topic: '问问好材料',
      text: '林坊主眼睛一亮："好材料？我这有火皇城运来的火蚕丝，还有百断山特产的银狐皮。不过价钱可不便宜，一件银狐裘要80枚原始币呢。"',
    },
    {
      id: 'lin_story',
      topic: '聊他的手艺',
      text: '"我这双手啊，可是天生的。"林坊主得意地说："年轻时我给火皇做过龙袍呢！不过后来得罪了权贵，只好跑到这石城来。唉，往事不堪回首。"',
    },
  ],
});

// 藏经阁阁主墨先生
registerNPC({
  id: 'mo_xiansheng',
  name: '墨先生',
  title: '藏经阁阁主',
  description: '一个儒雅的老者，穿着青色道袍，手持书卷。面容清癯，眼神中透着智慧。藏经阁里弥漫着淡淡的墨香和书卷气息。',
  greeting: '墨阁主正在整理典籍，见你来了，微微颔首："道友想看些什么？功法、丹方、阵法，应有尽有。"',
  roomId: 'stone_city_bookstore',
  dialogues: [
    {
      id: 'mo_alchemy',
      topic: '看看丹方典籍',
      text: '墨阁主从书架上取下一本泛黄的古籍："这本《丹方初解》记载了十种基础丹药的炼制方法，适合初学丹道者。三十枚原始币。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 30) {
          p.gold -= 30;
          return { messages: ['你买下了《丹方初解》。翻开一看，里面记载着详细的丹方和炼制步骤。'] };
        }
        return { messages: ['墨阁主摇摇头："没有灵币买不了。"'] };
      },
    },
    {
      id: 'mo_cultivation',
      topic: '看看修行心得',
      text: '墨阁主取下一本线装典籍："这本《修行心得》是一位化灵境修士的毕生感悟，对你突破瓶颈或许有帮助。五十枚原始币。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 50) {
          p.gold -= 50;
          return { messages: ['你买下了《修行心得》。书中记载了许多修行中的诀窍和注意事项。'] };
        }
        return { messages: ['墨阁主叹口气："这本典籍很珍贵，便宜不了。"'] };
      },
    },
    {
      id: 'mo_history',
      topic: '看看荒域志',
      text: '墨阁主微笑着说："这本《荒域志》记载了荒域各地的风土人情和秘境传说，是我年轻时游历四方所写。四十枚原始币。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 40) {
          p.gold -= 40;
          return { messages: ['你买下了《荒域志》。书中记载了许多关于百断山、火皇城等地的秘境传说。'] };
        }
        return { messages: ['墨阁主摇摇头："这是孤本，不能便宜。"'] };
      },
    },
    {
      id: 'mo_advice',
      topic: '请教修行之道',
      text: '"修行之道，在于明理。"墨阁主语重心长地说："功法也好，丹方也罢，都只是工具。真正重要的是理解其中的道理，融会贯通，才能有所成就。"',
    },
  ],
});

// ===== 火皇城店铺NPC =====

// 清风茶楼刘清风
registerNPC({
  id: 'liu_qingfeng',
  name: '刘清风',
  title: '清风茶楼茶博士',
  description: '一个精神矍铄的老者，穿着干净的短衫，手里提着一把铜壶。动作麻利，倒茶时滴水不漏。',
  greeting: '刘茶博士热情地招呼："道友，请坐！本店的灵茶远近闻名，来一壶？"',
  roomId: 'fire_teahouse',
  dialogues: [
    {
      id: 'qingfeng_tea',
      topic: '来壶灵茶',
      text: '刘茶博士手腕一转，铜壶划出一道弧线，灵茶精准地倒入杯中。"尝尝！这是后山灵泉水泡的，清心明目。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 10) {
          p.gold -= 10;
          return { messages: ['你品尝了灵茶，一股清香沁人心脾，精神顿时一振。'] };
        }
        return { messages: ['刘茶博士笑了笑："没关系，下次再来。"'] };
      },
    },
    {
      id: 'qingfeng_premium',
      topic: '尝尝百年灵茶',
      text: '刘茶博士小心翼翼地拿出一小罐茶叶："这可是百年灵茶，香气四溢，蕴含浓郁灵气，可辅助修炼。三十枚原始币一壶。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 30) {
          p.gold -= 30;
          return { messages: ['百年灵茶入口清香，一股温热的力量缓缓融入体内，修为似乎略有精进。'] };
        }
        return { messages: ['刘茶博士摇摇头："太贵了？那喝普通的吧。"'] };
      },
    },
    {
      id: 'qingfeng_gossip',
      topic: '打听消息',
      text: '刘茶博士压低声音："道友，我跟你说个事儿。昨天丹老炼丹又炸炉了，把灵药阁的屋顶都掀了！还有啊，火灵儿公主又偷偷溜出城了，火皇气得摔了好几个杯子。"',
    },
    {
      id: 'qingfeng_advice',
      topic: '请教火皇城好去处',
      text: '"火皇城好去处可多了！"刘茶博士如数家珍："拍卖行每月初一十五有拍卖会，演武场天天有高手切磋，珍宝阁有各种稀世灵宝。对了，城南有个说书的，讲得可精彩了。"',
    },
  ],
});

// 珍宝阁阁主金万两
registerNPC({
  id: 'jin_wanliang',
  name: '金万两',
  title: '珍宝阁阁主',
  description: '一个穿着华丽的胖子，脖子上挂着一串金项链，手指上戴着好几个玉扳指。笑容可掬，但眼神中透着精明。',
  greeting: '金阁主小心翼翼地取出一件灵宝："道友好眼力！这可是稀世珍品，错过就没了。"',
  roomId: 'fire_jewelry',
  dialogues: [
    {
      id: 'jin_ring',
      topic: '看看灵玉戒',
      text: '金阁主从柜台里拿出一枚晶莹剔透的戒指："这枚灵玉戒以千年灵玉雕琢而成，蕴含精纯灵气，可小幅提升修炼速度。两百枚原始币。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 200) {
          p.gold -= 200;
          return { messages: ['你买下了灵玉戒。入手温润，似乎有一股精纯的灵气在流动。'] };
        }
        return { messages: ['金阁主摇摇头："太贵了？那看看别的。"'] };
      },
    },
    {
      id: 'jin_amulet',
      topic: '看看护身玉佩',
      text: '金阁主郑重地拿出一块刻满符文的玉佩："这可是护身玉佩，刻有防御符文，蕴含浩然正气，可抵挡一次致命攻击。三百枚原始币。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 300) {
          p.gold -= 300;
          return { messages: ['你买下了护身玉佩。玉佩散发着柔和的灵光，给人一种安心的感觉。'] };
        }
        return { messages: ['金阁主叹了口气："这可是保命的宝贝，便宜不了。"'] };
      },
    },
    {
      id: 'jin_storage',
      topic: '看看储物袋',
      text: '金阁主神秘兮兮地说："这储物袋以空间法则炼制，内有丈许空间，可存放物品。五百枚原始币，仅此一件。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 500) {
          p.gold -= 500;
          return { messages: ['你买下了储物袋。意念一动，感觉背包空间扩大了不少。'] };
        }
        return { messages: ['金阁主摇摇头："这可是空间宝物，再便宜就亏本了。"'] };
      },
    },
    {
      id: 'jin_secret',
      topic: '打听有没有好货',
      text: '金阁主四下看了看，压低声音："实不相瞒，我这还有一件上古秘卷，记载着上古秘闻和大道法则。不过价格嘛……一千枚原始币。"',
    },
  ],
});

// 烈焰兵阁赵铁匠
registerNPC({
  id: 'zhao_tiejiang',
  name: '赵铁匠',
  title: '烈焰兵阁阁主',
  description: '一个魁梧的中年汉子，手臂上肌肉虬结。正在锤炼一柄长刀，火星四溅。',
  greeting: '赵阁主放下铁锤，擦了擦汗："道友要选神兵？本店的兵器，火皇城第一！"',
  roomId: 'fire_weapons',
  dialogues: [
    {
      id: 'zhao_sword',
      topic: '看看精钢剑',
      text: '赵阁主从墙上取下一柄长剑，递到你面前："这柄精钢剑，以精炼玄铁锻造，锋利异常，可斩断普通兵器。八十枚原始币。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 80) {
          p.gold -= 80;
          return { messages: ['你买下了精钢剑。拔剑出鞘，寒光一闪，锋利无比。'] };
        }
        return { messages: ['赵阁主摇摇头："好货不便宜。"'] };
      },
    },
    {
      id: 'zhao_blade',
      topic: '看看烈焰刀',
      text: '赵阁主眼中闪过一丝得意："这柄烈焰刀，以火灵铁锻造，刻有火焰符文，攻击时可附带火焰伤害。两百枚原始币。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 200) {
          p.gold -= 200;
          return { messages: ['你买下了烈焰刀。刀柄入手温热，似乎有火焰在流动。'] };
        }
        return { messages: ['赵阁主叹了口气："这可是我最好的作品之一。"'] };
      },
    },
    {
      id: 'zhao_sharpen',
      topic: '淬炼兵器',
      text: '赵阁主点点头："淬炼兵器可以，以灵火淬炼，提升锋利度和威力。二十枚原始币。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 20) {
          p.gold -= 20;
          return { messages: ['赵阁主熟练地淬炼你的兵器，不一会儿，兵器变得更加锋利了。'] };
        }
        return { messages: ['赵阁主摆摆手："没钱淬炼不了。"'] };
      },
    },
    {
      id: 'zhao_story',
      topic: '聊他的手艺',
      text: '"我这手艺，是跟我爹学的。"赵阁主自豪地说："我爹当年给火皇打造过神兵呢！我虽然不如我爹，但在这火皇城里，也算数得着的炼器师。"',
    },
  ],
});

// 符文阁符文师张墨
registerNPC({
  id: 'zhang_mo',
  name: '张墨',
  title: '符文阁阁主',
  description: '一个穿着蓝色长袍的中年人，手指修长，正在一块灵纹石上刻画符文。神情专注，仿佛整个世界只剩下他和手中的符文。',
  greeting: '张阁主头也不抬，专注地刻画符文："想要什么样的符文？攻击、防御、神速，应有尽有。"',
  roomId: 'fire_rune_shop',
  dialogues: [
    {
      id: 'zhang_attack',
      topic: '买攻击符文',
      text: '张阁主放下刻刀，拿出一块刻着"力"字的灵纹石："这是以灵纹石为基刻画的攻击符文，可临时提升攻击力。五十枚原始币。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 50) {
          p.gold -= 50;
          return { messages: ['你买下了攻击符文。灵纹石入手温热，似乎蕴含着一股力量。'] };
        }
        return { messages: ['张阁主摇摇头："符文可不便宜。"'] };
      },
    },
    {
      id: 'zhang_custom',
      topic: '量身符文',
      text: '张阁主抬起头，打量了你一番："量身符文？可以。我会根据道友的属性和需求，亲自刻画专属符文。两百枚原始币。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 200) {
          p.gold -= 200;
          return { messages: ['张阁主开始为你刻画专属符文。他闭上眼睛，手指飞快地在灵纹石上刻画，口中念念有词。'] };
        }
        return { messages: ['张阁主叹了口气："量身符文很耗费精力，不能便宜。"'] };
      },
    },
    {
      id: 'zhang_learn',
      topic: '请教符文之道',
      text: '"符文之道，在于沟通天地。"张阁主语重心长地说："每一个符文，都是对天地法则的一种诠释。道友若想学，先从基础的符文开始，理解它们的含义。"',
    },
    {
      id: 'zhang_secret',
      topic: '打听高阶符文',
      text: '张阁主压低声音："高阶符文？我这有一枚巨力符文，是我师父传下来的。大幅提升攻击力，但数量有限，一百二十枚原始币一枚。"',
    },
  ],
});

// 阵法堂堂主孙天行
registerNPC({
  id: 'sun_tianxing',
  name: '孙天行',
  title: '阵法堂堂主',
  description: '一个穿着道袍的老者，须发皆白，但精神矍铄。手里拿着一个罗盘，正在推演阵法。',
  greeting: '孙堂主捋着胡须："阵法之道，博大精深。道友是想学习阵法，还是购买阵盘？"',
  roomId: 'fire_array_master',
  dialogues: [
    {
      id: 'sun_learn',
      topic: '学习阵法',
      text: '孙堂主点点头："学习阵法好啊。这本《阵法初解》介绍了基础的阵法知识，八十枚原始币。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 80) {
          p.gold -= 80;
          return { messages: ['你买下了《阵法初解》。书中记载了各种基础阵法的原理和布置方法。'] };
        }
        return { messages: ['孙堂主摇摇头："知识无价，便宜不了。"'] };
      },
    },
    {
      id: 'sun_defense',
      topic: '买玄盾阵盘',
      text: '孙堂主从架子上取下一个精致的阵盘："这是玄盾阵盘，刻有玄盾阵法纹路，可布置小型防御阵法。一百五十枚原始币。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 150) {
          p.gold -= 150;
          return { messages: ['你买下了玄盾阵盘。阵盘上刻满了复杂的纹路，散发着淡淡的灵光。'] };
        }
        return { messages: ['孙堂主叹了口气："阵盘制作不易，便宜不了。"'] };
      },
    },
    {
      id: 'sun_trap',
      topic: '买困龙阵盘',
      text: '孙堂主神秘兮兮地说："这是困龙阵盘，刻有困龙阵法纹路，可布置陷阱阵法，困敌于其中。一百二十枚原始币。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 120) {
          p.gold -= 120;
          return { messages: ['你买下了困龙阵盘。阵盘小巧玲珑，便于携带。'] };
        }
        return { messages: ['孙堂主摇摇头："这可是困敌的好东西，不能便宜。"'] };
      },
    },
    {
      id: 'sun_spirit',
      topic: '看看聚灵阵盘',
      text: '孙堂主眼中闪过一丝郑重："聚灵阵盘，以天材地宝炼制，可布置聚灵阵法，汇聚天地灵气，大幅提升修炼速度。五百枚原始币，仅此两件。"',
    },
    {
      id: 'sun_advice',
      topic: '请教阵法之道',
      text: '"阵法之道，在于天时地利人和。"孙堂主语重心长地说："一个好的阵法，不仅要懂其原理，还要懂得如何因地制宜，灵活运用。"',
    },
  ],
});

// ===== 火皇城新增大型店铺NPC =====

// 火皇坊市刘老头
registerNPC({
  id: 'liu_laotou',
  name: '刘老头',
  title: '火皇坊市管事',
  description: '一个精明的老者，穿着普通的布衫，但眼神中透着商人的精明。正在摊位前忙碌，招呼着来往的顾客。',
  greeting: '刘管事热情地招呼："道友，来看看！这里什么都有！灵草、灵晶、凶兽骨，应有尽有！"',
  roomId: 'fire_marketplace',
  dialogues: [
    {
      id: 'liu_herb',
      topic: '看看灵草',
      text: '刘管事从摊位上拿起一把灵草："新鲜采摘的灵草，可用于炼丹或修炼。十五枚原始币一把。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 15) {
          p.gold -= 15;
          return { messages: ['你买下了一把灵草。灵草散发着淡淡的灵光，品质不错。'] };
        }
        return { messages: ['刘管事摇摇头："没钱买不了。"'] };
      },
    },
    {
      id: 'liu_crystal',
      topic: '看看灵晶',
      text: '刘管事小心翼翼地拿出一块灵晶："蕴含精纯灵气的晶石，可辅助修炼。八十枚原始币一块。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 80) {
          p.gold -= 80;
          return { messages: ['你买下了一块灵晶。灵晶散发着柔和的灵光，入手温润。'] };
        }
        return { messages: ['刘管事叹了口气："灵晶可不便宜。"'] };
      },
    },
    {
      id: 'liu_beast',
      topic: '看看凶兽骨',
      text: '刘管事拿起一根凶兽骨："凶兽骸骨，可用于炼器或制作骨器。四十枚原始币一根。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 40) {
          p.gold -= 40;
          return { messages: ['你买下了一根凶兽骨。骨头坚硬，表面刻有淡淡的纹路。'] };
        }
        return { messages: ['刘管事摆摆手："没钱买不了。"'] };
      },
    },
    {
      id: 'liu_secret',
      topic: '打听稀有物品',
      text: '刘管事四下看了看，压低声音："实不相瞒，我这还有一枚灵兽蛋，蕴含强大血脉。不过价格嘛……八百枚原始币。"',
    },
    {
      id: 'liu_gossip',
      topic: '打听坊市消息',
      text: '刘管事压低声音："最近坊市来了个神秘人，出手阔绰，好像在寻找什么东西。还有啊，听说百断山那边又出了新的秘境，好多修士都往那边去了。"',
    },
  ],
});

// 灵兽坊坊主周玲珑
registerNPC({
  id: 'zhou_linglong',
  name: '周玲珑',
  title: '灵兽坊坊主',
  description: '一个美丽的女子，穿着浅绿色的长裙，正在喂养一只小火狐。温柔善良，对灵兽有着特殊的感情。',
  greeting: '周坊主正在喂养一只小火狐，微笑着说："道友想挑选一只灵兽？"',
  roomId: 'fire_beast_shop',
  dialogues: [
    {
      id: 'zhou_fox',
      topic: '看看灵狐',
      text: '周坊主抱起一只灵狐："温顺可爱的灵狐，可作为宠物，偶尔能感知危险。一百五十枚原始币。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 150) {
          p.gold -= 150;
          return { messages: ['你买下了一只灵狐。灵狐温顺可爱，用脑袋蹭了蹭你的手。'] };
        }
        return { messages: ['周坊主摇摇头："灵狐可不便宜。"'] };
      },
    },
    {
      id: 'zhou_eagle',
      topic: '看看灵鹰',
      text: '周坊主指了指笼子里的灵鹰："可飞行的灵鹰，速度快，可用于侦查和代步。三百枚原始币。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 300) {
          p.gold -= 300;
          return { messages: ['你买下了一只灵鹰。灵鹰展翅高飞，发出一声嘹亮的鸣叫。'] };
        }
        return { messages: ['周坊主叹了口气："灵鹰很贵的。"'] };
      },
    },
    {
      id: 'zhou_wolf',
      topic: '看看战狼',
      text: '周坊主指了指一只凶猛的战狼："凶猛的战狼，攻击力强，可协助战斗。四百枚原始币。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 400) {
          p.gold -= 400;
          return { messages: ['你买下了一只战狼。战狼发出低沉的咆哮，似乎在宣誓忠诚。'] };
        }
        return { messages: ['周坊主摇摇头："战狼可不便宜。"'] };
      },
    },
    {
      id: 'zhou_feed',
      topic: '买灵兽口粮',
      text: '周坊主拿出一袋灵谷："专门喂养灵兽的灵谷，可提升灵兽好感度。二十枚原始币一袋。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 20) {
          p.gold -= 20;
          return { messages: ['你买下了一袋灵兽口粮。灵谷散发着淡淡的灵气，灵兽们闻到后都围了过来。'] };
        }
        return { messages: ['周坊主摆摆手："没钱买不了。"'] };
      },
    },
    {
      id: 'zhou_story',
      topic: '聊灵兽',
      text: '"灵兽是修士最好的伙伴。"周坊主温柔地抚摸着灵狐："它们不仅能陪伴你，还能在战斗中帮助你。我从小就喜欢灵兽，所以开了这家灵兽坊。"',
    },
  ],
});

// 丹塔长老丹老
registerNPC({
  id: 'dan_lao',
  name: '丹老',
  title: '丹塔长老',
  description: '一个白发苍苍的老者，穿着红色的道袍，身上散发着浓郁的药香。虽然年纪大了，但精神矍铄，眼神中透着智慧。',
  greeting: '丹老微微一笑："道友是来炼丹，还是购买丹药？"',
  roomId: 'fire_dan_tower',
  dialogues: [
    {
      id: 'dan_heal',
      topic: '买疗伤丹',
      text: '丹老从丹瓶中倒出一颗丹药："疗伤丹，可快速恢复气血。五十枚原始币一颗。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 50) {
          p.gold -= 50;
          return { messages: ['你买下了一颗疗伤丹。丹药散发着淡淡的药香，入手温热。'] };
        }
        return { messages: ['丹老摇摇头："没钱买不了。"'] };
      },
    },
    {
      id: 'dan_mana',
      topic: '买法力丹',
      text: '丹老拿出一颗蓝色的丹药："法力丹，可快速恢复法力。六十枚原始币一颗。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 60) {
          p.gold -= 60;
          return { messages: ['你买下了一颗法力丹。丹药散发着蓝色的灵光，似乎蕴含着浓郁的法力。'] };
        }
        return { messages: ['丹老叹了口气："法力丹可不便宜。"'] };
      },
    },
    {
      id: 'dan_cultivate',
      topic: '买筑基丹',
      text: '丹老郑重地拿出一颗金色的丹药："筑基丹，可辅助突破境界，增加突破成功率。三百枚原始币一颗。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 300) {
          p.gold -= 300;
          return { messages: ['你买下了一颗筑基丹。丹药散发着金色的灵光，蕴含着强大的力量。'] };
        }
        return { messages: ['丹老摇摇头："筑基丹很珍贵，便宜不了。"'] };
      },
    },
    {
      id: 'dan_teach',
      topic: '请教丹道',
      text: '"丹道之道，在于心诚。"丹老语重心长地说："炼丹不仅需要技巧，更需要耐心和悟性。你若想学，可先从基础的丹药开始尝试。"',
    },
    {
      id: 'dan_story',
      topic: '聊炼丹趣事',
      text: '"说起炼丹，我年轻时可没少炸炉。"丹老哈哈大笑："有一次我炼一炉仙丹，结果炸炉把半个丹塔都掀了！火皇气得差点把我赶出火皇城。不过后来，我还是炼成了那炉仙丹。"',
    },
  ],
});

// ===== 火皇城家族NPC =====

// 叶家族长叶天行
registerNPC({
  id: 'ye_family_head',
  name: '叶天行',
  title: '叶家族长',
  description: '一个穿着红色锦袍的中年男子，面容威严，眼神深邃。身上散发着浓郁的药香，显然是一位炼丹大师。',
  greeting: '叶天行正在翻阅一本丹方，见你来了，放下书卷："道友光临叶府，有何指教？"',
  roomId: 'fire_ye_family',
  dialogues: [
    {
      id: 'ye_intro',
      topic: '询问叶家',
      text: '"叶家在火皇城传承三百年，以丹道闻名。历代叶家子弟皆精通炼丹之术，老夫不才，勉强能炼出六品丹药。"叶天行淡淡地说。',
    },
    {
      id: 'ye_buy_dan',
      topic: '购买丹药',
      text: '叶天行点点头："叶家的丹药品质上乘。疗伤丹五十枚，法力丹六十枚，筑基丹三百枚。道友需要什么？"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 50) {
          p.gold -= 50;
          return { messages: ['你在叶家购买了一颗疗伤丹。丹药品质确实比外面的好。'] };
        }
        return { messages: ['叶天行摇摇头："没钱买不了。"'] };
      },
    },
    {
      id: 'ye_quest',
      topic: '请求丹道任务',
      text: '"丹道任务？可以。"叶天行想了想："老夫最近需要一些罕见的药材，道友若能帮我寻来，必有重谢。"',
      condition: (p: IPlayer) => p.realm >= 3,
    },
    {
      id: 'ye_secret',
      topic: '打听叶家秘闻',
      text: '叶天行压低声音："叶家深处有一间密室，里面藏着先祖留下的丹方。据说那丹方可炼出七品丹药，但需要特殊的材料……"',
      condition: (p: IPlayer) => p.realm >= 5,
    },
  ],
});

// 王家族长王铁锤
registerNPC({
  id: 'wang_family_head',
  name: '王铁锤',
  title: '王家族长',
  description: '一个身材魁梧的中年男子，穿着黑色劲装，手臂上肌肉隆起。脸上带着刀疤，眼神锐利，一看就是身经百战之人。',
  greeting: '王铁锤正在锻造兵器，火星四溅。见你来了，放下铁锤："道友来王府，是要锻造兵器，还是有其他事？"',
  roomId: 'fire_wang_family',
  dialogues: [
    {
      id: 'wang_intro',
      topic: '询问王家',
      text: '"王家在火皇城传承四百年，以炼器闻名。老夫的先祖曾给火皇打造过神兵。"王铁锤自豪地说。',
    },
    {
      id: 'wang_forge',
      topic: '锻造兵器',
      text: '王铁锤点点头："锻造兵器可以。普通兵器一百枚原始币，精品兵器三百枚。道友想要什么样的？"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 100) {
          p.gold -= 100;
          return { messages: ['王铁锤为你锻造了一把精铁长剑。剑身锋利，隐隐散发着灵光。'] };
        }
        return { messages: ['王铁锤摇摇头："没钱锻造不了。"'] };
      },
    },
    {
      id: 'wang_quest',
      topic: '请求炼器任务',
      text: '"炼器任务？可以。"王铁锤想了想："老夫最近需要一些灵铁，道友若能帮我寻来，老夫可免费为你锻造一件兵器。"',
      condition: (p: IPlayer) => p.realm >= 3,
    },
    {
      id: 'wang_secret',
      topic: '打听王家秘闻',
      text: '王铁锤压低声音："王府深处有一座先祖祠堂，里面有先祖留下的锻造图谱。据说那图谱记载着上古炼器之法……"',
      condition: (p: IPlayer) => p.realm >= 5,
    },
  ],
});

// 苏家族长苏玄机
registerNPC({
  id: 'su_family_head',
  name: '苏玄机',
  title: '苏家族长',
  description: '一个穿着青色道袍的老者，须发皆白，但双目如电。手里拿着一个罗盘，正在推演阵法。',
  greeting: '苏玄机正在推演阵法，见你来了，放下罗盘："道友光临苏府，是想学习阵法，还是购买阵盘？"',
  roomId: 'fire_su_family',
  dialogues: [
    {
      id: 'su_intro',
      topic: '询问苏家',
      text: '"苏家在火皇城传承五百年，以阵法闻名。苏府四周的护族大阵，就是先祖花费数十年布置的。"苏玄机淡淡地说。',
    },
    {
      id: 'su_buy_array',
      topic: '购买阵盘',
      text: '苏玄机点点头："苏家的阵盘品质上乘。玄盾阵盘一百五十枚，困龙阵盘三百枚，聚灵阵盘五百枚。道友需要什么？"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 150) {
          p.gold -= 150;
          return { messages: ['你在苏家购买了一个玄盾阵盘。阵盘品质确实比外面的好。'] };
        }
        return { messages: ['苏玄机摇摇头："没钱买不了。"'] };
      },
    },
    {
      id: 'su_quest',
      topic: '请求阵法任务',
      text: '"阵法任务？可以。"苏玄机想了想："老夫最近需要一些布阵材料，道友若能帮我寻来，必有重谢。"',
      condition: (p: IPlayer) => p.realm >= 3,
    },
    {
      id: 'su_secret',
      topic: '打听苏家秘闻',
      text: '苏玄机压低声音："苏府深处有一座传承殿，里面藏着先祖留下的阵法传承。据说里面有一套上古杀阵的完整阵图……"',
      condition: (p: IPlayer) => p.realm >= 6,
    },
  ],
});

// 陈家族长陈万金
registerNPC({
  id: 'chen_family_head',
  name: '陈万金',
  title: '陈家族长',
  description: '一个穿着华丽锦袍的胖子，脖子上挂着一串金项链，手指上戴着好几个玉扳指。笑容可掬，但眼神中透着精明。',
  greeting: '陈万金正在查看账目，见你来了，放下账本："道友好！来陈家是做生意，还是有其他事？"',
  roomId: 'fire_chen_family',
  dialogues: [
    {
      id: 'chen_intro',
      topic: '询问陈家',
      text: '"陈家在火皇城传承两百年，以经商闻名。火皇坊市和拍卖行，都有陈家的股份。"陈万金得意地说。',
    },
    {
      id: 'chen_deal',
      topic: '谈生意',
      text: '陈万金笑眯眯地说："做生意好啊！老夫这里有各种珍奇物品，价格公道。道友想要什么？"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 100) {
          p.gold -= 100;
          return { messages: ['你在陈家购买了一件珍奇物品。陈万金笑眯眯地说："下次再来！"'] };
        }
        return { messages: ['陈万金摇摇头："没钱做不了生意。"'] };
      },
    },
    {
      id: 'chen_quest',
      topic: '请求经商任务',
      text: '"经商任务？可以。"陈万金想了想："老夫最近需要一些珍稀药材，道友若能帮我寻来，老夫可给你一个好价钱。"',
      condition: (p: IPlayer) => p.realm >= 3,
    },
    {
      id: 'chen_secret',
      topic: '打听陈家秘闻',
      text: '陈万金压低声音："陈家的珍宝库，据说有一块太古时期的灵晶，价值连城。不过……那地方守卫森严，一般人进不去。"',
      condition: (p: IPlayer) => p.realm >= 7,
    },
  ],
});

// ===== 火皇城奢华场所NPC =====

// 醉仙楼楼主
registerNPC({
  id: 'lou_zhu',
  name: '李师师',
  title: '醉仙楼楼主',
  description: '一个美貌的中年女子，穿着华丽的长裙，气质高雅。虽然已是中年，但风韵犹存，眼神中透着精明。',
  greeting: '李师师优雅地站起来："道友好！欢迎来到醉仙楼。不知是要用餐，还是要雅间？"',
  roomId: 'fire_zuixian_lou',
  dialogues: [
    {
      id: 'lou_eat',
      topic: '用餐',
      text: '李师师微微一笑："醉仙楼的美食远近闻名。灵猴酒二十枚，凤凰酒五十枚，灵宴一百枚。道友想要什么？"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 20) {
          p.gold -= 20;
          return { messages: ['你品尝了灵猴酒，一股温热的力量涌入体内，气血似乎恢复了一些。'] };
        }
        return { messages: ['李师师摇摇头："没钱吃不了。"'] };
      },
    },
    {
      id: 'lou_private',
      topic: '雅间',
      text: '李师师点点头："雅间好啊，可俯瞰火皇城夜景。五百枚原始币一晚。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 500) {
          p.gold -= 500;
          return { messages: ['你进入了醉仙楼的雅间。窗外灯火辉煌，火皇城的夜景美不胜收。'] };
        }
        return { messages: ['李师师叹了口气："太贵了？那在大厅用餐吧。"'] };
      },
    },
    {
      id: 'lou_gossip',
      topic: '打听消息',
      text: '李师师压低声音："醉仙楼是火皇城消息最灵通的地方。最近叶家在炼制一枚六品丹药，王家在锻造一件神兵，苏家在布置一座大阵……"',
    },
    {
      id: 'lou_story',
      topic: '聊醉仙楼',
      text: '"醉仙楼已经开了一百年了。"李师师感慨地说："多少大人物在这里饮酒作乐，多少秘密在这里交换。醉仙楼，见证了火皇城的兴衰。"',
    },
  ],
});

// 百花舫舫主
registerNPC({
  id: 'fang_zhu',
  name: '花媚娘',
  title: '百花舫舫主',
  description: '一个美貌的女子，穿着性感的长裙，身姿妖娆。眼神妩媚，一举一动都透着诱惑。',
  greeting: '花媚娘扭动着身姿走过来："哎哟，这位道友好生面生。来百花舫，是听曲，还是……"她意味深长地笑了笑。',
  roomId: 'fire_baihua_fang',
  dialogues: [
    {
      id: 'fang_music',
      topic: '听曲',
      text: '花媚娘拍拍手："来人，上最好的歌舞！"不一会儿，几位舞女翩翩起舞，丝竹之声不绝于耳。',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 50) {
          p.gold -= 50;
          return { messages: ['你欣赏了一场精彩的歌舞表演，心情舒畅。'] };
        }
        return { messages: ['花媚娘摇摇头："没钱听不了。"'] };
      },
    },
    {
      id: 'fang_private',
      topic: '密室',
      text: '花媚娘凑近你，吐气如兰："密室？那可是我们百花舫最私密的地方……需要一百枚原始币。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 100) {
          p.gold -= 100;
          return { messages: ['你进入了百花舫的密室。一位美貌的女子正在等待……'] };
        }
        return { messages: ['花媚娘叹了口气："太贵了？那就听曲吧。"'] };
      },
    },
    {
      id: 'fang_gossip',
      topic: '打听消息',
      text: '花媚娘压低声音："百花舫是火皇城权贵们常来的地方，什么消息都能听到。最近火皇在秘密招兵，似乎准备攻打什么地方……"',
      condition: (p: IPlayer) => p.realm >= 4,
    },
    {
      id: 'fang_story',
      topic: '聊百花舫',
      text: '"百花舫虽说是寻欢作乐的地方，但也是火皇城情报的中心。"花媚娘妩媚地笑："多少大人物在这儿透露了不该透露的秘密。"',
    },
  ],
});

// 聚宝阁老板
registerNPC({
  id: 'ju_bao_keeper',
  name: '钱万贯',
  title: '聚宝阁老板',
  description: '一个穿着华丽衣裳的中年男子，面容阴鸷，眼神闪烁。手指上戴着好几个玉扳指，一看就是个不好惹的角色。',
  greeting: '钱万贯笑眯眯地看着你："道友好！来聚宝阁，是想赌一把，还是……"',
  roomId: 'fire_jubao_ge',
  dialogues: [
    {
      id: 'ju_gamble',
      topic: '赌一把',
      text: '钱万贯眼睛一亮："好！我们来赌骰子！一赔十！下注吧！"',
      onSelect: () => {
        const win = Math.random() > 0.5;
        return { messages: win ? ['你赢了！钱万贯脸色铁青地给了你筹码。'] : ['你输了！钱万贯得意地笑了。'] };
      },
    },
    {
      id: 'ju_vip',
      topic: 'VIP包厢',
      text: '钱万贯点点头："VIP包厢，最低下注一万枚原始币。道友有这个实力吗？"',
      condition: (p: IPlayer) => p.gold >= 10000,
    },
    {
      id: 'ju_gossip',
      topic: '打听消息',
      text: '钱万贯压低声音："聚宝阁什么人都有，消息自然灵通。最近百断山出了大事，有人在里面发现了太古传承……"',
    },
    {
      id: 'ju_warning',
      topic: '劝他别赌了',
      text: '钱万贯冷笑一声："劝我？你知道聚宝阁背后是谁吗？在火皇城，还没人敢跟我钱万贯作对！"',
    },
  ],
});

// ===== 石城家族和酒楼NPC =====

// 石城城主石万山
registerNPC({
  id: 'shi_wanshan',
  name: '石万山',
  title: '石城城主',
  description: '一个身材高大的中年男子，面容刚毅，眼神锐利。穿着黑色铠甲，腰间挂着一柄石斧。',
  greeting: '石万山正在大厅处理公务，见你来了，放下文书："道友光临石府，有何指教？"',
  roomId: 'stone_city_shi_family',
  dialogues: [
    {
      id: 'shi_intro',
      topic: '询问石城',
      text: '"石城虽小，但历史悠久。三百年前，火皇在此建城，以巨石筑墙，抵御蛮荒凶兽。"石万山感慨地说。',
    },
    {
      id: 'shi_quest',
      topic: '请求任务',
      text: '"任务？可以。最近城外凶兽越来越活跃，道友若能帮忙猎杀一些，老夫必有重谢。"',
      condition: (p: IPlayer) => p.realm >= 1,
    },
    {
      id: 'shi_advice',
      topic: '请教修炼',
      text: '"修炼之道，在于体魄和意志。"石万山挥舞着石斧："你若想变强，就去后山历练。那里虽然危险，但也是最好的修炼场所。"',
    },
    {
      id: 'shi_secret',
      topic: '打听石城秘闻',
      text: '石万山压低声音："石府深处有一间密室，里面藏着石族符文真解。那是石族先祖留下的传承……"',
      condition: (p: IPlayer) => p.realm >= 4,
    },
  ],
});

// 李富贵 - 石城富商
registerNPC({
  id: 'li_fugui',
  name: '李富贵',
  title: '石城首富',
  description: '一个圆滚滚的胖子，穿着华丽的绸缎衣裳，手指上戴着好几个玉扳指。笑容可掬，但眼神中透着精明。',
  greeting: '李富贵笑眯眯地迎上来："道友好！来李府是做生意，还是做客？"',
  roomId: 'stone_city_li_family',
  dialogues: [
    {
      id: 'li_intro',
      topic: '询问李家',
      text: '"李家在石城经营药材和矿石生意多年，也算小有积蓄。"李富贵得意地说。',
    },
    {
      id: 'li_deal',
      topic: '买药材',
      text: '李富贵点点头："李家的药材品质上乘。凝神草十枚，血灵花二十枚，冰魄草三十枚。道友需要什么？"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 10) {
          p.gold -= 10;
          return { messages: ['你在李家购买了一株凝神草。药材品质确实不错。'] };
        }
        return { messages: ['李富贵摇摇头："没钱买不了。"'] };
      },
    },
    {
      id: 'li_quest',
      topic: '请求生意',
      text: '"生意？可以。"李富贵想了想："老夫最近需要一些灵矿石，道友若能帮我寻来，必有重谢。"',
      condition: (p: IPlayer) => p.realm >= 2,
    },
    {
      id: 'li_secret',
      topic: '打听李家秘闻',
      text: '李富贵压低声音："李府的金库，据说有大量的金银和灵石。不过……那地方守卫森严，一般人进不去。"',
      condition: (p: IPlayer) => p.realm >= 3,
    },
  ],
});

// 香来楼掌柜
registerNPC({
  id: 'xiang_lao',
  name: '香老',
  title: '香来楼掌柜',
  description: '一个精神矍铄的老者，穿着干净的短衫，手里拿着一把算盘。笑容可掬，一看就是做生意的老手。',
  greeting: '香老热情地招呼："道友好！欢迎来到香来楼。想吃点什么？"',
  roomId: 'stone_city_xianglai_lou',
  dialogues: [
    {
      id: 'xiang_eat',
      topic: '吃点东西',
      text: '香老微微一笑："香来楼的灵酒和灵食都不错。灵酒五枚，灵食十枚，套餐二十枚。道友想要什么？"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 5) {
          p.gold -= 5;
          return { messages: ['你品尝了灵酒，一股温热的力量涌入体内，气血似乎恢复了一些。'] };
        }
        return { messages: ['香老摇摇头："没钱吃不了。"'] };
      },
    },
    {
      id: 'xiang_private',
      topic: '雅间',
      text: '香老点点头："雅间可以俯瞰石城景色。五十枚原始币一晚。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 50) {
          p.gold -= 50;
          return { messages: ['你进入了香来楼的雅间。窗外可以看到石城的景色。'] };
        }
        return { messages: ['香老叹了口气："太贵了？那在大厅用餐吧。"'] };
      },
    },
    {
      id: 'xiang_gossip',
      topic: '打听消息',
      text: '香老压低声音："香来楼是石城消息最灵通的地方。最近后山不太平，听说有凶兽出没……"',
    },
    {
      id: 'xiang_story',
      topic: '聊香来楼',
      text: '"香来楼已经开了三十年了。"香老感慨地说："多少修士在这里聚会，多少故事在这里发生。香来楼，是石城的记忆。"',
    },
  ],
});

// 醉仙楼雅间歌姬
registerNPC({
  id: 'geisha',
  name: '苏小小',
  title: '醉仙楼歌姬',
  description: '一个美貌的女子，穿着淡雅的长裙，怀抱琵琶。面容清丽，眼神幽怨，仿佛有说不尽的心事。',
  greeting: '苏小小抱着琵琶，轻声道："道友好，想听什么曲子？"',
  roomId: 'fire_zuixian_lou_up',
  dialogues: [
    {
      id: 'geisha_song',
      topic: '听一曲',
      text: '苏小小拨动琵琶，婉转的歌声响起。一曲终了，余音绕梁。',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 30) {
          p.gold -= 30;
          return { messages: ['苏小小的歌声婉转动人，让你忘却了一切烦恼。'] };
        }
        return { messages: ['苏小小轻声道："没钱听不了。"'] };
      },
    },
    {
      id: 'geisha_story',
      topic: '问她的故事',
      text: '苏小小叹了口气："我本是书香门第的女儿，家道中落后，被迫来到醉仙楼。在这里唱歌，只为了……活下去。"',
    },
    {
      id: 'geisha_help',
      topic: '帮她赎身',
      text: '苏小小眼睛一亮："赎身？需要一千枚原始币……"她低下头："我知道这很难，但……如果你愿意帮我，我……我愿意做牛做马报答你。"',
      condition: (p: IPlayer) => p.gold >= 1000,
      onSelect: (p: IPlayer) => {
        p.gold -= 1000;
        return { messages: ['你帮苏小小赎了身。她感激涕零："多谢道友！我……我不知该如何报答你。"'] };
      },
    },
  ],
});

// ===== 石村NPC =====

// 村长石云峰
registerNPC({
  id: 'village_chief',
  name: '石云峰',
  title: '石村村长',
  description: '一个白发苍苍的老者，面容慈祥，但眼神中透着坚毅。穿着兽皮制成的长袍，腰间挂着一枚兽牙。',
  greeting: '石云峰正在整理草药，见你来了，放下手中的活计："远方来的客人，欢迎来到石村。"',
  roomId: 'stone_village_house_elder',
  dialogues: [
    {
      id: 'chief_intro',
      topic: '询问石村',
      text: '"石村坐落于苍莽山脉之中，已有数百年的历史。我们靠狩猎为生，柳神保佑着我们。"石云峰缓缓说道。',
    },
    {
      id: 'chief_willow',
      topic: '询问柳神',
      text: '"柳神是我们石村的守护神。很久以前，一场雷雨中，一株通天柳树被折断，焦黑的树干扎根于我们村后。但令人惊奇的是，树顶竟长出了一根嫩绿的新枝。"石云峰感慨地说。',
    },
    {
      id: 'chief_quest',
      topic: '请求任务',
      text: '"任务？我们石村最近遇到了一些麻烦。后山有一头凶猛的凶兽，经常袭击我们的狩猎队。如果你能帮我们除掉它，全村都会感激你。"',
      condition: (p: IPlayer) => p.realm >= 2,
    },
    {
      id: 'chief_trade',
      topic: '以物易物',
      text: '"我们石村不使用货币，以物易物。如果你有草药或矿石，可以换我们的兽肉和兽皮。"',
      onSelect: (p: IPlayer) => {
        return { messages: ['石村以物易物，可交换兽肉、兽皮等物品。'] };
      },
    },
    {
      id: 'chief_story',
      topic: '讲石村故事',
      text: '"石村的祖先来自远方，他们为了躲避战乱，来到这片山林。柳神一直守护着我们，让我们在这片蛮荒之地生存下来。"',
    },
  ],
});

// 石昊
registerNPC({
  id: 'shi_hao',
  name: '石昊',
  title: '石村少年',
  description: '一个七八岁的少年，身材瘦小但眼神明亮，充满灵气。穿着破旧的兽皮衣服，但动作矫健，一看就是个练武的好苗子。',
  greeting: '石昊正在院子里练习拳脚，见你来了，停下来好奇地看着你："你是谁？从哪里来的？"',
  roomId: 'stone_village_house_shihao',
  dialogues: [
    {
      id: 'shihao_intro',
      topic: '自我介绍',
      text: '石昊眼睛一亮："原来你是远方来的修士！听说外面的世界很精彩，有很多强大的修士和神奇的宝物。"',
    },
    {
      id: 'shihao_fight',
      topic: '切磋武艺',
      text: '石昊握紧拳头："来，我们切磋一下！我可是石村最能打的少年！"',
      onSelect: () => {
        const win = Math.random() > 0.3;
        return { messages: win ? ['你轻松击败了石昊。石昊不服气地说："下次我一定能赢你！"'] : ['石昊竟然赢了！他得意地笑了："我说过我是最能打的！"'] };
      },
    },
    {
      id: 'shihao_willow',
      topic: '问柳神',
      text: '"柳神是我们村的守护神！"石昊兴奋地说："我经常去柳神树下修炼，柳神好像在帮助我。我感觉我的身体越来越强了！"',
    },
    {
      id: 'shihao_dream',
      topic: '问他的梦想',
      text: '石昊眼神坚定："我的梦想是成为最强的修士！我要走出这片山林，去外面的世界闯荡！我要保护石村，保护柳神！"',
    },
    {
      id: 'shihao_secret',
      topic: '问他的秘密',
      text: '石昊压低声音："我告诉你一个秘密……我有时候会做奇怪的梦，梦见一个巨大的柳树，它在对我说一些奇怪的话。但我醒来后就记不清了。"',
      condition: (p: IPlayer) => p.realm >= 3,
    },
  ],
});

// 石昊母亲
registerNPC({
  id: 'shi_hao_mother',
  name: '秦怡宁',
  title: '石昊母亲',
  description: '一个面容清秀的妇人，穿着朴素的兽皮衣服。她正在缝制兽皮，动作熟练。眼神中透着温柔和慈爱。',
  greeting: '秦怡宁正在缝制兽皮，见你来了，微笑着说："远方来的客人，辛苦了。请坐，我给你倒碗水。"',
  roomId: 'stone_village_house_shihao',
  dialogues: [
    {
      id: 'mother_intro',
      topic: '询问石昊',
      text: '"那是我的儿子石昊。"秦怡宁温柔地看着石昊的方向："他从小就很懂事，也很有天赋。我只希望他能平安长大。"',
    },
    {
      id: 'mother_herbs',
      topic: '询问草药',
      text: '"这些是我采集的草药。"秦怡宁指着墙角的草药："后山有很多珍贵的草药，我经常去采集。这些草药可以治疗伤病。"',
    },
    {
      id: 'mother_story',
      topic: '讲石昊的故事',
      text: '"石昊出生的时候，柳神的新枝微微颤动了一下。村长说，这是个好兆头。石昊从小就比其他孩子强壮，也更聪明。"',
    },
    {
      id: 'mother_worry',
      topic: '她的担忧',
      text: '秦怡宁叹了口气："我担心石昊太要强了。他总是想出去闯荡，但外面的世界太危险了。我只希望他能留在村里，平平安安的。"',
    },
  ],
});

// 祭祀祭司
registerNPC({
  id: 'sacrifice_priest',
  name: '石中天',
  title: '石村祭司',
  description: '一个穿着黑色兽皮的老者，面容严肃，眼神深邃。他的身上散发着一股神秘的气息，显然是一位懂得祭祀之术的人。',
  greeting: '石中天正在祭台上举行仪式，见你来了，停下手中的动作："远方来的客人，你是来参拜柳神的吗？"',
  roomId: 'stone_village_altar',
  dialogues: [
    {
      id: 'priest_intro',
      topic: '询问祭祀',
      text: '"祭祀是我们石村最重要的仪式。每月初一，我们会在这里举行祭祀，祈求柳神保佑。"石中天严肃地说。',
    },
    {
      id: 'priest_willow',
      topic: '询问柳神',
      text: '"柳神是上古时期一位强大的生灵陨落之后所化。它虽然只剩下一截焦黑的树干和一根嫩绿的新枝，但依然拥有强大的力量。"',
    },
    {
      id: 'priest_ritual',
      topic: '参加祭祀',
      text: '"如果你想参加祭祀，可以在每月初一来到这里。祭祀时，我们会将兽血洒向柳神，祈求它的庇佑。"',
    },
    {
      id: 'priest_secret',
      topic: '打听柳神秘密',
      text: '石中天压低声音："柳神的新枝蕴含着无尽的奥秘。据说，有缘人可以通过新枝获得柳神的传承……但至今还没有人成功过。"',
      condition: (p: IPlayer) => p.realm >= 5,
    },
  ],
});

// 村口守卫
registerNPC({
  id: 'village_guard',
  name: '石大壮',
  title: '村口守卫',
  description: '一个身材高大的壮汉，穿着兽皮衣服，手里拿着一根粗大的木棍。他的脸上有一道疤痕，显然是与凶兽搏斗留下的。',
  greeting: '石大壮正在瞭望台上观察四周，见你来了，大声喊道："站住！你是谁？来石村干什么？"',
  roomId: 'stone_village_entrance',
  dialogues: [
    {
      id: 'guard_intro',
      topic: '说明来意',
      text: '石大壮放下木棍："原来是远方来的客人。欢迎来到石村！不过要小心，后山最近不太平，有凶兽出没。"',
    },
    {
      id: 'guard_warning',
      topic: '询问安全',
      text: '"石村很安全，柳神会保护我们。"石大壮自豪地说："但出了村口就不一样了，山林里有很多凶兽。"',
    },
    {
      id: 'guard_hunt',
      topic: '询问狩猎',
      text: '"我们石村的男人每天都会出去狩猎。"石大壮指着远处的山林："那里有很多猎物，但也有很多危险。"',
    },
  ],
});

// 炊事妇人
registerNPC({
  id: 'village_cook',
  name: '石大娘',
  title: '炊事妇人',
  description: '一个身材粗壮的妇人，穿着围裙，脸上沾满了烟灰。她正在翻动烤肉，动作熟练。',
  greeting: '石大娘正在忙碌，见你来了，大声喊道："客人来了！快坐下，尝尝我们石村的烤肉！"',
  roomId: 'stone_village_cooking',
  dialogues: [
    {
      id: 'cook_food',
      topic: '尝尝烤肉',
      text: '石大娘递给你一块烤肉："尝尝！这是刚烤好的野猪腿，可香了！"',
      onSelect: (p: IPlayer) => {
        return { messages: ['你品尝了石村的烤肉，味道鲜美，一股温热的力量涌入体内。'] };
      },
    },
    {
      id: 'cook_method',
      topic: '询问烹饪方法',
      text: '"我们石村的烤肉很简单。"石大娘笑着说："用盐和草药腌制，然后放在火堆上烤。这样烤出来的肉又香又嫩。"',
    },
    {
      id: 'cook_story',
      topic: '讲炊事故事',
      text: '"每天狩猎回来，我们就要忙着做饭。"石大娘一边翻动烤肉一边说："村里的男人辛苦狩猎，我们女人就负责做饭。大家分工合作，日子过得很充实。"',
    },
  ],
});

// 猎人
registerNPC({
  id: 'village_hunter',
  name: '石猛',
  title: '石村猎人',
  description: '一个身材健壮的青年，穿着兽皮衣服，手里拿着一把银刀。他的身上有很多伤疤，眼神锐利。',
  greeting: '石猛正在切割巨兽，见你来了，抬起头："客人来了！要不要帮忙？"',
  roomId: 'stone_village_processing',
  dialogues: [
    {
      id: 'hunter_intro',
      topic: '询问狩猎',
      text: '"我们石村靠狩猎为生。"石猛指着地上的巨兽："这是今天早上猎到的巨狼，够全村吃好几天了。"',
    },
    {
      id: 'hunter_weapon',
      topic: '询问武器',
      text: '"这是银刀。"石猛举起手中的刀："银刀锋利无比，可以轻易切割兽肉。是我们石村最好的武器。"',
    },
    {
      id: 'hunter_danger',
      topic: '询问危险',
      text: '"狩猎很危险。"石猛指着身上的伤疤："这些都是与凶兽搏斗留下的。但为了村里的人，我们必须去狩猎。"',
    },
    {
      id: 'hunter_skill',
      topic: '请教狩猎技巧',
      text: '"狩猎技巧？"石猛想了想："最重要的是要有勇气和耐心。遇到凶兽不要害怕，找准机会一击必杀。"',
    },
  ],
});

// 村妇
registerNPC({
  id: 'village_women',
  name: '石嫂',
  title: '村妇',
  description: '一个穿着兽皮衣服的妇人，正在修补石屋。她的手上有很多老茧，但动作麻利。',
  greeting: '石嫂正在修补石屋，见你来了，微笑着说："客人来了！快进屋坐坐。"',
  roomId: 'stone_village_houses',
  dialogues: [
    {
      id: 'woman_intro',
      topic: '询问生活',
      text: '"我们石村的生活很简单。"石嫂放下手中的活计："男人出去狩猎，女人在家做饭、修补房屋。虽然辛苦，但很充实。"',
    },
    {
      id: 'woman_clothes',
      topic: '询问服饰',
      text: '"这些都是兽皮做的。"石嫂指着身上的衣服："我们石村没有布料，只能用兽皮做衣服。虽然粗糙，但很保暖。"',
    },
    {
      id: 'woman_child',
      topic: '询问孩子',
      text: '"村里的孩子都很懂事。"石嫂笑着说："他们从小就跟着大人学习狩猎和做饭。石昊那孩子最厉害，小小年纪就比很多大人都能打。"',
    },
  ],
});

// 长老
registerNPC({
  id: 'village_elder',
  name: '石老',
  title: '石村长老',
  description: '一个白发苍苍的老者，坐在议事石旁。他的眼神深邃，仿佛看透了世间万物。',
  greeting: '石老正在议事石旁晒太阳，见你来了，微微点头："远方来的客人，欢迎来到石村。"',
  roomId: 'stone_village_center',
  dialogues: [
    {
      id: 'elder_intro',
      topic: '询问石村历史',
      text: '"石村已有数百年的历史。"石老缓缓说道："我们的祖先来自远方，为了躲避战乱来到这里。柳神一直守护着我们。"',
    },
    {
      id: 'elder_willow',
      topic: '询问柳神来历',
      text: '"柳神的来历很神秘。"石老压低声音："据说它是上古时期一位强大的生灵陨落之后所化。那场雷雨，是它重生的契机。"',
    },
    {
      id: 'elder_future',
      topic: '询问石村未来',
      text: '"石村的未来？"石老沉思片刻："我希望石村能一直安宁下去。但我知道，这很难。外面的世界变化太快，迟早会影响到我们。"',
    },
    {
      id: 'elder_secret',
      topic: '打听石村秘密',
      text: '石老压低声音："石村地下有一个秘密通道，通向一座古老的遗迹。那是我们祖先留下的，但至今没有人敢进去。"',
      condition: (p: IPlayer) => p.realm >= 4,
    },
  ],
});

// 练武师傅
registerNPC({
  id: 'village_trainer',
  name: '石铁拳',
  title: '石村武师',
  description: '一个身材魁梧的中年男子，穿着兽皮衣服，肌肉发达。他正在指导几个少年练习拳脚。',
  greeting: '石铁拳正在指导少年们练习，见你来了，大声喊道："客人来了！要不要切磋一下？"',
  roomId: 'stone_village_training',
  dialogues: [
    {
      id: 'trainer_intro',
      topic: '询问练武',
      text: '"练武是我们石村男人的必修课。"石铁拳挥舞着拳头："只有练就一身好本领，才能在这片蛮荒之地生存下去。"',
    },
    {
      id: 'trainer_method',
      topic: '询问练武方法',
      text: '"我们石村的练武方法很简单。"石铁拳指着石桩："每天击打石桩，锻炼力量和速度。然后学习一些简单的招式。"',
    },
    {
      id: 'trainer_fight',
      topic: '切磋武艺',
      text: '"来，我们切磋一下！"石铁拳摆开架势："让我看看你的实力！"',
      onSelect: () => {
        const win = Math.random() > 0.6;
        return { messages: win ? ['你击败了石铁拳！他惊讶地说："没想到你的实力这么强！"'] : ['石铁拳轻松击败了你。他笑着说："继续努力！"'] };
      },
    },
    {
      id: 'trainer_shihao',
      topic: '询问石昊',
      text: '"石昊那孩子是个练武的好苗子。"石铁拳赞赏地说："他的体质远超常人，学东西也快。假以时日，他一定能成为一个强大的修士。"',
    },
  ],
});

// ===== 小孤山镇NPC =====

// 镇长
registerNPC({
  id: 'town_mayor',
  name: '赵大山',
  title: '小孤山镇镇长',
  description: '一个身材高大的中年男子，穿着粗布长袍，面容坚毅。他是小孤山镇的镇长，负责管理全镇事务。',
  greeting: '赵大山正在处理公务，见你来了，放下文书："道友好！欢迎来到小孤山镇。"',
  roomId: 'little_gu_hall',
  dialogues: [
    {
      id: 'mayor_intro',
      topic: '询问小孤山镇',
      text: '"小孤山镇位于苍莽山脉外部，人口约两千余。这里是连接大荒村落与外部世界的重要节点。"赵大山介绍道。',
    },
    {
      id: 'mayor_mountain',
      topic: '询问石山',
      text: '"石山是我们镇的守护象征。"赵大山指着北面："那座石山是山神后裔所化，一直守护着我们小孤山镇。"',
    },
    {
      id: 'mayor_market',
      topic: '询问集市',
      text: '"我们镇逢五逢十开集。"赵大山笑着说："到时候集市会非常热闹，各种货物应有尽有。"',
    },
    {
      id: 'mayor_quest',
      topic: '请求任务',
      text: '"任务？可以。最近镇外有凶兽出没，影响了商路。如果你能帮我们清理一下，全镇都会感激你。"',
      condition: (p: IPlayer) => p.realm >= 2,
    },
    {
      id: 'mayor_trade',
      topic: '询问贸易',
      text: '"小孤山镇是大荒中的中转与交易节点。"赵大山说："周边村落的人都会来这里贸易和交流。我们以物易物为主，灵晶为辅。"',
    },
  ],
});

// 镇公所萨满
registerNPC({
  id: 'town_shaman',
  name: '孙萨满',
  title: '镇公所萨满',
  description: '一个穿着黑色长袍的老者，面容严肃，眼神深邃。他是小孤山镇的萨满，负责祭祀山神。',
  greeting: '孙萨满正在祭祀，见你来了，停下手中的动作："道友好！你是来参拜山神的吗？"',
  roomId: 'little_gu_hall',
  dialogues: [
    {
      id: 'shaman_intro',
      topic: '询问祭祀',
      text: '"祭祀山神是我们镇最重要的仪式。"孙萨满严肃地说："每月初一和十五，我们会在这里举行祭祀，祈求山神保佑。"',
    },
    {
      id: 'shaman_mountain',
      topic: '询问山神',
      text: '"山神是上古时期一位强大的生灵陨落之后所化。"孙萨满压低声音："那座石山就是他的肉身，他在沉睡中守护着这片土地。"',
    },
    {
      id: 'shaman_ritual',
      topic: '参加祭祀',
      text: '"如果你想参加祭祀，可以在每月初一或十五来到这里。祭祀时，我们会向石山献上祭品，祈求山神的庇佑。"',
    },
    {
      id: 'shaman_secret',
      topic: '打听山神秘密',
      text: '孙萨满压低声音："据说，山神在沉睡中会选择有缘人，赐予他力量。但至今还没有人获得山神的传承……"',
      condition: (p: IPlayer) => p.realm >= 4,
    },
  ],
});

// 城门守卫
registerNPC({
  id: 'town_guard',
  name: '李铁',
  title: '城门守卫',
  description: '一个身材魁梧的壮汉，穿着兽皮制成的铠甲，手里拿着长矛。他的脸上有一道疤痕，显然是与凶兽搏斗留下的。',
  greeting: '李铁正在城门口巡逻，见你来了，大声喊道："站住！你是谁？来小孤山镇干什么？"',
  roomId: 'little_gu_gate',
  dialogues: [
    {
      id: 'guard_intro',
      topic: '说明来意',
      text: '李铁放下长矛："原来是远方来的客人。欢迎来到小孤山镇！不过要小心，镇外最近不太平。"',
    },
    {
      id: 'guard_warning',
      topic: '询问安全',
      text: '"小孤山镇很安全，石山会保护我们。"李铁自豪地说："但出了城门就不一样了，山林里有很多凶兽。"',
    },
    {
      id: 'guard_wall',
      topic: '询问城墙',
      text: '"城墙高约三丈，由夯土筑成。"李铁指着城墙："城墙上有瞭望台和烽燧，可以监视四周。一旦发现危险，就会点燃烽火。"',
    },
  ],
});

// 客栈老板
registerNPC({
  id: 'inn_keeper',
  name: '王掌柜',
  title: '悦来客栈老板',
  description: '一个身材微胖的中年男子，穿着干净的长袍，笑容可掬。他是悦来客栈的老板，为人热情好客。',
  greeting: '王掌柜热情地迎上来："道友好！欢迎来到悦来客栈。是要住店，还是用餐？"',
  roomId: 'little_gu_inn',
  dialogues: [
    {
      id: 'inn_stay',
      topic: '住店',
      text: '王掌柜点点头："住店好啊！普通客房十枚原始币一晚，上等客房三十枚。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 10) {
          p.gold -= 10;
          return { messages: ['你在悦来客栈住了一晚。房间干净整洁，休息得很好。'] };
        }
        return { messages: ['王掌柜摇摇头："没钱住不了。"'] };
      },
    },
    {
      id: 'inn_eat',
      topic: '用餐',
      text: '王掌柜微微一笑："我们客栈的饭菜很不错。灵酒五枚，灵食十枚，套餐二十枚。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 5) {
          p.gold -= 5;
          return { messages: ['你品尝了客栈的灵酒，一股温热的力量涌入体内。'] };
        }
        return { messages: ['王掌柜摇摇头："没钱吃不了。"'] };
      },
    },
    {
      id: 'inn_gossip',
      topic: '打听消息',
      text: '王掌柜压低声音："客栈是消息最灵通的地方。最近镇外有凶兽出没，商队都不敢走了……"',
    },
    {
      id: 'inn_story',
      topic: '聊客栈',
      text: '"悦来客栈已经开了二十年了。"王掌柜感慨地说："多少商人和修士在这里落脚，多少故事在这里发生。"',
    },
  ],
});

// 铁匠
registerNPC({
  id: 'blacksmith',
  name: '张铁锤',
  title: '铁锤铁匠铺老板',
  description: '一个身材魁梧的中年男子，穿着黑色的围裙，手臂上肌肉隆起。他正在敲打铁块，火星四溅。',
  greeting: '张铁锤正在锻造兵器，见你来了，放下铁锤："道友好！来铁匠铺是要锻造兵器，还是购买成品？"',
  roomId: 'little_gu_blacksmith',
  dialogues: [
    {
      id: 'smith_intro',
      topic: '询问铁匠铺',
      text: '"铁锤铁匠铺是小孤山镇最好的铁匠铺。"张铁锤自豪地说："我打造的兵器锋利无比，远近闻名。"',
    },
    {
      id: 'smith_buy',
      topic: '购买兵器',
      text: '张铁锤点点头："我这里有各种兵器。长剑五十枚，大刀六十枚，斧头四十枚。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 50) {
          p.gold -= 50;
          return { messages: ['你在铁匠铺购买了一把长剑。剑身锋利，质量不错。'] };
        }
        return { messages: ['张铁锤摇摇头："没钱买不了。"'] };
      },
    },
    {
      id: 'smith_forge',
      topic: '锻造兵器',
      text: '"锻造兵器可以。"张铁锤想了想："普通兵器一百枚原始币，精品兵器三百枚。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 100) {
          p.gold -= 100;
          return { messages: ['张铁锤为你锻造了一把精铁长剑。剑身锋利，质量上乘。'] };
        }
        return { messages: ['张铁锤摇摇头："没钱锻造不了。"'] };
      },
    },
    {
      id: 'smith_story',
      topic: '聊锻造',
      text: '"锻造是一门学问。"张铁锤一边敲打铁块一边说："火候、力度、选材，每一步都很重要。一把好兵器，需要匠人的心血。"',
    },
  ],
});

// 药师
registerNPC({
  id: 'pharmacist',
  name: '陈大夫',
  title: '百草堂药师',
  description: '一个穿着白色长袍的老者，面容和蔼，手里拿着一本药书。他是百草堂的药师，懂一些医术。',
  greeting: '陈大夫正在整理药材，见你来了，放下药书："道友好！来百草堂是要买药，还是看病？"',
  roomId: 'little_gu_pharmacy',
  dialogues: [
    {
      id: 'pharma_intro',
      topic: '询问药铺',
      text: '"百草堂是小孤山镇唯一的药铺。"陈大夫笑着说："我们有各种草药和丹药，可以治疗各种伤病。"',
    },
    {
      id: 'pharma_buy',
      topic: '购买药材',
      text: '陈大夫点点头："我们有各种药材。疗伤药二十枚，法力药二十五枚，解毒药三十枚。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 20) {
          p.gold -= 20;
          return { messages: ['你在百草堂购买了一瓶疗伤药。药品质地不错。'] };
        }
        return { messages: ['陈大夫摇摇头："没钱买不了。"'] };
      },
    },
    {
      id: 'pharma_heal',
      topic: '看病治疗',
      text: '"看病可以。"陈大夫想了想："诊断费十枚原始币，治疗费另算。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 10) {
          p.gold -= 10;
          return { messages: ['陈大夫为你诊断了一下，开了一些药。你感觉好多了。'] };
        }
        return { messages: ['陈大夫摇摇头："没钱看不了病。"'] };
      },
    },
    {
      id: 'pharma_story',
      topic: '聊医术',
      text: '"医术是救人的学问。"陈大夫感慨地说："我年轻时曾游历四方，学到了不少医术。现在回到家乡，为乡亲们看病。"',
    },
  ],
});

// 酒肆老板
registerNPC({
  id: 'wine_keeper',
  name: '刘老板',
  title: '杏花村酒肆老板',
  description: '一个穿着粗布衣服的中年男子，面容憨厚，笑容可掬。他是杏花村酒肆的老板，为人热情。',
  greeting: '刘老板正在招呼客人，见你来了，大声喊道："道友好！来喝一杯？"',
  roomId: 'little_gu_wine',
  dialogues: [
    {
      id: 'wine_drink',
      topic: '喝一杯',
      text: '刘老板微微一笑："我们杏花村的灵酒很不错。灵酒五枚，米酒三枚，果酒四枚。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 5) {
          p.gold -= 5;
          return { messages: ['你品尝了杏花村的灵酒，味道醇厚，一股温热的力量涌入体内。'] };
        }
        return { messages: ['刘老板摇摇头："没钱喝不了。"'] };
      },
    },
    {
      id: 'wine_food',
      topic: '来点下酒菜',
      text: '刘老板点点头："下酒菜有花生、瓜子、卤肉等。每份五枚原始币。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 5) {
          p.gold -= 5;
          return { messages: ['你点了一份卤肉，味道不错。'] };
        }
        return { messages: ['刘老板摇摇头："没钱吃不了。"'] };
      },
    },
    {
      id: 'wine_gossip',
      topic: '打听消息',
      text: '刘老板压低声音："酒肆是消息最灵通的地方。最近镇上来了一些陌生的修士，不知道他们想干什么……"',
    },
    {
      id: 'wine_story',
      topic: '聊酒肆',
      text: '"杏花村酒肆已经开了十五年了。"刘老板感慨地说："多少人在这里饮酒聊天，多少故事在这里发生。"',
    },
  ],
});

// 驿站站长
registerNPC({
  id: 'post_master',
  name: '周驿丞',
  title: '驿站站长',
  description: '一个穿着官服的中年男子，面容严肃，做事一丝不苟。他是小孤山镇驿站的站长，负责传递消息。',
  greeting: '周驿丞正在整理信件，见你来了，放下手中的活计："道友好！来驿站是要寄信，还是有其他事？"',
  roomId: 'little_gu_post',
  dialogues: [
    {
      id: 'post_intro',
      topic: '询问驿站',
      text: '"驿站负责传递消息和接待来往的官员。"周驿丞介绍道："我们这里是大荒消息的中转站。"',
    },
    {
      id: 'post_send',
      topic: '寄信',
      text: '周驿丞点点头："寄信可以。一封普通信件五枚原始币，加急信件十枚。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 5) {
          p.gold -= 5;
          return { messages: ['你在驿站寄了一封信。周驿丞承诺会尽快送达。'] };
        }
        return { messages: ['周驿丞摇摇头："没钱寄不了信。"'] };
      },
    },
    {
      id: 'post_message',
      topic: '打听消息',
      text: '周驿丞压低声音："驿站消息灵通。最近大荒各地都不太平，凶兽越来越活跃……"',
    },
    {
      id: 'post_story',
      topic: '聊驿站',
      text: '"驿站是连接大荒各地的桥梁。"周驿丞感慨地说："没有驿站，大荒就会变成一片孤岛。"',
    },
  ],
});

// 集市小贩
registerNPC({
  id: 'market_vendor',
  name: '赵小贩',
  title: '集市小贩',
  description: '一个穿着粗布衣服的中年男子，面容精明，正在大声叫卖。他是集市上的小贩，卖着各种杂货。',
  greeting: '赵小贩正在大声叫卖："走过路过不要错过！新鲜的灵草、灵晶，便宜卖了！"',
  roomId: 'little_gu_market',
  dialogues: [
    {
      id: 'vendor_intro',
      topic: '询问货物',
      text: '"我这里什么都有！"赵小贩热情地说："灵草、灵晶、凶兽骨，应有尽有！"',
    },
    {
      id: 'vendor_buy',
      topic: '购买货物',
      text: '赵小贩指着摊位："灵草十枚，灵晶五十枚，凶兽骨三十枚。你想要什么？"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 10) {
          p.gold -= 10;
          return { messages: ['你在集市上购买了一株灵草。灵草品质不错。'] };
        }
        return { messages: ['赵小贩摇摇头："没钱买不了。"'] };
      },
    },
    {
      id: 'vendor_trade',
      topic: '以物易物',
      text: '"以物易物也可以！"赵小贩想了想："你有什么东西？草药、矿石都可以换。"',
      onSelect: (p: IPlayer) => {
        return { messages: ['集市以物易物，可交换灵草、灵晶等物品。'] };
      },
    },
    {
      id: 'vendor_gossip',
      topic: '打听消息',
      text: '赵小贩压低声音："集市消息灵通。最近镇外有凶兽出没，大家都很担心……"',
    },
  ],
});

// 集市买家
registerNPC({
  id: 'market_buyer',
  name: '钱掌柜',
  title: '商人',
  description: '一个穿着绸缎衣裳的中年男子，面容精明，正在挑选货物。他是一个商人，经常来小孤山镇采购。',
  greeting: '钱掌柜正在挑选货物，见你来了，微微一笑："道友好！来集市采购吗？"',
  roomId: 'little_gu_market',
  dialogues: [
    {
      id: 'buyer_intro',
      topic: '询问生意',
      text: '"我是做药材生意的。"钱掌柜说："小孤山镇的草药品质不错，我经常来采购。"',
    },
    {
      id: 'buyer_price',
      topic: '询问价格',
      text: '"价格嘛，要看品质。"钱掌柜想了想："普通灵草十枚，珍品灵草三十枚。"',
    },
    {
      id: 'buyer_deal',
      topic: '谈生意',
      text: '"如果你有好的药材，可以卖给我。"钱掌柜说："我出的价格很公道。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 10) {
          p.gold += 20;
          return { messages: ['你卖给钱掌柜一些药材，赚了二十枚原始币。'] };
        }
        return { messages: ['钱掌柜摇摇头："你没有药材可卖。"'] };
      },
    },
    {
      id: 'buyer_news',
      topic: '打听外部消息',
      text: '钱掌柜压低声音："外面的世界变化很快。最近火皇城在招兵买马，似乎要攻打什么地方……"',
    },
  ],
});

// 山顶祭司
registerNPC({
  id: 'mountain_priest',
  name: '山神庙祝',
  title: '山神庙祝',
  description: '一个穿着灰色长袍的老者，面容慈祥，正在庙内诵经。他是山顶小庙的庙祝，负责守护山神。',
  greeting: '山神庙祝正在诵经，见你来了，停下手中的动作："道友好！欢迎来到山神庙。"',
  roomId: 'little_gu_stone_mountain_top',
  dialogues: [
    {
      id: 'priest_intro',
      topic: '询问山神庙',
      text: '"山神庙是祭祀山神的地方。"山神庙祝介绍道："每天都有不少香客前来参拜。"',
    },
    {
      id: 'priest_pray',
      topic: '参拜山神',
      text: '"参拜山神可以祈福。"山神庙祝说："只要心诚，山神会保佑你的。"',
      onSelect: (p: IPlayer) => {
        return { messages: ['你虔诚地参拜了山神。一股温和的力量涌入体内。'] };
      },
    },
    {
      id: 'priest_mountain',
      topic: '询问石山',
      text: '"这座石山是山神后裔所化。"山神庙祝压低声音："据说，山神在沉睡中会选择有缘人，赐予他力量。"',
    },
    {
      id: 'priest_secret',
      topic: '打听山神秘密',
      text: '山神庙祝压低声音："庙后有一个山洞，里面藏着山神的传承。但山洞被阵法封印，只有有缘人才能进入……"',
      condition: (p: IPlayer) => p.realm >= 5,
    },
  ],
});

// 石山守卫
registerNPC({
  id: 'mountain_guard',
  name: '石护卫',
  title: '石山护卫',
  description: '一个身材高大的中年男子，穿着灰色长袍，面容严肃。他是石山的护卫，负责守护石山的安全。',
  greeting: '石护卫正在石山下巡逻，见你来了，微微点头："道友好！欢迎来到石山。"',
  roomId: 'little_gu_stone_mountain',
  dialogues: [
    {
      id: 'guard_intro',
      topic: '询问石山',
      text: '"石山是小孤山镇的守护象征。"石护卫介绍道："它庇护着全镇的人，让我们免受凶兽的侵扰。"',
    },
    {
      id: 'guard_blessing',
      topic: '祈求祝福',
      text: '"在石山下祈福，可以得到山神的祝福。"石护卫说："很多人都来这里祈福。"',
      onSelect: (p: IPlayer) => {
        return { messages: ['你在石山下祈福，感到一股温和的力量涌入体内。'] };
      },
    },
    {
      id: 'guard_warning',
      topic: '询问安全',
      text: '"石山范围内是安全的。"石护卫说："凶兽不敢靠近石山。但出了石山范围就不一样了。"',
    },
  ],
});

// 镇民
registerNPC({
  id: 'town_resident',
  name: '张大妈',
  title: '镇民',
  description: '一个穿着粗布衣服的中年妇人，正在街边摆摊卖菜。她是小孤山镇的居民。',
  greeting: '张大妈正在摆摊，见你来了，热情地招呼："道友好！来买点菜？"',
  roomId: 'little_gu_street_east',
  dialogues: [
    {
      id: 'resident_intro',
      topic: '询问生活',
      text: '"我们小孤山镇的生活很平静。"张大妈说："虽然不富裕，但也不愁吃穿。"',
    },
    {
      id: 'resident_buy',
      topic: '买菜',
      text: '张大妈指着摊位："我这里有新鲜的蔬菜和水果。青菜五枚，水果十枚。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 5) {
          p.gold -= 5;
          return { messages: ['你买了一些青菜。青菜很新鲜。'] };
        }
        return { messages: ['张大妈摇摇头："没钱买不了。"'] };
      },
    },
    {
      id: 'resident_gossip',
      topic: '打听消息',
      text: '张大妈压低声音："最近镇外不太平，有凶兽出没。大家都很担心……"',
    },
    {
      id: 'resident_story',
      topic: '聊镇上事',
      text: '"小孤山镇虽然不大，但很热闹。"张大妈笑着说："逢五逢十开集的时候，镇上人山人海。"',
    },
  ],
});

// 镇公所职员
registerNPC({
  id: 'town_priest',
  name: '李文书',
  title: '镇公所职员',
  description: '一个穿着长袍的中年男子，正在街边张贴告示。他是镇公所的职员，负责传达公告。',
  greeting: '李文书正在张贴告示，见你来了，微微一笑："道友好！看看告示吧。"',
  roomId: 'little_gu_street_north',
  dialogues: [
    {
      id: 'clerk_intro',
      topic: '询问告示',
      text: '"这是镇公所的公告。"李文书指着告示："最近镇外有凶兽出没，提醒大家注意安全。"',
    },
    {
      id: 'clerk_event',
      topic: '询问活动',
      text: '"我们镇逢五逢十开集。"李文书说："到时候集市会非常热闹，各种货物应有尽有。"',
    },
    {
      id: 'clerk_help',
      topic: '请求帮助',
      text: '"如果你想帮助镇上，可以去找镇长。"李文书说："他会给你安排任务。"',
    },
  ],
});

// ===== 石国皇都NPC =====

// 石国皇帝
registerNPC({
  id: 'emperor',
  name: '石皇',
  title: '石国皇帝',
  description: '一个威严的中年男子，穿着金黄色的龙袍，头戴皇冠。面容刚毅，眼神深邃，充满了帝王之气。',
  greeting: '石皇坐在金龙椅上，见你来了，微微点头："你是何人？觐见朕有何事？"',
  roomId: 'stone_kingdom_throne',
  dialogues: [
    {
      id: 'emperor_intro',
      topic: '自我介绍',
      text: '石皇微微点头："原来是远方来的修士。欢迎来到石国皇都。朕听说你在荒域颇有声望。"',
    },
    {
      id: 'emperor_quest',
      topic: '请求任务',
      text: '"任务？"石皇想了想："最近石国边境不太平，有凶兽和异族侵扰。如果你能帮朕解决这些问题，朕必有重赏。"',
      condition: (p: IPlayer) => p.realm >= 5,
    },
    {
      id: 'emperor_reward',
      topic: '询问奖励',
      text: '"奖励？"石皇微微一笑："朕可以赐你爵位，赏赐宝物，甚至传授石国的皇家宝术。"',
    },
    {
      id: 'emperor_story',
      topic: '聊石国历史',
      text: '"石国已有千年历史。"石皇缓缓说道："朕的先祖曾是荒域的霸主，开创了石国的基业。现在，朕要让石国更加强大。"',
    },
    {
      id: 'emperor_secret',
      topic: '打听皇家秘密',
      text: '石皇压低声音："石国深处有一座上古遗迹，里面藏着石国最核心的秘密。但那地方危险重重，至今没有人能完全探索。"',
      condition: (p: IPlayer) => p.realm >= 8,
    },
  ],
});

// 丞相
registerNPC({
  id: 'imperial_prime_minister',
  name: '魏征',
  title: '石国丞相',
  description: '一个白发苍苍的老者，穿着紫色的官服，面容慈祥但眼神锐利。他是石国的丞相，辅佐皇帝处理政务。',
  greeting: '魏征站在金銮殿一侧，见你来了，微微鞠躬："道友好！欢迎来到金銮殿。"',
  roomId: 'stone_kingdom_throne',
  dialogues: [
    {
      id: 'minister_intro',
      topic: '询问政务',
      text: '"石国最近政务繁忙。"魏征说："边境不太平，需要派兵镇压。同时，各地的税收和民生也需要处理。"',
    },
    {
      id: 'minister_advice',
      topic: '请教治国之道',
      text: '"治国之道，在于民生。"魏征感慨地说："只有百姓安居乐业，国家才能繁荣昌盛。"',
    },
    {
      id: 'minister_help',
      topic: '请求帮助',
      text: '"如果你想帮助石国，可以去边境看看。"魏征说："那里有凶兽和异族侵扰，需要强大的修士前去镇压。"',
    },
    {
      id: 'minister_story',
      topic: '聊石国',
      text: '"石国是荒域最强大的国家之一。"魏征自豪地说："我们有强大的军队，有丰富的资源，有深厚的底蕴。"',
    },
  ],
});

// 皇后
registerNPC({
  id: 'empress',
  name: '萧皇后',
  title: '石国皇后',
  description: '一个美丽的女子，穿着华丽的凤袍，头戴凤冠。面容端庄，气质高雅，充满了母仪天下的风范。',
  greeting: '萧皇后正在后宫花园赏花，见你来了，微微一笑："道友好！欢迎来到后宫。"',
  roomId: 'stone_kingdom_harem',
  dialogues: [
    {
      id: 'empress_intro',
      topic: '询问后宫',
      text: '"后宫是妃嫔们居住的地方。"萧皇后说："这里虽然奢华，但也充满了各种纷争。"',
    },
    {
      id: 'empress_advice',
      topic: '请教后宫之道',
      text: '"后宫之道，在于平衡。"萧皇后感慨地说："只有保持各方势力的平衡，后宫才能安宁。"',
    },
    {
      id: 'empress_gift',
      topic: '赠送礼物',
      text: '萧皇后微微一笑："既然道友来了，本宫送你一件礼物。"',
      onSelect: (p: IPlayer) => {
        return { messages: ['萧皇后送给你一枚玉佩。玉佩温润如玉，散发着淡淡的灵光。'] };
      },
    },
    {
      id: 'empress_story',
      topic: '聊宫廷',
      text: '"宫廷生活看似奢华，实则充满了各种规矩和束缚。"萧皇后感慨地说："本宫有时候也向往外面的世界。"',
    },
  ],
});

// 皇子
registerNPC({
  id: 'prince',
  name: '石浩',
  title: '大皇子',
  description: '一个年轻英俊的男子，穿着华丽的皇子服饰，面容刚毅。他是石国的大皇子，也是皇位的有力竞争者。',
  greeting: '石浩正在演武场练习武艺，见你来了，停下手中的动作："道友好！来皇子府有何指教？"',
  roomId: 'stone_kingdom_prince_mansion',
  dialogues: [
    {
      id: 'prince_intro',
      topic: '自我介绍',
      text: '石浩微微一笑："本皇子是石国的大皇子。听说你实力不错，要不要切磋一下？"',
    },
    {
      id: 'prince_fight',
      topic: '切磋武艺',
      text: '石浩摆开架势："来，让本皇子看看你的实力！"',
      onSelect: () => {
        const win = Math.random() > 0.5;
        return { messages: win ? ['你击败了大皇子！他惊讶地说："没想到你的实力这么强！"'] : ['大皇子轻松击败了你。他笑着说："继续努力！"'] };
      },
    },
    {
      id: 'prince_help',
      topic: '请求帮助',
      text: '"如果你想帮助本皇子，可以帮我收集一些修炼资源。"石浩说："本皇子正在修炼一门强大的宝术，需要一些珍稀材料。"',
      condition: (p: IPlayer) => p.realm >= 4,
    },
    {
      id: 'prince_secret',
      topic: '打听皇子秘密',
      text: '石浩压低声音："本皇子正在秘密培养自己的势力。如果你愿意效忠于我，将来本皇子登基后，必有重赏。"',
      condition: (p: IPlayer) => p.realm >= 6,
    },
  ],
});

// 大臣
registerNPC({
  id: 'minister',
  name: '张尚书',
  title: '兵部尚书',
  description: '一个中年男子，穿着绿色的官服，面容严肃。他是石国的兵部尚书，负责军事事务。',
  greeting: '张尚书正在处理军务，见你来了，放下文书："道友好！来兵部有何指教？"',
  roomId: 'stone_kingdom_ministries',
  dialogues: [
    {
      id: 'minister_intro',
      topic: '询问军务',
      text: '"石国最近军务繁忙。"张尚书说："边境有凶兽和异族侵扰，需要派兵镇压。同时，各地的军队也需要训练和装备。"',
    },
    {
      id: 'minister_help',
      topic: '请求任务',
      text: '"如果你想帮助石国，可以去边境看看。"张尚书说："那里有一支军队被围困，需要强大的修士前去救援。"',
      condition: (p: IPlayer) => p.realm >= 5,
    },
    {
      id: 'minister_reward',
      topic: '询问奖励',
      text: '"奖励？"张尚书说："如果你能成功救援，朕会赐你军职，赏赐兵器和铠甲。"',
    },
    {
      id: 'minister_story',
      topic: '聊军队',
      text: '"石国的军队是荒域最强大的军队之一。"张尚书自豪地说："我们有精锐的士兵，有强大的将领，有精良的装备。"',
    },
  ],
});

// 东市商人
registerNPC({
  id: 'east_market_merchant',
  name: '赵富商',
  title: '珍宝阁老板',
  description: '一个穿着华丽衣裳的中年男子，面容精明，眼神锐利。他是东市珍宝阁的老板，经营各种奢侈品和灵材。',
  greeting: '赵富商热情地迎上来："道友好！欢迎来到珍宝阁。本店有各种珍稀物品，不知道友想要什么？"',
  roomId: 'stone_kingdom_east_market',
  dialogues: [
    {
      id: 'merchant_intro',
      topic: '询问商品',
      text: '"珍宝阁经营各种珍稀物品。"赵富商说："有灵晶、宝术卷轴、珍稀药材、法器等。应有尽有。"',
    },
    {
      id: 'merchant_buy',
      topic: '购买商品',
      text: '赵富商指着货架："灵晶一百枚，宝术卷轴五百枚，珍稀药材三百枚，法器一千枚。你想要什么？"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 100) {
          p.gold -= 100;
          return { messages: ['你在珍宝阁购买了一枚灵晶。灵晶品质上乘。'] };
        }
        return { messages: ['赵富商摇摇头："没钱买不了。"'] };
      },
    },
    {
      id: 'merchant_sell',
      topic: '出售物品',
      text: '"如果你有珍稀物品，可以卖给我。"赵富商说："我出的价格很公道。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 100) {
          p.gold += 200;
          return { messages: ['你卖给赵富商一件珍稀物品，赚了两百枚原始币。'] };
        }
        return { messages: ['赵富商摇摇头："你没有珍稀物品可卖。"'] };
      },
    },
    {
      id: 'merchant_gossip',
      topic: '打听消息',
      text: '赵富商压低声音："东市消息灵通。最近皇室要举办一场盛大的拍卖会，据说会有很多珍稀物品出现……"',
    },
  ],
});

// 胡商
registerNPC({
  id: 'hu_merchant',
  name: '哈桑',
  title: '胡商',
  description: '一个穿着奇特服饰的异族男子，面容精明，说着不太流利的汉语。他是西市的胡商，带来了各种异域商品。',
  greeting: '哈桑热情地招呼："道友好！来看看我的商品！都是异域的好东西！"',
  roomId: 'stone_kingdom_west_market',
  dialogues: [
    {
      id: 'hu_intro',
      topic: '询问商品',
      text: '"我带来了各种异域商品。"哈桑说："有西域的香料、北荒的兽皮、南海的珍珠等。"',
    },
    {
      id: 'hu_buy',
      topic: '购买商品',
      text: '哈桑指着摊位："西域香料五十枚，北荒兽皮八十枚，南海珍珠一百枚。你想要什么？"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 50) {
          p.gold -= 50;
          return { messages: ['你在胡商那里购买了一些西域香料。香料香气浓郁。'] };
        }
        return { messages: ['哈桑摇摇头："没钱买不了。"'] };
      },
    },
    {
      id: 'hu_story',
      topic: '聊异域',
      text: '"我来自西域。"哈桑说："那里有沙漠、绿洲、古城。和这里完全不一样。"',
    },
    {
      id: 'hu_gossip',
      topic: '打听异域消息',
      text: '哈桑压低声音："西域最近不太平。听说有一股强大的势力正在崛起，可能会影响到中原……"',
    },
  ],
});

// 皇城守卫
registerNPC({
  id: 'imperial_guard',
  name: '李校尉',
  title: '皇城守卫校尉',
  description: '一个身材高大的中年男子，穿着金黄色的铠甲，手持长枪。面容严肃，眼神锐利。',
  greeting: '李校尉正在皇城门口巡逻，见你来了，大声喊道："站住！出示通行令牌！"',
  roomId: 'stone_kingdom_imperial_gate',
  dialogues: [
    {
      id: 'guard_intro',
      topic: '出示令牌',
      text: '李校尉检查了你的令牌，点点头："原来是有通行权的道友。请进。"',
    },
    {
      id: 'guard_warning',
      topic: '询问注意事项',
      text: '"进入皇城后，不得随意走动。"李校尉严肃地说："皇城守卫森严，违反规矩者严惩不贷。"',
    },
    {
      id: 'guard_info',
      topic: '询问皇城',
      text: '"皇城是朝廷衙署区。"李校尉说："里面有六部衙门、王府、典庙等重要建筑。"',
    },
  ],
});

// 典庙守护者
registerNPC({
  id: 'temple_guardian',
  name: '孙长老',
  title: '典庙守护者',
  description: '一个白发苍苍的老者，穿着灰色的道袍，面容严肃。他是典庙的守护者，负责保护皇家秘典。',
  greeting: '孙长老正在典庙门口守卫，见你来了，微微点头："道友好！来典庙有何指教？"',
  roomId: 'stone_kingdom_temple',
  dialogues: [
    {
      id: 'guardian_intro',
      topic: '询问典庙',
      text: '"典庙是存放皇家秘典的地方。"孙长老说："分为经文楼和宝术殿两部分。"',
    },
    {
      id: 'guardian_access',
      topic: '请求进入',
      text: '"进入典庙需要获得许可。"孙长老说："普通修士只能在外面参观，只有得到皇帝特许的人才能进入内部。"',
      condition: (p: IPlayer) => p.realm >= 5,
    },
    {
      id: 'guardian_story',
      topic: '聊典庙',
      text: '"典庙已有千年历史。"孙长老感慨地说："里面存放着石国历代皇帝收集的各种秘典和宝术。"',
    },
    {
      id: 'guardian_secret',
      topic: '打听典庙秘密',
      text: '孙长老压低声音："典庙深处有一座密室，里面藏着石国最核心的传承。但那地方危险重重……"',
      condition: (p: IPlayer) => p.realm >= 7,
    },
  ],
});

// 经文楼管理员
registerNPC({
  id: 'scripture_keeper',
  name: '周夫子',
  title: '经文楼管理员',
  description: '一个戴着眼镜的老者，穿着青色的道袍，手里拿着一本经书。他是经文楼的管理员，负责管理和整理经文。',
  greeting: '周夫子正在整理经文，见你来了，放下经书："道友好！来经文楼有何指教？"',
  roomId: 'stone_kingdom_scripture',
  dialogues: [
    {
      id: 'keeper_intro',
      topic: '询问经文',
      text: '"经文楼共有九层。"周夫子说："第一层是普通经文，第九层是最珍贵的秘典。"',
    },
    {
      id: 'keeper_read',
      topic: '阅读经文',
      text: '"阅读经文可以。"周夫子说："普通经文可以免费阅读，珍贵秘典需要获得许可。"',
      onSelect: (p: IPlayer) => {
        return { messages: ['你阅读了一些经文，感到有所感悟。'] };
      },
    },
    {
      id: 'keeper_advice',
      topic: '请教修炼',
      text: '"修炼之道，在于领悟。"周夫子感慨地说："这些经文都是先贤的心血，蕴含着深刻的道理。"',
    },
    {
      id: 'keeper_secret',
      topic: '打听秘典',
      text: '周夫子压低声音："经文楼第九层存放着石国最珍贵的秘典。但那里有强大的阵法守护，只有得到皇帝特许的人才能进入……"',
      condition: (p: IPlayer) => p.realm >= 7,
    },
  ],
});

// 宝术殿管理员
registerNPC({
  id: 'technique_keeper',
  name: '武长老',
  title: '宝术殿管理员',
  description: '一个身材魁梧的老者，穿着黑色的道袍，肌肉发达。他是宝术殿的管理员，负责管理和传授宝术。',
  greeting: '武长老正在修炼，见你来了，停下手中的动作："道友好！来宝术殿有何指教？"',
  roomId: 'stone_kingdom_technique',
  dialogues: [
    {
      id: 'technique_intro',
      topic: '询问宝术',
      text: '"宝术殿存放着石国历代皇帝收集的各种宝术和神通。"武长老说："有普通宝术，也有强大的神通。"',
    },
    {
      id: 'technique_learn',
      topic: '学习宝术',
      text: '"学习宝术可以。"武长老说："普通宝术需要一百枚原始币，强大神通需要一千枚原始币，并且需要一定的实力。"',
      condition: (p: IPlayer) => p.realm >= 5,
      onSelect: (p: IPlayer) => {
        if (p.gold >= 100) {
          p.gold -= 100;
          return { messages: ['你学习了一门普通宝术。宝术威力不错。'] };
        }
        return { messages: ['武长老摇摇头："没钱学不了。"'] };
      },
    },
    {
      id: 'technique_advice',
      topic: '请教修炼',
      text: '"修炼宝术，在于悟性和勤奋。"武长老说："只有不断地修炼和领悟，才能掌握强大的宝术。"',
    },
    {
      id: 'technique_secret',
      topic: '打听至尊宝术',
      text: '武长老压低声音："宝术殿深处存放着石国最珍贵的至尊宝术残卷。但那是石国的镇国之宝，只有皇帝才能决定谁能学习……"',
      condition: (p: IPlayer) => p.realm >= 8,
    },
  ],
});

// 宝库守护者
registerNPC({
  id: 'treasure_guardian',
  name: '赵将军',
  title: '宝库守护者',
  description: '一个身材高大的中年男子，穿着银白色的铠甲，手持神兵。面容严肃，眼神锐利。他是宝库的守护者，负责保护石国的宝藏。',
  greeting: '赵将军正在宝库门口守卫，见你来了，大声喊道："站住！宝库重地，闲人免进！"',
  roomId: 'stone_kingdom_treasure',
  dialogues: [
    {
      id: 'treasure_intro',
      topic: '出示许可',
      text: '赵将军检查了你的许可，点点头："原来是有许可的道友。请进。"',
    },
    {
      id: 'treasure_info',
      topic: '询问宝库',
      text: '"宝库是石国历代皇帝收集的奇珍异宝汇聚之地。"赵将军说："里面有灵晶、法器、宝术残卷、上古遗物等。"',
    },
    {
      id: 'treasure_warning',
      topic: '询问注意事项',
      text: '"进入宝库后，不得随意触碰物品。"赵将军严肃地说："宝库内有强大的阵法，擅自触碰物品会受到攻击。"',
    },
    {
      id: 'treasure_secret',
      topic: '打听终极宝藏',
      text: '赵将军压低声音："宝库最深处存放着石国最珍贵的终极宝藏。但那地方有最强大的阵法守护，至今没有人能靠近……"',
      condition: (p: IPlayer) => p.realm >= 9,
    },
  ],
});

// 飞行平台侍者
registerNPC({
  id: 'flying_attendant',
  name: '小飞',
  title: '飞行平台侍者',
  description: '一个年轻的男子，穿着青色的制服，面容英俊。他是飞行平台的侍者，负责管理飞行坐骑。',
  greeting: '小飞热情地迎上来："道友好！欢迎来到飞行平台。要不要乘坐飞行坐骑？"',
  roomId: 'stone_kingdom_flying_platform',
  dialogues: [
    {
      id: 'flying_intro',
      topic: '询问飞行坐骑',
      text: '"飞行平台有各种飞行坐骑。"小飞说："有仙鹤、金鹏、灵鹰等。这些都是皇家御用的坐骑。"',
    },
    {
      id: 'flying_ride',
      topic: '乘坐飞行坐骑',
      text: '"乘坐飞行坐骑可以俯瞰皇都。"小飞说："每次需要一百枚原始币。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 100) {
          p.gold -= 100;
          return { messages: ['你乘坐了一只仙鹤，在空中俯瞰石国皇都。城市宏伟壮丽，尽收眼底。'] };
        }
        return { messages: ['小飞摇摇头："没钱坐不了。"'] };
      },
    },
    {
      id: 'flying_view',
      topic: '欣赏风景',
      text: '"站在飞行平台上，可以俯瞰整个石国皇都。"小飞说："这是皇都最美的景色之一。"',
    },
    {
      id: 'flying_story',
      topic: '聊飞行坐骑',
      text: '"这些飞行坐骑都是皇家精心培养的。"小飞自豪地说："它们都经过严格的训练，非常听话。"',
    },
  ],
});

// 街道小贩
registerNPC({
  id: 'street_vendor',
  name: '王小二',
  title: '街边小贩',
  description: '一个穿着粗布衣服的中年男子，正在街边摆摊卖小吃。他是朱雀大街上的小贩，卖着各种美食。',
  greeting: '王小二正在大声叫卖："来看看！新鲜的糖葫芦、烤肉串！"',
  roomId: 'stone_kingdom_zhuque',
  dialogues: [
    {
      id: 'vendor_intro',
      topic: '询问小吃',
      text: '"我这里有各种小吃。"王小二热情地说："糖葫芦五枚，烤肉串十枚，烧饼三枚。"',
    },
    {
      id: 'vendor_buy',
      topic: '购买小吃',
      text: '王小二递给你一串糖葫芦："尝尝！刚做的，可甜了！"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 5) {
          p.gold -= 5;
          return { messages: ['你品尝了糖葫芦，味道很甜。'] };
        }
        return { messages: ['王小二摇摇头："没钱买不了。"'] };
      },
    },
    {
      id: 'vendor_gossip',
      topic: '打听消息',
      text: '王小二压低声音："朱雀大街消息灵通。最近皇室要举办一场盛大的庆典，据说会有很多大人物参加……"',
    },
  ],
});

// 皇城官员
registerNPC({
  id: 'imperial_officer',
  name: '王大人',
  title: '皇城官员',
  description: '一个穿着蓝色官服的中年男子，正在皇城内行走。他是皇城的一名官员，负责处理日常事务。',
  greeting: '王大人正在忙公务，见你来了，微微点头："道友好！来皇城有何指教？"',
  roomId: 'stone_kingdom_imperial_city',
  dialogues: [
    {
      id: 'officer_intro',
      topic: '询问皇城',
      text: '"皇城是朝廷衙署区。"王大人说："里面有六部衙门、王府、典庙等重要建筑。"',
    },
    {
      id: 'officer_help',
      topic: '请求帮助',
      text: '"如果你想帮助朝廷，可以去找丞相。"王大人说："他会给你安排任务。"',
    },
    {
      id: 'officer_story',
      topic: '聊朝廷',
      text: '"石国朝廷是荒域最强大的朝廷之一。"王大人自豪地说："我们有完善的制度，有优秀的官员，有强大的军队。"',
    },
  ],
});

// 坊区居民
registerNPC({
  id: 'fang_resident',
  name: '张大爷',
  title: '坊区居民',
  description: '一个穿着朴素衣裳的老者，正在坊区内散步。他是朱雀坊的居民，在这里生活了几十年。',
  greeting: '张大爷正在散步，见你来了，微微一笑："道友好！来朱雀坊有何指教？"',
  roomId: 'stone_kingdom_fang_01',
  dialogues: [
    {
      id: 'resident_intro',
      topic: '询问坊区',
      text: '"朱雀坊是外郭城的一个坊区。"张大爷说："这里居住着不少普通百姓和小商人。"',
    },
    {
      id: 'resident_life',
      topic: '询问生活',
      text: '"我们的生活很平静。"张大爷感慨地说："虽然不富裕，但也不愁吃穿。皇都很安全。"',
    },
    {
      id: 'resident_gossip',
      topic: '打听消息',
      text: '张大爷压低声音："最近坊区内来了一些陌生的修士，不知道他们想干什么……"',
    },
    {
      id: 'resident_story',
      topic: '聊皇都',
      text: '"石国皇都是荒域最宏伟的都城。"张大爷自豪地说："在这里生活，是一种福气。"',
    },
  ],
});

// 皇都铁匠
registerNPC({
  id: 'blacksmith_kingdom',
  name: '李铁匠',
  title: '皇都铁匠',
  description: '一个身材魁梧的中年男子，穿着黑色的围裙，手臂上肌肉隆起。他是白虎坊的铁匠，锻造的兵器远近闻名。',
  greeting: '李铁匠正在锻造兵器，见你来了，放下铁锤："道友好！来铁匠铺是要锻造兵器，还是购买成品？"',
  roomId: 'stone_kingdom_fang_04',
  dialogues: [
    {
      id: 'smith_intro',
      topic: '询问铁匠铺',
      text: '"我是皇都最好的铁匠之一。"李铁匠自豪地说："我锻造的兵器锋利无比，很多修士都来我这里定做。"',
    },
    {
      id: 'smith_buy',
      topic: '购买兵器',
      text: '李铁匠指着货架："精铁剑两百枚，玄钢刀三百枚，法器一千枚。你想要什么？"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 200) {
          p.gold -= 200;
          return { messages: ['你在铁匠铺购买了一把精铁剑。剑身锋利，质量上乘。'] };
        }
        return { messages: ['李铁匠摇摇头："没钱买不了。"'] };
      },
    },
    {
      id: 'smith_forge',
      topic: '锻造兵器',
      text: '"锻造兵器可以。"李铁匠说："普通兵器五百枚原始币，精品兵器一千枚，法器五千枚。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 500) {
          p.gold -= 500;
          return { messages: ['李铁匠为你锻造了一把精铁长剑。剑身锋利，质量上乘。'] };
        }
        return { messages: ['李铁匠摇摇头："没钱锻造不了。"'] };
      },
    },
    {
      id: 'smith_story',
      topic: '聊锻造',
      text: '"锻造是一门学问。"李铁匠一边敲打铁块一边说："火候、力度、选材，每一步都很重要。一把好兵器，需要匠人的心血。"',
    },
  ],
});

// 皇都客栈老板
registerNPC({
  id: 'inn_keeper_kingdom',
  name: '陈掌柜',
  title: '皇都客栈老板',
  description: '一个身材微胖的中年男子，穿着干净的长袍，笑容可掬。他是玄武坊客栈的老板，为人热情好客。',
  greeting: '陈掌柜热情地迎上来："道友好！欢迎来到皇都客栈。是要住店，还是用餐？"',
  roomId: 'stone_kingdom_fang_02',
  dialogues: [
    {
      id: 'inn_stay',
      topic: '住店',
      text: '陈掌柜点点头："住店好啊！普通客房五十枚原始币一晚，上等客房一百枚，豪华客房五百枚。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 50) {
          p.gold -= 50;
          return { messages: ['你在皇都客栈住了一晚。房间干净整洁，休息得很好。'] };
        }
        return { messages: ['陈掌柜摇摇头："没钱住不了。"'] };
      },
    },
    {
      id: 'inn_eat',
      topic: '用餐',
      text: '陈掌柜微微一笑："我们客栈的饭菜很不错。灵酒二十枚，灵食五十枚，套餐一百枚。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 20) {
          p.gold -= 20;
          return { messages: ['你品尝了客栈的灵酒，一股温热的力量涌入体内。'] };
        }
        return { messages: ['陈掌柜摇摇头："没钱吃不了。"'] };
      },
    },
    {
      id: 'inn_gossip',
      topic: '打听消息',
      text: '陈掌柜压低声音："客栈是消息最灵通的地方。最近皇室要举办一场盛大的庆典，据说会有很多大人物参加……"',
    },
    {
      id: 'inn_story',
      topic: '聊客栈',
      text: '"皇都客栈已经开了三十年了。"陈掌柜感慨地说："多少商人和修士在这里落脚，多少故事在这里发生。"',
    },
  ],
});

// 皇都修士
registerNPC({
  id: 'cultivator',
  name: '林修士',
  title: '皇都修士',
  description: '一个穿着青色道袍的年轻男子，面容英俊，气质不凡。他是青龙坊的修士，在这里修炼和居住。',
  greeting: '林修士正在修炼，见你来了，停下手中的动作："道友好！来青龙坊有何指教？"',
  roomId: 'stone_kingdom_fang_03',
  dialogues: [
    {
      id: 'cultivator_intro',
      topic: '自我介绍',
      text: '林修士微微一笑："在下林青云，是一名修士。听说你实力不错，要不要切磋一下？"',
    },
    {
      id: 'cultivator_fight',
      topic: '切磋武艺',
      text: '林修士摆开架势："来，让我看看你的实力！"',
      onSelect: () => {
        const win = Math.random() > 0.5;
        return { messages: win ? ['你击败了林修士！他惊讶地说："没想到你的实力这么强！"'] : ['林修士轻松击败了你。他笑着说："继续努力！"'] };
      },
    },
    {
      id: 'cultivator_help',
      topic: '请求帮助',
      text: '"如果你想帮助我，可以帮我收集一些修炼资源。"林修士说："我正在突破境界，需要一些珍稀材料。"',
      condition: (p: IPlayer) => p.realm >= 4,
    },
    {
      id: 'cultivator_story',
      topic: '聊修炼',
      text: '"修炼之道，在于勤奋和悟性。"林修士感慨地说："只有不断地修炼和领悟，才能变得更强。"',
    },
  ],
});

// 皇宫侍女
registerNPC({
  id: 'palace_maid',
  name: '小翠',
  title: '皇宫侍女',
  description: '一个年轻美丽的女子，穿着粉色的侍女服饰，面容清秀。她是皇宫的侍女，负责伺候皇室成员。',
  greeting: '小翠正在打扫宫殿，见你来了，微微鞠躬："道友好！欢迎来到皇宫。"',
  roomId: 'stone_kingdom_palace',
  dialogues: [
    {
      id: 'maid_intro',
      topic: '询问皇宫',
      text: '"皇宫是石国权力的中枢。"小翠说："里面有大殿、后宫、花园、宝库等设施。"',
    },
    {
      id: 'maid_info',
      topic: '询问皇室',
      text: '"皇帝和皇后都很和蔼。"小翠说："皇子们也很有礼貌。皇宫的生活虽然规矩多，但也很安稳。"',
    },
    {
      id: 'maid_gossip',
      topic: '打听宫廷消息',
      text: '小翠压低声音："最近后宫不太安宁。几位妃嫔正在争宠，闹得沸沸扬扬……"',
    },
    {
      id: 'maid_wish',
      topic: '问她的愿望',
      text: '小翠叹了口气："我希望有一天能离开皇宫，去外面的世界看看。但我知道，这很难……"',
    },
  ],
});

// ===== 小说核心角色 - 火灵儿 =====
registerNPC({
  id: 'huo_linger',
  name: '火灵儿',
  title: '火皇之女',
  description: '一个娇俏可爱的少女，穿着火红的衣裙，头上戴着一朵火红的莲花。面容精致，眼神灵动，充满了活力和朝气。她是火皇的女儿，性格活泼开朗，有些调皮捣蛋。',
  greeting: '火灵儿正在院子里追逐一只蝴蝶，看到你后眼睛一亮："哎呀，你是新来的吗？我叫火灵儿！走，陪我去玩！"',
  roomId: 'fire_palace',
  dialogues: [
    {
      id: 'huoling_intro',
      topic: '自我介绍',
      text: '火灵儿得意地说："我是火灵儿，火皇的女儿！整个火皇城没人敢惹我！"她凑近你："不过你看起来很有趣，我们做朋友吧！"',
    },
    {
      id: 'huoling_adventure',
      topic: '邀请一起冒险',
      text: '"冒险？好啊好啊！"火灵儿兴奋地跳起来："我早就想去百断山看看了！听说那里有好多好玩的东西！走，我们现在就去！"',
      condition: (p: IPlayer) => p.realm >= 3,
    },
    {
      id: 'huoling_story',
      topic: '聊她的趣事',
      text: '"我告诉你哦，我昨天把丹老的丹炉踢翻了！"火灵儿捂着嘴偷笑："丹老气得吹胡子瞪眼，但火皇爹爹说没关系，小孩子调皮是应该的！"',
    },
    {
      id: 'huoling_future',
      topic: '问她的梦想',
      text: '火灵儿眼神坚定："我的梦想是成为最强的修士！我要保护火皇城，保护火皇爹爹！"她顿了顿："还有……我要找到一个能和我一起闯荡天下的人！"',
    },
    {
      id: 'huoling_gift',
      topic: '送她礼物',
      text: '火灵儿接过礼物，眼睛一亮："哇！好漂亮！谢谢你！"她从怀里掏出一枚火红的玉佩："这个送给你！这是火皇爹爹给我的，能辟邪！"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 50) {
          p.gold -= 50;
          return { messages: ['火灵儿送给你一枚火红玉佩。玉佩散发着温暖的气息，似乎蕴含着火焰的力量。'] };
        }
        return { messages: ['你摸了摸口袋，没钱买礼物。火灵儿摇摇头："算了，下次再送吧！"'] };
      },
    },
  ],
});

// ===== 小说核心角色 - 云曦 =====
registerNPC({
  id: 'yun_xi',
  name: '云曦',
  title: '天人族公主',
  description: '一个气质高雅的少女，穿着白色的长裙，面容绝美，如同天上仙子。她的头上戴着一顶白玉冠，身上散发着淡淡的灵光。她是天人族的公主，身份尊贵。',
  greeting: '云曦正在花园中赏花，看到你后微微颔首："道友好。你是来参加宴会的吗？"',
  roomId: 'stone_kingdom_palace',
  dialogues: [
    {
      id: 'yunxi_intro',
      topic: '自我介绍',
      text: '云曦微微一笑："在下云曦，来自天人族。听闻石国皇都举办庆典，特来参加。"她打量了你一番："你看起来实力不凡。"',
    },
    {
      id: 'yunxi_adventure',
      topic: '邀请一起游历',
      text: '"游历？"云曦想了想："好啊。我正想去荒域各地看看。据说百断山最近有异动，我们可以去看看。"',
      condition: (p: IPlayer) => p.realm >= 4,
    },
    {
      id: 'yunxi_story',
      topic: '聊天人族',
      text: '"天人族居住在云端之上，与世隔绝。"云曦感慨地说："我们很少与外界接触，但最近荒域动荡，族中长辈让我出来历练。"',
    },
    {
      id: 'yunxi_future',
      topic: '问她的梦想',
      text: '云曦眼神深邃："我的梦想是找到一条能让天人族繁荣昌盛的道路。我们族人虽然强大，但太过封闭，迟早会被时代淘汰。"',
    },
    {
      id: 'yunxi_advice',
      topic: '请教修炼',
      text: '"修炼之道，在于顺应天道。"云曦语重心长地说："不要强求，顺其自然。只有与天地融为一体，才能达到更高的境界。"',
    },
  ],
});

// ===== 小说核心角色 - 石昊父亲 =====
registerNPC({
  id: 'shi_jian',
  name: '石坚',
  title: '石昊之父',
  description: '一个面容刚毅的中年男子，穿着黑色铠甲，腰间挂着一柄石斧。他是石族的强者，石昊的父亲。虽然外表粗犷，但内心温柔。',
  greeting: '石坚正在院中修炼，见你来了，停下动作："你来了。昊儿经常提起你。"',
  roomId: 'stone_village_house_shihao',
  dialogues: [
    {
      id: 'shijian_intro',
      topic: '询问石昊',
      text: '"昊儿从小就很懂事，也很有天赋。"石坚温柔地说："我只希望他能平安长大，不要像我一样，一辈子都在打打杀杀。"',
    },
    {
      id: 'shijian_training',
      topic: '请求指点修炼',
      text: '"修炼之道，在于体魄和意志。"石坚挥舞着石斧："你看这石斧，看似沉重，但在我手中轻如鸿毛。这就是力量的真谛——以力破巧。"',
      onSelect: () => ({ messages: ['石坚指点了你几招，你感觉对力量有了新的理解。'] }),
    },
    {
      id: 'shijian_quest',
      topic: '请求任务',
      text: '"你若是想历练，可以去后山暗影洞深处。那里有我当年留下的一些东西。"石坚淡淡地说："不过那里凶险，你要有心理准备。"',
      condition: (p: IPlayer) => p.realm >= 2,
    },
    {
      id: 'shijian_story',
      topic: '听他讲过去的事',
      text: '"当年我年轻时，也像你一样四处闯荡。"石坚陷入回忆："我去过百断山，闯过蛮荒之地，甚至见过真正的强者对决。那些日子……真是令人怀念。"',
    },
    {
      id: 'shijian_worry',
      topic: '他的担忧',
      text: '石坚叹了口气："我担心昊儿太要强了。他总是想出去闯荡，但外面的世界太危险了。我只希望他能留在村里，平平安安的。"',
    },
  ],
});

// ===== 小说核心角色 - 石昊祖父（战斗形态） =====
registerNPC({
  id: 'shi_zhongtian_battle',
  name: '石中天',
  title: '石族先祖',
  description: '一个身材高大的老者，穿着黑色铠甲，面容刚毅，眼神锐利如鹰。他是石族的先祖，曾经是石城最强大的修士之一。虽然年纪大了，但依然气息磅礴。',
  greeting: '石中天正在演练石族战技，见你来了，停下动作："年轻人，你来了。让我看看你的实力。"',
  roomId: 'stone_city_shi_family',
  dialogues: [
    {
      id: 'shizhongtian_intro',
      topic: '询问石中天',
      text: '"我是石中天，石族的先祖。"石中天目光深邃："当年我外出历练，多年未归，没想到石城已经变成了这个样子。"',
    },
    {
      id: 'shizhongtian_training',
      topic: '请求指点修炼',
      text: '"修炼之道，在于体魄和意志。"石中天挥舞着石斧："你看这石斧，看似沉重，但在我手中轻如鸿毛。这就是力量的真谛——以力破巧。"',
      onSelect: () => ({ messages: ['石中天指点了你几招，你感觉对力量有了新的理解。'] }),
    },
    {
      id: 'shizhongtian_fight',
      topic: '切磋武艺',
      text: '"来，让我看看你的实力！"石中天摆开架势："不要害怕，我会手下留情的。"',
      onSelect: () => {
        const win = Math.random() > 0.7;
        return { messages: win ? ['你击败了石中天！他惊讶地说："没想到你的实力这么强！"'] : ['石中天轻松击败了你。他笑着说："继续努力！"'] };
      },
    },
    {
      id: 'shizhongtian_quest',
      topic: '请求任务',
      text: '"你若是想历练，可以去后山暗影洞深处。那里有我当年留下的一些东西。"石中天淡淡地说："不过那里凶险，你要有心理准备。"',
      condition: (p: IPlayer) => p.realm >= 2,
    },
    {
      id: 'shizhongtian_secret',
      topic: '打听石族秘密',
      text: '石中天压低声音："石族深处有一间密室，里面藏着石族符文真解。那是石族先祖留下的传承……"',
      condition: (p: IPlayer) => p.realm >= 4,
    },
  ],
});

// ===== 小说核心角色 - 火皇 =====
registerNPC({
  id: 'huo_huang',
  name: '火皇',
  title: '火皇城之主',
  description: '一个威严的中年男子，穿着火红的龙袍，头戴皇冠。面容刚毅，眼神深邃，充满了帝王之气。他是火皇城的主人，实力深不可测。',
  greeting: '火皇坐在金龙椅上，见你来了，微微点头："你是何人？觐见朕有何事？"',
  roomId: 'fire_palace',
  dialogues: [
    {
      id: 'huohuang_intro',
      topic: '自我介绍',
      text: '火皇微微点头："原来是远方来的修士。欢迎来到火皇城。朕听说你在荒域颇有声望。"',
    },
    {
      id: 'huohuang_quest',
      topic: '请求任务',
      text: '"任务？"火皇想了想："最近火皇城边境不太平，有凶兽和异族侵扰。如果你能帮朕解决这些问题，朕必有重赏。"',
      condition: (p: IPlayer) => p.realm >= 5,
    },
    {
      id: 'huohuang_reward',
      topic: '询问奖励',
      text: '"奖励？"火皇微微一笑："朕可以赐你爵位，赏赐宝物，甚至传授火皇城的皇家宝术。"',
    },
    {
      id: 'huohuang_story',
      topic: '聊火皇城历史',
      text: '"火皇城已有千年历史。"火皇缓缓说道："朕的先祖曾是荒域的霸主，开创了火皇城的基业。现在，朕要让火皇城更加强大。"',
    },
    {
      id: 'huohuang_daughter',
      topic: '问火灵儿',
      text: '火皇无奈地摇摇头："灵儿那丫头，整天就知道闯祸。不过……她很有天赋，将来一定会成为一个强大的修士。"',
    },
    {
      id: 'huohuang_secret',
      topic: '打听皇家秘密',
      text: '火皇压低声音："火皇城深处有一座上古遗迹，里面藏着火皇城最核心的秘密。但那地方危险重重，至今没有人能完全探索。"',
      condition: (p: IPlayer) => p.realm >= 8,
    },
  ],
});

// ===== 小说特色NPC - 太古凶兽 =====
registerNPC({
  id: 'ancient_beast',
  name: '穷奇',
  title: '太古凶兽',
  description: '一头巨大的凶兽，外形像虎，但有一双巨大的翅膀。全身覆盖着黑色的鳞片，眼神凶狠，散发着令人窒息的气息。这是传说中的太古凶兽穷奇，实力深不可测。',
  greeting: '穷奇发出一声震天动地的咆哮："人类！竟敢闯入我的领地！"',
  roomId: 'hundred_breaks_dense',
  dialogues: [
    {
      id: 'beast_fight',
      topic: '战斗',
      text: '穷奇张开血盆大口，向你扑来！一场恶战即将开始！',
      onSelect: () => {
        const win = Math.random() > 0.7;
        return { messages: win ? ['你击败了穷奇！它不甘地咆哮一声，化作一道光芒消失了。'] : ['穷奇轻松击败了你！你身受重伤，狼狈逃跑。'] };
      },
    },
    {
      id: 'beast_talk',
      topic: '尝试沟通',
      text: '穷奇愣了一下，似乎没想到你会尝试沟通。它犹豫了一下："你……不怕我？"',
      condition: (p: IPlayer) => p.realm >= 6,
    },
    {
      id: 'beast_story',
      topic: '询问来历',
      text: '"我是穷奇，太古时期的凶兽。"穷奇缓缓说道："我沉睡了无数年，直到最近才被惊醒。这片山林，曾经是我的领地。"',
      condition: (p: IPlayer) => p.realm >= 6,
    },
    {
      id: 'beast_quest',
      topic: '请求帮助',
      text: '"帮助？"穷奇冷笑一声："我不需要任何人的帮助。不过……如果你能帮我找到我的同伴，我可以考虑不杀你。"',
      condition: (p: IPlayer) => p.realm >= 7,
    },
  ],
});

// ===== 小说特色NPC - 神秘老者 =====
registerNPC({
  id: 'mysterious_elder',
  name: '神秘老者',
  title: '隐世高人',
  description: '一个穿着灰色道袍的老者，面容慈祥，眼神深邃。他的身上散发着淡淡的灵光，仿佛与天地融为一体。这是一位隐世高人，来历神秘。',
  greeting: '神秘老者正在树下品茶，见你来了，微微一笑："年轻人，你来了。我等你很久了。"',
  roomId: 'hundred_breaks_peak',
  dialogues: [
    {
      id: 'elder_intro',
      topic: '询问来历',
      text: '"来历？"神秘老者微微一笑："我只是一个普通的老者，在这里隐居多年。"他顿了顿："不过……我曾经见过一些有趣的事情。"',
    },
    {
      id: 'elder_teach',
      topic: '请求传授',
      text: '"传授？"神秘老者想了想："我可以传授你一些修炼的心得。不过，你需要通过我的考验。"',
      condition: (p: IPlayer) => p.realm >= 4,
      onSelect: () => ({ messages: ['神秘老者传授了你一些修炼心得。你感觉对修炼之道有了更深的理解。'] }),
    },
    {
      id: 'elder_story',
      topic: '听他讲故事',
      text: '"我曾经见过一位少年，他从一个小村庄走出，一步步成为了荒域的传奇。"神秘老者感慨地说："他的故事，激励了无数人。"',
    },
    {
      id: 'elder_future',
      topic: '询问未来',
      text: '神秘老者沉默片刻："你的未来……充满了变数。但我相信，你会走出一条属于自己的道路。"',
    },
    {
      id: 'elder_gift',
      topic: '请求赐福',
      text: '"赐福？"神秘老者微微一笑："你的路需要自己走，旁人无法代劳。不过……我可以给你一些指引。"',
      onSelect: () => ({ messages: ['神秘老者送给你一枚古朴的玉佩。玉佩散发着淡淡的灵光，似乎蕴含着某种力量。'] }),
    },
  ],
});

// ===== 小说特色NPC - 丹塔塔主 =====
registerNPC({
  id: 'dan_tower_master',
  name: '丹塔塔主',
  title: '丹塔之主',
  description: '一个白发苍苍的老者，穿着红色的道袍，身上散发着浓郁的药香。他是丹塔的塔主，丹道造诣极高。',
  greeting: '丹塔塔主正在炼丹，见你来了，微微一笑："道友是来炼丹，还是购买丹药？"',
  roomId: 'fire_dan_tower',
  dialogues: [
    {
      id: 'dantower_intro',
      topic: '询问丹塔',
      text: '"丹塔是火皇城最高的炼丹学府。"丹塔塔主自豪地说："我们培养了无数优秀的炼丹师。"',
    },
    {
      id: 'dantower_buy',
      topic: '购买丹药',
      text: '丹塔塔主点点头："丹塔的丹药品质上乘。疗伤丹一百枚，法力丹一百二十枚，筑基丹五百枚，破境丹一千枚。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 100) {
          p.gold -= 100;
          return { messages: ['你在丹塔购买了一颗疗伤丹。丹药品质确实比外面的好。'] };
        }
        return { messages: ['丹塔塔主摇摇头："没钱买不了。"'] };
      },
    },
    {
      id: 'dantower_learn',
      topic: '学习丹道',
      text: '"学习丹道可以。"丹塔塔主说："入门课程一千枚原始币，进阶课程五千枚，高级课程一万枚。"',
      condition: (p: IPlayer) => p.realm >= 3,
      onSelect: (p: IPlayer) => {
        if (p.gold >= 1000) {
          p.gold -= 1000;
          return { messages: ['你开始学习丹道。丹塔塔主耐心地教导你，你感觉对丹道有了初步的理解。'] };
        }
        return { messages: ['丹塔塔主摇摇头："没钱学不了。"'] };
      },
    },
    {
      id: 'dantower_quest',
      topic: '请求丹道任务',
      text: '"丹道任务？可以。"丹塔塔主想了想："我最近需要一些罕见的药材，道友若能帮我寻来，必有重谢。"',
      condition: (p: IPlayer) => p.realm >= 4,
    },
    {
      id: 'dantower_secret',
      topic: '打听丹塔秘密',
      text: '丹塔塔主压低声音："丹塔深处有一座密室，里面藏着上古丹方。据说那丹方可炼出九品丹药，但需要特殊的材料……"',
      condition: (p: IPlayer) => p.realm >= 6,
    },
  ],
});

// ===== 小说特色NPC - 演武场场主 =====
registerNPC({
  id: 'arena_master',
  name: '烈山',
  title: '演武场场主',
  description: '一个身材魁梧的中年男子，穿着黑色劲装，肌肉发达。他是火皇城演武场的场主，实力强大，以近战闻名。',
  greeting: '烈山正在演武场指导弟子，见你来了，大声喊道："新来的？来，让我看看你的实力！"',
  roomId: 'fire_arena',
  dialogues: [
    {
      id: 'arena_intro',
      topic: '询问演武场',
      text: '"演武场是火皇城修士切磋武艺的地方。"烈山自豪地说："每天都有高手在这里切磋，你可以学到很多东西。"',
    },
    {
      id: 'arena_fight',
      topic: '切磋武艺',
      text: '"来，让我看看你的实力！"烈山摆开架势："不要害怕，我会手下留情的。"',
      onSelect: () => {
        const win = Math.random() > 0.6;
        return { messages: win ? ['你击败了烈山！他惊讶地说："没想到你的实力这么强！"'] : ['烈山轻松击败了你。他笑着说："继续努力！"'] };
      },
    },
    {
      id: 'arena_learn',
      topic: '学习武技',
      text: '"学习武技可以。"烈山说："基础武技五百枚原始币，进阶武技一千枚，高级武技五千枚。"',
      condition: (p: IPlayer) => p.realm >= 2,
      onSelect: (p: IPlayer) => {
        if (p.gold >= 500) {
          p.gold -= 500;
          return { messages: ['你开始学习武技。烈山耐心地教导你，你感觉对近战有了新的理解。'] };
        }
        return { messages: ['烈山摇摇头："没钱学不了。"'] };
      },
    },
    {
      id: 'arena_quest',
      topic: '请求任务',
      text: '"任务？可以。"烈山想了想："我最近需要一些修炼资源，道友若能帮我寻来，必有重谢。"',
      condition: (p: IPlayer) => p.realm >= 3,
    },
    {
      id: 'arena_story',
      topic: '聊他的经历',
      text: '"我年轻时在蛮荒之地历练，差点被凶兽吃掉。"烈山感慨地说："但也是那段经历，让我变得更强。修炼之道，在于实战。"',
    },
  ],
});

// ===== 小说特色NPC - 拍卖行掌柜 =====
registerNPC({
  id: 'auction_master',
  name: '钱百万',
  title: '拍卖行掌柜',
  description: '一个穿着华丽衣裳的中年男子，面容精明，眼神锐利。他是火皇城拍卖行的掌柜，负责主持各种拍卖会。',
  greeting: '钱掌柜热情地迎上来："道友好！欢迎来到拍卖行。最近有一场盛大的拍卖会，不知道友有没有兴趣参加？"',
  roomId: 'fire_auction',
  dialogues: [
    {
      id: 'auction_intro',
      topic: '询问拍卖会',
      text: '"拍卖行每月初一十五举行拍卖会。"钱掌柜说："届时会有各种珍稀物品拍卖，包括灵晶、宝术、法器、丹药等。"',
    },
    {
      id: 'auction_participate',
      topic: '参加拍卖会',
      text: '"参加拍卖会需要缴纳入场费。"钱掌柜说："普通席位一百枚原始币，VIP席位一千枚。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 100) {
          p.gold -= 100;
          return { messages: ['你进入了拍卖行。大厅金碧辉煌，各种珍稀物品陈列其中。'] };
        }
        return { messages: ['钱掌柜摇摇头："没钱参加不了。"'] };
      },
    },
    {
      id: 'auction_sell',
      topic: '拍卖物品',
      text: '"如果你有珍稀物品，可以交给我拍卖。"钱掌柜说："我会帮你卖个好价钱。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 100) {
          p.gold += 500;
          return { messages: ['你在拍卖行拍卖了一件珍稀物品，赚了五百枚原始币。'] };
        }
        return { messages: ['钱掌柜摇摇头："你没有珍稀物品可拍卖。"'] };
      },
    },
    {
      id: 'auction_gossip',
      topic: '打听消息',
      text: '钱掌柜压低声音："拍卖行消息灵通。最近有一件上古宝术要拍卖，很多大人物都在关注……"',
    },
    {
      id: 'auction_story',
      topic: '聊拍卖行',
      text: '"拍卖行已经开了两百年了。"钱掌柜感慨地说："多少珍稀物品在这里易主，多少传奇故事在这里发生。"',
    },
  ],
});

// ===== 小说特色NPC - 神秘商人 =====
registerNPC({
  id: 'mysterious_merchant',
  name: '神秘商人',
  title: '神秘商人',
  description: '一个穿着黑色斗篷的神秘人，面容隐藏在阴影之中，看不清样貌。他的摊位上摆满了各种奇珍异宝，散发着神秘的气息。',
  greeting: '神秘商人发出低沉的声音："欢迎，年轻人。我这里有各种你意想不到的东西……"',
  roomId: 'wasteland_03',
  dialogues: [
    {
      id: 'merchant_intro',
      topic: '询问商品',
      text: '"我这里有各种珍稀物品。"神秘商人说："有上古宝术残卷、珍稀药材、灵晶、法器等。应有尽有。"',
    },
    {
      id: 'merchant_buy',
      topic: '购买商品',
      text: '神秘商人指着摊位："上古宝术残卷一千枚，珍稀药材五百枚，灵晶一百枚，法器五千枚。你想要什么？"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 100) {
          p.gold -= 100;
          return { messages: ['你在神秘商人那里购买了一枚灵晶。灵晶品质上乘。'] };
        }
        return { messages: ['神秘商人摇摇头："没钱买不了。"'] };
      },
    },
    {
      id: 'merchant_sell',
      topic: '出售物品',
      text: '"如果你有珍稀物品，可以卖给我。"神秘商人说："我出的价格很公道。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 100) {
          p.gold += 300;
          return { messages: ['你卖给神秘商人一件珍稀物品，赚了三百枚原始币。'] };
        }
        return { messages: ['神秘商人摇摇头："你没有珍稀物品可卖。"'] };
      },
    },
    {
      id: 'merchant_story',
      topic: '询问来历',
      text: '"来历？"神秘商人冷笑一声："我只是一个普通的商人，到处游历，收集各种奇珍异宝。"',
    },
    {
      id: 'merchant_secret',
      topic: '打听秘密',
      text: '神秘商人压低声音："我知道很多秘密。比如……百断山深处有一座古墓，里面可能有太古传承。不过，那地方邪门得很……"',
      condition: (p: IPlayer) => p.realm >= 5,
    },
  ],
});

// ===== 小说特色NPC - 蛮族族长 =====
registerNPC({
  id: 'barbarian_chief',
  name: '铁木',
  title: '蛮族族长',
  description: '一个身材高大的蛮族男子，穿着兽皮制成的铠甲，面容粗犷，眼神锐利。他是蛮族的族长，实力强大。',
  greeting: '铁木正在帐篷中议事，见你来了，大声喊道："外族之人！来我蛮族领地有何贵干？"',
  roomId: 'wasteland_04',
  dialogues: [
    {
      id: 'chief_intro',
      topic: '说明来意',
      text: '铁木放下手中的战斧："原来是远方来的修士。欢迎来到蛮族领地。不过要小心，这里很危险。"',
    },
    {
      id: 'chief_trade',
      topic: '以物易物',
      text: '"蛮族不使用货币，以物易物。"铁木说："你有什么东西？草药、矿石都可以换我们的兽肉和兽皮。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 10) {
          p.gold -= 10;
          return { messages: ['你用一些草药换了蛮族的兽肉。兽肉很新鲜，蕴含着浓郁的生命力。'] };
        }
        return { messages: ['铁木摇摇头："你没有东西可换。"'] };
      },
    },
    {
      id: 'chief_fight',
      topic: '切磋武艺',
      text: '"来，让我看看你的实力！"铁木摆开架势："蛮族的勇士从不畏惧挑战！"',
      onSelect: () => {
        const win = Math.random() > 0.5;
        return { messages: win ? ['你击败了铁木！他敬佩地说："你是一个真正的勇士！"'] : ['铁木轻松击败了你。他笑着说："继续努力！"'] };
      },
    },
    {
      id: 'chief_quest',
      topic: '请求任务',
      text: '"任务？可以。"铁木想了想："最近蛮族领地来了一头凶兽，伤害了不少族人。如果你能帮我们除掉它，蛮族会感激你的。"',
      condition: (p: IPlayer) => p.realm >= 3,
    },
    {
      id: 'chief_story',
      topic: '聊蛮族',
      text: '"蛮族在这片蛮荒之地生存了数千年。"铁木自豪地说："我们靠狩猎为生，靠战斗变强。蛮族的勇士，从不畏惧任何挑战！"',
    },
  ],
});

// ===== 金狼古国NPC =====

// 狼金城守卫
registerNPC({
  id: 'wolf_guard',
  name: '狼牙卫',
  title: '狼金城守卫',
  description: '身披金色狼纹铠甲的守卫，手持长枪，眼神锐利如狼。',
  greeting: '狼牙卫横枪拦住你："来者何人？请出示通行令牌！"',
  roomId: 'golden_wolf_gate',
  dialogues: [
    {
      id: 'wolf_guard_identify',
      topic: '出示身份',
      text: '狼牙卫检查令牌后放行："原来是远方修士，进城后遵守金狼律法，不得喧哗滋事。"',
    },
    {
      id: 'wolf_guard_warning',
      topic: '询问危险',
      text: '狼牙卫压低声音："最近城西黑风寨的马匪很猖獗，商队屡屡被劫。城主正悬赏捉拿匪首。"',
    },
    {
      id: 'wolf_guard_info',
      topic: '询问城内',
      text: '"城内有铁匠坊、珍宝阁和狼神广场。"狼牙卫说："铁匠坊的兵器远近闻名，不妨去看看。"',
    },
  ],
});

// 狼金城铁匠
registerNPC({
  id: 'wolf_blacksmith',
  name: '铁锤',
  title: '金狼铁坊铁匠',
  description: '一个精壮的中年男子，赤裸上身，古铜色皮肤布满汗水，正在敲打铁块。',
  greeting: '铁锤擦了把汗："想要兵器？我铁锤打造的兵器，在这金狼古国都是有名的！"',
  roomId: 'wolf_plaza',
  dialogues: [
    {
      id: 'wolf_blacksmith_work',
      topic: '夸赞手艺',
      text: '铁锤咧嘴一笑："我这手艺是跟铁狼镇的老铁匠学的，用的是狼神祭坛赐福的灵火。"',
    },
    {
      id: 'wolf_blacksmith_material',
      topic: '询问好材料',
      text: '"好材料？"铁锤放下铁锤："黑狼村后山有种铁矿，叫狼纹铁。要是能弄来，我能打把神兵。"',
    },
    {
      id: 'wolf_blacksmith_order',
      topic: '定制兵器',
      text: '"定制兵器可以。"铁锤说："普通兵器两百枚，精品兵器五百枚，刻狼纹的要一千枚。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 200) {
          p.gold -= 200;
          return { messages: ['铁锤为你打造了一把精铁剑，剑身刻有狼纹。'] };
        }
        return { messages: ['铁锤摇摇头："没钱打造不了。"'] };
      },
    },
  ],
});

// 狼金城商人
registerNPC({
  id: 'wolf_trader',
  name: '金掌柜',
  title: '狼宝阁掌柜',
  description: '一个穿着华丽衣裳的中年男子，面容精明，眼神锐利。',
  greeting: '金掌柜热情地迎上来："道友好！欢迎来到狼宝阁，本店有各种神兵利器！"',
  roomId: 'wolf_plaza',
  dialogues: [
    {
      id: 'wolf_trader_intro',
      topic: '询问商品',
      text: '"狼宝阁经营各种兵器和铠甲。"金掌柜说："有精铁剑、玄钢刀、狼纹铠甲等。"',
    },
    {
      id: 'wolf_trader_buy',
      topic: '购买兵器',
      text: '金掌柜指着货架："精铁剑三百枚，玄钢刀五百枚，狼纹铠甲一千枚。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 300) {
          p.gold -= 300;
          return { messages: ['你购买了一把精铁剑，剑身锋利。'] };
        }
        return { messages: ['金掌柜摇摇头："没钱买不了。"'] };
      },
    },
    {
      id: 'wolf_trader_gossip',
      topic: '打听消息',
      text: '金掌柜压低声音："最近黑风寨马匪劫了一批商队货物，里面有珍稀的狼纹铁矿……"',
    },
  ],
});

// 金狼国王
registerNPC({
  id: 'wolf_king',
  name: '金狼王',
  title: '金狼古国国王',
  description: '一个威严的中年男子，穿着金色龙袍，头戴狼形皇冠。面容刚毅，眼神深邃。',
  greeting: '金狼王坐在狼神殿的王座上，见你来了，微微点头："远方的修士，觐见朕有何事？"',
  roomId: 'wolf_palace',
  dialogues: [
    {
      id: 'wolf_king_intro',
      topic: '自我介绍',
      text: '金狼王微微点头："原来是远方来的修士。欢迎来到金狼古国。朕听说你在荒域颇有声望。"',
    },
    {
      id: 'wolf_king_quest',
      topic: '请求任务',
      text: '"任务？"金狼王想了想："最近黑风寨马匪猖獗，商路受阻。如果你能帮朕清除马匪，朕必有重赏。"',
      condition: (p: IPlayer) => p.realm >= 4,
    },
    {
      id: 'wolf_king_reward',
      topic: '询问奖励',
      text: '"奖励？"金狼王微微一笑："朕可以赐你爵位，赏赐神兵，甚至传授金狼古国的皇家宝术。"',
    },
    {
      id: 'wolf_king_story',
      topic: '聊金狼古国',
      text: '"金狼古国已有千年历史。"金狼王缓缓说道："狼神保佑我们，让我们在这片蛮荒之地生存下来。"',
    },
    {
      id: 'wolf_king_secret',
      topic: '打听皇家秘密',
      text: '金狼王压低声音："狼神殿深处有一座密室，里面藏着狼神的传承。但那地方危险重重……"',
      condition: (p: IPlayer) => p.realm >= 7,
    },
  ],
});

// 金狼铁坊大师
registerNPC({
  id: 'wolf_master_blacksmith',
  name: '铁狼王',
  title: '金狼铁坊大师',
  description: '一个白发苍苍的老者，穿着黑色围裙，手臂肌肉依然发达。他是金狼古国最有名的铁匠。',
  greeting: '铁狼王正在锻造一把神兵，见你来了，放下铁锤："道友好！来铁坊有何指教？"',
  roomId: 'wolf_forge',
  dialogues: [
    {
      id: 'wolf_master_intro',
      topic: '询问铁坊',
      text: '"金狼铁坊是金狼古国最著名的铁匠坊。"铁狼王自豪地说："我们打造的兵器，刻有狼神符文，锋利无比。"',
    },
    {
      id: 'wolf_master_forge',
      topic: '锻造神兵',
      text: '"锻造神兵需要特殊材料。"铁狼王说："狼纹铁、灵火石、精钢，缺一不可。"',
      condition: (p: IPlayer) => p.realm >= 5,
    },
    {
      id: 'wolf_master_quest',
      topic: '请求任务',
      text: '"我最近需要一些狼纹铁矿。"铁狼王说："黑狼村后山的矿洞被马匪占据了，你能帮我弄一些吗？"',
      condition: (p: IPlayer) => p.realm >= 4,
    },
    {
      id: 'wolf_master_story',
      topic: '聊锻造',
      text: '"锻造是一门学问。"铁狼王感慨地说："火候、力度、选材，每一步都很重要。一把好兵器，需要匠人的心血。"',
    },
  ],
});

// 狼宝阁老板
registerNPC({
  id: 'wolf_shopkeeper',
  name: '银掌柜',
  title: '狼宝阁老板',
  description: '一个穿着银色长袍的中年男子，面容和蔼，笑容可掬。',
  greeting: '银掌柜热情地迎上来："道友好！欢迎来到狼宝阁，本店有各种珍贵的武器和铠甲！"',
  roomId: 'wolf_shop',
  dialogues: [
    {
      id: 'wolf_shopkeeper_intro',
      topic: '询问商品',
      text: '"狼宝阁经营各种珍贵的武器和铠甲。"银掌柜说："每一件都刻有狼形符文，可增强战斗力。"',
    },
    {
      id: 'wolf_shopkeeper_buy',
      topic: '购买装备',
      text: '银掌柜指着货架："狼纹长剑五百枚，玄钢战刀八百枚，金狼铠甲两千枚。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 500) {
          p.gold -= 500;
          return { messages: ['你购买了一把狼纹长剑，剑身刻有狼形符文，散发着淡淡的灵光。'] };
        }
        return { messages: ['银掌柜摇摇头："没钱买不了。"'] };
      },
    },
    {
      id: 'wolf_shopkeeper_gossip',
      topic: '打听消息',
      text: '银掌柜压低声音："最近狼牙城的将军在招兵买马，似乎要攻打黑风寨……"',
    },
  ],
});

// 狼牙城将军
registerNPC({
  id: 'wolf_general',
  name: '狼牙',
  title: '狼牙城将军',
  description: '一个身材高大的中年男子，穿着金色铠甲，手持狼牙战枪。面容严肃，眼神锐利。',
  greeting: '狼牙将军正在练兵场指导士兵，见你来了，大声喊道："来者何人？"',
  roomId: 'golden_wolf_city2',
  dialogues: [
    {
      id: 'wolf_general_intro',
      topic: '自我介绍',
      text: '狼牙将军微微点头："本将是狼牙城将军。听说你实力不错，要不要来军营效力？"',
    },
    {
      id: 'wolf_general_fight',
      topic: '切磋武艺',
      text: '"来，让我看看你的实力！"狼牙将军摆开架势："不要害怕，我会手下留情的。"',
      onSelect: () => {
        const win = Math.random() > 0.6;
        return { messages: win ? ['你击败了狼牙将军！他惊讶地说："没想到你的实力这么强！"'] : ['狼牙将军轻松击败了你。他笑着说："继续努力！"'] };
      },
    },
    {
      id: 'wolf_general_quest',
      topic: '请求任务',
      text: '"任务？"狼牙将军想了想："黑风寨马匪占据了狼牙山，需要有人去清除他们。"',
      condition: (p: IPlayer) => p.realm >= 4,
    },
    {
      id: 'wolf_general_story',
      topic: '聊军队',
      text: '"狼牙城是金狼古国的军事要塞。"狼牙将军自豪地说："我们的士兵，个个都是狼一样的勇士！"',
    },
  ],
});

// 金鬃城商人
registerNPC({
  id: 'wolf_merchant',
  name: '马掌柜',
  title: '金鬃城商人',
  description: '一个穿着华丽衣裳的中年男子，面容精明，正在清点货物。',
  greeting: '马掌柜热情地迎上来："道友好！欢迎来到金鬃城，要不要买一匹金鬃马？"',
  roomId: 'golden_wolf_city3',
  dialogues: [
    {
      id: 'wolf_merchant_intro',
      topic: '询问商品',
      text: '"金鬃城以金鬃马闻名。"马掌柜说："金鬃马速度快，耐力强，是最好的战马。"',
    },
    {
      id: 'wolf_merchant_buy',
      topic: '购买战马',
      text: '马掌柜指着马厩："普通金鬃马一千枚，极品金鬃马五千枚。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 1000) {
          p.gold -= 1000;
          return { messages: ['你购买了一匹金鬃马，马鬃金黄，精神抖擞。'] };
        }
        return { messages: ['马掌柜摇摇头："没钱买不了。"'] };
      },
    },
    {
      id: 'wolf_merchant_gossip',
      topic: '打听消息',
      text: '马掌柜压低声音："最近商路不太平，黑风寨马匪经常打劫商队……"',
    },
  ],
});

// 灰狼镇猎人
registerNPC({
  id: 'wolf_hunter',
  name: '灰狼',
  title: '灰狼镇猎人',
  description: '一个穿着兽皮的中年男子，背着弓箭，腰间挂着猎物。',
  greeting: '灰狼正在整理猎物，见你来了，微微一笑："道友好！来灰狼镇打猎吗？"',
  roomId: 'wolf_town1',
  dialogues: [
    {
      id: 'wolf_hunter_intro',
      topic: '询问打猎',
      text: '"灰狼镇外有大片草原，是打猎的好地方。"灰狼说："有金鬃马、草原狼、羚羊等。"',
    },
    {
      id: 'wolf_hunter_quest',
      topic: '请求任务',
      text: '"最近草原狼越来越多，伤害了不少牲畜。"灰狼说："你能帮我清除一些吗？"',
      condition: (p: IPlayer) => p.realm >= 3,
    },
    {
      id: 'wolf_hunter_story',
      topic: '聊打猎',
      text: '"打猎是我们灰狼镇人的生计。"灰狼感慨地说："草原赐予我们食物，我们也要保护草原。"',
    },
  ],
});

// 铁狼镇矿工
registerNPC({
  id: 'wolf_miner',
  name: '铁蛋',
  title: '铁狼镇矿工',
  description: '一个穿着矿工服的中年男子，脸上沾满灰尘，正在休息。',
  greeting: '铁蛋正在擦拭汗水，见你来了，微微一笑："道友好！来铁狼镇挖矿吗？"',
  roomId: 'wolf_town2',
  dialogues: [
    {
      id: 'wolf_miner_intro',
      topic: '询问挖矿',
      text: '"铁狼镇以铁矿开采闻名。"铁蛋说："镇后有一座大铁矿，出产精铁和狼纹铁。"',
    },
    {
      id: 'wolf_miner_quest',
      topic: '请求任务',
      text: '"最近矿洞深处出现了一些怪物，矿工们不敢下去了。"铁蛋说："你能帮我们清除吗？"',
      condition: (p: IPlayer) => p.realm >= 3,
    },
    {
      id: 'wolf_miner_story',
      topic: '聊挖矿',
      text: '"挖矿是一门辛苦的活计。"铁蛋感慨地说："但没有我们矿工，铁匠们就打不出好兵器。"',
    },
  ],
});

// 苍狼镇山民
registerNPC({
  id: 'wolf_mountain_man',
  name: '苍狼',
  title: '苍狼镇山民',
  description: '一个穿着粗布衣服的中年男子，手里拿着一把猎刀，正在修整山路。',
  greeting: '苍狼正在修整山路，见你来了，微微一笑："道友好！来苍狼镇爬山吗？"',
  roomId: 'wolf_town3',
  dialogues: [
    {
      id: 'wolf_mountain_intro',
      topic: '询问狼牙山',
      text: '"狼牙山就在镇外。"苍狼说："山上有不少灵草和矿石，但也有不少凶兽。"',
    },
    {
      id: 'wolf_mountain_quest',
      topic: '请求任务',
      text: '"最近山上出现了一头凶兽，伤害了不少山民。"苍狼说："你能帮我们除掉它吗？"',
      condition: (p: IPlayer) => p.realm >= 4,
    },
    {
      id: 'wolf_mountain_story',
      topic: '聊山中生活',
      text: '"我们苍狼镇人靠山吃山。"苍狼感慨地说："山上赐予我们食物和药材，我们也要守护山林。"',
    },
  ],
});

// 白狼村牧民
registerNPC({
  id: 'wolf_herder',
  name: '白羊',
  title: '白狼村牧民',
  description: '一个穿着羊皮袄的中年男子，正在放牧。',
  greeting: '白羊正在放牧，见你来了，微微一笑："道友好！来白狼村做客吗？"',
  roomId: 'wolf_village1',
  dialogues: [
    {
      id: 'wolf_herder_intro',
      topic: '询问放牧',
      text: '"白狼村以放牧为生。"白羊说："我们养的羊，肉质鲜美，皮毛柔软。"',
    },
    {
      id: 'wolf_herder_quest',
      topic: '请求任务',
      text: '"最近狼群经常来偷吃羊。"白羊说："你能帮我们赶走狼群吗？"',
      condition: (p: IPlayer) => p.realm >= 2,
    },
    {
      id: 'wolf_herder_story',
      topic: '聊牧民生活',
      text: '"放牧虽然辛苦，但自由自在。"白羊感慨地说："我们跟着羊群走，哪里有草，哪里就是家。"',
    },
  ],
});

// 赤狼村农夫
registerNPC({
  id: 'wolf_farmer',
  name: '赤牛',
  title: '赤狼村农夫',
  description: '一个穿着粗布衣服的中年男子，正在田里劳作。',
  greeting: '赤牛正在田里劳作，见你来了，直起腰："道友好！来赤狼村做客吗？"',
  roomId: 'wolf_village2',
  dialogues: [
    {
      id: 'wolf_farmer_intro',
      topic: '询问农田',
      text: '"赤狼村以种植为生。"赤牛说："我们种的灵谷，富含灵气，是修士最喜欢的粮食。"',
    },
    {
      id: 'wolf_farmer_quest',
      topic: '请求任务',
      text: '"最近田里出现了一些妖兽，破坏了不少庄稼。"赤牛说："你能帮我们清除吗？"',
      condition: (p: IPlayer) => p.realm >= 2,
    },
    {
      id: 'wolf_farmer_story',
      topic: '聊农耕',
      text: '"农耕是最踏实的生计。"赤牛感慨地说："种瓜得瓜，种豆得豆，一分耕耘，一分收获。"',
    },
  ],
});

// 黑狼村铁矿工
registerNPC({
  id: 'wolf_iron_miner',
  name: '黑铁',
  title: '黑狼村铁矿工',
  description: '一个穿着矿工服的中年男子，脸上沾满煤灰，正在休息。',
  greeting: '黑铁正在休息，见你来了，微微一笑："道友好！来黑狼村挖矿吗？"',
  roomId: 'wolf_village3',
  dialogues: [
    {
      id: 'wolf_iron_intro',
      topic: '询问铁矿',
      text: '"黑狼村后山有一座铁矿。"黑铁说："出产精铁和狼纹铁，是最好的锻造材料。"',
    },
    {
      id: 'wolf_iron_quest',
      topic: '请求任务',
      text: '"最近矿洞被马匪占据了，我们都不敢去挖矿了。"黑铁说："你能帮我们赶走马匪吗？"',
      condition: (p: IPlayer) => p.realm >= 3,
    },
    {
      id: 'wolf_iron_story',
      topic: '聊挖矿',
      text: '"挖矿虽然辛苦，但收入不错。"黑铁感慨地说："狼纹铁能卖个好价钱，够我们一家人生活了。"',
    },
  ],
});

// 雪狼村猎人
registerNPC({
  id: 'wolf_snow_hunter',
  name: '雪狼',
  title: '雪狼村猎人',
  description: '一个穿着皮袄的中年男子，手里拿着一把猎枪，正在雪地中行走。',
  greeting: '雪狼正在雪地中行走，见你来了，微微一笑："道友好！来雪狼村打猎吗？"',
  roomId: 'wolf_village4',
  dialogues: [
    {
      id: 'wolf_snow_intro',
      topic: '询问雪山',
      text: '"雪山就在村后。"雪狼说："山上有不少珍稀药材和雪狼，但也很危险。"',
    },
    {
      id: 'wolf_snow_quest',
      topic: '请求任务',
      text: '"最近雪山上出现了一头雪熊，伤害了不少猎人。"雪狼说："你能帮我们除掉它吗？"',
      condition: (p: IPlayer) => p.realm >= 4,
    },
    {
      id: 'wolf_snow_story',
      topic: '聊雪山生活',
      text: '"我们雪狼村人不怕冷。"雪狼自豪地说："在雪山上打猎，需要勇气和技巧。"',
    },
  ],
});

// ===== 青鳞古国NPC =====

// 青龙城守卫
registerNPC({
  id: 'qinglin_guard',
  name: '青鳞卫',
  title: '青龙城守卫',
  description: '身披青色蛇纹铠甲的守卫，手持长剑，眼神如蛇般锐利。',
  greeting: '青鳞卫拦住你："来者何人？请出示通行令牌！"',
  roomId: 'qinglin_gate',
  dialogues: [
    {
      id: 'qinglin_guard_identify',
      topic: '出示身份',
      text: '青鳞卫检查令牌后放行："原来是远方修士，进城后遵守青鳞律法，不得随意伤人。"',
    },
    {
      id: 'qinglin_guard_warning',
      topic: '询问危险',
      text: '青鳞卫压低声音："最近城外灵竹林出现了一些变异毒蛇，路过要小心。"',
    },
    {
      id: 'qinglin_guard_info',
      topic: '询问城内',
      text: '"城内有药铺、丹阁和青龙广场。"青鳞卫说："青药阁的丹药远近闻名，不妨去看看。"',
    },
  ],
});

// 青龙广场炼丹师
registerNPC({
  id: 'qinglin_alchemist',
  name: '青药',
  title: '青鳞炼丹师',
  description: '一个穿着青色道袍的中年男子，身上散发着淡淡的药香，正在调配药材。',
  greeting: '青药正在调配药材，见你来了，微微一笑："道友好！需要丹药吗？"',
  roomId: 'qinglin_plaza',
  dialogues: [
    {
      id: 'qinglin_alchemist_intro',
      topic: '询问丹药',
      text: '"我炼制的丹药品质上乘。"青药说："有疗伤丹、法力丹、筑基丹等。"',
    },
    {
      id: 'qinglin_alchemist_buy',
      topic: '购买丹药',
      text: '青药指着药瓶："疗伤丹一百枚，法力丹一百二十枚，筑基丹五百枚。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 100) {
          p.gold -= 100;
          return { messages: ['你购买了一颗疗伤丹，药香扑鼻。'] };
        }
        return { messages: ['青药摇摇头："没钱买不了。"'] };
      },
    },
    {
      id: 'qinglin_alchemist_quest',
      topic: '请求任务',
      text: '"我最近需要一些珍稀药材。"青药说："灵草镇外有一株千年灵芝，你能帮我采来吗？"',
      condition: (p: IPlayer) => p.realm >= 3,
    },
  ],
});

// 青龙广场商人
registerNPC({
  id: 'qinglin_trader',
  name: '药掌柜',
  title: '灵药市场商人',
  description: '一个穿着华丽衣裳的中年男子，面容精明，正在清点药材。',
  greeting: '药掌柜热情地迎上来："道友好！欢迎来到灵药市场，本店有各种珍稀药材！"',
  roomId: 'qinglin_plaza',
  dialogues: [
    {
      id: 'qinglin_trader_intro',
      topic: '询问商品',
      text: '"灵药市场经营各种珍稀药材。"药掌柜说："有灵芝、人参、雪莲等。"',
    },
    {
      id: 'qinglin_trader_buy',
      topic: '购买药材',
      text: '药掌柜指着货架："灵芝三百枚，人参五百枚，雪莲一千枚。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 300) {
          p.gold -= 300;
          return { messages: ['你购买了一株灵芝，灵气浓郁。'] };
        }
        return { messages: ['药掌柜摇摇头："没钱买不了。"'] };
      },
    },
    {
      id: 'qinglin_trader_gossip',
      topic: '打听消息',
      text: '药掌柜压低声音："最近绿鳞城的毒术大师在研究一种新的剧毒……"',
    },
  ],
});

// 青鳞国王
registerNPC({
  id: 'qinglin_king',
  name: '青鳞王',
  title: '青鳞古国国王',
  description: '一个威严的中年男子，穿着青色龙袍，头戴蛇形皇冠。面容儒雅，眼神深邃。',
  greeting: '青鳞王坐在青龙殿的王座上，见你来了，微微点头："远方的修士，觐见朕有何事？"',
  roomId: 'qinglin_palace',
  dialogues: [
    {
      id: 'qinglin_king_intro',
      topic: '自我介绍',
      text: '青鳞王微微点头："原来是远方来的修士。欢迎来到青鳞古国。朕听说你在荒域颇有声望。"',
    },
    {
      id: 'qinglin_king_quest',
      topic: '请求任务',
      text: '"任务？"青鳞王想了想："最近城外灵竹林出现了一些变异毒蛇，伤害了不少村民。如果你能帮朕清除，朕必有重赏。"',
      condition: (p: IPlayer) => p.realm >= 4,
    },
    {
      id: 'qinglin_king_reward',
      topic: '询问奖励',
      text: '"奖励？"青鳞王微微一笑："朕可以赐你爵位，赏赐丹药，甚至传授青鳞古国的皇家丹方。"',
    },
    {
      id: 'qinglin_king_story',
      topic: '聊青鳞古国',
      text: '"青鳞古国已有千年历史。"青鳞王缓缓说道："蛇神保佑我们，让我们在这片灵竹林中生存下来。"',
    },
    {
      id: 'qinglin_king_secret',
      topic: '打听皇家秘密',
      text: '青鳞王压低声音："青龙殿深处有一座密室，里面藏着蛇神的传承。但那地方危险重重……"',
      condition: (p: IPlayer) => p.realm >= 7,
    },
  ],
});

// 青鳞丹术大师
registerNPC({
  id: 'qinglin_master_alchemist',
  name: '药仙',
  title: '青鳞丹术大师',
  description: '一个白发苍苍的老者，穿着青色道袍，身上散发着浓郁的药香。他是青鳞古国最有名的炼丹师。',
  greeting: '药仙正在炼丹，见你来了，微微一笑："道友好！来青龙殿有何指教？"',
  roomId: 'qinglin_palace',
  dialogues: [
    {
      id: 'qinglin_master_intro',
      topic: '询问丹术',
      text: '"炼丹是一门高深的学问。"药仙说："火候、配方、灵气，每一步都很重要。"',
    },
    {
      id: 'qinglin_master_learn',
      topic: '学习丹道',
      text: '"学习丹道可以。"药仙说："入门课程一千枚，进阶课程五千枚，高级课程一万枚。"',
      condition: (p: IPlayer) => p.realm >= 3,
      onSelect: (p: IPlayer) => {
        if (p.gold >= 1000) {
          p.gold -= 1000;
          return { messages: ['药仙开始教导你丹道。你感觉对炼丹有了初步的理解。'] };
        }
        return { messages: ['药仙摇摇头："没钱学不了。"'] };
      },
    },
    {
      id: 'qinglin_master_quest',
      topic: '请求任务',
      text: '"我最近在研究一种新药方。"药仙说："需要一些灵蛇毒液和千年灵草，你能帮我弄一些吗？"',
      condition: (p: IPlayer) => p.realm >= 4,
    },
    {
      id: 'qinglin_master_story',
      topic: '聊炼丹',
      text: '"炼丹是青鳞古国的根基。"药仙感慨地说："没有丹药，修士就无法快速修炼。丹药，是修士的第二条命。"',
    },
  ],
});

// 青药阁药师
registerNPC({
  id: 'qinglin_pharmacist',
  name: '青灵',
  title: '青药阁药师',
  description: '一个穿着青色衣裳的年轻女子，面容清秀，正在整理药材。',
  greeting: '青灵正在整理药材，见你来了，微微一笑："道友好！欢迎来到青药阁，需要什么药材？"',
  roomId: 'qinglin_pharmacy',
  dialogues: [
    {
      id: 'qinglin_pharmacist_intro',
      topic: '询问药材',
      text: '"青药阁有各种珍稀药材。"青灵说："有灵芝、人参、雪莲等。每一种都品质上乘。"',
    },
    {
      id: 'qinglin_pharmacist_buy',
      topic: '购买药材',
      text: '青灵指着货架："灵芝二百枚，人参四百枚，雪莲八百枚。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 200) {
          p.gold -= 200;
          return { messages: ['你购买了一株灵芝，灵气浓郁。'] };
        }
        return { messages: ['青灵摇摇头："没钱买不了。"'] };
      },
    },
    {
      id: 'qinglin_pharmacist_quest',
      topic: '请求任务',
      text: '"最近药田被妖兽破坏了不少。"青灵说："你能帮我们清除妖兽吗？"',
      condition: (p: IPlayer) => p.realm >= 3,
    },
  ],
});

// 灵药市场卖家
registerNPC({
  id: 'qinglin_herb_seller',
  name: '药农',
  title: '灵药市场卖家',
  description: '一个穿着粗布衣服的中年男子，正在摆摊卖药材。',
  greeting: '药农热情地招呼："道友好！来看看我的药材！都是刚采的，新鲜得很！"',
  roomId: 'qinglin_market',
  dialogues: [
    {
      id: 'qinglin_seller_intro',
      topic: '询问药材',
      text: '"我这里有各种新鲜药材。"药农说："有灵草、毒草、药花等。"',
    },
    {
      id: 'qinglin_seller_buy',
      topic: '购买药材',
      text: '药农指着摊位："灵草五十枚，毒草八十枚，药花一百枚。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 50) {
          p.gold -= 50;
          return { messages: ['你购买了一些灵草，灵气清新。'] };
        }
        return { messages: ['药农摇摇头："没钱买不了。"'] };
      },
    },
    {
      id: 'qinglin_seller_gossip',
      topic: '打听消息',
      text: '药农压低声音："最近灵草镇外出现了一头灵蛇王，守护着一株千年灵芝……"',
    },
  ],
});

// 绿鳞城毒术大师
registerNPC({
  id: 'qinglin_poison_master',
  name: '毒仙',
  title: '绿鳞城毒术大师',
  description: '一个穿着绿色道袍的老者，面容阴鸷，眼神中透着一丝诡异。他是青鳞古国最有名的毒术大师。',
  greeting: '毒仙正在研究毒药，见你来了，阴鸷地一笑："道友好！来绿鳞城有何指教？"',
  roomId: 'qinglin_city2',
  dialogues: [
    {
      id: 'qinglin_poison_intro',
      topic: '询问毒术',
      text: '"毒术是青鳞古国的不传之秘。"毒仙说："毒药可以杀人于无形，也可以救人于危难。"',
    },
    {
      id: 'qinglin_poison_learn',
      topic: '学习毒术',
      text: '"学习毒术可以。"毒仙说："入门课程五百枚，进阶课程两千枚，高级课程五千枚。"',
      condition: (p: IPlayer) => p.realm >= 3,
      onSelect: (p: IPlayer) => {
        if (p.gold >= 500) {
          p.gold -= 500;
          return { messages: ['毒仙开始教导你毒术。你感觉对毒药有了初步的理解。'] };
        }
        return { messages: ['毒仙摇摇头："没钱学不了。"'] };
      },
    },
    {
      id: 'qinglin_poison_quest',
      topic: '请求任务',
      text: '"我最近需要一些灵蛇毒液。"毒仙说："蛇尾村外有一条灵蛇王，你能帮我取一些毒液吗？"',
      condition: (p: IPlayer) => p.realm >= 4,
    },
    {
      id: 'qinglin_poison_story',
      topic: '聊毒术',
      text: '"毒术是一把双刃剑。"毒仙感慨地说："用得好可以救人，用得不好可以害人。关键在于使用者的心。"',
    },
  ],
});

// 翠竹城竹商
registerNPC({
  id: 'qinglin_bamboo_merchant',
  name: '竹掌柜',
  title: '翠竹城竹商',
  description: '一个穿着青色衣裳的中年男子，面容和蔼，正在清点竹制品。',
  greeting: '竹掌柜热情地迎上来："道友好！欢迎来到翠竹城，要不要买一些竹制品？"',
  roomId: 'qinglin_city3',
  dialogues: [
    {
      id: 'qinglin_bamboo_intro',
      topic: '询问商品',
      text: '"翠竹城以翠竹闻名。"竹掌柜说："我们的竹制品品质上乘，有竹器、竹甲、竹剑等。"',
    },
    {
      id: 'qinglin_bamboo_buy',
      topic: '购买竹制品',
      text: '竹掌柜指着货架："竹器五十枚，竹甲三百枚，竹剑两百枚。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 50) {
          p.gold -= 50;
          return { messages: ['你购买了一件竹器，做工精细。'] };
        }
        return { messages: ['竹掌柜摇摇头："没钱买不了。"'] };
      },
    },
    {
      id: 'qinglin_bamboo_gossip',
      topic: '打听消息',
      text: '竹掌柜压低声音："最近翠竹镇的竹林出现了一些妖兽，破坏了不少竹子……"',
    },
  ],
});

// 青蛇镇采药人
registerNPC({
  id: 'qinglin_herb_collector',
  name: '青蛇',
  title: '青蛇镇采药人',
  description: '一个穿着粗布衣服的中年男子，背着药篓，正在整理药材。',
  greeting: '青蛇正在整理药材，见你来了，微微一笑："道友好！来青蛇镇采药吗？"',
  roomId: 'qinglin_town1',
  dialogues: [
    {
      id: 'qinglin_collector_intro',
      topic: '询问采药',
      text: '"青蛇镇外有大片药田和蛇养殖场。"青蛇说："是采药和养蛇的好地方。"',
    },
    {
      id: 'qinglin_collector_quest',
      topic: '请求任务',
      text: '"最近药田被毒蛇破坏了不少。"青蛇说："你能帮我们清除毒蛇吗？"',
      condition: (p: IPlayer) => p.realm >= 3,
    },
    {
      id: 'qinglin_collector_story',
      topic: '聊采药',
      text: '"采药是我们青蛇镇人的生计。"青蛇感慨地说："灵草赐予我们财富，我们也要保护药田。"',
    },
  ],
});

// 翠竹镇竹匠
registerNPC({
  id: 'qinglin_bamboo_craftsman',
  name: '竹匠',
  title: '翠竹镇竹匠',
  description: '一个穿着粗布衣服的中年男子，正在制作竹器。',
  greeting: '竹匠正在制作竹器，见你来了，微微一笑："道友好！来翠竹镇定做竹器吗？"',
  roomId: 'qinglin_town2',
  dialogues: [
    {
      id: 'qinglin_craftsman_intro',
      topic: '询问竹器',
      text: '"翠竹镇以制作竹器闻名。"竹匠说："我们的竹器做工精细，坚固耐用。"',
    },
    {
      id: 'qinglin_craftsman_quest',
      topic: '请求任务',
      text: '"最近竹林出现了一些妖兽，破坏了不少竹子。"竹匠说："你能帮我们清除妖兽吗？"',
      condition: (p: IPlayer) => p.realm >= 3,
    },
    {
      id: 'qinglin_craftsman_story',
      topic: '聊竹器',
      text: '"制作竹器是一门手艺。"竹匠感慨地说："好的竹器需要好的竹子，好的手艺，还有好的心意。"',
    },
  ],
});

// 灵草镇草农
registerNPC({
  id: 'qinglin_grass_farmer',
  name: '草农',
  title: '灵草镇草农',
  description: '一个穿着粗布衣服的中年男子，正在灵草田中劳作。',
  greeting: '草农正在灵草田中劳作，见你来了，直起腰："道友好！来灵草镇做客吗？"',
  roomId: 'qinglin_town3',
  dialogues: [
    {
      id: 'qinglin_farmer_intro',
      topic: '询问灵草',
      text: '"灵草镇以种植灵草闻名。"草农说："我们种的灵草，品质上乘，是炼丹的好材料。"',
    },
    {
      id: 'qinglin_farmer_quest',
      topic: '请求任务',
      text: '"最近灵草田被妖兽破坏了不少。"草农说："你能帮我们清除妖兽吗？"',
      condition: (p: IPlayer) => p.realm >= 3,
    },
    {
      id: 'qinglin_farmer_story',
      topic: '聊灵草',
      text: '"种植灵草是一门学问。"草农感慨地说："需要合适的土壤、充足的灵气，还有精心的照料。"',
    },
  ],
});

// 蛇尾村蛇夫
registerNPC({
  id: 'qinglin_snake_keeper',
  name: '蛇夫',
  title: '蛇尾村蛇夫',
  description: '一个穿着粗布衣服的中年男子，正在照看蛇笼。',
  greeting: '蛇夫正在照看蛇笼，见你来了，微微一笑："道友好！来蛇尾村做客吗？"',
  roomId: 'qinglin_village1',
  dialogues: [
    {
      id: 'qinglin_snake_intro',
      topic: '询问养蛇',
      text: '"蛇尾村以养蛇为生。"蛇夫说："我们养的蛇，有剧毒的，也有温顺的。"',
    },
    {
      id: 'qinglin_snake_quest',
      topic: '请求任务',
      text: '"最近蛇笼里的蛇经常逃跑。"蛇夫说："你能帮我们找回逃跑的蛇吗？"',
      condition: (p: IPlayer) => p.realm >= 2,
    },
    {
      id: 'qinglin_snake_story',
      topic: '聊养蛇',
      text: '"养蛇是一门危险的活计。"蛇夫感慨地说："但蛇毒能卖个好价钱，够我们一家人生活了。"',
    },
  ],
});

// 竹根村竹农
registerNPC({
  id: 'qinglin_bamboo_farmer',
  name: '竹农',
  title: '竹根村竹农',
  description: '一个穿着粗布衣服的中年男子，正在竹林中劳作。',
  greeting: '竹农正在竹林中劳作，见你来了，直起腰："道友好！来竹根村做客吗？"',
  roomId: 'qinglin_village2',
  dialogues: [
    {
      id: 'qinglin_bamboo_farmer_intro',
      topic: '询问竹林',
      text: '"竹根村以种植翠竹为生。"竹农说："我们种的翠竹，品质上乘，是制作竹器的好材料。"',
    },
    {
      id: 'qinglin_bamboo_farmer_quest',
      topic: '请求任务',
      text: '"最近竹林出现了一些妖兽，破坏了不少竹子。"竹农说："你能帮我们清除妖兽吗？"',
      condition: (p: IPlayer) => p.realm >= 2,
    },
    {
      id: 'qinglin_bamboo_farmer_story',
      topic: '聊竹林',
      text: '"竹林是我们的家园。"竹农感慨地说："翠竹赐予我们财富，我们也要保护竹林。"',
    },
  ],
});

// 药草村药农
registerNPC({
  id: 'qinglin_herb_farmer',
  name: '药农',
  title: '药草村药农',
  description: '一个穿着粗布衣服的中年男子，正在药田中劳作。',
  greeting: '药农正在药田中劳作，见你来了，直起腰："道友好！来药草村做客吗？"',
  roomId: 'qinglin_village3',
  dialogues: [
    {
      id: 'qinglin_herb_farmer_intro',
      topic: '询问药田',
      text: '"药草村以种植药草为生。"药农说："我们种的药草，品质上乘，是炼丹的好材料。"',
    },
    {
      id: 'qinglin_herb_farmer_quest',
      topic: '请求任务',
      text: '"最近药田被妖兽破坏了不少。"药农说："你能帮我们清除妖兽吗？"',
      condition: (p: IPlayer) => p.realm >= 2,
    },
    {
      id: 'qinglin_herb_farmer_story',
      topic: '聊药草',
      text: '"药草是修士的必需品。"药农感慨地说："没有药草，修士就无法炼制丹药，无法快速修炼。"',
    },
  ],
});

// 毒牙村毒师
registerNPC({
  id: 'qinglin_poison_crafter',
  name: '毒牙',
  title: '毒牙村毒师',
  description: '一个穿着黑色衣裳的中年男子，面容阴鸷，正在制作毒药。',
  greeting: '毒牙正在制作毒药，见你来了，阴鸷地一笑："道友好！来毒牙村有何指教？"',
  roomId: 'qinglin_village4',
  dialogues: [
    {
      id: 'qinglin_poison_crafter_intro',
      topic: '询问毒药',
      text: '"毒牙村以制作毒药和解毒药闻名。"毒牙说："我们的毒药，见血封喉；我们的解毒药，药到病除。"',
    },
    {
      id: 'qinglin_poison_crafter_buy',
      topic: '购买毒药',
      text: '毒牙指着药瓶："毒药一百枚，解毒药两百枚，剧毒五百枚。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 100) {
          p.gold -= 100;
          return { messages: ['你购买了一瓶毒药，瓶中液体呈墨绿色。'] };
        }
        return { messages: ['毒牙摇摇头："没钱买不了。"'] };
      },
    },
    {
      id: 'qinglin_poison_crafter_quest',
      topic: '请求任务',
      text: '"我最近需要一些毒蛇毒液。"毒牙说："青蛇镇外有一条剧毒蛇王，你能帮我取一些毒液吗？"',
      condition: (p: IPlayer) => p.realm >= 4,
    },
  ],
});

// ===== 血神古国NPC =====

// 血神城守卫
registerNPC({
  id: 'blood_guard',
  name: '血卫',
  title: '血神城守卫',
  description: '身披血色铠甲的守卫，手持血色长枪，眼神中透着一丝诡异。',
  greeting: '血卫拦住你："来者何人？敢闯血神城！"',
  roomId: 'blood_god_gate',
  dialogues: [
    {
      id: 'blood_guard_identify',
      topic: '出示身份',
      text: '血卫检查令牌后放行："原来是远方修士，进城后遵守血神律法，不得亵渎血神。"',
    },
    {
      id: 'blood_guard_warning',
      topic: '询问危险',
      text: '血卫压低声音："最近血河城出现了一些血魔，路过要小心。"',
    },
    {
      id: 'blood_guard_info',
      topic: '询问城内',
      text: '"城内有祭坛、祭堂和血神广场。"血卫说："血祭坛的血祭仪式远近闻名，不妨去看看。"',
    },
  ],
});

// 血神广场祭司
registerNPC({
  id: 'blood_priest',
  name: '血祭司',
  title: '血神广场祭司',
  description: '一个穿着血色长袍的中年男子，身上散发着淡淡的血腥味，正在吟唱咒语。',
  greeting: '血祭司正在吟唱咒语，见你来了，停止吟唱："道友好！来血神广场有何指教？"',
  roomId: 'blood_plaza',
  dialogues: [
    {
      id: 'blood_priest_intro',
      topic: '询问血祭',
      text: '"血祭是血神古国的核心仪式。"血祭司说："通过血祭，我们可以获得血神的力量。"',
    },
    {
      id: 'blood_priest_ritual',
      topic: '参加血祭',
      text: '"参加血祭可以。"血祭司说："血祭可以增强你的修为，但也有一定的风险。"',
      condition: (p: IPlayer) => p.realm >= 3,
      onSelect: (p: IPlayer) => {
        const success = Math.random() > 0.3;
        if (success) {
          return { messages: ['你参加了血祭仪式，感到一股强大的力量涌入体内。'] };
        }
        return { messages: ['血祭失败，你感到一阵虚弱。'] };
      },
    },
    {
      id: 'blood_priest_quest',
      topic: '请求任务',
      text: '"我最近需要一些血祭材料。"血祭司说："血牙镇外有一头血兽，你能帮我取一些血吗？"',
      condition: (p: IPlayer) => p.realm >= 3,
    },
  ],
});

// 血神广场商人
registerNPC({
  id: 'blood_trader',
  name: '血掌柜',
  title: '血市商人',
  description: '一个穿着黑色衣裳的中年男子，面容阴沉，正在清点货物。',
  greeting: '血掌柜热情地迎上来："道友好！欢迎来到血市，本店有各种血祭材料！"',
  roomId: 'blood_plaza',
  dialogues: [
    {
      id: 'blood_trader_intro',
      topic: '询问商品',
      text: '"血市经营各种血祭材料和诅咒道具。"血掌柜说："有血晶、血骨、血咒符等。"',
    },
    {
      id: 'blood_trader_buy',
      topic: '购买材料',
      text: '血掌柜指着货架："血晶三百枚，血骨五百枚，血咒符八百枚。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 300) {
          p.gold -= 300;
          return { messages: ['你购买了一枚血晶，散发着淡淡的血色光芒。'] };
        }
        return { messages: ['血掌柜摇摇头："没钱买不了。"'] };
      },
    },
    {
      id: 'blood_trader_gossip',
      topic: '打听消息',
      text: '血掌柜压低声音："最近血刃城的将军在准备一场大规模的血祭……"',
    },
  ],
});

// 血神国王
registerNPC({
  id: 'blood_king',
  name: '血神王',
  title: '血神古国国王',
  description: '一个威严的中年男子，穿着血色龙袍，头戴血色皇冠。面容冷酷，眼神深邃如血池。',
  greeting: '血神王坐在血神殿的王座上，见你来了，微微点头："远方的修士，觐见朕有何事？"',
  roomId: 'blood_temple',
  dialogues: [
    {
      id: 'blood_king_intro',
      topic: '自我介绍',
      text: '血神王微微点头："原来是远方来的修士。欢迎来到血神古国。朕听说你在荒域颇有声望。"',
    },
    {
      id: 'blood_king_quest',
      topic: '请求任务',
      text: '"任务？"血神王想了想："最近血河城出现了一些血魔，伤害了不少渔民。如果你能帮朕清除，朕必有重赏。"',
      condition: (p: IPlayer) => p.realm >= 5,
    },
    {
      id: 'blood_king_reward',
      topic: '询问奖励',
      text: '"奖励？"血神王微微一笑："朕可以赐你爵位，赏赐血祭材料，甚至传授血神古国的皇家血祭术。"',
    },
    {
      id: 'blood_king_story',
      topic: '聊血神古国',
      text: '"血神古国已有千年历史。"血神王缓缓说道："血神保佑我们，让我们在这片血色土地上生存下来。"',
    },
    {
      id: 'blood_king_secret',
      topic: '打听皇家秘密',
      text: '血神王压低声音："血神殿深处有一座密室，里面藏着血神的传承。但那地方危险重重……"',
      condition: (p: IPlayer) => p.realm >= 8,
    },
  ],
});

// 血神大祭司
registerNPC({
  id: 'blood_high_priest',
  name: '血大祭司',
  title: '血神大祭司',
  description: '一个白发苍苍的老者，穿着血色长袍，身上散发着浓郁的血腥味。他是血神古国最有名的祭司。',
  greeting: '血大祭司正在主持血祭，见你来了，停止仪式："道友好！来血神殿有何指教？"',
  roomId: 'blood_temple',
  dialogues: [
    {
      id: 'blood_high_intro',
      topic: '询问血祭',
      text: '"血祭是血神古国的根基。"血大祭司说："通过血祭，我们可以获得血神的力量，增强修为。"',
    },
    {
      id: 'blood_high_learn',
      topic: '学习血祭',
      text: '"学习血祭可以。"血大祭司说："入门课程一千枚，进阶课程五千枚，高级课程一万枚。"',
      condition: (p: IPlayer) => p.realm >= 4,
      onSelect: (p: IPlayer) => {
        if (p.gold >= 1000) {
          p.gold -= 1000;
          return { messages: ['血大祭司开始教导你血祭术。你感觉对血祭有了初步的理解。'] };
        }
        return { messages: ['血大祭司摇摇头："没钱学不了。"'] };
      },
    },
    {
      id: 'blood_high_quest',
      topic: '请求任务',
      text: '"我最近在准备一场盛大的血祭仪式。"血大祭司说："需要一些珍稀的血祭材料，你能帮我弄一些吗？"',
      condition: (p: IPlayer) => p.realm >= 5,
    },
    {
      id: 'blood_high_story',
      topic: '聊血祭',
      text: '"血祭是一把双刃剑。"血大祭司感慨地说："用得好可以增强修为，用得不好会被血神反噬。关键在于使用者的心。"',
    },
  ],
});

// 血祭坛祭司
registerNPC({
  id: 'blood_altar_priest',
  name: '血祭坛祭司',
  title: '血祭坛祭司',
  description: '一个穿着血色长袍的中年男子，正在祭坛前吟唱咒语。',
  greeting: '血祭坛祭司正在吟唱咒语，见你来了，停止吟唱："道友好！来血祭坛有何指教？"',
  roomId: 'blood_altar',
  dialogues: [
    {
      id: 'blood_altar_intro',
      topic: '询问祭坛',
      text: '"血祭坛是血神古国最重要的血祭场所。"血祭坛祭司说："每年都会在这里举行盛大的血祭仪式。"',
    },
    {
      id: 'blood_altar_ritual',
      topic: '参加血祭',
      text: '"参加血祭可以。"血祭坛祭司说："血祭可以增强你的修为，但也有一定的风险。"',
      condition: (p: IPlayer) => p.realm >= 4,
      onSelect: (p: IPlayer) => {
        const success = Math.random() > 0.2;
        if (success) {
          return { messages: ['你参加了血祭仪式，感到一股强大的力量涌入体内。修为有所提升！'] };
        }
        return { messages: ['血祭失败，你感到一阵虚弱。'] };
      },
    },
    {
      id: 'blood_altar_quest',
      topic: '请求任务',
      text: '"我最近需要一些血祭材料。"血祭坛祭司说："血骨镇外有一座古墓，里面有很多血骨。"',
      condition: (p: IPlayer) => p.realm >= 4,
    },
  ],
});

// 血市贩子
registerNPC({
  id: 'blood_dealer',
  name: '血贩子',
  title: '血市贩子',
  description: '一个穿着黑色衣裳的中年男子，面容阴鸷，正在摆摊卖血祭材料。',
  greeting: '血贩子热情地招呼："道友好！来看看我的血祭材料！都是上好的！"',
  roomId: 'blood_market',
  dialogues: [
    {
      id: 'blood_dealer_intro',
      topic: '询问材料',
      text: '"我这里有各种血祭材料。"血贩子说："有血晶、血骨、血咒符等。"',
    },
    {
      id: 'blood_dealer_buy',
      topic: '购买材料',
      text: '血贩子指着摊位："血晶两百枚，血骨四百枚，血咒符六百枚。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 200) {
          p.gold -= 200;
          return { messages: ['你购买了一枚血晶，散发着淡淡的血色光芒。'] };
        }
        return { messages: ['血贩子摇摇头："没钱买不了。"'] };
      },
    },
    {
      id: 'blood_dealer_gossip',
      topic: '打听消息',
      text: '血贩子压低声音："最近血咒镇的诅咒师在研究一种新的诅咒……"',
    },
  ],
});

// 血刃城将军
registerNPC({
  id: 'blood_general',
  name: '血刃',
  title: '血刃城将军',
  description: '一个身材高大的中年男子，穿着血色铠甲，手持血色战刀。面容冷酷，眼神锐利。',
  greeting: '血刃将军正在练兵场指导士兵，见你来了，大声喊道："来者何人？"',
  roomId: 'blood_city2',
  dialogues: [
    {
      id: 'blood_general_intro',
      topic: '自我介绍',
      text: '血刃将军微微点头："本将是血刃城将军。听说你实力不错，要不要来军营效力？"',
    },
    {
      id: 'blood_general_fight',
      topic: '切磋武艺',
      text: '"来，让我看看你的实力！"血刃将军摆开架势："不要害怕，我会手下留情的。"',
      onSelect: () => {
        const win = Math.random() > 0.6;
        return { messages: win ? ['你击败了血刃将军！他惊讶地说："没想到你的实力这么强！"'] : ['血刃将军轻松击败了你。他笑着说："继续努力！"'] };
      },
    },
    {
      id: 'blood_general_quest',
      topic: '请求任务',
      text: '"任务？"血刃将军想了想："血河城出现了一些血魔，需要有人去清除他们。"',
      condition: (p: IPlayer) => p.realm >= 5,
    },
    {
      id: 'blood_general_story',
      topic: '聊军队',
      text: '"血刃城是血神古国的军事要塞。"血刃将军自豪地说："我们的士兵，个个都是血祭高手！"',
    },
  ],
});

// 血河城河主
registerNPC({
  id: 'blood_river_master',
  name: '血河',
  title: '血河城河主',
  description: '一个穿着血色衣裳的中年男子，面容阴鸷，正在河边行走。',
  greeting: '血河正在河边行走，见你来了，微微一笑："道友好！来血河城有何指教？"',
  roomId: 'blood_city3',
  dialogues: [
    {
      id: 'blood_river_intro',
      topic: '询问血河',
      text: '"血河是血神古国的母亲河。"血河说："河水呈血红色，蕴含着浓郁的血属性灵气。"',
    },
    {
      id: 'blood_river_fish',
      topic: '捕捞血鱼',
      text: '"血河中生活着血鱼。"血河说："鱼肉富含血属性灵气，是珍贵的血祭材料。"',
      onSelect: (p: IPlayer) => {
        const success = Math.random() > 0.4;
        if (success) {
          return { messages: ['你捕捞到一条血鱼，鱼肉呈血红色。'] };
        }
        return { messages: ['你没有捕捞到血鱼。'] };
      },
    },
    {
      id: 'blood_river_quest',
      topic: '请求任务',
      text: '"最近血河中出现了一些血魔，伤害了不少渔民。"血河说："你能帮我们清除血魔吗？"',
      condition: (p: IPlayer) => p.realm >= 4,
    },
  ],
});

// 血牙镇猎人
registerNPC({
  id: 'blood_hunter',
  name: '血牙',
  title: '血牙镇猎人',
  description: '一个穿着兽皮的中年男子，背着弓箭，腰间挂着猎物。',
  greeting: '血牙正在整理猎物，见你来了，微微一笑："道友好！来血牙镇打猎吗？"',
  roomId: 'blood_town1',
  dialogues: [
    {
      id: 'blood_hunter_intro',
      topic: '询问打猎',
      text: '"血牙镇外有大片荒原，是打猎的好地方。"血牙说："有血兽、血狼、血虎等。"',
    },
    {
      id: 'blood_hunter_quest',
      topic: '请求任务',
      text: '"最近血兽越来越多，伤害了不少村民。"血牙说："你能帮我清除一些吗？"',
      condition: (p: IPlayer) => p.realm >= 3,
    },
    {
      id: 'blood_hunter_story',
      topic: '聊打猎',
      text: '"打猎是我们血牙镇人的生计。"血牙感慨地说："血兽赐予我们食物和血祭材料，我们也要保护荒原。"',
    },
  ],
});

// 血骨镇骨匠
registerNPC({
  id: 'blood_bone_crafter',
  name: '骨匠',
  title: '血骨镇骨匠',
  description: '一个穿着黑色衣裳的中年男子，正在制作血骨道具。',
  greeting: '骨匠正在制作血骨道具，见你来了，微微一笑："道友好！来血骨镇定做道具吗？"',
  roomId: 'blood_town2',
  dialogues: [
    {
      id: 'blood_bone_intro',
      topic: '询问血骨',
      text: '"血骨镇以制作血骨道具闻名。"骨匠说："我们的血骨道具，蕴含着血神的力量。"',
    },
    {
      id: 'blood_bone_quest',
      topic: '请求任务',
      text: '"最近骨矿被血魔占据了，我们都不敢去开采了。"骨匠说："你能帮我们赶走血魔吗？"',
      condition: (p: IPlayer) => p.realm >= 3,
    },
    {
      id: 'blood_bone_story',
      topic: '聊血骨',
      text: '"血骨是血祭的重要材料。"骨匠感慨地说："没有血骨，就无法进行高级血祭。"',
    },
  ],
});

// 血咒镇诅咒师
registerNPC({
  id: 'blood_curse_master',
  name: '咒师',
  title: '血咒镇诅咒师',
  description: '一个穿着黑色长袍的老者，面容阴鸷，眼神中透着一丝诡异。',
  greeting: '咒师正在研究诅咒，见你来了，阴鸷地一笑："道友好！来血咒镇有何指教？"',
  roomId: 'blood_town3',
  dialogues: [
    {
      id: 'blood_curse_intro',
      topic: '询问诅咒',
      text: '"诅咒术是血神古国的不传之秘。"咒师说："诅咒可以伤人于无形，也可以保护自己。"',
    },
    {
      id: 'blood_curse_learn',
      topic: '学习诅咒',
      text: '"学习诅咒可以。"咒师说："入门课程五百枚，进阶课程两千枚，高级课程五千枚。"',
      condition: (p: IPlayer) => p.realm >= 4,
      onSelect: (p: IPlayer) => {
        if (p.gold >= 500) {
          p.gold -= 500;
          return { messages: ['咒师开始教导你诅咒术。你感觉对诅咒有了初步的理解。'] };
        }
        return { messages: ['咒师摇摇头："没钱学不了。"'] };
      },
    },
    {
      id: 'blood_curse_quest',
      topic: '请求任务',
      text: '"我最近需要一些血咒材料。"咒师说："血咒村外有一座古墓，里面有很多血咒符文。"',
      condition: (p: IPlayer) => p.realm >= 5,
    },
    {
      id: 'blood_curse_story',
      topic: '聊诅咒',
      text: '"诅咒是一把双刃剑。"咒师感慨地说："用得好可以伤人，用得不好会反噬自己。关键在于使用者的心。"',
    },
  ],
});

// 血角村祭司
registerNPC({
  id: 'blood_village_priest',
  name: '血角',
  title: '血角村祭司',
  description: '一个穿着血色长袍的中年男子，正在血神庙中诵经。',
  greeting: '血角正在诵经，见你来了，停下手中的动作："道友好！欢迎来到血角村。"',
  roomId: 'blood_village1',
  dialogues: [
    {
      id: 'blood_village_intro',
      topic: '询问血神庙',
      text: '"血神庙是祭祀血神的地方。"血角说："每天都有不少信徒前来参拜。"',
    },
    {
      id: 'blood_village_pray',
      topic: '参拜血神',
      text: '"参拜血神可以祈福。"血角说："只要心诚，血神会保佑你的。"',
      onSelect: (p: IPlayer) => {
        return { messages: ['你虔诚地参拜了血神。一股温热的力量涌入体内。'] };
      },
    },
    {
      id: 'blood_village_quest',
      topic: '请求任务',
      text: '"最近村外出现了一些血魔，伤害了不少村民。"血角说："你能帮我们清除血魔吗？"',
      condition: (p: IPlayer) => p.realm >= 3,
    },
  ],
});

// 血鳞村渔夫
registerNPC({
  id: 'blood_fisherman',
  name: '血鳞',
  title: '血鳞村渔夫',
  description: '一个穿着粗布衣服的中年男子，正在血河边捕鱼。',
  greeting: '血鳞正在捕鱼，见你来了，微微一笑："道友好！来血鳞村做客吗？"',
  roomId: 'blood_village2',
  dialogues: [
    {
      id: 'blood_fisherman_intro',
      topic: '询问捕鱼',
      text: '"血鳞村以捕鱼为生。"血鳞说："血河中生活着血鱼，鱼肉富含血属性灵气。"',
    },
    {
      id: 'blood_fisherman_quest',
      topic: '请求任务',
      text: '"最近血河中出现了一些血魔，伤害了不少渔民。"血鳞说："你能帮我们清除血魔吗？"',
      condition: (p: IPlayer) => p.realm >= 3,
    },
    {
      id: 'blood_fisherman_story',
      topic: '聊捕鱼',
      text: '"捕鱼是我们血鳞村人的生计。"血鳞感慨地说："血河赐予我们食物，我们也要保护血河。"',
    },
  ],
});

// 血咒村学徒
registerNPC({
  id: 'blood_curse_apprentice',
  name: '血咒学徒',
  title: '血咒村学徒',
  description: '一个穿着黑色衣裳的年轻男子，正在学习诅咒术。',
  greeting: '血咒学徒正在学习诅咒术，见你来了，微微一笑："道友好！来血咒村学习诅咒吗？"',
  roomId: 'blood_village3',
  dialogues: [
    {
      id: 'blood_apprentice_intro',
      topic: '询问诅咒',
      text: '"我正在学习诅咒术。"血咒学徒说："诅咒术很神秘，但也很强大。"',
    },
    {
      id: 'blood_apprentice_quest',
      topic: '请求任务',
      text: '"我最近需要一些诅咒材料。"血咒学徒说："血咒镇外有一座古墓，里面有很多血咒符文。"',
      condition: (p: IPlayer) => p.realm >= 3,
    },
    {
      id: 'blood_apprentice_story',
      topic: '聊学习',
      text: '"学习诅咒术很辛苦。"血咒学徒感慨地说："但我相信，只要努力，总有一天我会成为一名强大的诅咒师。"',
    },
  ],
});

// 血祭村信徒
registerNPC({
  id: 'blood_cultist',
  name: '血祭信徒',
  title: '血祭村信徒',
  description: '一个穿着血色衣裳的中年男子，面容狂热，正在准备血祭仪式。',
  greeting: '血祭信徒正在准备血祭仪式，见你来了，狂热地说："道友好！快来参加血祭仪式！血神会保佑你的！"',
  roomId: 'blood_village4',
  dialogues: [
    {
      id: 'blood_cultist_intro',
      topic: '询问血祭',
      text: '"血祭是血神古国最重要的仪式。"血祭信徒狂热地说："通过血祭，我们可以获得血神的力量！"',
    },
    {
      id: 'blood_cultist_ritual',
      topic: '参加血祭',
      text: '"参加血祭吧！"血祭信徒狂热地说："血神会保佑你的！"',
      condition: (p: IPlayer) => p.realm >= 3,
      onSelect: (p: IPlayer) => {
        const success = Math.random() > 0.3;
        if (success) {
          return { messages: ['你参加了血祭仪式，感到一股强大的力量涌入体内。'] };
        }
        return { messages: ['血祭失败，你感到一阵虚弱。'] };
      },
    },
    {
      id: 'blood_cultist_quest',
      topic: '请求任务',
      text: '"我们需要更多的血祭材料。"血祭信徒说："血牙镇外有一头血兽王，你能帮我们取一些血吗？"',
      condition: (p: IPlayer) => p.realm >= 4,
    },
  ],
});

// ===== 石村NPC =====

// 村口守卫
registerNPC({
  id: 'village_guard',
  name: '石头',
  title: '村口守卫',
  description: '一个身材健壮的青年，手持石矛，正在瞭望台上观察四周。',
  greeting: '石头正在瞭望台上观察四周，见你来了，大声喊道："你是何人？来石村有何事？"',
  roomId: 'stone_village_entrance',
  dialogues: [
    {
      id: 'village_guard_identify',
      topic: '自我介绍',
      text: '石头点点头："原来是远方来的修士。欢迎来到石村！不过最近村外不太太平，凶兽越来越多了。"',
    },
    {
      id: 'village_guard_warning',
      topic: '询问危险',
      text: '石头压低声音："最近村外的山林里出现了一头凶兽，已经伤了几个猎人。村长正在商量对策。"',
    },
    {
      id: 'village_guard_info',
      topic: '询问村内',
      text: '"村里有村长家、石昊家、祭台和演武场。"石头说："你可以先去村中心看看，村长应该在那里。"',
    },
  ],
});

// 村长
registerNPC({
  id: 'village_chief',
  name: '石村长',
  title: '石村村长',
  description: '一个白发苍苍的老者，面容慈祥，正在村中心的议事石旁休息。',
  greeting: '石村长正在议事石旁休息，见你来了，微微一笑："道友好！来石村做客吗？"',
  roomId: 'stone_village_center',
  dialogues: [
    {
      id: 'village_chief_intro',
      topic: '询问石村',
      text: '"石村是一个古老的村落。"石村长感慨地说："我们在这里生活了数百年，靠狩猎为生。"',
    },
    {
      id: 'village_chief_quest',
      topic: '请求任务',
      text: '"最近村外的凶兽越来越多，已经伤了几个猎人。"石村长说："你能帮我们清除凶兽吗？"',
      condition: (p: IPlayer) => p.realm >= 1,
    },
    {
      id: 'village_chief_story',
      topic: '聊石村历史',
      text: '"石村已有数百年历史。"石村长缓缓说道："我们的祖先从远方迁徙而来，在这里建立了家园。柳神庇护着我们，让我们免受凶兽的侵扰。"',
    },
    {
      id: 'village_chief_willow',
      topic: '询问柳神',
      text: '"柳神是我们石村的守护神。"石村长神情庄重："它是一株通天大柳树，在雷雨中折断后扎根石村。柳神庇护着我们，凶兽不敢靠近。"',
    },
  ],
});

// 祭台祭司
registerNPC({
  id: 'sacrifice_priest',
  name: '石祭司',
  title: '祭台祭司',
  description: '一个穿着兽皮的中年男子，正在祭台上摆放祭品。',
  greeting: '石祭司正在祭台上摆放祭品，见你来了，微微一笑："道友好！来祭台参拜吗？"',
  roomId: 'stone_village_altar',
  dialogues: [
    {
      id: 'priest_intro',
      topic: '询问祭台',
      text: '"祭台是我们祭祀柳神的地方。"石祭司说："每月初一，我们会在这里举行祭祀仪式，祈求柳神保佑。"',
    },
    {
      id: 'priest_pray',
      topic: '参拜柳神',
      text: '"参拜柳神可以祈福。"石祭司说："只要心诚，柳神会保佑你的。"',
      onSelect: (p: IPlayer) => {
        return { messages: ['你虔诚地参拜了柳神。一股温和的力量涌入体内。'] };
      },
    },
    {
      id: 'priest_quest',
      topic: '请求任务',
      text: '"祭祀需要一些兽血精。"石祭司说："你能帮我们狩猎一些凶兽，获取兽血精吗？"',
      condition: (p: IPlayer) => p.realm >= 2,
    },
  ],
});

// 石屋区妇人
registerNPC({
  id: 'village_women',
  name: '石大妈',
  title: '石村妇人',
  description: '一个穿着兽皮的中年妇人，正在石屋前晾晒兽皮。',
  greeting: '石大妈正在晾晒兽皮，见你来了，热情地招呼："道友好！来石村做客吗？"',
  roomId: 'stone_village_houses',
  dialogues: [
    {
      id: 'village_women_intro',
      topic: '询问生活',
      text: '"我们石村的生活很简单。"石大妈说："男人们出去狩猎，女人们在家处理兽皮和做饭。"',
    },
    {
      id: 'village_women_buy',
      topic: '交换物品',
      text: '"如果你有草药，可以和我交换兽皮。"石大妈说："兽皮很暖和，是过冬的好东西。"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 10) {
          p.gold -= 10;
          return { messages: ['你用一些草药换了一张兽皮。兽皮厚实保暖。'] };
        }
        return { messages: ['石大妈摇摇头："你没有草药可换。"'] };
      },
    },
    {
      id: 'village_women_gossip',
      topic: '打听消息',
      text: '石大妈压低声音："最近石昊那孩子又惹事了，把村里的石桩都打坏了……不过他确实很有天赋。"',
    },
  ],
});

// 石昊
registerNPC({
  id: 'shi_hao',
  name: '石昊',
  title: '石村少年',
  description: '一个身材健壮的少年，面容坚毅，眼神中透着一股不服输的劲头。他是石村最有天赋的少年。',
  greeting: '石昊正在院中练习拳脚，见你来了，停下手中的动作："你是何人？来我家有何事？"',
  roomId: 'stone_village_house_shihao',
  dialogues: [
    {
      id: 'shihao_intro',
      topic: '自我介绍',
      text: '石昊微微一笑："我是石昊。听说你实力不错，要不要切磋一下？"',
    },
    {
      id: 'shihao_fight',
      topic: '切磋武艺',
      text: '"来，让我看看你的实力！"石昊摆开架势："不要害怕，我会手下留情的。"',
      onSelect: () => {
        const win = Math.random() > 0.5;
        return { messages: win ? ['你击败了石昊！他惊讶地说："没想到你的实力这么强！"'] : ['石昊轻松击败了你。他笑着说："继续努力！"'] };
      },
    },
    {
      id: 'shihao_quest',
      topic: '请求任务',
      text: '"如果你想帮助石村，可以去村外狩猎凶兽。"石昊说："最近凶兽越来越多，已经伤了几个猎人。"',
      condition: (p: IPlayer) => p.realm >= 1,
    },
    {
      id: 'shihao_story',
      topic: '聊他的梦想',
      text: '石昊眼神坚定："我的梦想是成为最强的修士！我要走出石村，去外面的世界闯荡！"',
    },
  ],
});

// 石昊母亲
registerNPC({
  id: 'shi_hao_mother',
  name: '石大娘',
  title: '石昊母亲',
  description: '一个面容慈祥的妇人，正在屋内缝补兽皮。',
  greeting: '石大娘正在缝补兽皮，见你来了，微微一笑："道友好！来昊儿家做客吗？"',
  roomId: 'stone_village_house_shihao',
  dialogues: [
    {
      id: 'shihao_mother_intro',
      topic: '询问石昊',
      text: '"昊儿从小就很懂事，也很有天赋。"石大娘温柔地说："我只希望他能平安长大。"',
    },
    {
      id: 'shihao_mother_heal',
      topic: '请求治疗',
      text: '"如果你受伤了，我可以给你一些草药。"石大娘说："这些草药是我自己采集的，很管用。"',
      onSelect: (p: IPlayer) => {
        return { messages: ['石大娘给了你一些草药。草药散发着淡淡的清香。'] };
      },
    },
    {
      id: 'shihao_mother_story',
      topic: '聊家常',
      text: '"石村虽然简陋，但大家都很团结。"石大娘感慨地说："有柳神庇护，我们过得很安心。"',
    },
  ],
});

// 炊事区妇人
registerNPC({
  id: 'village_cook',
  name: '石婶',
  title: '炊事妇人',
  description: '一个穿着兽皮的中年妇人，正在火堆旁烤肉。',
  greeting: '石婶正在火堆旁烤肉，见你来了，热情地招呼："道友好！来吃点烤肉吧！"',
  roomId: 'stone_village_cooking',
  dialogues: [
    {
      id: 'village_cook_intro',
      topic: '询问食物',
      text: '"我们石村的烤肉很有名。"石婶自豪地说："用的是新鲜的兽肉，烤得外焦里嫩。"',
    },
    {
      id: 'village_cook_eat',
      topic: '品尝烤肉',
      text: '石婶递给你一块烤肉："尝尝！刚烤好的，可香了！"',
      onSelect: (p: IPlayer) => {
        if (p.gold >= 5) {
          p.gold -= 5;
          return { messages: ['你品尝了烤肉，味道鲜美，一股温热的力量涌入体内。'] };
        }
        return { messages: ['石婶摇摇头："没钱吃不了。"'] };
      },
    },
    {
      id: 'village_cook_gossip',
      topic: '打听消息',
      text: '石婶压低声音："最近村里来了一个陌生的修士，不知道他想干什么……"',
    },
  ],
});

// 肉类加工区猎人
registerNPC({
  id: 'village_hunter',
  name: '石猛',
  title: '石村猎人',
  description: '一个身材健壮的青年，正在用银刀切割巨兽尸体。',
  greeting: '石猛正在切割巨兽尸体，见你来了，微微一笑："道友好！来加工区看看吗？"',
  roomId: 'stone_village_processing',
  dialogues: [
    {
      id: 'village_hunter_intro',
      topic: '询问狩猎',
      text: '"狩猎是我们石村人的生计。"石猛说："我们靠狩猎获取食物和兽皮。"',
    },
    {
      id: 'village_hunter_quest',
      topic: '请求任务',
      text: '"最近村外的凶兽越来越多，已经伤了几个猎人。"石猛说："你能帮我们清除凶兽吗？"',
      condition: (p: IPlayer) => p.realm >= 1,
    },
    {
      id: 'village_hunter_story',
      topic: '聊狩猎',
      text: '"狩猎虽然危险，但也很刺激。"石猛感慨地说："每次狩猎都是一次挑战，但成功后那种成就感，是无法用言语形容的。"',
    },
  ],
});

// 演武场教头
registerNPC({
  id: 'village_trainer',
  name: '石教头',
  title: '演武场教头',
  description: '一个身材魁梧的中年男子，正在指导少年们练习拳脚。',
  greeting: '石教头正在指导少年们练习拳脚，见你来了，大声喊道："来者何人？想切磋一下吗？"',
  roomId: 'stone_village_training',
  dialogues: [
    {
      id: 'village_trainer_intro',
      topic: '自我介绍',
      text: '石教头微微点头："我是石村的教头，负责训练村里的少年。听说你实力不错，要不要切磋一下？"',
    },
    {
      id: 'village_trainer_fight',
      topic: '切磋武艺',
      text: '"来，让我看看你的实力！"石教头摆开架势："不要害怕，我会手下留情的。"',
      onSelect: () => {
        const win = Math.random() > 0.5;
        return { messages: win ? ['你击败了石教头！他惊讶地说："没想到你的实力这么强！"'] : ['石教头轻松击败了你。他笑着说："继续努力！"'] };
      },
    },
    {
      id: 'village_trainer_quest',
      topic: '请求任务',
      text: '"如果你想帮助石村，可以去村外狩猎凶兽。"石教头说："最近凶兽越来越多，已经伤了几个猎人。"',
      condition: (p: IPlayer) => p.realm >= 1,
    },
    {
      id: 'village_trainer_story',
      topic: '聊训练',
      text: '"训练是成为强者的必经之路。"石教头感慨地说："只有不断地训练和实战，才能变得更强。"',
    },
  ],
});

// ===== 道侣 NPC =====
for (const npc of DAOLU_NPCS) {
  registerNPC(npc);
}