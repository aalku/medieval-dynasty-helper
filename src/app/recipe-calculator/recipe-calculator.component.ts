import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../recipes.service';

interface RecipeGroup {
  id: string;
  label: string;
}

interface Recipe {
  group: string;
  id: string;
  label: string;
}

interface RecipeItem {
  label: string;
  quantity: number;
  quantitySet: boolean;
  calculatedQuantity: string;
}

@Component({
  selector: 'app-recipe-calculator',
  templateUrl: './recipe-calculator.component.html',
  styleUrls: ['./recipe-calculator.component.css']
})
export class RecipeCalculatorComponent implements OnInit {

  private _selectedRecipeGroup!: RecipeGroup;
  private _selectedRecipe!: Recipe;
  private _quantityEdited: string = "";
  quantityDisplay: string = "1";
  recipeGroups: RecipeGroup[] = [];
  recipesOfSelectedGroup!: Recipe[];
  selectedRecipeIngredients!: RecipeItem[];
  constructor(private recipesService: RecipesService) {}

  trackItem(index: number, _item: RecipeItem): any {
    return index + _item.toString();
  }

  eventRecipeSelected() {
    let x = [];
    for (let ri of this.recipesService.getRecipeIngredientIds(this.selectedRecipe.group, this.selectedRecipe.id)) {
      let label : string = this.recipesService.getItemName(ri);
      let quantity : number = this.recipesService.getIngredientQuantity(this.selectedRecipe.group, this.selectedRecipe.id, ri);
      x.push({label: label, quantity: quantity, quantitySet: false, calculatedQuantity: '???'});
    }
    this.selectedRecipeIngredients = x;
  }
  eventRecipeGroupSelected() {
    let x = [];
    for (let rid of  this.recipesService.getRecipeIds(this.selectedRecipeGroup.id)) {
      x.push(
        {
          group: this.selectedRecipeGroup.id,
          id: rid,
          label: this.recipesService.getRecipeName(this.selectedRecipeGroup.id, rid)});
    }
    this.recipesOfSelectedGroup = x;
  }

  ngOnInit(): void {
    for (let rg of  this.recipesService.getRecipeGroupIds()) {
      this.recipeGroups.push({id: rg, label: this.recipesService.getRecipeGroupName(rg)
        .replace(/^\s*Food - /, '')});
    }
  }

  get selectedRecipeGroup(): RecipeGroup {
    return this._selectedRecipeGroup;
  }
  set selectedRecipeGroup(value: RecipeGroup) {
    this._selectedRecipeGroup = value;
    this.eventRecipeGroupSelected();
  }

  public get selectedRecipe(): Recipe {
    return this._selectedRecipe;
  }
  public set selectedRecipe(value: Recipe) {
    this._selectedRecipe = value;
    this.eventRecipeSelected();
  }

  public get quantityEdited(): string {
    return this._quantityEdited;
  }
  public set quantityEdited(value: string) {
    if (this._quantityEdited != value) {
      this._quantityEdited = value;
      console.log("quantityEdited: " + this._quantityEdited);
      this.recalculate(true, null);
    }
  }

  recalculate(quantityEdited: boolean, ingredientEdited: string | null) {
    console.log("recalculate: ", quantityEdited, ingredientEdited);
    var quantity !: number;
    if (quantityEdited) {
      if (ingredientEdited) {
        throw new Error("quantityEdited and ingredientEdited cannot both be true");
      } else {
        quantity = Number.parseFloat(this.quantityEdited);
      }
    } else if (!ingredientEdited) {
      this.quantityDisplay = "1";
      quantity = 1;
    } else {
      quantity = 99;
      // TODO calculate quantity from edited ingredient
      this.quantityDisplay = "" + quantity;
    }
    // TODO calculate quantity for each ingredient
    for (let ri of this.selectedRecipeIngredients) {
      if (ri.quantitySet) {
        // Nothing to do
      } else {
        ri.calculatedQuantity = "" + (ri.quantity * quantity);
      }
    }
  }
}
