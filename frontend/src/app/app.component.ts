import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { AuthService } from './auth/auth.service';
import { Subscription, exhaustMap, take } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  isUser = false;
  sub: Subscription;
  constructor(private authService: AuthService, private msgservice: MessageService) { }

  ngOnInit(): void {
    this.authService.autoLogin();
    this.sub = this.authService.user.subscribe(user => {
      if (!user) {
        this.isUser = false;
      }
      else {
        this.isUser = true;
      }
    })
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  addedtoast() {
    this.msgservice.add({ severity: 'success', summary: 'Success', detail: 'Added Successfully' });
  }
  deletedtoast() {
    this.msgservice.add({ severity: 'success', summary: 'Success', detail: 'Deleted Successfully' });

  }
  updatetoast() {
    this.msgservice.add({ severity: 'success', summary: 'Success', detail: 'Updated Successfully' });
  }
  cancelled() {
    this.msgservice.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
  }
  rejected() {
    this.msgservice.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
  }
  errorwhileadd() {
    this.msgservice.add({ severity: 'error', summary: 'Error', detail: 'Error Occured While Adding' });
  }
  updateError() {
    this.msgservice.add({ severity: 'error', summary: 'Error', detail: 'Error Occured While Updating' });
  }
  customError(message: string) {
    this.msgservice.add({ severity: 'error', summary: 'Error', detail: message });
  }
  customSuccess(message: string) {
    this.msgservice.add({ severity: 'success', summary: 'Success', detail: message });
  }
}




