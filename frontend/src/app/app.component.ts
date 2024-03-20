import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from './auth/auth.service';
import { Subscription, exhaustMap, take } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  isUser = false;
  sub: Subscription;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.autoLogin();
    this.sub = this.authService.user.subscribe(user => {
      if (!user) {
        this.isUser = false;
      }
      else {
        this.isUser = true;
      }
    })
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}




