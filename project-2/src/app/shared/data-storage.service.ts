import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe.model";
import {exhaustMap, map, take, tap} from "rxjs/operators";
import {AuthService} from "../auth/auth.service";
import security from '../../assets/config/security.json';

@Injectable({
  providedIn: "root"
})
export class DataStorageService {
  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    // override all the data
    this.http.put(
      security.recipesUrl,
      recipes
    ).subscribe(response => {
      // console.log(response);
    });
  }

  /*
  fetchRecipes() {
    return this.authService.user.pipe(
      take(1), // take 1 value from the observable then after automatically unsubscribe
      exhaustMap(user => {
        // return a new observable which will then replace our previous observable in that entire observable chain
        return this.http.get<Recipe[]>(
          security.recipesUrl,
          {
            params: new HttpParams().set('auth', user.token)
          }
        )
      }), // it waits for user observable to complete(i.e. after we took the latest user).
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }
  */

  fetchRecipes() {
    return this.http.get<Recipe[]>(
      security.recipesUrl
    ).pipe(
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }
}
