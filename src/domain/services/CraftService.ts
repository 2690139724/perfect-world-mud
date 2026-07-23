import { IPlayer } from '../entities/Player';
import { IItem, ItemType } from '../entities/Item';
import {
  ALCHEMY_RECIPES,
  FORGE_RECIPES,
  IAlchemyRecipe,
  IForgeRecipe,
  getAlchemyRecipesByRealm,
  getForgeRecipesByRealm,
} from '../../data/recipes/recipe_data';
import { getItemById } from '../../data/seed/items';

export interface ICraftResult {
  success: boolean;
  message: string;
  createdItem?: IItem;
  materialsConsumed: Record<string, number>;
}

export class AlchemyService {
  static listAvailableRecipes(player: IPlayer): IAlchemyRecipe[] {
    return getAlchemyRecipesByRealm(player.realm).filter(recipe =>
      this.hasEnoughMaterials(player, recipe.materials)
    );
  }

  static listAllRecipes(player: IPlayer): IAlchemyRecipe[] {
    return getAlchemyRecipesByRealm(player.realm);
  }

  static hasEnoughMaterials(player: IPlayer, materials: Record<string, number>): boolean {
    for (const [materialId, amount] of Object.entries(materials)) {
      const count = player.inventory.filter((item: IItem) => item.id === materialId).length;
      if (count < amount) return false;
    }
    return true;
  }

  static craft(player: IPlayer, recipeId: string): ICraftResult {
    const recipe = ALCHEMY_RECIPES.find(r => r.id === recipeId || r.name === recipeId);
    if (!recipe) {
      return { success: false, message: '配方不存在', materialsConsumed: {} };
    }
    if (player.realm < recipe.minRealm) {
      return { success: false, message: '境界不足', materialsConsumed: {} };
    }
    if (!this.hasEnoughMaterials(player, recipe.materials)) {
      return { success: false, message: '材料不足', materialsConsumed: {} };
    }

    this.consumeMaterials(player, recipe.materials);

    if (Math.random() < recipe.successRate) {
      const output = getItemById(recipe.outputId);
      if (!output) {
        return { success: false, message: '产出物品不存在', materialsConsumed: recipe.materials };
      }
      for (let i = 0; i < recipe.outputAmount; i++) {
        player.inventory.push({ ...output } as IItem);
      }
      return {
        success: true,
        message: `炼丹成功！获得 ${output.name} ×${recipe.outputAmount}`,
        createdItem: output,
        materialsConsumed: recipe.materials,
      };
    } else {
      return {
        success: false,
        message: '炼丹失败，材料已消耗',
        materialsConsumed: recipe.materials,
      };
    }
  }

  static consumeMaterials(player: IPlayer, materials: Record<string, number>): void {
    for (const [materialId, amount] of Object.entries(materials)) {
      let remaining = amount;
      player.inventory = player.inventory.filter((item: IItem) => {
        if (remaining > 0 && item.id === materialId) {
          remaining--;
          return false;
        }
        return true;
      });
    }
  }
}

export class ForgeService {
  static listAvailableRecipes(player: IPlayer): IForgeRecipe[] {
    return getForgeRecipesByRealm(player.realm).filter(recipe =>
      AlchemyService.hasEnoughMaterials(player, recipe.materials)
    );
  }

  static listAllRecipes(player: IPlayer): IForgeRecipe[] {
    return getForgeRecipesByRealm(player.realm);
  }

  static craft(player: IPlayer, recipeId: string): ICraftResult {
    const recipe = FORGE_RECIPES.find(r => r.id === recipeId || r.name === recipeId);
    if (!recipe) {
      return { success: false, message: '配方不存在', materialsConsumed: {} };
    }
    if (player.realm < recipe.minRealm) {
      return { success: false, message: '境界不足', materialsConsumed: {} };
    }
    if (!AlchemyService.hasEnoughMaterials(player, recipe.materials)) {
      return { success: false, message: '材料不足', materialsConsumed: {} };
    }

    AlchemyService.consumeMaterials(player, recipe.materials);

    if (Math.random() < recipe.successRate) {
      const output = getItemById(recipe.outputId);
      if (!output) {
        return { success: false, message: '产出物品不存在', materialsConsumed: recipe.materials };
      }
      player.inventory.push({ ...output } as IItem);
      return {
        success: true,
        message: `锻造成功！获得 ${output.name}`,
        createdItem: output,
        materialsConsumed: recipe.materials,
      };
    } else {
      return {
        success: false,
        message: '锻造失败，材料已消耗',
        materialsConsumed: recipe.materials,
      };
    }
  }
}
