import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, NgForm } from '@angular/forms';
import { Observable, Subject, of } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import { CityDetail } from './cities-model';
import { AppComponent } from '../app.component';
@Injectable({
    providedIn: 'root'
})
export class CitiesService {


    public list: CityDetail[] = [];
    bool = false;
    url: string = 'https://localhost:7207/api/Cities';
    constructor(private http: HttpClient) { }
    startedediting = new Subject<CityDetail>();
    formdata: CityDetail = new CityDetail();
    refreshList() {
        return this.http.get(this.url);
    }
    refresh() {
        return this.http.get(this.url);
    }
    postdetails(form: NgForm) {
        return this.http.post(this.url, form);
    }
    UpdateCity(id: number, form: NgForm) {
        const tempCity: CityDetail = { ...{ cityId: id } } as CityDetail;
        for (const controlName in form.controls) {
            if (form.controls[controlName].value) {
                tempCity[controlName] = form.controls[controlName].value;
            }
        }
        // this.http.put(this.url+'/'+id,tempCity).subscribe({
        //     error: error => {
        //         this.bool=true;
        //         console.error("An Error Occured", error);
        //        alert("Error occured while updating");
        //     }
        // });
        // if(this.bool==false){
        //     const index = this.list.findIndex(x => x.cityId === id);
        //     this.list[index]=tempCity;
        // }
        return this.http.put(this.url + '/' + id, tempCity);
    }
    Setvaluesinform(city: CityDetail) {
        this.startedediting.next(city);
    }
    // deleteItem(id:number){
    //     return this.http.delete(this.url,);
    // }
    // update(id:number,form:NgForm){
    //    console.log(this.url+'/'+id,form);
    // }
    getCity(id: number) {
        // let city = this.list.find(cityId=>cityId.cityId==id);
        // return city;

        return this.list.slice().find(x => x.cityId == id);
    }
    deleteId(id: number) {

        // this.http.delete(this.url+'/'+id).subscribe({
        //     next: () => {
        //         const index = this.list.findIndex(x => x.cityId === id);
        //         if (index !== -1) {
        //           this.list.splice(index, 1);
        //         } else {
        //           console.error("City with ID", id, "not found in the list.");
        //         }
        //       },
        //       error: error => {
        //         console.error("City with ID", id, "not found in the list.", error);
        //         alert("Error Occured While Deleting the Data");
        //       }
        //     });
        return this.http.delete(this.url + '/' + id);
    }
}