import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map, take } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../store/app.store";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private store: Store<AppState>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.store.select('auth').pipe(
      take(1),
      map(auth => auth.user),
      map(u => {
        if (!u || !u.token) {
          console.log("AUTH GUARD REDIRECT");
          return this.router.createUrlTree(['/auth']);
        }
        console.log("AUTH GUARD SUCCESS", u);
        return true;
      }),
    );
  }
}