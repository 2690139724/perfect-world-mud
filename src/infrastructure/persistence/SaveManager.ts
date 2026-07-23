import { IPlayer, RealmNames, getFullRealmName } from '../../domain/entities/Player';
import { IGameTime, Season, TimeOfDay } from '../../domain/entities/GameTime';

export interface ISaveData {
  version: string;
  timestamp: number;
  player: IPlayer;
  worldSeed: number;
  discoveredZones: string[];
  visitedRooms: string[];
  gameTime: IGameTime;
}

export interface IOfflineRewardItem {
  id: string;
  name: string;
  count: number;
}

export interface IOfflineRewards {
  durationMinutes: number;
  exp: number;
  gold: number;
  items: IOfflineRewardItem[];
  messages: string[];
}

export class SaveManager {
  private readonly SAVE_KEY_PREFIX = 'wujiang_save_';
  private readonly CURRENT_VERSION = '0.1.0';
  private readonly MAX_SLOTS = 5;

  private isElectron(): boolean {
    return typeof window !== 'undefined' && typeof (window as any).electronAPI !== 'undefined';
  }

  public async save(slot: number, player: IPlayer, worldSeed: number, gameTime: IGameTime = { ticks: 0, day: 1, hour: 8, minute: 0, season: Season.SPRING, timeOfDay: TimeOfDay.MORNING }): Promise<boolean> {
    if (slot < 1 || slot > this.MAX_SLOTS) return false;

    try {
      const saveData: ISaveData = {
        version: this.CURRENT_VERSION,
        timestamp: Date.now(),
        player: this.serializePlayer(player),
        worldSeed,
        discoveredZones: player.discoveredZones || [],
        visitedRooms: [],
        gameTime,
      };

      if (this.isElectron()) {
        const fileName = `save_${slot}.dat`;
        const success = await (window as any).electronAPI.saveFile(fileName, saveData);
        return success;
      } else {
        const key = this.SAVE_KEY_PREFIX + slot;
        localStorage.setItem(key, JSON.stringify(saveData));
        return true;
      }
    } catch (e) {
      console.error('[SaveManager] 保存失败:', e);
      return false;
    }
  }

  public async load(slot: number): Promise<ISaveData | null> {
    if (slot < 1 || slot > this.MAX_SLOTS) return null;

    try {
      let raw: string | null = null;

      if (this.isElectron()) {
        const fileName = `save_${slot}.dat`;
        const data = await (window as any).electronAPI.readFile(fileName);
        if (!data) return null;
        raw = JSON.stringify(data);
      } else {
        const key = this.SAVE_KEY_PREFIX + slot;
        raw = localStorage.getItem(key);
        if (!raw) return null;
      }

      const data = JSON.parse(raw) as ISaveData;
      if (!this.validate(data)) return null;

      return data;
    } catch (e) {
      console.error('[SaveManager] 读取存档失败:', e);
      return null;
    }
  }

  public async delete(slot: number): Promise<boolean> {
    if (slot < 1 || slot > this.MAX_SLOTS) return false;
    try {
      if (this.isElectron()) {
        const fileName = `save_${slot}.dat`;
        return await (window as any).electronAPI.deleteFile(fileName);
      } else {
        const key = this.SAVE_KEY_PREFIX + slot;
        localStorage.removeItem(key);
        return true;
      }
    } catch {
      return false;
    }
  }

  public async listSlots(): Promise<{ slot: number; timestamp: number; playerName: string; realm: string; reincarnationCount: number }[]> {
    const slots: { slot: number; timestamp: number; playerName: string; realm: string; reincarnationCount: number }[] = [];
    
    if (this.isElectron()) {
      const files = await (window as any).electronAPI.listFiles();
      for (let i = 1; i <= this.MAX_SLOTS; i++) {
        const fileName = `save_${i}.dat`;
        if (files.includes(fileName)) {
          const data = await this.load(i);
          if (data) {
            slots.push({
              slot: i,
              timestamp: data.timestamp,
              playerName: data.player.name,
              realm: getFullRealmName(data.player.realm, data.player.realmStage, data.player.realmPerfection),
              reincarnationCount: data.player.reincarnationCount || 0,
            });
          }
        }
      }
    } else {
      for (let i = 1; i <= this.MAX_SLOTS; i++) {
        const data = await this.load(i);
        if (data) {
          slots.push({
            slot: i,
            timestamp: data.timestamp,
            playerName: data.player.name,
            realm: getFullRealmName(data.player.realm, data.player.realmStage, data.player.realmPerfection),
            reincarnationCount: data.player.reincarnationCount || 0,
          });
        }
      }
    }
    
    return slots;
  }

