import { WorldId } from '../../domain/entities/WorldDefinition';
import { IQuest } from '../../domain/entities/Quest';

const loadedQuests = new Set<WorldId>();
const questRegistry = new Map<string, IQuest>();

const worldQuestLoaders: Record<WorldId, (() => Promise<void>) | null> = {
  [WorldId.PERFECT_WORLD]: null,
  [WorldId.ZHE_TIAN]: () => import('./quest_data_zhetian').then(m => {
    m.ZHETIAN_QUESTS.forEach(q => questRegistry.set(q.id, q));
  }),
  [WorldId.SHENG_XU]: () => import('./quest_data_shengxu').then(m => {
    m.SHENGXU_QUESTS.forEach(q => questRegistry.set(q.id, q));
  }),
  [WorldId.DOU_PO]: null,
  [WorldId.SHEN_MU]: null,
  [WorldId.FAN_REN]: null,
  [WorldId.XIAN_NI]: null,
};

export async function loadWorldQuests(worldId: WorldId): Promise<void> {
  if (loadedQuests.has(worldId)) return;
  const loader = worldQuestLoaders[worldId];
  if (!loader) {
    loadedQuests.add(worldId);
    return;
  }
  await loader();
  loadedQuests.add(worldId);
}

export function isWorldQuestsLoaded(worldId: WorldId): boolean {
  return loadedQuests.has(worldId);
}

export function registerQuest(quest: IQuest): void {
  questRegistry.set(quest.id, quest);
}

export function getQuestById(id: string): IQuest | undefined {
  return questRegistry.get(id);
}

export function getAllQuests(): IQuest[] {
  return Array.from(questRegistry.values());
}
