import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  items: MenuItem[] | undefined;
  activeItem: MenuItem;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Branches', routerLink: ['/branches']
      },
      {
        label: 'Countries', routerLink: ['/cities']
      }
    ];
  }
  clicked() {
    console.log("navbar clicked");
  }
  onLogout() {
    this.authService.logout();
  }
}
