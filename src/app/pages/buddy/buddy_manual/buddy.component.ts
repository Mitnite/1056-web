import { Component } from '@angular/core';
import { BUDDY_MANUAL_LOCALIZATION, EMAIL_LOCALIZATION } from '../../../config/constants';




@Component({
  selector: 'app-buddy_manual',
  templateUrl: './buddy.component.html',
  styleUrls: ['./buddy.component.scss']
})
export class BuddyComponent {

  isShow = false;
  isEmail = false;

  protected readonly TITLE: string = 'Buddy manual';
  protected readonly PROBLEMS: string[] = BUDDY_MANUAL_LOCALIZATION;
  protected readonly EMAIL_LOCALIZATION = EMAIL_LOCALIZATION;
}

