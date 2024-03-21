import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { NgForm, NgModel } from '@angular/forms';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CityDetail } from '../../../shared-sources/cities-model';
import { CitiesService } from '../../../shared-sources/cities-service';

@Component({
  selector: 'app-cities-edit',
  templateUrl: './cities-edit.component.html',
  styleUrl: './cities-edit.component.css'
})
export class CitiesEditComponent implements OnInit {
  @ViewChild('form') tempform:NgForm;
 city:CityDetail;
  id:number;
  constructor(public service:CitiesService,private router:Router,private activeroute:ActivatedRoute){
      
  }
  ngOnInit() {
     this.service.startedediting.subscribe((tempcity:CityDetail)=>{
     this.tempform.controls["cityName"].setValue(tempcity.cityName);
    
      setTimeout(() => { 
        this.tempform.setValue(tempcity);
      });
    });
   }
 
   onSubmit(form:NgForm){

   }
   Discard(){
   
    this.router.navigate(['../'],{relativeTo:this.activeroute});
   }
   
  //  this.tempform.setValue({cityName:this.tempcity.cityName,state:this.tempcity.state,country:this.tempcity.country,currency:this.tempcity.currency});

}
