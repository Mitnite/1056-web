import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  goToAllBuddies() {
    this.router.navigate(['admin/management/all-buddies']);
  }

  goToInternationalBuddies() {
    this.router.navigate(['admin/management/international-buddies']);
  }

  goToMatchingChart() {
    this.router.navigate(['admin/management/matching-chart']);
  }

  goToActionLog() {
    this.router.navigate(['admin/management/action-log']);
  }
}
