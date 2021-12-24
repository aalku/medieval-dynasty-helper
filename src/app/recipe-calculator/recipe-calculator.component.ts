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

@Component({
  selector: 'app-recipe-calculator',
  templateUrl: './recipe-calculator.component.html',
  styleUrls: ['./recipe-calculator.component.css']
})
export class RecipeCalculatorComponent implements OnInit {
  recipeGroups: RecipeGroup[] = [];
  recipesOfSelectedGroup!: Recipe[];
  _selectedRecipeGroup!: RecipeGroup;
  selectedRecipe!: Recipe;
  constructor(private recipesService: RecipesService) {}

  ngOnInit(): void {
    for (let rg of  this.recipesService.getRecipeGroupIds()) {
      this.recipeGroups.push({id: rg, label: this.recipesService.getRecipeGroupName(rg)});
    }
  }

  set selectedRecipeGroup(value: RecipeGroup) {
    this._selectedRecipeGroup = value;
    this.recipesOfSelectedGroup = [];
    for (let rid of  this.recipesService.getRecipeIds(this.selectedRecipeGroup.id)) {
      this.recipesOfSelectedGroup.push({group: this.selectedRecipeGroup.id, id: rid, label: this.recipesService.getRecipeName(this.selectedRecipeGroup.id, rid)});
    }
  }

  get selectedRecipeGroup(): RecipeGroup {
    return this._selectedRecipeGroup;
  }

}
