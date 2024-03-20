import { Component } from '@angular/core';
import { CitiesService } from '../../shared-sources/cities-service';
import { CityDetail } from '../../shared-sources/cities-model';

@Component({
  selector: 'app-create-city',
  templateUrl: './create-city.component.html',
  styleUrl: './create-city.component.css'
})
export class CreateCityComponent {
  constructor(public service:CitiesService){
    
  }
  onSubmit(){
    this.service.postdetails().subscribe({
      next:res=>{
        this.service.list=res as CityDetail[];
      },
      error:err=>{console.log(err)}
    });
    
   }

}
