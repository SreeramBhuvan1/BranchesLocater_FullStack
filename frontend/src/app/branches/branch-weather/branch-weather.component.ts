import { Component, OnInit } from '@angular/core';
import { Branch } from '../branch.model';
import { ActivatedRoute, Params } from '@angular/router';
import { BranchService } from '../branch.service';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-branch-weather',
  templateUrl: './branch-weather.component.html',
  styleUrl: './branch-weather.component.css'
})
export class BranchWeatherComponent implements OnInit {
  code: string;
  Branch: Branch;
  res = null;

  constructor(private appService:AppComponent,private route: ActivatedRoute, private branchService: BranchService, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.code = params['id'];
      this.Branch = this.branchService.getBranch(this.code);
      this.http.get('https://localhost:7207/api/Cities/' + this.Branch.cityId + '/weather').subscribe({
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
