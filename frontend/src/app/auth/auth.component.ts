import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthService, LoginResponse } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild('authForm') form: NgForm;
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  user = null;
  sub: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.sub = this.authService.user.subscribe(user => {
      if (!user) {
        this.user = null;
        this.isLoginMode = true;
        this.error = null;
        if (this.form !== undefined)
          this.form.reset();
      }
      else {
        this.user = user;
      }
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

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
    if (this.isLoginMode && !this.user) {
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
    else if (!this.isLoginMode && !this.user) {
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
          this.error = 'Password must contain one uppercase, one lowercase and one non-alphanumeric';
          if (errorRes.error.DuplicateUserName)
            this.error = errorRes.error.DuplicateUserName;
          if (errorRes.status === 500)
            this.error = 'Internal server error. Please try again later'
        }
      });
    }
    else {
      if (form.value.newPassword !== form.value.confirmNewPassword) {
        this.error = 'Please enter same passoword for Confirm New Passoword field';
        this.isLoading = false;
        return;
      }
      this.authService.changePassword(form.value.password, form.value.newPassword).subscribe({
        next: resData => {
          console.log(resData);
          this.error = null;
          this.router.navigate(['/branches']);
          alert('Password Changed Successfully');
        }, error: errorRes => {
          console.log(errorRes);
          this.error = 'Something went wrong. Make sure you entered correct current password. New Password must contain one uppercase, one lowercase and one non-alphanumeric';
          if (errorRes.status === 500)
            this.error = 'Internal server error. Please try again later'
        }
      });
    }
    this.isLoading = false;
  }
}
