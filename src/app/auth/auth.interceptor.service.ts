import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, exhaustMap, map, take } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../store/app.store";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select('auth').pipe(
      take(1),
      map(auth => auth.user),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }
        
        const modRequest = req.clone({params: new HttpParams().set('auth', user.token)});
        console.log("MAKE REQUEST", modRequest);
        return next.handle(modRequest);
      })
    )
  }

}