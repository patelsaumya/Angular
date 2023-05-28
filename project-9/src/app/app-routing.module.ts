import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {HomeComponent} from "./home/home.component";
import {UsersComponent} from "./users/users.component";
import {UserComponent} from "./users/user/user.component";
import {ServersComponent} from "./servers/servers.component";
import {ServerComponent} from "./servers/server/server.component";
import {EditServerComponent} from "./servers/edit-server/edit-server.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {AuthGuard} from "./auth-guard.service";
import {CanDeactivateGuard} from "./servers/edit-server/can-deactivate-guard.service";
import {ErrorPageComponent} from "./error-page/error-page.component";
import {ServerResolver} from "./servers/server/server-resolver.service";

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UsersComponent, children: [
      { path: ':id/:name', component: UserComponent },
    ] },
  { path: 'servers',
    // canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: ServersComponent,
    children: [
      { path: ':id',
        component: ServerComponent,
        resolve: {server: ServerResolver} // passing static (synchronous) as well as dynamic (asynchronous) data
      },
      { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] }
    ] },
  // { path: 'not-found', component: PageNotFoundComponent },
  { path: 'not-found',
    component: ErrorPageComponent,
    data: {message: 'Page not found!'} // passing static data
  },
  { path: '**', redirectTo: '/not-found' } // ('**') catches all paths you don't know
];

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoutes, {
    //   useHash: true // hash-mode routing
    // })
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    // what should be accessible by the module which imports this module
    RouterModule
  ]
})
export class AppRoutingModule {
}
