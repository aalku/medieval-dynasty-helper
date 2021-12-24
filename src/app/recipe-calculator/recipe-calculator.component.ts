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

  recipeGroups: RecipeGroup[] = [];
  recipesOfSelectedGroup!: Recipe[];
  private _selectedRecipeGroup!: RecipeGroup;
  private _selectedRecipe!: Recipe;
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
      x.push({group: this.selectedRecipeGroup.id, id: rid, label: this.recipesService.getRecipeName(this.selectedRecipeGroup.id, rid)});
    }
    this.recipesOfSelectedGroup = x;
  }

  ngOnInit(): void {
    for (let rg of  this.recipesService.getRecipeGroupIds()) {
      this.recipeGroups.push({id: rg, label: this.recipesService.getRecipeGroupName(rg)});
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


}
