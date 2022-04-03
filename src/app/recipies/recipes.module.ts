import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeRouter } from "./recipes-router.module";
import { RecipieDetailsComponent } from "./recipie-details/recipie-details.component";
import { RecipieItemComponent } from "./recipie-list/recipie-item/recipie-item.component";
import { RecipieListComponent } from "./recipie-list/recipie-list.component";
import { RecipiesComponent } from "./recipies.component";

@NgModule({
  declarations: [
    RecipiesComponent,
    RecipieListComponent,
    RecipieDetailsComponent,
    RecipieItemComponent,
    RecipeStartComponent,
    RecipeEditComponent,
  ],
  imports: [
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    RecipeRouter
  ]
})
export class RecipesModule { }
