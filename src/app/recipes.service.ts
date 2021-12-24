import { Injectable } from '@angular/core';
import recipesDataFile from '../assets/recipes.json' ;
import { Recipe, RecipeGroup, RecipeGroupDataFile } from './classes/recipe';
import { ItemsService } from './items.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  getIngredientQuantity(groupId: string, recipeId: string, itemId: string) : number {
    return this.data[groupId].recipes[recipeId].ingredients[itemId];
  }
  getItemName(itemId: string) : string {
    return this.itemsService.getItem(itemId).name;
  }
  data: { [key: string]: RecipeGroup; };
  constructor(private itemsService: ItemsService) {
    this.data = (<RecipeGroupDataFile><unknown>recipesDataFile).data;
  }
  getRecipeGroupIds(): string[] {
    return Object.keys(this.data);
  }
  getRecipeGroupName(id: string): string {
    return this.data[id].name;
  }
  getRecipeIds(groupId: string): string[] {
    return Object.keys(this.data[groupId].recipes);
  }
  getRecipeName(groupId: string, recipeId: string): string {
    return this.data[groupId].recipes[recipeId].name;
  }
  getRecipeIngredientIds(groupId: string, recipeId: string) {
    return Object.keys(this.data[groupId].recipes[recipeId].ingredients);
  }
  // TODO recipe cost, etc.
}
