import { Component, OnInit } from '@angular/core';
import { Branch } from '../branch.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BranchService } from '../branch.service';
import { AppComponent } from '../../app.component';
import { ConfirmEventType, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-branch-details',
  templateUrl: './branch-details.component.html',
  styleUrl: './branch-details.component.css'
})
export class BranchDetailsComponent implements OnInit {
  code: string;
  Branch: Branch;

  constructor(private confirmationService: ConfirmationService, private appService: AppComponent, private route: ActivatedRoute, private branchService: BranchService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.code = params['id'];
      this.Branch = this.branchService.getBranch(this.code);
    })
  }

  onDelete() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this data?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.branchService.deleteBranch(this.Branch.id).subscribe({
          next: res => {
            this.appService.deletedtoast();
            this.branchService.loadBranches();
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
