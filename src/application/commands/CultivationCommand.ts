import { ICommandHandler, ICommandContext } from './CommandRouter';
import { CultivationService, CultivationMode } from '../../domain/services/CultivationService';
import { BreakthroughService, IBreakthroughSession } from '../../domain/services/BreakthroughService';
import { getMethod } from '../../data/methods/method_data';
import { generateTide } from '../../domain/entities/SpiritTide';

export class CultivationCommand implements ICommandHandler {
  canHandle(action: string): boolean {
    return ['cultivate', '修炼', '突破', 'breakthrough'].includes(action);
  }

  execute(action: string, args: string[], context: ICommandContext): void {
    const { store, world } = context;
    
    if (action === 'cultivate' || action === '修炼') {
      this.cultivate(store, world, args);
    } else if (action === '突破' || action === 'breakthrough') {
      this.breakthrough(store);
    }
  }

  private cultivate(store: any, world: any, args: string[]): void {
    const playerState = store.getState().player;
    const room = world.getRoom(playerState.currentRoomId);
    if (!room) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '你迷失在虚空中，无法修炼。' });
      return;
    }

    if (!CultivationService.hasMethod(playerState)) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '你尚未修炼任何功法，无法引气修炼！请先获取并修炼一部功法。' });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '前往石城书店或补天阁寻找功法传承。' });
      return;
    }

    let method = playerState.currentMethodId ? getMethod(playerState.currentMethodId) : null;
    if (!method) {
      // 功法数据异常（多为旧存档或出身配置缺失），回退到默认基础功法
      method = getMethod('yuanshi_zhenjie') || null;
      if (method) {
        store.dispatch({ type: 'UPDATE_PLAYER', payload: { currentMethodId: 'yuanshi_zhenjie', knownMethodIds: ['yuanshi_zhenjie'] } });
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '你重新领悟了《原始真解》，以此为基础继续修炼。' });
      } else {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '你尚未修炼任何功法，无法引气修炼！请先获取并修炼一部功法。' });
        return;
      }
    }

    if (playerState.cultivationExp >= playerState.maxCultivationExp) {
      const fullMsg = playerState.realmStage >= 9 && !playerState.realmPerfection
        ? '修为已满，瓶颈坚固，无法再进一步。使用 **突破** 冲击大圆满！'
        : playerState.realmPerfection
          ? '修为已满，瓶颈坚固，无法再进一步。使用 **突破** 冲击更高境界！'
          : '修为已满，瓶颈坚固，无法再进一步。使用 **突破** 冲击下一层！';
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: fullMsg });
      return;
    }

    const modeStr = args[0] || '';
    let mode: CultivationMode;
    switch (modeStr) {
      case '静坐': case 'meditate': mode = CultivationMode.MEDITATE; break;
      case '冲关': case 'push': mode = CultivationMode.PUSH; break;
      case '吐纳': case 'breathe': default: mode = CultivationMode.BREATHE; break;
    }

    const currentTide = generateTide(Date.now(), room.zoneId || 'default');
    const result = CultivationService.cultivate(playerState, room, mode, method.speedBonus, currentTide);

    for (const msg of result.messages) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: msg });
    }

    if (result.expGain > 0) {
      store.dispatch({
        type: 'CULTIVATE_RESULT',
        payload: { expGain: result.expGain, message: `获得 ${result.expGain} 修为。` }
      });
    }

    if (result.eventType === 'insight') {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `**${result.eventMessage}**` });
    } else if (result.eventType === 'deviation') {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `**${result.eventMessage}**` });
    }

    if (result.manaCost > 0) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `消耗 ${result.manaCost} 法力。` });
    }

    // 功法熟练度提示
    if (result.proficiencyGain && result.proficiencyGain > 0 && !result.methodEvolved) {
      const method = getMethod(playerState.currentMethodId || '');
      if (method) {
        store.dispatch({
          type: 'SYSTEM_MESSAGE',
          payload: `〔${method.name} 熟练度 +${result.proficiencyGain}（${playerState.methodProficiency}/${playerState.methodMaxProficiency}）〕`
        });
      }
    }

    store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });
  }

  private breakthrough(store: any): void {
    const state = store.getState();
    const p = state.player;
    const session = state.breakthroughSession;

    if (session) {
      if (session.step === 'heart_demon') {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '心魔当前，请先做出选择！' });
        return;
      }

      if (session.step === 'tribulation') {
        const tribResult = BreakthroughService.processTribulation(p, session);
        for (const msg of tribResult.messages) {
          store.dispatch({ type: 'SYSTEM_MESSAGE', payload: msg });
        }
        if (tribResult.finished) {
          if (tribResult.updated.step === 'final') {
            store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '天劫已渡，全力冲击瓶颈！' });
          } else {
            store.dispatch({ type: 'SET_BREAKTHROUGH_SESSION', payload: null });
            store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });
          }
        }
        store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });
        return;
      }

      if (session.step === 'final') {
        const finalResult = BreakthroughService.performBreakthrough(p, session);
        for (const msg of finalResult.messages) {
          store.dispatch({ type: 'SYSTEM_MESSAGE', payload: msg });
        }
        store.dispatch({ type: 'SET_BREAKTHROUGH_SESSION', payload: null });
        if (finalResult.result.success) {
          store.dispatch({
            type: 'REALM_BREAKTHROUGH',
            payload: {
              newRealm: finalResult.result.newRealm,
              realmName: finalResult.result.realmName,
              newMaxExp: p.maxCultivationExp,
            }
          });
        } else {
          store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });
        }
        return;
      }
      return;
    }

    if (p.realmStage < 9 && !p.realmPerfection) {
      const stageResult = BreakthroughService.advanceStage(p);
      if (!stageResult.success && stageResult.message) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: stageResult.message });
      }
      for (const msg of stageResult.messages) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: msg });
      }
      store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });
      return;
    }

    if (p.realmStage >= 9 && !p.realmPerfection) {
      const perfResult = BreakthroughService.advanceToPerfection(p);
      if (!perfResult.success && perfResult.message) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: perfResult.message });
      }
      for (const msg of perfResult.messages) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: msg });
      }
      store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });
      return;
    }

    if (p.realmPerfection) {
      const majorResult = BreakthroughService.startBreakthroughForMajorRealm(p);
      if (!majorResult.ok) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: majorResult.message });
        return;
      }
      store.dispatch({ type: 'SET_BREAKTHROUGH_SESSION', payload: majorResult.session });
      for (const msg of majorResult.messages) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: msg });
      }
      if (majorResult.session.step === 'heart_demon') {
        store.dispatch({
          type: 'SET_CONTEXT',
          payload: {
            type: 'breakthrough',
            options: majorResult.session.heartDemon.choices.map((c: any, i: number) => ({
              label: c.text.replace(/^.+\]/, '').trim(),
              action: `回应 ${i + 1}`
            }))
          }
        });
      }
    }
  }
}