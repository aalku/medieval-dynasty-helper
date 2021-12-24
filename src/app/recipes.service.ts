import { Injectable } from '@angular/core';
import recipesDataFile from '../assets/recipes.json' ;
import { Recipe, RecipeGroup, RecipeGroupDataFile } from './classes/recipe';
import { ItemsService } from './items.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
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
  // TODO recipe cost, etc.
}
