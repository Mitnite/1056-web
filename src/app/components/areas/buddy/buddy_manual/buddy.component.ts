import { Component } from '@angular/core';
import { BuddyManual, Email } from '../../../../textIntoBlock';




@Component({
  selector: 'app-buddy_manual',
  templateUrl: './buddy.component.html',
  styleUrls: ['./buddy.component.scss']
})
export class BuddyComponent {

  isShow = false;
  isEmail = false;
  problems = BuddyManual;
  title = 'Buddy manual';
  email = Email;




}

