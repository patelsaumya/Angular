import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {ServerComponent} from "./server/server.component";
import { ServersComponent } from './servers/servers.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    ServersComponent
  ],
  imports: [
    // Add(Import) different modules to this module
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [
    // lists all the components which should be known to Angular, at the point of time, the whole application starts (it analyzes our index.html file).
    AppComponent
  ]
})
export class AppModule { }
