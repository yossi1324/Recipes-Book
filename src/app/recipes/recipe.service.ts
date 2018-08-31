import {Recipe} from './recipe.model';
import { Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('Falafel', 'The most taste food that israeli can ever make. ',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Food_in_Israel.jpg/1200px-Food_in_Israel.jpg',
      [
        new Ingredient('meat', 1),
        new Ingredient('ham' , 2)
      ]),
    new Recipe('Crispy Chicken', 'Best Crispy chicken!',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfDprtdG-xV2RuAF6FQufYbvIWlxd9n_HOVaOJsG4IE3l0iPLS',
      [
        new Ingredient('luf', 1),
        new Ingredient('union' , 2)
      ])
  ];
  constructor(private shoppingListService: ShoppingListService) {

  }
  setRecipes (recipes: Recipe[] ) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }
  addIngredientToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
  getRecipe(id: number) {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());

  }

}
