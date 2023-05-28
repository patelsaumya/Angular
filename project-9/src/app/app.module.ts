import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { ServersComponent } from './servers/servers.component';
import { ServerComponent } from './servers/server/server.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { HomeComponent } from './home/home.component';
import {ServersService} from "./servers/servers.service";
import {FormsModule} from "@angular/forms";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {AppRoutingModule} from "./app-routing.module";
import {AuthService} from "./auth.service";
import {AuthGuard} from "./auth-guard.service";
import {CanDeactivateGuard} from "./servers/edit-server/can-deactivate-guard.service";
import { ErrorPageComponent } from './error-page/error-page.component';
import {ServerResolver} from "./servers/server/server-resolver.service";

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserComponent,
    ServersComponent,
    ServerComponent,
    EditServerComponent,
    HomeComponent,
    PageNotFoundComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    ServersService,
    AuthService,
    AuthGuard,
    CanDeactivateGuard,
    ServerResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
