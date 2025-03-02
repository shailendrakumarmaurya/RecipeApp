import { Routes } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { AuthGuard } from '../auth/auth.guard';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipesResolverService } from './recipes-resolver.service';

export const RECIPES_ROUTES: Routes = [
  {
    path: '',
    component: RecipesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent },
      {
        path: ':id',
        component: RecipeDetailsComponent,
        resolve: { recipe: RecipesResolverService },
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: { recipe: RecipesResolverService },
      },
    ],
  },
];
