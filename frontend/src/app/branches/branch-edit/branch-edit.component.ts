import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Branch, CreateBranch } from '../branch.model';
import { BranchService } from '../branch.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CitiesService } from '../../shared-sources/cities-service';
import { AppComponent } from '../../app.component';
import { ConfirmEventType, ConfirmationService } from 'primeng/api';
import { CityDetail } from '../../shared-sources/cities-model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-branch-edit',
  templateUrl: './branch-edit.component.html',
  styleUrl: './branch-edit.component.css'
})
export class BranchEditComponent implements OnInit, AfterViewInit {
  long:number;
  editMode = false;
  code: string;
  city:CityDetail;
  branch: Branch;
  days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  statusOptions: string[] = ['Open', 'Close', 'Under-Construction','In-Active'];
  @ViewChild('form') branchForm: NgForm

  constructor(private confirmationService: ConfirmationService, private appService: AppComponent, private branchService: BranchService, private router: Router, private route: ActivatedRoute, public cityService: CitiesService,private http: HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.code = params['id'];
      this.editMode = params['id'] != null;
      if (this.editMode) {
        this.branch = this.branchService.getBranch(this.code);
      }
    })
  }

  ngAfterViewInit(): void {
    if (this.editMode) {

      Promise.resolve().then(() => {
        let days = this.branch.business_Hours.split(',');
        var selectedDays = [];
        var time = days[days.length - 1];
        for (var i = 0; i < days.length - 1; i++) {
          selectedDays.push(days[i].trim());
        }
        let [startTime, endTime] = time.split('to').map(time => new Date(`2020-01-01T${time.trim()}:00`));
        this.branchForm.setValue({
          status: this.branch.status,
          address: this.branch.address,
          phone: this.branch.phone,
          cityId:this.branch.cityId,
          businessDays: selectedDays,
          startTime: startTime,
          endTime: endTime
        })
      });
    }
  }

  isValidString(str: string): boolean {
    const regex = /^[0-9()+-]*$/;
    return regex.test(str);
  }
  isValidBuCode(str: string) {
    const regex = /^[0-9a-zA-Z]*$/;
    return regex.test(str);
  }
  formatTime(t: number) {
    if (t >= 0 && t < 10) {
      return "0" + t;
    }
    return t;
  }
  isValidTimes(date1: Date, date2: Date) {
    if (date1.getHours() < date2.getHours()) {
      return true;
    }
    else if (date1.getHours() === date2.getHours()) {
      if (date1.getMinutes() <= date2.getMinutes()) {
        return true;
      }
      return false;
    }
    return false;
  }
  getlocation(form:NgForm){
    const cityid=form.value.cityId;
    this.http.get<any>('https://localhost:7207/api/Cities/' + cityid + '/weather').subscribe({
        next: res => {
          console.log(res);
          Promise.resolve().then(()=>{

this.branchForm.form.patchValue({
  
  latitude:res.location.lat,
  longitude:res.location.lon
})
          });
        
        },
        error:err=>{
          this.appService.customError("Unable to fetch City Weather");
        }
      })



  }
  onSubmit(form: NgForm) {

    var businessHours = "";
    let daysChosen = form.value.businessDays;
    daysChosen.sort((a, b) => this.days.indexOf(a) - this.days.indexOf(b));
    for (let i = 0; i < form.value.businessDays.length; i++) {
      businessHours = businessHours + form.value.businessDays[i] + ", "
    }
    businessHours = businessHours + this.formatTime(form.value.startTime.getHours()) + ":"
      + this.formatTime(form.value.startTime.getMinutes()) + " to " +
      this.formatTime(form.value.endTime.getHours()) + ":" +
      this.formatTime(form.value.endTime.getMinutes())
    if (this.editMode) {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to update this data?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          if (!this.isValidString(form.value.phone)) {
            this.appService.customError("Write valid phone number");
            return;
          }
          if (!this.isValidTimes(form.value.startTime, form.value.endTime)) {
            this.appService.customError("Start time should be less than End time");
            return;
          }
          this.branchService.updateBranch(this.branch.id, this.branch.bU_Codes, businessHours, form.value.cityId, form).subscribe({
            next: res => {
          //   if(this.branch.status==='In-Active'&& form.status!='In-Active'){
          //     this.branchService.total_inactive--;
          //   }
          //  if(this.branch.status!='In-Active'&& form.status==='In-Active'){
          //     this.branchService.total_inactive++;
          //   }
          this.branchService.loadBranches().subscribe({
            next: res => {
              this.branchService.branches = res;
              this.branchService.count();
            }
          });
              this.appService.updateToast();
             
              var index = this.branchService.branches.findIndex(q => q.bU_Codes == this.branch.bU_Codes);
              this.branchService.branches[index] = new Branch(
                this.branch.id,
                this.branch.bU_Codes,
                form.value.status,
                this.branch.opened_dt,
                form.value.address,
                form.value.cityId,
                form.value.phone,
                businessHours,
                this.branch.latitude,
                this.branch.longitude
              )
              this.router.navigate(['/branches/' + this.branch.bU_Codes]);
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
          if (!this.isValidBuCode(form.value.buCode)) {
            this.appService.customError("BU Code should only contain alphanumeric values")
            return;
          }
          if (!this.isValidString(form.value.phone)) {
            this.appService.customError("Write valid phone number");
            return;
          }
          if (!this.isValidTimes(form.value.startTime, form.value.endTime)) {
            this.appService.customError("Start time should be less than End time");
            return;
          }
          for(let i of this.branchService.branches){
            if(this.branchForm.value.buCode==i.bU_Codes){
              this.appService.customError("Bu Code Already Exists");
              return;
            }
          }
          const dateString = this.branchForm.value.openedDate;
          const dateObject = new Date(dateString);

// Extract year, month (0-indexed), and day
const year = dateObject.getFullYear();
const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Add leading zero if needed
const day = String(dateObject.getDate()).padStart(2, '0'); // Add leading zero if needed

// Format the date in year-month-day format
const formattedDate = `${year}-${month}-${day}`;

console.log(formattedDate); 

          const branch: CreateBranch = new CreateBranch(
            this.branchForm.value.buCode,
            this.branchForm.value.status,
            this.branchForm.value.openedDate,
            this.branchForm.value.address,
            this.branchForm.value.cityId,
            this.branchForm.value.phone,
            businessHours,
            this.branchForm.value.latitude,
            this.branchForm.value.longitude
          );
          

// Parse the date string into a Date object


          
          this.branchService.addBranch(branch).subscribe({
            next: res => {
              if(branch.status==='In-Active'){
                this.branchService.total_inactive++;
              }
              this.appService.addedToast();
              this.branchService.loadBranches().subscribe({
                next: res => {
                  this.branchService.branches = res;
                }
              });
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
