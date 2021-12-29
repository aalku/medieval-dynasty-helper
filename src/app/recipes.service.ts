import { Injectable } from '@angular/core';
import recipesDataFile from '../assets/recipes.json' ;
import { ItemsService } from './items.service';

const priceTypes : { [key: string] : any } = {
  base: {id:"base", formula:(b : number, q : number)=>b*q*1,   template:(b : number, q : number)=>`${b} x ${q} = ${b*q}`},
  buy:  {id:"buy",  formula:(b : number, q : number)=>b*q*2,   template:(b : number, q : number)=>`${b} x ${q} x 2 = ${b*q*2}`},
  sell: {id:"sell", formula:(b : number, q : number)=>b*q*0.5, template:(b : number, q : number)=>`${b} x ${q} / 2 = ${b*q*0.5}`},
};

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
  readonly ingredients: { [id: string]: RecipeItem };
  private _quantityDisplay: string = '';
  private _quantitySet: string = '';
  private _quantity: number = 1;
  readonly basePrice: number;
  constructor(
    group: string,
    id: string,
    label: string,
    ingredients: { [id: string]: RecipeItem },
    basePrice: number
  ) {
    this.group = group;
    this.id = id;
    this.label = label;
    this.ingredients = ingredients;
    Object.keys(this.ingredients).forEach((iid) => {
      this.ingredients[iid].recipe = this;
    });
    this.basePrice = basePrice;
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
  set quantitySet(value: string) {
    if (this._quantitySet != value) {
      this._quantitySet = value;
      this._quantity = parseInt(value);
      if (value.length > 0) {
        Object.values(this.ingredients).forEach((i) => {
          i.quantitySet = '';
          i.quantityDisplay = this.buildItemQuantityDisplay(i);
        });
      } else {
        this.resetRecipe();
      }
    }
  }

  get ingredientsCost(): number {
    var cost: number = 0;
    Object.values(this.ingredients).forEach((i: RecipeItem) => {
       cost += i?.selectedPrice?.unitCost || 0;
    });
    return cost;
  }

  ingredientQuantitySet(ingredient: RecipeItem): void {
    console.log('ingredientQuantitySet', ingredient);
    if (ingredient.quantitySet.length > 0) {
      this._quantity = Math.floor(
        parseInt(ingredient.quantitySet) / ingredient.quantity
      );
      this._quantityDisplay = this.buildRecipeQuantityDisplay(ingredient);
      this.quantitySet = '';

      ingredient.quantityDisplay = '';
      Object.values(this.ingredients).forEach((i) => {
        if (i != ingredient) {
          i._quantitySet = '';
          i._quantityDisplay = this.buildItemQuantityDisplay(i);
        }
      });
    } else {
      this.resetRecipe();
    }
  }

  resetRecipe(): void {
    this._quantity = 1;
    this._quantitySet = '';
    this._quantityDisplay = '1';
    Object.values(this.ingredients).forEach((i) => {
      i._quantitySet = '';
      i._quantityDisplay = this.buildItemQuantityDisplay(i);
    });
  }

  buildItemQuantityDisplay(i: RecipeItem): string {
    return `${i.quantity}\xa0x\xa0${this.quantity}\xa0=\xa0${
      i.quantity * this.quantity
    }`;
  }
  buildRecipeQuantityDisplay(i: RecipeItem): string {
    var set: boolean =
      i.quantitySet.length > 0 &&
      !Number.isNaN(Number.parseFloat(i.quantitySet));
    return set
      ? `${i.quantitySet}\xa0/\xa0${i.quantity}\xa0(${i.label})\xa0=\xa0${this.quantity}`
      : this.quantity.toString();
  }
}

export class ItemPrice {
  readonly label: string;
  readonly unitCost: number;
  readonly expression: string;

  constructor(label: string, baseUnitPrice: number, priceType: string, quantity: number) {
    let priceObject = priceTypes[priceType];
    this.unitCost = priceObject.formula(baseUnitPrice, quantity);
    this.expression = priceObject.template(baseUnitPrice, quantity);
    this.label = `(${label}) ${this.expression}`; ;
  }
}

export class RecipeItem {
  readonly id: string;
  readonly quantity: number;
  readonly item: any;
  _quantityDisplay: string;
  _quantitySet: string = "";
  private _recipe: Recipe | null = null;
  readonly prices: ItemPrice[];
  public selectedPrice!: ItemPrice;
  constructor(id: string, item: any, quantity: number) {
    this.id = id;
    this.item = item;
    this.quantity = quantity;
    this._quantityDisplay = "";
    this.prices = ["base", "buy"]
      .map(p=>priceTypes[p])
      .map(p=>new ItemPrice(p.id, this.item.price, p.id, this.quantity));
  }

  set recipe(value: Recipe | null) {
    if (this._recipe != null) {
      throw new Error("recipe already set");
    }
    this._recipe = value;
  }
  get recipe(): Recipe | null {
    return this._recipe;
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
  get label(): string {
    return this.item.name;
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
          let item = itemsService.getItem(iId);
          ingredients[iId] = new RecipeItem(iId, item, r.ingredients[iId]);
        }
        recipes[rId] = new Recipe(rgId, rId, r.name, ingredients, itemsService.getItem(r.result).price);
      }
      this.recipeGroups[rgId] = new RecipeGroup(rgId, rawData[rgId].name, recipes);
    }
  }

  getRecipeGroups(): { [id: string] : RecipeGroup } {
    return this.recipeGroups;
  }

  // TODO recipe cost, etc.
}
