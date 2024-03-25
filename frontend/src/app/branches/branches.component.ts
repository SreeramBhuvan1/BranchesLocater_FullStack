import { Component, OnInit } from '@angular/core';
import { BranchService } from './branch.service';
import { CitiesService } from '../shared-sources/cities-service';
import { CityDetail } from '../shared-sources/cities-model';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrl: './branches.component.css'
})
export class BranchesComponent implements OnInit {
  constructor(private branchSerive: BranchService, private cityService: CitiesService) { }

  ngOnInit(): void {
    this.branchSerive.loadBranches().subscribe({
      next: res => {
        this.branchSerive.branches = res;
      }
    });
    this.cityService.refreshList().subscribe({
      next: res => {
        this.cityService.list = res as CityDetail[];
      },
      error: err => { console.log(err) }
    });;
  }
}
