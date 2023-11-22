import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent {

  protected readonly ALL_BUDDIES_TITLE: string = 'All buddies';
  protected readonly ALL_BUDDIES_TEXT: string = 'Numbered page of all buddies - you can go to each profile and view personal information.';
  protected readonly ALL_IS_TITLE: string = 'All international students';
  protected readonly ALL_IS_TEXT: string = 'Numbered page of all international students - you can go to each profile and view personal information.';
  protected readonly CHART_TITLE: string = 'Matching chart';
  protected readonly CHART_TEXT: string = 'Numbered page of international students with assigned buddies';
  protected readonly LOG_TITLE: string = 'Action log';
  protected readonly LOG_TEXT: string = 'List of actions performed in the system';
  constructor(private router: Router) {
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
