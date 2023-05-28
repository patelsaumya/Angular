import {bootstrapApplication} from "@angular/platform-browser";
import {AppComponent} from "./app/app.component";
import {importProvidersFrom} from "@angular/core";
import {AppRoutingModule} from "./app/app-routing.module";
// import {AnalyticsService} from "./app/shared/analytics.service";

bootstrapApplication(AppComponent, {
  providers: [
    // AnalyticsService // same instance of service (application-wide)

    importProvidersFrom(AppRoutingModule) // forRoot makes RoutingModule act as a service
    // this makes our standalone root component (AppComponent) aware of our routes and makes the overall Angular application aware of our routes
  ]
});



