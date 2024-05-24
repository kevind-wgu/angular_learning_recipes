import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponseData, AuthService } from "./auth.service";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceHolderDirective } from "../shared/placeholder/placeholder.directive";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceHolderDirective) alertHost: PlaceHolderDirective;
  closeSub: Subscription;

  constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.isLoading = true;

      let authObs: Observable<AuthResponseData>;
      if (this.isLoginMode) {
        authObs = this.authService.login(form.value.email, form.value.password);
      }
      else {
        authObs = this.authService.signup(form.value.email, form.value.password);
      }

      authObs.subscribe(
        resData => {
          console.log("Login Success", resData);
          this.isLoading = false;
          // this.router.navigate(['/recipes']);
        },
        error => {
          console.log("ERROR", error);
          this.error = error;
          this.showErrorAlert(error);
          this.isLoading = false;
        }
        );
      form.reset();
    }
  }

  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(error: string) {
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);
    componentRef.instance.message = error;
    
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}