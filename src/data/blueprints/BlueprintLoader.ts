import { WorldId } from '../../domain/entities/WorldDefinition';

const loadedBlueprints = new Set<WorldId>();

const worldBlueprintLoaders: Record<WorldId, (() => Promise<void>) | null> = {
  [WorldId.PERFECT_WORLD]: null,
  [WorldId.ZHE_TIAN]: null,
  [WorldId.SHENG_XU]: null,
  [WorldId.DOU_PO]: () => import('./doupo_wutan').then(() => {}),
  [WorldId.SHEN_MU]: () => import('./shenmu_cemetery').then(() => {}),
  [WorldId.FAN_REN]: () => import('./fanren_qixuan').then(() => {}),
  [WorldId.XIAN_NI]: () => import('./xianni_hengyue').then(() => {}),
};

export async function loadWorldBlueprints(worldId: WorldId): Promise<void> {
  if (loadedBlueprints.has(worldId)) return;
  const loader = worldBlueprintLoaders[worldId];
  if (!loader) {
    loadedBlueprints.add(worldId);
    return;
  }
  await loader();
  loadedBlueprints.add(worldId);
}

export function isWorldBlueprintsLoaded(worldId: WorldId): boolean {
  return loadedBlueprints.has(worldId);
}
