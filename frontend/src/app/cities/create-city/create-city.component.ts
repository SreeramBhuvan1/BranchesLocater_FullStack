import { Component } from '@angular/core';
import { CitiesService } from '../../shared-sources/cities-service';
import { CityDetail } from '../../shared-sources/cities-model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-city',
  templateUrl: './create-city.component.html',
  styleUrl: './create-city.component.css'
})
export class CreateCityComponent {
 form:NgForm;
  constructor(public service:CitiesService){
    
  }
  onSubmit(form:NgForm){
    console.log("hi");
    this.service.postdetails().subscribe({
      next:res=>{
       this.service.list=res as CityDetail[];
      },
      error:err=>{console.log(err)}
    });
   }
}
