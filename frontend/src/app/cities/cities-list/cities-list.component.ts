import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CitiesService } from '../../shared-sources/cities-service';
import { CityDetail } from '../../shared-sources/cities-model';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-cities-list',
  templateUrl: './cities-list.component.html',
  styleUrl: './cities-list.component.css'
})
export class CitiesListComponent implements OnInit {

  constructor(public cityservice: CitiesService, private router: Router, private ser: AuthService) {
  }
  ngOnInit() {
    this.cityservice.refreshList();
  }

  isActive(cityId: number): boolean {
    const currentUrl = this.router.url;
    const urlSegments = currentUrl.split('/');
    const routeId = urlSegments.find(segment => !isNaN(parseInt(segment)));
    // if (routeId === null)
    //   return false;
    // if (parseInt(routeId) === cityId)
    //   return true;
    // return false;
    return routeId && parseInt(routeId) === cityId;
  }
}
