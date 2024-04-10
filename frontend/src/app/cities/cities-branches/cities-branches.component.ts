import { Component, OnInit } from '@angular/core';
import { Branch } from '../../branches/branch.model';
import { ActivatedRoute, Params, Router, RouteReuseStrategy } from '@angular/router';
import { CitiesService } from '../../shared-sources/cities-service';

@Component({
  selector: 'app-cities-branches',
  templateUrl: './cities-branches.component.html',
  styleUrl: './cities-branches.component.css'
})
export class CitiesBranchesComponent  implements OnInit{
  public branches:Branch[];
  id:number;
  constructor(private route:ActivatedRoute,private router:Router,private cityservice:CitiesService){

  }
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    })
    this.cityservice.getBranchesWithCityId(this.id).subscribe({
      next:res=>{
    
       this.branches=res;
      }
    }
   )
  
  }
}
