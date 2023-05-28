import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import {HeaderComponent} from "./header/header.component";
import {AppRoutingModule} from "./app-routing.module";
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core.module";
import * as fromApp from './store/app.reducer';
import {EffectsModule} from "@ngrx/effects";
import {AuthEffects} from "./auth/store/auth.effects";
import {StoreRouterConnectingModule} from "@ngrx/router-store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {RecipesEffects} from "./recipes/store/recipes.effects";

// Everything in a module works standalone
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // services available application-wide (no need to import in all modules)
    AppRoutingModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects, RecipesEffects]),
    StoreDevtoolsModule.instrument({logOnly: false}),
    StoreRouterConnectingModule.forRoot(),
    SharedModule,
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// Services only need to be setup once in the AppModule and you can access them in your whole application even in components which you added to feature modules.
// But, Anything that is used in a template, components, directives, pipes, these things need to be declared or imported into the module where you plan on using them.

// You can only define, or declare, components, directives, and pipes once in the whole application. (Share things via exports and imports)
// You can't do that multiple times. However, you can import a module multiple times.
