import {NgModule} from "@angular/core";
import {DropdownDirective} from "./dropdown.directive";
import {AlertComponent} from "./alert/alert.component";
import {LoadingSpinnerComponent} from "./loading-spinner/loading-spinner.component";
import {PlaceholderDirective} from "./placeholder/placeholder.directive";
import {CommonModule} from "@angular/common";

// Shared Module // lazy loaded in ShoppingListModule and eagerly loaded in AppModule
@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective
  ],
  imports: [
    CommonModule // to get access to ngIf and ngFor
  ],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective,
    CommonModule
  ],
  // entryComponents: [
  //   // components that will eventually need to be created without a selector or the route contact being used
  //   AlertComponent
  // ]
})
export class SharedModule {}
