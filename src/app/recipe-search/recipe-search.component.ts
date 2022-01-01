import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit } from '@angular/core';
import { RecipesService, SearchResult, SearchResultType } from '../recipes.service';

@Component({
  selector: 'recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.css']
})
export class RecipeSearchComponent implements OnInit {

  public value: string = "";

  public results: SearchResult[] = [];

  constructor(private recipesService: RecipesService) { }

  ngOnInit(): void {
    if (false) {
      setTimeout(()=>{
        var e : HTMLInputElement= document.querySelector("input.search") as HTMLInputElement;
        e.value = "meat";
        this.doSearch(e.value);
      }, 1000);
    }
    setTimeout(() => {
      console.log("ngAfterViewInit");
      var s = (<any>document)?.querySelector('#search') as HTMLInputElement;
      console.log("s: ", s);
      s?.focus();
    }, 500);
  }

  doSearch(value: string) {
    console.log(value);
    this.value = value;
    this.recipesService.search(this.value).subscribe(
      (update: SearchResult[]) => {
        var r : SearchResult[] = [];
        var set : Set<string> = new Set<string>();
        update.filter(e=>e.type == SearchResultType.ToMakeItem).forEach(e=>{
          r.push(e);
          set.add(e.recipeLabel);
        });
        update.filter(e=>e.type == SearchResultType.ToMakeWithItem).forEach(e=>{
          if (!set.has(e.recipeLabel)) {
            set.add(e.recipeLabel);
            r.push(e);
          }
        });
        console.log("results", r);
        this.results = r;
      }
    );
  }

}
