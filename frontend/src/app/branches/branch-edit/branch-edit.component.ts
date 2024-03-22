import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Branch, CreateBranch } from '../branch.model';
import { BranchService } from '../branch.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CitiesService } from '../../shared-sources/cities-service';
import { AppComponent } from '../../app.component';
import { ConfirmEventType, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-branch-edit',
  templateUrl: './branch-edit.component.html',
  styleUrl: './branch-edit.component.css'
})
export class BranchEditComponent implements OnInit, AfterViewInit {
  editMode = false;
  code: string;
  Branch: Branch;
  @ViewChild('form') branchForm: NgForm

  constructor(private confirmationService: ConfirmationService, private appService: AppComponent, private branchService: BranchService, private router: Router, private route: ActivatedRoute, public cityService: CitiesService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.code = params['id'];
      this.editMode = params['id'] != null;
      if (this.editMode) {
        this.Branch = this.branchService.getBranch(this.code);
      }
    })
  }

  ngAfterViewInit(): void {
    if (this.editMode) {
      setTimeout(() => {
        this.branchForm.setValue({
          status: this.Branch.status,
          address: this.Branch.address,
          phone: this.Branch.phone,
          businessHours: this.Branch.businessHours
        })
      });
    }
  }

  onSubmit(form: NgForm) {
    if (this.editMode) {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to update this data?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.branchService.updateBranch(this.Branch.id, this.Branch.buCode, form).subscribe({
            next: res => {
              this.appService.updatetoast();
              this.branchService.loadBranches();
              var index = this.branchService.Branches.findIndex(q => q.buCode = this.Branch.buCode);
              this.branchService.Branches[index] = new Branch(
                this.Branch.id,
                this.Branch.buCode,
                form.value.status,
                this.Branch.openedDate,
                form.value.address,
                this.Branch.cityId,
                form.value.phone,
                form.value.businessHours,
                this.Branch.latitude,
                this.Branch.longitude
              )
              this.router.navigate(['/branches/' + this.Branch.buCode]);
            }, error: err => {
              if (err.status === 400) {
                this.appService.customError(err.error);
              }
              else {
                this.appService.customError('Something went wrong!');
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
      })
    }
    else {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to add this data?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          const branch: CreateBranch = new CreateBranch(
            this.branchForm.value.buCode,
            this.branchForm.value.status,
            this.branchForm.value.openedDate,
            this.branchForm.value.address,
            this.branchForm.value.cityId,
            this.branchForm.value.phone,
            this.branchForm.value.businessHours,
            this.branchForm.value.latitude,
            this.branchForm.value.longitude
          );
          this.branchService.addBranch(branch).subscribe({
            next: res => {
              this.appService.addedtoast();
              this.branchService.loadBranches();
              this.router.navigate(['../'], { relativeTo: this.route });
            }, error: err => {
              if (err.status === 400) {
                this.appService.customError(err.error);
              }
              else {
                this.appService.customError('Something went wrong!');
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
      })
    }
  }
}
