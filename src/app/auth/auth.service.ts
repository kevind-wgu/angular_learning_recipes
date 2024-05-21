import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject, Observable, Subject, catchError, tap, throwError } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";
import { environment } from '../../environments/environment';

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
  user = new BehaviorSubject<User>(null);
  private autoLogoutTimer: any;


  constructor(private http: HttpClient, private router: Router) {
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

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      const expDate = new Date(userData._tokenExpirationDate);
      const loadedUser = new User(userData.email, userData.id, userData._token, expDate);
      if (loadedUser.token) {
        this.user.next(loadedUser);
        this.autoLogout(expDate.getTime() - new Date().getTime());
      }
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth'])
    localStorage.removeItem('userData');
    if (this.autoLogoutTimer) {
      clearTimeout(this.autoLogoutTimer);
      this.autoLogoutTimer = null;
    }
  }

  autoLogout(expirationDuration: number) {
    this.autoLogoutTimer = setTimeout(() => {this.logout() }, expirationDuration);
  }

  private handleAuthentication(resData: AuthResponseData) {
    const expiresInMs = +resData.expiresIn * 1000;
    const expireDate = new Date(new Date().getTime() + expiresInMs);
    const user = new User(resData.email, resData.localId, resData.idToken, expireDate);
    this.user.next(user);
    this.autoLogout(expiresInMs);
    localStorage.setItem('userData', JSON.stringify(user));
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