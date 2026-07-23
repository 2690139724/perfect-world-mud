import { ICommandHandler, ICommandContext } from './CommandRouter';
import { AscensionService } from '../../domain/services/AscensionService';
import { getWorldDefinition, WORLD_LIST } from '../../domain/entities/WorldDefinition';
import { getFullRealmName as getWorldFullRealmName } from '../../domain/entities/WorldDefinition';
import { WorldSpecialtyService } from '../../domain/services/WorldSpecialtyService';
import { loadWorldNPCs } from '../../data/npcs/npc_data';
import { loadWorldBlueprints } from '../../data/blueprints/BlueprintLoader';
import { loadWorldQuests } from '../../data/quests/QuestLoader';

export class AscensionCommand implements ICommandHandler {
  canHandle(action: string): boolean {
    return ['ascend', '飞升', 'world', '世界', 'travel', '游历', 'specialty', '专属'].includes(action);
  }

  execute(action: string, args: string[], context: ICommandContext): void {
    const { store, narrative } = context;
    const player = store.getState().player;

    switch (action) {
      case 'world': case '世界':
        this.showWorldInfo(player, narrative);
        break;
      case 'travel': case '游历':
        this.showTravelRecords(player, narrative);
        break;
      case 'specialty': case '专属':
        this.showSpecialty(player, narrative);
        break;
      case 'ascend': case '飞升':
        this.tryAscend(player, store, narrative);
        break;
    }
  }

  private showWorldInfo(player: any, narrative: any): void {
    const worldDef = getWorldDefinition(player.currentWorldId);
    const realmName = getWorldFullRealmName(player.currentWorldId, player.realm, player.realmStage, player.realmPerfection);
    const ascensionEligibility = AscensionService.checkAscensionEligibility(player);

    narrative.add(`【世界】${worldDef.name}`);
    narrative.add(`【当前境界】${realmName}`);
    narrative.add(`【世界描述】${worldDef.description}`);

    if (worldDef.ascensionTarget) {
      const targetWorld = getWorldDefinition(worldDef.ascensionTarget);
      const requiredRealmName = worldDef.realms[worldDef.ascensionRealmLevel || 0]?.name || '未知';
      narrative.add(`【飞升目标】${targetWorld.name}`);
      narrative.add(`【飞升条件】达到 ${requiredRealmName}`);
      narrative.add(ascensionEligibility.message);
    } else {
      narrative.add('【飞升】此方世界已是巅峰，无更高境界可追寻。');
    }
  }

  private showTravelRecords(player: any, narrative: any): void {
    const records = AscensionService.getWorldTravelInfo(player);

    if (records.length === 0) {
      narrative.add('你尚未游历过其他世界。');
      return;
    }

    narrative.add('===== 世界游历记录 =====');
    for (const record of records) {
      const status = record.isCurrent ? '【当前】' : record.ascended ? '【已飞升】' : '【曾到访】';
      narrative.add(`${status} ${record.worldName} - 最高境界：${record.highestRealmName}`);
    }
  }

  private tryAscend(player: any, store: any, narrative: any): void {
    const eligibility = AscensionService.checkAscensionEligibility(player);

    if (!eligibility.eligible) {
      narrative.add(eligibility.message);
      return;
    }

    const targetWorld = getWorldDefinition(eligibility.targetWorldId!);
    narrative.add(`天地震动，你感到一股磅礴的力量涌来...`);
    narrative.add(`你正在飞升至【${targetWorld.name}】！`);

    const result = AscensionService.performAscension(player);
    if (result.success) {
      loadWorldNPCs(eligibility.targetWorldId!);
      loadWorldBlueprints(eligibility.targetWorldId!);
      loadWorldQuests(eligibility.targetWorldId!);
      narrative.add('===== 飞升成功 =====');
      narrative.add(result.message);
      narrative.add('你已降临新的世界，开始全新的修炼之旅！');
      store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });
    } else {
      narrative.add(result.message);
    }
  }

  private showSpecialty(player: any, narrative: any): void {
    const desc = WorldSpecialtyService.getSpecialtyDescription(player.currentWorldId);
    narrative.add(desc);
  }
}
