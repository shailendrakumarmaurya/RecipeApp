import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
  standalone: true,
  imports: [RouterLink],
})
export class RecipeItemComponent {
  @Input({ required: true }) recipe!: Recipe;
  @Input({ required: true }) index!: number;
}
