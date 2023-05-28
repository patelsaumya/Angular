import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptorService} from "./auth-interceptor.service";
import {LoggingInterceptorService} from "./logging-interceptor.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    // order of providing === order of execution

    // Here, AuthInterceptor will run first and thereafter LoggingInterceptor is executed
    {
      provide: HTTP_INTERCEPTORS, // identifier
      useClass: AuthInterceptorService, // service
      multi: true // multiple services could be there under the same identifier
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
