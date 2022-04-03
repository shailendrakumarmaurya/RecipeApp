import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Khichdi Recipe',
  //     'This is Recipe for Khichdi',
  //     'https://www.tarladalal.com/td_cont_img/Qabooli-Biryani.JPG',
  //     [new Ingredient('rice', 100), new Ingredient('Pulses', 50)]
  //   ),
  //   new Recipe(
  //     'Biryani Recipe',
  //     'This is Recipe for Biryani',
  //     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9ZvtaOW7aRb5vgib2Q0XiG1Wj8crVwrXqRQ&usqp=CAU',
  //     [new Ingredient('Basmati Rice', 100), new Ingredient('Vegetables', 3)]
  //   ),
  // ];
  private recipes: Recipe[] = [];
  constructor(private slService: ShoppingListService) { }
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }
  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
