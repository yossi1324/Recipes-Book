import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {
  }

  storeRecipes() {
    const token = this.authService.getToken();

    return this.httpClient.put('https://ng-recipebook-37d4b.firebaseio.com/recipes.json' ,
      this.recipeService.getRecipes(), {
        observe: 'body' ,
        params: new HttpParams().set('auth' , token)
      });
  }

  getRecipes() {
    const token = this.authService.getToken();

    this.httpClient.get<Recipe[]>('https://ng-recipebook-37d4b.firebaseio.com/recipes.json?auth=' + token)
      .map(
        (recipes ) => {
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
