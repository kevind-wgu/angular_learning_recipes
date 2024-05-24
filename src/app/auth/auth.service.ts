import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, tap, throwError } from "rxjs";
import { User } from "./user.model";
import { environment } from '../../environments/environment';
import { Store } from "@ngrx/store";
import { AppState } from "../store/app.store";
import * as AuthStore from "./auth.store";

const URL = environment.googleApiUrl;

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  // user = new BehaviorSubject<User>(null);
  private autoLogoutTimer: any;

  constructor(private http: HttpClient, private store: Store<AppState>) {
  }

  signup(email: string, password: string) : Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      URL + '/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
      {email: email, password: password, returnSecureToken: true,}
    )
    .pipe(catchError(this.handleError), tap((resData) => this.handleAuthentication(resData)));
  }

  login(email: string, password: string) : Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      URL + '/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
      {email: email, password: password, returnSecureToken: true,}
    )
    .pipe(catchError(this.handleError), tap((resData) => this.handleAuthentication(resData)));
  }

  private handleAuthentication(resData: AuthResponseData) {
    const expiresInMs = +resData.expiresIn * 1000;
    // const expiresInMs = 10* 1000;
    const expireDate = new Date(new Date().getTime() + expiresInMs);
    const user = new User(resData.email, resData.localId, resData.idToken, expireDate);
    this.store.dispatch(AuthStore.login({value: user, redirect: true}));
  }

  private handleError(errorRes: HttpErrorResponse) : Observable<AuthResponseData> {
    console.log("handle error");
    let errorMessage = 'An unknown error occured: ';
    if (errorRes.error?.error?.message) {
      errorMessage += errorRes.error.error.message;
      switch (errorRes.error.error.message) {
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'Invalid Username or Password';
        case 'INVALID_PASSWORD':
          errorMessage = 'Invalid Username or Password';
        case 'INVALID_LOGIN_CREDENTIALS':
          errorMessage = 'Invalid Username or Password';
        case 'EMAIL_EXISTS':
          errorMessage = 'This email exists already';
        default:
      }
    }
    else {
      console.log("ERROR", errorRes);
    }
    return throwError(errorMessage);
  }
}