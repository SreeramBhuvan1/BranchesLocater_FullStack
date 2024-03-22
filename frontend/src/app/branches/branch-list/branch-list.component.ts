import { Component, OnDestroy, OnInit } from '@angular/core';
import { Branch } from '../branch.model';
import { BranchService } from '../branch.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.component.html',
  styleUrl: './branch-list.component.css'
})
export class BranchListComponent {

  constructor(public branchService: BranchService, private router: Router) { }

  isActive(code: string): boolean {
    const currentUrl = this.router.url;
    const urlSegments = currentUrl.split('/');
    const matchedCode = urlSegments.find(segment => segment === code);
    if (matchedCode == null)
      return false;
    return true;
  }
}
