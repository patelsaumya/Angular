import {EventEmitter, Injectable} from "@angular/core";
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // activatedEmitter = new EventEmitter<boolean>();

  // Subject is a special kind of Observable.
  // Observables are Passive, as the core idea always is that you wrap a callback or an event or something like that. Passive event sources are Http requests, DOM events, .etc.
  // Subjects are Active, because you can actively call 'next' on it from outside. They are perfect when we want to use it as an EventEmitter.
  activatedEmitter = new Subject<boolean>();

  // You can only use subjects to communicate across components (cross-component communication) through services.
  // You don't use Subjects instead of EventEmitters when you're using @Output.
}
