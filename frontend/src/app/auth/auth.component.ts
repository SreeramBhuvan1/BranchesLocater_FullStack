import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthService, LoginResponse } from './auth.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild('authForm') form: NgForm;
  isLoginMode = true;
  
  isvalidEmail=false;
  isLoading = false;
  error: string = null;
  resetEmailLink:string;
  user = null;
  sub: Subscription;

  constructor(private appService: AppComponent, private authService: AuthService, private router: Router) { }

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
    console.log(this.user);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSwitchMode(form: NgForm) {
    this.isLoginMode = !this.isLoginMode;
    this.error = null;
    form.reset();
  }
  resetPassword(){
    const red=prompt("Enter the Email Id To Reset the Password");
    if(red!=null){
    this.resetEmailLink=red;
    if(this.checkValidEmail()){
console.log("correct");
this.appService.customSuccess("Email Sent");
    }
    else{
      this.appService.customError("Email is not Valid");
    }
    }
  }
  checkValidEmail(){
    const pattern= /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    this.isvalidEmail=pattern.test(this.resetEmailLink);
   return this.isvalidEmail;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    if (this.isLoginMode && !this.user) {
      this.authService.login(form.value.email, form.value.password).subscribe({next:resData => {
        this.error = null;
        this.appService.customSuccess('Logged In Successfully');
        this.router.navigate(['/branches']);
      }, error:errorResp => {
        if (errorResp.error.status === 401) {
          this.error = 'Incorrect credentials'
          this.appService.customError(this.error);
        }
      }});
    }
    else if (!this.isLoginMode && !this.user) {
      if (form.value.password !== form.value.confirmPassword) {
        this.error = 'Passwords did not match';
        this.appService.customError(this.error);
        this.isLoading = false;
        return;
      }
      this.authService.signup(form.value.email, form.value.password, form.value.firstname, form.value.lastname).subscribe({
        next: resData => {
          this.error = null;
          this.appService.customSuccess('Sign up was successful! Please Login to proceed');
          this.isLoginMode = true;
          form.reset();
        }, error: errorRes => {
          this.error = 'Password must contain one uppercase, one lowercase and one non-alphanumeric';
          if (errorRes.error.DuplicateUserName)
            this.error = errorRes.error.DuplicateUserName;
          if (errorRes.status === 500)
            this.error = 'Internal server error. Please try again later'

          this.appService.customError(this.error);
        }
      });
    }
    else {
      if (form.value.password === form.value.newPassword) {
        this.error = 'Do not enter same password for both the fields. Choose a new password';
        this.appService.customError(this.error);
        this.isLoading = false;
        return;
      }
      if (form.value.newPassword !== form.value.confirmNewPassword) {
        this.error = 'Please enter same passoword for Confirm New Passoword field';
        this.appService.customError(this.error);
        this.isLoading = false;
        return;
      }
      this.authService.changePassword(form.value.password, form.value.newPassword).subscribe({
        next: resData => {
          this.error = null;
          this.router.navigate(['/branches']);
          this.appService.customSuccess('Password Changed Successfully');
        }, error: errorRes => {
          this.error = 'Something went wrong. Make sure you entered correct current password. New Password must contain one uppercase, one lowercase and one non-alphanumeric';
          if (errorRes.status === 500)
            this.error = 'Internal server error. Please try again later'

          this.appService.customError(this.error);
        }
      });
    }
    this.isLoading = false;
  }
}
