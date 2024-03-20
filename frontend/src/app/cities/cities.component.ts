import { Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CityDetail } from '../shared-sources/cities-model';


@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrl: './cities.component.css'
})
export class CitiesComponent {
   SelectedCity:CityDetail;
  selected(city:CityDetail){
    this.SelectedCity=city;
  }
}
