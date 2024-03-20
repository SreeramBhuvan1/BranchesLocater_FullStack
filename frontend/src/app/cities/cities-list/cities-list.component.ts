import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CitiesService } from '../../shared-sources/cities-service';
import { CityDetail } from '../../shared-sources/cities-model';

@Component({
  selector: 'app-cities-list',
  templateUrl: './cities-list.component.html',
  styleUrl: './cities-list.component.css'
})
export class CitiesListComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<CityDetail>();
  constructor(public cityservice:CitiesService){
  }
  // ngOnInit(): void {
  //   this.cityservice.refreshList();
  // }
  ngOnInit(){
    this.cityservice.refreshList();
  }
  clicked(city:CityDetail){
    this.newItemEvent.emit(city);
  }
}
