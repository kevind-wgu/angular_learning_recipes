import { createAction, createReducer, on, props, Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { of, switchMap, tap, withLatestFrom } from "rxjs";

import { User } from "./user.model";
import { AppState } from "../store/app.store";
import { Router } from "@angular/router";


export interface State {
  user: User
}

const INITIAL_STATE: State = {
  user: null
};

export const login = createAction('[Auth] Login', 
  props<{value: User, redirect: boolean}>(),
);

export const logout = createAction('[Auth] Logout');
export const autoLogin = createAction('[Auth] AutoLogin');

export const authReducer = createReducer(
  INITIAL_STATE,
  on(login, (state, action) => {
    console.log("login action");
    return {...state, user: action.value}
  }),
  on(logout, (state) => {
    return {...state, user: null}
  }),
);


@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private store: Store<AppState>, private router: Router) {}

  authLogin = createEffect(
    () => this.actions$.pipe(
      ofType(login),
      withLatestFrom(this.store.select('auth')),
      tap(([action, auth]) => {
        console.log("authLogin effect");
        localStorage.setItem('userData', JSON.stringify(auth.user));
      }),
    ),
    {dispatch: false}
  );

  authRedirect = createEffect(
    () => this.actions$.pipe(
      ofType(login),
      tap((action)=> {
        if (action.redirect) {
          console.log("authLogin redirect effect");
          this.router.navigate(['/recipes']);
        }
      }),
    ),
    {dispatch: false}
  );

  authLogout = createEffect(
    () => this.actions$.pipe(
      ofType(logout),
      tap(() => {
        console.log("authLogout effect");
        localStorage.removeItem('userData');
        this.router.navigate(['/auth']);
      }),
    ),
    {dispatch: false}
  );

  autoLogin = createEffect(
    () => this.actions$.pipe(
      ofType(autoLogin),
      switchMap(e => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData) {
          const expDate = new Date(userData._tokenExpirationDate);
          const loadedUser = new User(userData.email, userData.id, userData._token, expDate);
          if (loadedUser.token) {
            console.log("AUTO LOGIN A");
            return of(login({value: loadedUser, redirect: false}));
          }
        }
        console.log("AUTO LOGIN B");
        return of({type: 'ignore'});
      })
    )
  )
}