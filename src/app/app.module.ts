import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RecipeCalculatorComponent } from './recipe-calculator/recipe-calculator.component';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: 'recipe-calculator', component: RecipeCalculatorComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    RecipeCalculatorComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
