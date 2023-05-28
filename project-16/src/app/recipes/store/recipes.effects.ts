import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as RecipesActions from "./recipes.actions";
import {map, switchMap, withLatestFrom} from "rxjs/operators";
import {Recipe} from "../recipe.model";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import * as fromApp from '../../store/app.reducer';
import {Store} from "@ngrx/store";
import security from "../../../assets/config/security.json";

@Injectable()
export class RecipesEffects {
  fetchRecipes = createEffect(() => {
    return this.actions$.pipe(
      ofType(RecipesActions.FETCH_RECIPES),
      switchMap(fetchAction => {
        return this.http.get<Recipe[]>(
          security.recipesUrl
        )
      }),
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
      map(recipes => {
        return new RecipesActions.SetRecipes(recipes);
      })
    );
  })

  storeRecipes = createEffect(() => {
    return this.actions$.pipe(
      ofType(RecipesActions.STORE_RECIPES),
      withLatestFrom(this.store.select('recipes')),
      switchMap(([actionData, recipesState]) => { // Array Destructuring
        return this.http.put(
          security.recipesUrl,
          recipesState.recipes
        );
      })
    );
  }, {dispatch: false})

  constructor(private actions$: Actions,
              private http: HttpClient,
              private store: Store<fromApp.AppState>) {
  }
}
