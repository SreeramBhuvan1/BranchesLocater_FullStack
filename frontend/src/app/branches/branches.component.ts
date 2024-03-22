import { Component, OnInit } from '@angular/core';
import { BranchService } from './branch.service';
import { CitiesService } from '../shared-sources/cities-service';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrl: './branches.component.css'
})
export class BranchesComponent implements OnInit {
  constructor(private branchSerive: BranchService, private cityService: CitiesService) { }

  ngOnInit(): void {
    this.branchSerive.loadBranches();
    this.cityService.refreshList();
  }
}
