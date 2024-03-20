import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService, LoginResponse } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) { }

  onSwitchMode(form: NgForm) {
    this.isLoginMode = !this.isLoginMode;
    this.error = null;
    form.reset();
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    if (this.isLoginMode) {
      this.authService.login(form.value.email, form.value.password).subscribe(resData => {
        console.log(resData);
        this.error = null;
        alert('login successfully');
        this.router.navigate(['/branches']);
      }, errorResp => {
        if (errorResp.error.status === 401) {
          this.error = 'Incorrect credentials'
        }
      });
    }
    else {
      if (form.value.password !== form.value.confirmPassword) {
        this.error = 'Passwords did not match';
        this.isLoading = false;
        return;
      }
      this.authService.signup(form.value.email, form.value.password, form.value.firstname, form.value.lastname).subscribe({
        next: resData => {
          console.log(resData);
          this.error = null;
          alert('Sign up was successful! Please Login to proceed');
          this.isLoginMode = true;
          form.reset();
        }, error: errorRes => {
          console.log(errorRes)
          this.error = 'Password must contain one lowercase, one uppercase, one non alphanumeric';
          if (errorRes.error.DuplicateUserName)
            this.error = errorRes.error.DuplicateUserName;
          if (errorRes.status === 500)
            this.error = 'Internal server error. Please try again later'
        }
      });
    }
    this.isLoading = false;
  }
}
