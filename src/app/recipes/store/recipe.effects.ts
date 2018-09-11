import {Actions, Effect} from '@ngrx/effects';
import * as RecipesActions from '../store/recipe.actions';
import {Recipe} from '../recipe.model';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRecipe from '../store/recipe.reducers'
import 'rxjs-compat/add/operator/withLatestFrom';

@Injectable()
export class RecipeEffects {
@Effect()
  recipeFetch = this.actions$
    .ofType(RecipesActions.FETCH_RECIPES)
    .switchMap((action: RecipesActions.FetchRecipes) => {
      return this.httpClient.get<Recipe[]>('https://ng-recipebook-37d4b.firebaseio.com/recipes.json',
        {
            observe: 'body',
            responseType: 'json'
          });
    }).map(
      (recipes) => {
        console.log(recipes);
        for (const recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return {
          type: RecipesActions.SET_RECIPES,
          payload: recipes
        };
      }
    );

@Effect({dispatch: false})
recipeStore = this.actions$
  .ofType(RecipesActions.STORE_RECIPES)
  .withLatestFrom(this.store.select('recipes'))
  .switchMap(([action , state]) => {
    const req = new HttpRequest('PUT', 'https://ng-recipebook-37d4b.firebaseio.com/recipes.json',
      state.recipes , {reportProgress: true});
    return this.httpClient.request(req);
  });

constructor(private actions$: Actions, private httpClient: HttpClient,
            private store: Store<fromRecipe.FeatureState>) {}
}
