import {NgModule} from "@angular/core";
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";

// const appRoutes: Routes = [
//   { path: '', redirectTo: '/recipes', pathMatch: "full" },
//   { path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard], children: [
//       { path: '', component: RecipeStartComponent },
//       { path: 'new', component: RecipeEditComponent },
//       { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService] },
//       { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService] }
//     ] },
//   { path: 'shopping-list', component: ShoppingListComponent },
//   { path: 'auth', component: AuthComponent }
// ]

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: "full" },
  { path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule) },
  { path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      // we're using lazy loading, so it will not put all the code into one bundle,
      // but it will preload the bundles as soon as possible
      // The advantage is that the initial download bundle still is kept small. Therefore, initial loading is fast.
      // But then when the user is browsing the page and therefore has some idle time anyway, then we preload these additional code bundles to make sure that subsequent navigation requests are faster
      // Hence we get best of both worlds: Fast Initial Load and a Fast Subsequent Load
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
