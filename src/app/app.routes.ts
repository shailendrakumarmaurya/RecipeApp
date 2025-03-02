import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipesResolverService } from './recipes/recipes-resolver.service';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailsComponent } from './recipes/recipe-details/recipe-details.component';

export const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  {
    path: 'recipes',
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
  {
    path: 'shopping-list',
    component: ShoppingListComponent,
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
];
