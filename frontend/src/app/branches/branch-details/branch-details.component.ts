import { Component, OnInit } from '@angular/core';
import { Branch } from '../branch.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BranchService } from '../branch.service';

@Component({
  selector: 'app-branch-details',
  templateUrl: './branch-details.component.html',
  styleUrl: './branch-details.component.css'
})
export class BranchDetailsComponent implements OnInit {
  code: string;
  Branch: Branch;

  constructor(private route: ActivatedRoute, private branchService: BranchService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.code = params['id'];
      this.Branch = this.branchService.getBranch(this.code);
    })
  }

  onDelete() {
    console.log(this.Branch.id);
    this.branchService.deleteBranch(this.Branch.id).subscribe({
      next: res => {
        console.log(res);
        alert('Deleted successfully');
        this.branchService.loadBranches();
        this.router.navigate(['branches']);
      }
    })
  }
}
