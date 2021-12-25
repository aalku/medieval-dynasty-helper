import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Recipe, RecipeGroup, RecipeItem, RecipesService } from '../recipes.service';

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
  recipeGroupList: RecipeGroup[] = [];
  recipesOfSelectedGroup!: Recipe[];
  selectedRecipeIngredients!: RecipeItem[];
  constructor(private recipesService: RecipesService) {}

  trackItem(index: number, _item: RecipeItem): any {
    return index + _item.toString();
  }

  eventRecipeSelected() {
    this.selectedRecipeIngredients = Object.values(this.selectedRecipe.ingredients);
  }

  eventRecipeGroupSelected() {
    this.recipesOfSelectedGroup = Object.values(this._selectedRecipeGroup.recipes);
  }

  ngOnInit(): void {
    for (let rg of Object.values(this.recipesService.getRecipeGroups())) {
      this.recipeGroupList.push(rg);
    }
    console.log("recipeGroupList: ", this.recipeGroupList);
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
    /* We enter the input into the recipe and get the results from it. We don't calc stuff out here. */
    console.log("recalculate: ", quantityEdited, ingredientEdited);
    if (quantityEdited) {
      if (ingredientEdited) {
        throw new Error("quantityEdited and ingredientEdited cannot both be true");
      } else {
        this._selectedRecipe.quantitySet = Number.parseFloat(this.quantityEdited);
      }
    } else {
      this._selectedRecipe.quantitySet = null;
    }
  }
}
