import { Component, OnInit, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

type IngredientForm = {
  name: FormControl<string | null>;
  amount: FormControl<number | null>;
};

interface RecipeForm {
  name: FormControl<string | null>;
  imagePath: FormControl<string | null>;
  description: FormControl<string | null>;
  ingredients: FormArray<FormGroup<IngredientForm>>;
}

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf],
})
export class RecipeEditComponent implements OnInit {
  id!: number;
  editMode = false;
  recipeForm!: FormGroup<RecipeForm>;

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private recipeService = inject(RecipeService);
  private router = inject(Router);

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(
        this.id,
        this.recipeForm.getRawValue() as Recipe
      );
    } else {
      this.recipeService.addRecipe(this.recipeForm.getRawValue() as Recipe);
    }
    this.onCancel();
  }

  onAddIngredient() {
    const ingredientsArray = this.recipeForm.get('ingredients') as FormArray<
      FormGroup<IngredientForm>
    >;
    const newIngredientGroup = this.fb.group({
      name: ['', Validators.required],
      amount: [
        null as number | null,
        [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)],
      ],
    });
    ingredientsArray.push(newIngredientGroup);
  }

  onDeleteIngredient(index: number) {
    const ingredientsArray = this.recipeForm.get('ingredients') as FormArray<
      FormGroup<IngredientForm>
    >;
    ingredientsArray.removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  get controls() {
    return (
      this.recipeForm.get('ingredients') as FormArray<FormGroup<IngredientForm>>
    ).controls;
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = this.fb.array<FormGroup<IngredientForm>>([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            this.fb.group({
              name: [ingredient.name, Validators.required],
              amount: [
                ingredient.amount,
                [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)],
              ],
            }) as FormGroup<IngredientForm>
          );
        }
      }
    }

    this.recipeForm = this.fb.group({
      name: [recipeName, Validators.required],
      imagePath: [recipeImagePath, Validators.required],
      description: [recipeDescription, Validators.required],
      ingredients: recipeIngredients,
    }) as FormGroup<RecipeForm>;
  }
}
