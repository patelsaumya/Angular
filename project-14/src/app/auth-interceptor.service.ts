import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // run code before the request leaves your app

    // console.log('Request is on its way');
    // console.log(req.url);

    const modifiedRequest = req.clone({
      headers: req.headers.append('Auth', 'xyz')
    });
    return next.handle(modifiedRequest);
  }
}
