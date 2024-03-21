import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Branch, CreateBranch } from '../branch.model';
import { BranchService } from '../branch.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CitiesService } from '../../shared-sources/cities-service';

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

  constructor(private branchService: BranchService, private router: Router, private route: ActivatedRoute, public cityService: CitiesService) { }

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
          buCode: this.Branch.buCode,
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
      this.branchService.updateBranch(this.Branch.id, form).subscribe({
        next: res => {
          alert('updated successfully');
          this.branchService.loadBranches();
          this.router.navigate(['/branches']);
        }, error: err => {
          if (err.status === 400) {
            alert(err.error);
          }
          else {
            alert("Something went wrong");
          }
        }
      })
    }
    else {
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
          console.log(res);
          alert('added successfully');
          this.branchService.loadBranches();
          this.router.navigate(['../'], { relativeTo: this.route });
        }, error: err => {
          if (err.status === 400) {
            alert(err.error);
          }
          else {
            alert("Something went wrong");
          }
        }
      })
    }
  }
}
