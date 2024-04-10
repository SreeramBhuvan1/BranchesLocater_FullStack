import { Component } from '@angular/core';
import { BranchService } from '../branch.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-branch-start',
  templateUrl: './branch-start.component.html',
  styleUrl: './branch-start.component.css'
})
export class BranchStartComponent {
constructor(public branchService:BranchService,private router:Router,private activeroute:ActivatedRoute){

}
selectedBranch:string;
Clicked(){
  console.log(this.selectedBranch);
this.router.navigate([this.selectedBranch],{relativeTo:this.activeroute});
}
}
