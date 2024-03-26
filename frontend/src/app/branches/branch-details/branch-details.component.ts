import { Component, OnInit } from '@angular/core';
import { Branch } from '../branch.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BranchService } from '../branch.service';
import { AppComponent } from '../../app.component';
import { ConfirmEventType, ConfirmationService } from 'primeng/api';
import { CityDetail } from '../../shared-sources/cities-model';
import { CitiesService } from '../../shared-sources/cities-service';

@Component({
  selector: 'app-branch-details',
  templateUrl: './branch-details.component.html',
  styleUrl: './branch-details.component.css'
})
export class BranchDetailsComponent implements OnInit {
  code: string;
  branch: Branch;
  city: CityDetail;
  days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  businessHours: string = "";
  constructor(private confirmationService: ConfirmationService, private appService: AppComponent, private route: ActivatedRoute, private branchService: BranchService, private cityService: CitiesService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.code = params['id'];
      this.branch = this.branchService.getBranch(this.code);
      this.city = this.cityService.getCity(this.branch.cityId);
      let bDays = this.branch.business_Hours.split(',');
      var selectedDays = [];
      var time = bDays[bDays.length - 1];
      for (var i = 0; i < bDays.length - 1; i++) {
        selectedDays.push(bDays[i].trim());
      }
      var i = 0;
      this.businessHours = "";
      while (i < selectedDays.length) {
        var j = i;
        while (j < selectedDays.length - 1 && (this.days.indexOf(selectedDays[j]) + 1) === this.days.indexOf(selectedDays[j + 1])) {
          j++;
        }
        if (i !== j) {
          this.businessHours = this.businessHours + selectedDays[i] + " to " + selectedDays[j] + ', ';
        }
        else {
          this.businessHours = this.businessHours + selectedDays[i] + ', ';
        }
        i = j + 1;
      }
      this.businessHours += time;
    })
  }

  onDelete() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this data?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.branchService.deleteBranch(this.branch.id).subscribe({
          next: res => {
            this.appService.deletedToast();
            this.branchService.loadBranches().subscribe({
              next: res => {
                this.branchService.branches = res;
              }
            });
            this.router.navigate(['branches']);
          }, error: err => {
            if (err.status === 403) {
              this.appService.customError('You are not an admin');
            }
            else {
              this.appService.customError('Something went wrong');
            }
          }
        })
      },
      reject: (type) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.appService.rejected();
            break;
          case ConfirmEventType.CANCEL:
            this.appService.cancelled();
            break;
        }
      }
    });
  }
}
