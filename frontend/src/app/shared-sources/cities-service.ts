import { HttpClient } from '@angular/common/http';
import { FormGroup, NgForm } from '@angular/forms';
import { Observable, Subject, of } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import { CityDetail } from './cities-model';
@Injectable({
    providedIn: 'root'
})
export class CitiesService{
    public list:CityDetail[]=[];
    url:string='https://localhost:7207/api/Cities';
    constructor(private http:HttpClient) { }
    formdata:CityDetail=new CityDetail(0,"","","","");
    refreshList(){
        this.http.get(this.url).subscribe({
          next:res=>{
             this.list=res as CityDetail[];
          },
          error:err=>{console.log(err)}
        });
    }
    postdetails(){
        return  this.http.post(this.url,this.formdata);
    }
    getCity(id:number){
        let city = this.list.find(cityId=>cityId.cityId==id);
        return city;
    }
}