  public async exportSave(slot: number): Promise<string | null> {
    const data = await this.load(slot);
    if (!data) return null;
    try {
      return btoa(JSON.stringify(data));
    } catch {
      return null;
    }
  }

  public async importSave(encoded: string): Promise<boolean> {
    try {
      const raw = atob(encoded);
      const data = JSON.parse(raw) as ISaveData;
      if (!this.validate(data)) return false;

      for (let i = 1; i <= this.MAX_SLOTS; i++) {
        const existing = await this.load(i);
        if (!existing) {
          if (this.isElectron()) {
            await (window as any).electronAPI.saveFile(`save_${i}.dat`, data);
          } else {
            localStorage.setItem(this.SAVE_KEY_PREFIX + i, raw);
          }
          return true;
        }
      }

      if (this.isElectron()) {
        await (window as any).electronAPI.saveFile(`save_${this.MAX_SLOTS}.dat`, data);
      } else {
        localStorage.setItem(this.SAVE_KEY_PREFIX + this.MAX_SLOTS, raw);
      }
      return true;
    } catch {
      return false;
    }
  }

  public calculateOfflineRewards(saveData: ISaveData): IOfflineRewards {
    const now = Date.now();
    const offlineMs = now - saveData.timestamp;
    const offlineMinutes = Math.min(Math.floor(offlineMs / 60000), 480);

    if (offlineMinutes < 1) {
      return { durationMinutes: 0, exp: 0, gold: 0, items: [], messages: [] };
    }

    const player = saveData.player;
    const strategy = player.offlineStrategy;
    const efficiency = 0.7;
    const messages: string[] = [];

    const totalBias = strategy.activityBias.combat + strategy.activityBias.gathering
      + strategy.activityBias.cultivation + strategy.activityBias.explore;

    if (totalBias <= 0) {
      return { durationMinutes: offlineMinutes, exp: 0, gold: 0, items: [], messages: ['离线期间没有进行任何活动。'] };
    }

    const cultMinutes = Math.floor(offlineMinutes * strategy.activityBias.cultivation / totalBias);
    const combatMinutes = Math.floor(offlineMinutes * strategy.activityBias.combat / totalBias);
    const gatherMinutes = Math.floor(offlineMinutes * strategy.activityBias.gathering / totalBias);

    const baseExpPerMinute = (player.realm + 1) * 8;
    const cultExp = Math.floor(cultMinutes * baseExpPerMinute * player.spiritAbsorbRate * efficiency);
    const combatExp = Math.floor(combatMinutes * baseExpPerMinute * efficiency);
    const totalExp = cultExp + combatExp;

    const baseGoldPerMinute = (player.realm + 1) * 4;
    const combatGold = Math.floor(combatMinutes * baseGoldPerMinute * efficiency);

    const items: IOfflineRewardItem[] = [];
    for (let i = 0; i < Math.floor(gatherMinutes / 8); i++) {
      if (Math.random() < 0.35) {
        const rand = Math.random();
        if (rand < 0.5) {
          items.push({ id: 'spirit_crystal', name: '灵石', count: Math.floor(Math.random() * 3) + 1 });
        } else if (rand < 0.75) {
          items.push({ id: 'stone_core', name: '石核', count: 1 });
        } else {
          items.push({ id: 'ancient_bone', name: '古兽骨', count: 1 });
        }
      }
    }

    const hours = Math.floor(offlineMinutes / 60);
    const mins = offlineMinutes % 60;
    messages.push(`你离开了 ${hours}小时${mins}分钟...`);

    if (cultMinutes > 0) {
      messages.push(`修炼获得 ${cultExp} 修为`);
    }
    if (combatMinutes > 0) {
      messages.push(`战斗获得 ${combatExp} 修为，${combatGold} 原始币`);
    }
    for (const item of items) {
      messages.push(`采集获得 ${item.name} x${item.count}`);
    }

    if (items.length === 0 && combatMinutes === 0 && cultMinutes === 0) {
      messages.push('离线期间没有收获。');
    }

    return {
      durationMinutes: offlineMinutes,
      exp: totalExp,
      gold: combatGold,
      items,
      messages,
    };
  }

  private serializePlayer(player: IPlayer): IPlayer {
    const serialized = JSON.parse(JSON.stringify(player, (key, value) => {
      if (value instanceof Map) {
        return Array.from(value.entries());
      }
      return value;
    }));
    return serialized;
  }

  private validate(data: any): data is ISaveData {
    return (
      data &&
      typeof data.version === 'string' &&
      typeof data.timestamp === 'number' &&
      data.player &&
      typeof data.worldSeed === 'number'
    );
  }
}