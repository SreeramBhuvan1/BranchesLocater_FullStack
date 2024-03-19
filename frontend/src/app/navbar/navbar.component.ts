import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  items: MenuItem[] | undefined;
  activeItem: MenuItem;

  ngOnInit(): void {
    this.items = [
      {
        label: 'Branches'
      },
      {
        label: 'Countries'
      }
    ];
    this.activeItem = this.items[0];
  }
  clicked() {
    console.log("navbar clicked");
  }
}
