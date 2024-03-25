import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  items: MenuItem[] | undefined;
  activeItem: MenuItem;
  userItems = [
    { label: 'Change Password', icon: 'pi pi-refresh', routerLink: ['/auth'] },
    { label: 'Logout', icon: 'pi pi-power-off', command: () => this.onLogout() }
  ];
  sub: Subscription;
  user: any;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.sub = this.authService.user.subscribe(user => {
      if (!user) {
        this.user = user;
      }
      else {
        this.user = user;
      }
    })
    this.items = [
      {
        label: 'Branches', routerLink: ['/branches']
      },
      {
        label: 'Cities', routerLink: ['/cities']
      }
    ];
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  onLogout() {
    this.authService.logout();
  }
}
