import { Component, Input, OnInit } from '@angular/core';
import { CityDetail } from '../../shared-sources/cities-model';
import { CitiesService } from '../../shared-sources/cities-service';
@Component({
  selector: 'app-cities-detailed-view',
  templateUrl: './cities-detailed-view.component.html',
  styleUrl: './cities-detailed-view.component.css'
})
export class CitiesDetailedViewComponent implements OnInit{
  
 @Input() city:CityDetail;

  constructor(private service: CitiesService){

  }
  ngOnInit(): void {
    
  }
 
}
