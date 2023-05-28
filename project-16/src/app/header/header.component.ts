import {Component, EventEmitter, OnDestroy, OnInit, Output} from "@angular/core";
import {Subscription} from "rxjs";
import * as fromApp from "../store/app.reducer";
import {Store} from "@ngrx/store";
import {map} from "rxjs/operators";
import * as AuthActions from "../auth/store/auth.actions";
import * as RecipesActions from "../recipes/store/recipes.actions";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated = false;

  constructor(private store: Store<fromApp.AppState>) {
  }

  onSaveData() {
    this.store.dispatch(new RecipesActions.StoreRecipes());
  }

  onFetchData() {
    this.store.dispatch(new RecipesActions.FetchRecipes());
  }

  ngOnInit(): void {
    this.userSub = this.store.select('auth').pipe(
      map(authState => authState.user)
    ).subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }
}
