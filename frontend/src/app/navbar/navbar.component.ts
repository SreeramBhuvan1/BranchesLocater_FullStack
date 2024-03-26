import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, ConfirmEventType, MenuItem, MessageService } from 'primeng/api';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppComponent } from '../app.component';

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
  constructor(private appservice:AppComponent,private router: Router, private authService: AuthService, private activeroute: ActivatedRoute, private confirmationService: ConfirmationService, private messageService: MessageService) { }

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
    this.confirmationService.confirm({
      message: 'Are you sure you want to log out?',
      header: 'Confirm Logout',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log("hi in logout");
        this.authService.logout();
      },
      reject: (type) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.appservice.rejected();

            break;
          case ConfirmEventType.CANCEL:
            this.appservice.cancelled();
            break;
        }
      }
    });
   
  }
}
