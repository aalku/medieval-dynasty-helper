import { Injectable } from '@angular/core';
import recipesDataFile from '../assets/recipes.json' ;
import { ItemsService } from './items.service';

export class RecipeGroup {
  id: string;
  label: string;
  recipes: { [id: string] : Recipe };
  constructor(id: string, label: string, recipes: { [id: string] : Recipe }) {
    this.id = id;
    this.label = label;
    this.recipes = recipes;
  }
}

export class Recipe {
  group: string;
  id: string;
  label: string;
  ingredients: { [id: string]: RecipeItem; };
  quantitySet: number | null;
  constructor(group: string, id: string, label: string, ingredients: { [id: string]: RecipeItem; }) {
    this.group = group;
    this.id = id;
    this.label = label;
    this.ingredients = ingredients;
    this.quantitySet = null;
  }
}

export class RecipeItem {
  id: string;
  label: string;
  quantity: number;
  quantitySet: number | null;
  constructor(id: string, label: string, quantity: number) {
    this.id = id;
    this.label = label;
    this.quantity = quantity;
    this.quantitySet = null;
  }
}

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private recipeGroups: { [id: string] : RecipeGroup };

  constructor(private itemsService: ItemsService) {
    var rawData : any = (recipesDataFile).data;
    this.recipeGroups = {};
    for (let rgId of Object.keys(rawData)) {
      let recipes: { [id: string] : Recipe } = {};
      for (let rId of Object.keys(rawData[rgId].recipes)) {
        let ingredients: { [id: string] : RecipeItem } = {};
        let r : any = rawData[rgId].recipes[rId];
        for (let iId of Object.keys(r.ingredients)) {
          var ingredientName = itemsService.getItem(iId).name;
          ingredients[iId] = new RecipeItem(iId, ingredientName, r.ingredients[iId].quantity);
        }
        recipes[rId] = new Recipe(rgId, rId, r.name, ingredients);
      }
      this.recipeGroups[rgId] = new RecipeGroup(rgId, rawData[rgId].name, recipes);
    }
  }

  getRecipeGroups(): { [id: string] : RecipeGroup } {
    return this.recipeGroups;
  }

  // TODO recipe cost, etc.
}
