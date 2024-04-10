import { Component, OnInit } from '@angular/core';
import { CityDetail } from '../../shared-sources/cities-model';
import { AppComponent } from '../../app.component';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CitiesService } from '../../shared-sources/cities-service';

@Component({
  selector: 'app-cities-weather',
  templateUrl: './cities-weather.component.html',
  styleUrl: './cities-weather.component.css'
})
export class CitiesWeatherComponent implements OnInit {
  code: string;
  city: CityDetail;
  res = null;

  constructor(private appService:AppComponent,private route: ActivatedRoute,private cityService:CitiesService, private http: HttpClient) { 

  }
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.code = params['id'];
      this.city = this.cityService.getCity(+this.code);
      this.http.get('https://localhost:7207/api/Cities/' + this.city.cityId + '/weather').subscribe({
        next: res => {
          this.res = res;
        },
        error:err=>{
          this.appService.customError("Unable to fetch City Weather");
        }
      })
    })
  }

}
