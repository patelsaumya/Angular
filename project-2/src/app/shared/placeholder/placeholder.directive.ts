import {Directive, ViewContainerRef} from "@angular/core";

@Directive({
  selector: '[appPlaceholder]'
})
export class PlaceholderDirective {
  // ViewContainerRef is essentially an object managed internally by Angular, which gives Angular a reference, a pointer to a place in the DOM, with which it can interact.
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}
