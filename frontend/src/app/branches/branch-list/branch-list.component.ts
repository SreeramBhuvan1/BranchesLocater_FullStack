import { Component, OnDestroy, OnInit } from '@angular/core';
import { Branch } from '../branch.model';
import { BranchService } from '../branch.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.component.html',
  styleUrl: './branch-list.component.css'
})
export class BranchListComponent {

  constructor(public branchService: BranchService) { }

}
