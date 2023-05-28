import { Component } from '@angular/core';

// @Component({
//   templateUrl: './about.component.html'
// })
// export class AboutComponent {}
// (no need to declare) if we are not going to use selector for loading it, instead we will be using Routes.


@Component({
  standalone: true,
  templateUrl: './about.component.html'
})
export class AboutComponent {}
