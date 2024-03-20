import { Component, Input, OnInit } from '@angular/core';
import { CityDetail } from '../../shared-sources/cities-model';
import { CitiesService } from '../../shared-sources/cities-service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-cities-detailed-view',
  templateUrl: './cities-detailed-view.component.html',
  styleUrl: './cities-detailed-view.component.css'
})
export class CitiesDetailedViewComponent implements OnInit{
  id:number;
 city:CityDetail ;

  constructor(private service: CitiesService,private router:Router,private activeroute:ActivatedRoute){
  }
  ngOnInit(): void {
    this.activeroute.params.subscribe((params:Params)=>{
      this.id=+params['id'];
      this.city=this.service.getCity(this.id);
    }
    );
  }
}
