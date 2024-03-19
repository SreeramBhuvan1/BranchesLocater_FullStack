import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  items:MenuItem[]|undefined;
  items1:MenuItem[]|undefined;
  Branch='Branches';
  ngOnInit(): void {
    this.items=[
      {
        label:'Branches'
      },
      {
        label:'Countries'
      }
    ];
    
  }
  clicked(){
    console.log("navbar clicked");
  }
}
