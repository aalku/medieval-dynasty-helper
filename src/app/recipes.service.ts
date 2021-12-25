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
  readonly group: string;
  readonly id: string;
  readonly label: string;
  readonly ingredients: { [id: string]: RecipeItem; };
  private _quantityDisplay: string = "";
  private _quantitySet: string = "";
  private _quantity: number = 1;
  constructor(group: string, id: string, label: string, ingredients: { [id: string]: RecipeItem; }) {
    this.group = group;
    this.id = id;
    this.label = label;
    this.ingredients = ingredients;
    Object.keys(this.ingredients).forEach((iid) => {
      this.ingredients[iid].recipe = this;
    });
    this.resetRecipe();
  }

  get quantity(): number {
    return this._quantity;
  }

  get quantityDisplay(): string {
    return this._quantityDisplay;
  }

  get quantitySet(): string {
    return this._quantitySet;
  }
  set quantitySet(value: string ) {
    if (this._quantitySet != value) {
      this._quantitySet = value;
      this._quantity = parseInt(value);
      if (value.length > 0) {
        Object.values(this.ingredients).forEach((i) => {
          i.quantitySet = "";
          i.quantityDisplay = this.buildItemQuantityDisplay(i);
        });
      } else {
        this.resetRecipe();
      }
      this.updateSummary();
    }
  }

  ingredientQuantitySet(ingredient : RecipeItem) : void {
    console.log("ingredientQuantitySet", ingredient);
    if (ingredient.quantitySet.length > 0) {
      this._quantity = Math.floor(parseInt(ingredient.quantitySet) / ingredient.quantity);
      this._quantityDisplay = this.buildRecipeQuantityDisplay(ingredient);
      this.quantitySet = "";

      ingredient.quantityDisplay = "";
      Object.values(this.ingredients).forEach((i) => {
        if (i != ingredient) {
          i.quantitySet = "";
          i.quantityDisplay = this.buildItemQuantityDisplay(i);
        }
      });
      this.updateSummary();
    } else {
      this.resetRecipe();
    }
  }

  resetRecipe() : void {
    this._quantity = 1;
    this.quantitySet = "";
    this._quantityDisplay = "1";
    Object.values(this.ingredients).forEach((i) => {
      i.quantitySet = "";
      i.quantityDisplay = this.buildItemQuantityDisplay(i);
    });
  }

  buildItemQuantityDisplay(i: RecipeItem) : string {
    return `${i.quantity} x ${this.quantity} = ${i.quantity * this.quantity}`;
  }
  buildRecipeQuantityDisplay(i: RecipeItem) : string {
    var set : boolean = i.quantitySet.length > 0 && !Number.isNaN(Number.parseFloat(i.quantitySet));
    return set ? `${i.quantitySet} / ${i.quantity} (${i.label}) = ${this.quantity}` : this.quantity.toString();
  }

  updateSummary() {
    console.error("updateSummary not implemented");
  }

}

export class RecipeItem {
  readonly id: string;
  readonly label: string;
  readonly quantity: number;
  private _quantityDisplay: string;
  private _quantitySet: string = "";
  private _recipe: Recipe | null = null;
  constructor(id: string, label: string, quantity: number) {
    this.id = id;
    this.label = label;
    this.quantity = quantity;
    this._quantityDisplay = "";
  }

  set recipe(value: Recipe | null) {
    if (this.recipe != null) {
      throw new Error("recipe already set");
    }
    this._recipe = value;
  }

  get quantityDisplay(): string {
    return this._quantityDisplay;
  }
  set quantityDisplay(value: string) {
    if (this._quantityDisplay != value) {
      this._quantityDisplay = value;
    }
  }

  get quantitySet(): string {
    return this._quantitySet;
  }
  set quantitySet(value: string ) {
    if (this._quantitySet != value) {
      this._quantitySet = value;
      this._recipe?.ingredientQuantitySet(this);
    }
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
          ingredients[iId] = new RecipeItem(iId, ingredientName, r.ingredients[iId]);
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
