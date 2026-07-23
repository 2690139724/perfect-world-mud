import { IDaoLu } from '../../domain/entities/DaoLu';
import { PERFECT_WORLD_DAOLU } from './npc_data_daolu_perfect';
import { ZHETIAN_DAOLU } from './npc_data_daolu_zhetian';
import { SHENGXU_DAOLU } from './npc_data_daolu_shengxu';
import { DOUPO_DAOLU } from './npc_data_daolu_doupo';
import { SHENMU_DAOLU } from './npc_data_daolu_shenmu';
import { FANREN_DAOLU } from './npc_data_daolu_fanren';
import { XIANNI_DAOLU } from './npc_data_daolu_xianni';

/** 所有道侣NPC汇总 */
export const DAOLU_NPCS: IDaoLu[] = [
  ...PERFECT_WORLD_DAOLU,
  ...ZHETIAN_DAOLU,
  ...SHENGXU_DAOLU,
  ...DOUPO_DAOLU,
  ...SHENMU_DAOLU,
  ...FANREN_DAOLU,
  ...XIANNI_DAOLU,
];

/** 按小说世界分组的道侣 */
export const DAOLU_BY_WORLD = {
  perfectWorld: PERFECT_WORLD_DAOLU,
  zhetian: ZHETIAN_DAOLU,
  shengxu: SHENGXU_DAOLU,
  doupo: DOUPO_DAOLU,
  shenmu: SHENMU_DAOLU,
  fanren: FANREN_DAOLU,
  xianni: XIANNI_DAOLU,
};

/** 获取指定世界的道侣列表 */
export function getDaoluByWorld(worldKey: keyof typeof DAOLU_BY_WORLD): IDaoLu[] {
  return DAOLU_BY_WORLD[worldKey] || [];
}

/** 根据ID查找道侣 */
export function getDaoluById(id: string): IDaoLu | undefined {
  return DAOLU_NPCS.find(d => d.id === id);
}

/** 根据名字查找道侣 */
export function getDaoluByName(name: string): IDaoLu | undefined {
  return DAOLU_NPCS.find(d => d.name === name);
}
