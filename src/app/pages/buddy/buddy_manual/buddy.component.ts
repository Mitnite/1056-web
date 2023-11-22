import { Component } from '@angular/core';
import { EMAIL_LOCALIZATION } from '../../../config/constants';
import { BUDDY_MANUAL_LOCALIZATION } from './config/constants';



@Component({
  selector: 'app-buddy_manual',
  templateUrl: './buddy.component.html',
  styleUrls: ['./buddy.component.scss']
})
export class BuddyComponent {

  isShow = false;

  protected readonly BUDDY_MANUAL_LOCALIZATION = BUDDY_MANUAL_LOCALIZATION;
  protected readonly EMAIL_LOCALIZATION = EMAIL_LOCALIZATION;
}

