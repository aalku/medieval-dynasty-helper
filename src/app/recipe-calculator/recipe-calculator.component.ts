import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe, RecipeGroup, RecipeItem, RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-calculator',
  templateUrl: './recipe-calculator.component.html',
  styleUrls: ['./recipe-calculator.component.css']
})
export class RecipeCalculatorComponent implements OnInit {

  private _selectedRecipeGroup!: RecipeGroup;
  private _selectedRecipe!: Recipe;
  recipeGroupList: RecipeGroup[] = [];
  recipesOfSelectedGroup!: Recipe[];
  selectedRecipeIngredients!: RecipeItem[];
  get basePrice(): string {
    if (!this.selectedRecipe) {
      return "";
    }
    var b = this.selectedRecipe.basePrice;
    var q = this.selectedRecipe.quantity;
    return `${b} x ${q} = ${b*q}`;
  }
  get sellPrice(): string {
    if (!this.selectedRecipe) {
      return "";
    }
    var b = this.selectedRecipe.basePrice;
    var q = this.selectedRecipe.quantity;
    return `(${b} x ${q}) / 2 = ${b*q/2}`;
  }
  get ingredientsCost(): string {
    if (!this.selectedRecipe) {
      return "";
    }
    var c = this.selectedRecipe.ingredientsCost;
    var q = this.selectedRecipe.quantity;
    return `(${c} x ${q}) = ${c*q}`;
  }
  get valueIncrease(): number {
    if (!this.selectedRecipe) {
      return 0;
    }
    var c = this.selectedRecipe.ingredientsCost;
    var v = this.selectedRecipe.basePrice;
    return Math.round((100*(v-c)/c)*10)/10;
  }
  get profit(): number {
    if (!this.selectedRecipe) {
      return 0;
    }
    var c = this.selectedRecipe.ingredientsCost;
    var v = this.selectedRecipe.basePrice / 2;
    return Math.round((100*(v-c)/c)*10)/10;
  }

  constructor(
    private recipesService: RecipesService,
    private route: ActivatedRoute
  ) {}

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
    this.route.params.subscribe(params => {
      console.log("params: ", params);
      var groupId = params["groupId"];
      var recipeId = params["id"];
      if (groupId) {
        this.selectedRecipeGroup = this.recipesService.getRecipeGroups()[groupId];
      }
      if (this.selectedRecipeGroup && recipeId) {
        this.selectedRecipe = this.selectedRecipeGroup.recipes[recipeId];
      }
    });
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
