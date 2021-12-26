import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RecipeCalculatorComponent } from './recipe-calculator/recipe-calculator.component';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';

import { FormGroupComponent } from './form-x/form-group/form-group.component';
import { FormVerticalRowComponent } from './form-x/form-vertical-row/form-vertical-row.component';
import { FormTableComponent } from './form-x/form-table/form-table.component';
import { FormTableRowComponent } from './form-x/form-table-row/form-table-row.component';
import { FormTableCellComponent } from './form-x/form-table-cell/form-table-cell.component';
import { FormTableColumnComponent } from './form-x/form-table-column/form-table-column.component';
import { RwInputComponent } from './form-x/rw-input/rw-input.component';

import {InputTextModule} from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {TabMenuModule} from 'primeng/tabmenu';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: 'recipe-calculator', component: RecipeCalculatorComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    RecipeCalculatorComponent,
    PageNotFoundComponent,
    FormGroupComponent,
    FormVerticalRowComponent,
    FormTableComponent,
    FormTableRowComponent,
    FormTableCellComponent,
    FormTableColumnComponent,
    RwInputComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    FormsModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    TabMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
