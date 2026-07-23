import { IPlayer } from '../../domain/entities/Player';
import { GameStore } from '../store/GameStore';
import { NarrativeStream } from '../../ui/components/NarrativeStream';
import { IItem } from '../../domain/entities/Item';
import { getItemById } from '../../data/seed/items';

/**
 * 命令侧共享 helper：把命令里反复出现的样板代码抽出来
 * - 系统消息（多行）
 * - 玩家变更广播
 * - 物品/宝术发放
 */
export class CommandHelper {
  /** 一行系统消息 */
  static say(store: GameStore, text: string): void {
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: text });
  }

  /** 多行系统消息（自动加空行） */
  static sayBlock(store: GameStore, lines: string[]): void {
    for (const line of lines) {
      this.say(store, line);
    }
  }

  /** 通知 UI 玩家已变（等价于 dispatch UPDATE_PLAYER payload: {}） */
  static notifyPlayerChanged(store: GameStore, patch: Partial<IPlayer> = {}): void {
    if (Object.keys(patch).length > 0) {
      store.dispatch({ type: 'UPDATE_PLAYER', payload: patch });
    } else {
      store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });
    }
  }

  /** 发放物品奖励，返回对玩家可见的描述（用于汇总） */
  static grantItem(player: IPlayer, itemId: string, amount: number): string | null {
    const item = getItemById(itemId);
    if (!item) return null;
    for (let n = 0; n < amount; n++) {
      player.inventory.push({ ...item } as IItem);
    }
    return `${item.name} ×${amount}`;
  }

  /** 推送可点击列表（如果 narrative 不可用则降级为系统消息） */
  static pushList(
    narrative: NarrativeStream | undefined,
    title: string,
    options: { label: string; action: string; desc?: string; disabled?: boolean }[],
  ): void {
    if (!narrative) return;
    narrative.pushClickableList(title, options);
  }
}
