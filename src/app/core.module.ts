import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthIntersepterService } from "./auth/auth-intercepter.service";
import { RecipeService } from "./recipies/recipe.service";
import { DataStorageService } from "./shared/data-storage.service";
import { ShoppingListService } from "./shopping-list/shopping-list.service";

@NgModule({
  providers: [
    ShoppingListService,
    RecipeService,
    DataStorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthIntersepterService,
      multi: true
    }]
})
export class CoreModule { }
