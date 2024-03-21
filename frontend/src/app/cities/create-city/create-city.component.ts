import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CitiesService } from '../../shared-sources/cities-service';
import { CityDetail } from '../../shared-sources/cities-model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-city',
  templateUrl: './create-city.component.html',
  styleUrl: './create-city.component.css'
})
export class CreateCityComponent implements OnInit,AfterViewInit{
 @ViewChild('form') tempform:NgForm;
 id:number;
 city:CityDetail;
//  tempcity:CityDetail;
 editMode=false;
//  tempcity:CityDetail;
  constructor(public service:CitiesService,private router:Router,private activeroute:ActivatedRoute){}
  ngOnInit() {
  //  this.service.startedediting.subscribe((tempcity:CityDetail)=>{
  //   this.editMode=true;
      
  //     this.tempform.setValue({cityName:tempcity.cityName,state:tempcity.state,country:tempcity.country,currency:tempcity.currency});
  //   });
  this.activeroute.params.subscribe((params:Params)=>{
    this.id = +params['id'];
    this.editMode = params['id']!=null;
  });
  }
  ngAfterViewInit(): void {
    if(this.editMode){
      this.city=this.service.getCity(this.id);
      console.log(this.city)
      setTimeout(()=>{
        this.tempform.setValue({cityName:this.city.cityName,state:this.city.state,country:this.city.country,currency:this.city.currency});
      })
    }
  }
  onSubmit(form:NgForm){
    if(this.editMode){
      this.service.UpdateCity(this.id,form);
    }
    else{
    this.service.postdetails(form.value).subscribe({
      next:res=>{
       this.service.list=res as CityDetail[];
       this.tempform.form.reset();
        this.router.navigate(['../cities'],{relativeTo:this.activeroute});
      },
      error:err=>{console.log(err)}
    });
   }
  }
}
