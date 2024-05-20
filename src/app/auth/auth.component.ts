import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponseData, AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {
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
          console.log("Success", resData);
          this.isLoading = false;
          this.router.navigate(['/recipies']);
        },
        error => {
          console.log("ERROR", error);
          this.error = error;
          this.isLoading = false;
        }
        );
      form.reset();
    }
  }
}