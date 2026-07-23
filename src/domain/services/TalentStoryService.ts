import { IPlayer } from '../entities/Player';
import { getTalent, ITalent, talentRegistry } from '../../data/talents/talent_data';
import { getTalentStory, ITalentStoryOutcome, rollStoryOutcome, ITalentStory } from '../../data/talents/talent_stories';

export interface ITalentEnhancement {
  talentId: string;
  level: number;
  totalMultiplier: number;
  lastTriggerTime: number;
}

export interface ITalentStoryResult {
  success: boolean;
  message: string;
  outcome?: ITalentStoryOutcome;
  talentName?: string;
  lost?: boolean;
  enhanced?: boolean;
  newTalentId?: string;
}

export class TalentStoryService {
  private static enhancementKey(talentId: string, level: number): string {
    return `${talentId}__enhanced_${level}`;
  }

  static canTriggerStory(player: IPlayer, talentId: string): { can: boolean; reason: string } {
    const talent = getTalent(talentId);
    if (!talent) return { can: false, reason: '天赋不存在' };
    if (talent.rarity !== 'legendary' && talent.rarity !== 'myth') {
      return { can: false, reason: '仅金色以上天赋可触发机缘剧情' };
    }
    if (!player.talentIds.includes(talentId) && !this.hasAnyEnhancedVersion(player, talentId)) {
      return { can: false, reason: '你尚未拥有该天赋' };
    }
    const baseId = this.getBaseTalentId(talentId);
    const story = getTalentStory(baseId);
    if (!story) return { can: false, reason: '该天赋暂无机缘剧情' };
    return { can: true, reason: '' };
  }

  static getBaseTalentId(talentId: string): string {
    const idx = talentId.indexOf('__enhanced_');
    if (idx >= 0) return talentId.substring(0, idx);
    return talentId;
  }

  static hasAnyEnhancedVersion(player: IPlayer, baseTalentId: string): boolean {
    return player.talentIds.some(id => id === baseTalentId || id.startsWith(baseTalentId + '__enhanced_'));
  }

  static getCurrentEnhancedId(player: IPlayer, baseTalentId: string): string | null {
    let highestLevel = 0;
    let highestId: string | null = null;
    for (const id of player.talentIds) {
      if (id === baseTalentId) {
        if (highestLevel === 0) highestId = id;
      } else if (id.startsWith(baseTalentId + '__enhanced_')) {
        const level = parseInt(id.split('__enhanced_')[1] || '0', 10);
        if (level > highestLevel) {
          highestLevel = level;
          highestId = id;
        }
      }
    }
    return highestId;
  }

  static getCurrentLevel(player: IPlayer, baseTalentId: string): number {
    const currentId = this.getCurrentEnhancedId(player, baseTalentId);
    if (!currentId) return 0;
    if (currentId === baseTalentId) return 0;
    return parseInt(currentId.split('__enhanced_')[1] || '0', 10);
  }

  static triggerStory(player: IPlayer, talentId: string): ITalentStoryResult {
    const check = this.canTriggerStory(player, talentId);
    if (!check.can) {
      return { success: false, message: check.reason };
    }

    const baseId = this.getBaseTalentId(talentId);
    const story = getTalentStory(baseId);
    if (!story) {
      return { success: false, message: '该天赋暂无机缘剧情' };
    }

    const outcome = rollStoryOutcome(story);
    const baseTalent = getTalent(baseId);
    const currentLevel = this.getCurrentLevel(player, baseId);
    const currentId = this.getCurrentEnhancedId(player, baseId) || baseId;
    const currentTalent = getTalent(currentId) || baseTalent;

    if (!currentTalent) {
      return { success: false, message: '天赋数据异常' };
    }

    switch (outcome.type) {
      case 'enhance':
      case 'blessing': {
        const multiplier = outcome.enhanceMultiplier || 1.5;
        const newLevel = currentLevel + 1;
        const newId = this.enhancementKey(baseId, newLevel);
        const existing = getTalent(newId);
        if (!existing) {
          const enhancedEffects = currentTalent.effects.map(e => ({
            stat: e.stat,
            value: Math.round(e.value * multiplier * 10) / 10,
            description: this.enhanceDescription(e.description, multiplier),
          }));
          const newTalent: ITalent = {
            ...currentTalent,
            id: newId,
            name: `${currentTalent.name}·${this.getLevelSuffix(newLevel)}`,
            description: `${currentTalent.description}（已强化${newLevel}次）`,
            effects: enhancedEffects,
          };
          talentRegistry.set(newId, newTalent);
        }
        player.talentIds = player.talentIds.filter(id => id !== currentId && !id.startsWith(baseId + '__enhanced_'));
        player.talentIds.push(newId);
        return {
          success: true,
          message: outcome.narrative,
          outcome,
          talentName: baseTalent?.name || talentId,
          enhanced: true,
          newTalentId: newId,
        };
      }
      case 'lose': {
        player.talentIds = player.talentIds.filter(id => id !== currentId && !id.startsWith(baseId + '__enhanced_'));
        return {
          success: true,
          message: outcome.narrative,
          outcome,
          talentName: baseTalent?.name || talentId,
          lost: true,
        };
      }
      case 'nothing':
      default:
        return {
          success: true,
          message: outcome.narrative,
          outcome,
          talentName: baseTalent?.name || talentId,
        };
    }
  }

  private static getLevelSuffix(level: number): string {
    const suffixes = ['', '初悟', '小成', '大成', '圆满', '至臻', '化境', '通天'];
    return suffixes[Math.min(level, suffixes.length - 1)] || `强化${level}`;
  }

  private static enhanceDescription(desc: string, multiplier: number): string {
    return desc.replace(/([+\-]?\d+(\.\d+)?%)/g, (match, num) => {
      const n = parseFloat(num);
      if (isNaN(n)) return match;
      const newVal = Math.round(n * multiplier * 10) / 10;
      return `${newVal}%`;
    });
  }

  static getStory(talentId: string): ITalentStory | undefined {
    const baseId = this.getBaseTalentId(talentId);
    return getTalentStory(baseId);
  }
}
