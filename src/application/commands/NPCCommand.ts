import { ICommandHandler, ICommandContext } from './CommandRouter';
import { getNPC, getNPCsByRoom } from '../../data/npcs/npc_data';
import { QuestManager } from '../../domain/services/QuestManager';
import { QUEST_DATA } from '../../data/quests/quest_data';
import { HiddenStorylineService } from '../../domain/services/HiddenStorylineService';
import { MethodService } from '../../domain/services/MethodService';

export class NPCCommand implements ICommandHandler {
  canHandle(action: string): boolean {
    return ['talk', '交谈', 'response', '回应'].includes(action);
  }

  execute(action: string, args: string[], context: ICommandContext): void {
    const { store, world, narrative } = context;
    
    if (action === 'talk' || action === '交谈') {
      this.showNPCList(store, world, narrative);
    } else if (action === 'response' || action === '回应') {
      this.handleResponse(store, world, args);
    }
  }

  private showNPCList(store: any, world: any, narrative: any): void {
    const roomId = store.getState().player.currentRoomId;
    const room = world.getRoom(roomId);
    if (!room) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '此处没有可以交谈的人。' });
      return;
    }
    const allNPCs = getNPCsByRoom(room.id, room.description);
    if (allNPCs.length === 0) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '此处没有可以交谈的人。' });
      return;
    }
    const npcItems = allNPCs.map((npc) => {
      return {
        label: `${npc.title}${npc.name}`,
        action: `回应 ${npc.name}`,
        desc: npc.description,
      };
    });
    narrative.pushClickableList('此处可交谈之人', npcItems);
  }

  private handleResponse(store: any, world: any, args: string[]): void {
    const argStr = args.join(' ');
    if (!argStr) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '请选择对话选项。' });
      return;
    }

    const state = store.getState();
    const p = state.player;
    const session = state.breakthroughSession;

    if (session && session.step === 'heart_demon') {
      const idx = parseInt(argStr) - 1;
      if (!isNaN(idx) && idx >= 0 && idx < session.heartDemon.choices.length) {
        const choice = session.heartDemon.choices[idx];
        session.rateModifier += choice.effect;
        if (choice.insightBonus && choice.insightBonus > 0) {
          p.breakthroughInsight = (p.breakthroughInsight || 0) + choice.insightBonus;
          store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `【感悟+${choice.insightBonus}】于心魔幻境中有所领悟。` });
        }
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `你选择了：${choice.text}` });
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: choice.narrative });
        if (choice.effect < 0) {
          store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `道心受损，突破成功率 **${choice.effect}%**。` });
        } else if (choice.effect > 0) {
          store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `道心坚定，突破成功率 **+${choice.effect}%**。` });
        }
        if (session.tribulation) {
          session.step = 'tribulation';
          store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '' });
          store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '━━━ 天劫降临 ━━━' });
          store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `天穹色变，劫云汇聚！${session.tribulation.rounds}道天雷即将劈落！` });
          store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '你运转全身修为，准备硬抗天劫...' });
        } else {
          session.step = 'final';
          store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '' });
          store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '心魔已破，开始最后的突破...' });
        }
        store.dispatch({ type: 'SET_CONTEXT', payload: null });
      } else {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '请选择心魔回应。' });
      }
      return;
    }

    const npcConv = store.getState().npcConversation;
    const dIdx = parseInt(argStr) - 1;
    const isNumericChoice = !isNaN(dIdx) && dIdx >= 0;

    // 处理请教功法
    if (npcConv && argStr === '请教功法') {
      const npc = getNPC(npcConv.npcId);
      if (npc) {
        const npcMethods = MethodService.getNPCMethods(npc.id).filter(m => !p.knownMethodIds.includes(m.id));
        if (npcMethods.length === 0) {
          store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `${npc.name} 摇头道："我没什么可教你的了。"` });
        } else {
          for (const method of npcMethods) {
            const check = MethodService.checkAcquireCondition(p, method.acquireCondition, p.sectId || null, p.reputation);
            if (check.satisfied) {
              const result = MethodService.learnMethod(p, method.id);
              if (result.success) {
                store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `【授业】${npc.name} 将《${method.name}》传授于你！` });
                store.dispatch({ type: 'SYSTEM_MESSAGE', payload: method.description });
              } else {
                store.dispatch({ type: 'SYSTEM_MESSAGE', payload: result.message });
              }
            } else {
              store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `${npc.name} 打量了你一番："${check.reason}，暂时无法传授此法。"` });
            }
          }
          store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });
        }
      }
      store.dispatch({ type: 'SET_CONTEXT', payload: null });
      store.dispatch({ type: 'SET_NPC_CONVERSATION', payload: null });
      return;
    }

    if (npcConv && isNumericChoice) {
      const npc = getNPC(npcConv.npcId);
      if (npc && dIdx < npc.dialogues.length) {
        const dialogue = npc.dialogues[dIdx];
        if (dialogue.condition && !dialogue.condition(p)) {
          store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '当前条件不满足，无法触发此对话。' });
        } else {
          store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `[${npc.name}] ${dialogue.text}` });
          if (dialogue.onSelect) {
            const result = dialogue.onSelect(p);
            for (const msg of result.messages) {
              store.dispatch({ type: 'SYSTEM_MESSAGE', payload: msg });
            }
          }
          store.dispatch({ type: 'SET_CONTEXT', payload: null });
          store.dispatch({ type: 'SET_NPC_CONVERSATION', payload: null });
        }
        return;
      }
      store.dispatch({ type: 'SET_NPC_CONVERSATION', payload: null });
      return;
    }

    if (!npcConv && isNumericChoice) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '请先与NPC交谈。' });
      return;
    }

    const room = world.getRoom(p.currentRoomId);
    if (room) {
      const allNPCs = getNPCsByRoom(room.id, room.description);
      let targetNpc: any = undefined;
      for (const n of allNPCs) {
        if (n.name === argStr) {
          targetNpc = n;
          break;
        }
      }
      if (!targetNpc) {
        const npcIdx = parseInt(argStr) - 1;
        if (!isNaN(npcIdx) && npcIdx >= 0 && npcIdx < allNPCs.length) {
          targetNpc = allNPCs[npcIdx];
        }
      }
      if (targetNpc) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `[CARD:help]${targetNpc.title} ${targetNpc.name}` });
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: targetNpc.description });
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: targetNpc.greeting });
        const available = targetNpc.dialogues.filter((d: any) => !d.condition || d.condition(p));
        const npcMethods = MethodService.getNPCMethods(targetNpc.id);
        const hasMethodToTeach = npcMethods.length > 0 && npcMethods.some(m => !p.knownMethodIds.includes(m.id));
        if (available.length > 0 || hasMethodToTeach) {
          store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '你可以向他了解一些事情：' });
          const options = available.map((d: any, di: number) => ({ label: d.topic, action: `回应 ${di + 1}` }));
          if (hasMethodToTeach) {
            options.push({ label: '请教功法', action: '回应 请教功法' });
          }
          store.dispatch({ type: 'SET_CONTEXT', payload: { type: 'npc_dialogue', options } });
          store.dispatch({ type: 'SET_NPC_CONVERSATION', payload: { npcId: targetNpc.id } });
        } else {
          store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '[/CARD]' });
          store.dispatch({ type: 'SET_NPC_CONVERSATION', payload: null });
        }

        // 尝试发现隐藏支线线索
        const clue = HiddenStorylineService.tryDiscoverClueByNpc(p, targetNpc.id);
        if (clue) {
          store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `【发现线索】${clue.title}` });
          store.dispatch({ type: 'SYSTEM_MESSAGE', payload: clue.description });
          store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `提示：${clue.hint}` });

          const triggered = HiddenStorylineService.checkTrigger(p);
          if (triggered) {
            store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `【触发隐藏支线】${triggered.name}` });
            store.dispatch({ type: 'SYSTEM_MESSAGE', payload: triggered.description });
            store.dispatch({ type: 'SYSTEM_MESSAGE', payload: triggered.loreText });
          }
          store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });
        }
      }
    }
  }
}