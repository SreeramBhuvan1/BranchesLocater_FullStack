import { Component, OnInit } from '@angular/core';
import { Branch } from '../branch.model';
import { BranchService } from '../branch.service';

@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.component.html',
  styleUrl: './branch-list.component.css'
})
export class BranchListComponent implements OnInit {
  Branches: Branch[];

  constructor(private branchService: BranchService) { }

  ngOnInit(): void {
    this.Branches = this.branchService.getBranches();
  }
}
