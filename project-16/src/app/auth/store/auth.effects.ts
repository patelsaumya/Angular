import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as AuthActions from './auth.actions';
import {catchError, switchMap, map, tap} from "rxjs/operators"; // tap does not return anything
import {HttpClient} from "@angular/common/http";
import {of, throwError} from "rxjs";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {User} from "../user.model";
import {AuthService} from "../auth.service";
import security from "../../../assets/config/security.json";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuthentication = (
  expiresIn: number,
  email: string,
  userId: string,
  token: string
) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  const user = new User(email, userId, token, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.AuthenticateSuccess({
    email: email,
    userId: userId,
    token: token,
    expirationDate: expirationDate,
    redirect: true
  });
}

const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthActions.AuthenticateFail(errorMessage));
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email already exists.';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email does not exist.'
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'This password is not correct.'
      break;
  }
  return of(new AuthActions.AuthenticateFail(errorMessage));
}

@Injectable()
export class AuthEffects {

  // Effects should not die as long as the Application is running

  authSignup = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.SIGNUP_START),
      switchMap((signupAction: AuthActions.SignupStart) => {
        return this.http.post<AuthResponseData>(
          security.authUrl,
          {
            email: signupAction.payload.email,
            password: signupAction.payload.password,
            returnSecureToken: true
          }
        ).pipe(
          tap(resData => {
            this.authService.setLogoutTimer(+resData.expiresIn*1000);
          }),
          map(resData => {
            return handleAuthentication(+resData.expiresIn, resData.email, resData.localId, resData.idToken);
          }),
          catchError(errorRes => {
            return handleError(errorRes);
          })
        );
      })
    );
  })

  authLogin = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.LOGIN_START), // filter to allow us to define for which exact actions we want to continue in this chain.
      // only continue in this observable chain if the action we're reacting to here is of type LOGIN_START.
      // All other actions will not trigger this effect here.
      switchMap((authData: AuthActions.LoginStart) => {
        // returns the result of this inner observable stream as a new observable to the outer chain here
        return this.http.post<AuthResponseData>(
          security.authUrl,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true
          }
        ).pipe(
          tap(resData => {
            this.authService.setLogoutTimer(+resData.expiresIn*1000);
          }),
          // "map" wraps the return value into an observable
          map(resData => {
            return handleAuthentication(+resData.expiresIn, resData.email, resData.localId, resData.idToken);
          }),
          // "catchError" does not wrap the return value into an observable(hence using "of" to create new one)
          catchError(errorRes => {
            return handleError(errorRes);
          })
        );
      })
    );
  });

  authRedirect = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.AUTHENTICATE_SUCCESS),
      tap((authSuccessAction: AuthActions.AuthenticateSuccess) => {
        if (authSuccessAction.payload.redirect) {
          this.router.navigate(['/']);
        }
      })
    );
  }, {dispatch: false});

  authLogout = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.LOGOUT),
      tap(() => {
        this.authService.clearLogoutTimer();
        localStorage.removeItem('userData');
        this.router.navigate(['/auth']);
      })
    )
  }, {dispatch: false});

  autoLogin = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.AUTO_LOGIN),
      map(() => {
        const userData: {
          email: string;
          id: string;
          _token: string;
          _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
          return { type: 'DUMMY' };
        }
        const loadedUser = new User(
          userData.email,
          userData.id,
          userData._token,
          new Date(userData._tokenExpirationDate)
        );

        if (loadedUser.token) {
          const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
          this.authService.setLogoutTimer(expirationDuration);
          return new AuthActions.AuthenticateSuccess({
            email: loadedUser.email,
            userId: loadedUser.id,
            token: loadedUser.token,
            expirationDate: new Date(userData._tokenExpirationDate),
            redirect: false
          });
        }
        return { type: 'DUMMY' };
      })
    );
  })


  constructor(private actions$: Actions,
              private http: HttpClient,
              private router: Router,
              private authService: AuthService) {
  } // '$' at end because it is an Observable. (not necessary to add it)
}
