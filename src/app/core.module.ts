import { NgModule } from "@angular/core";
import { ShoppingListService } from "./shopping/shopping-list.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptorService } from "./auth/auth.interceptor.service";

@NgModule({
  providers: [
    ShoppingListService, 
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ]
})
export class CoreModule {}