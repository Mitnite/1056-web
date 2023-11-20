import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/auth.service';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { checkData } from '../../../checkData';
import { deleteMatch, Email } from '../../../textIntoBlock';
import {EditBuddy, EditStudent} from "../../../interfaces";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardStudentComponent implements OnInit {


  status = '';
  nameBuddy = '';
  emailBuddy = '';
  isInfoBuddy = false;
  isShow = false;
  isShowDeleteMessage = false;
  numberOfStars = 0;

  deleteMatch = deleteMatch;
  AdminEmail = Email;
  isAcceptMessage = false;

  buddyInfo: EditBuddy | null = null;
  studentInfo: EditStudent | null = null;

  isShowStudentInfo = false;



  private readonly USER_ID: string;

  constructor(private authService: AuthService,
              private cookieService: CookieService,
              private router: Router) {
    this.USER_ID = this.cookieService.get('user-id');
  }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    const userInfo = await this.authService.getById(this.USER_ID);
    this.status = userInfo.foreignStudent.isMatched;
    if (this.status === 'matched') {
      const buddyInfo = await this.authService.getMyBuddy();
      this.nameBuddy = buddyInfo.name;
      this.emailBuddy = buddyInfo.email;
    } else {
      this.nameBuddy = '';
      this.emailBuddy = '';
    }
  }

  // Запрос на изменение статуса -> поиск
  async onSubmit1() {
    await this.authService.startSearching();
    this.router.navigate(['/foreign_student/dashboard']).then(() => {
      window.location.reload();
    });
  }

  // Запрос на изменение статуса -> ожидание
  async onSubmit2() {
    await this.authService.stopSearching();
    this.router.navigate(['/foreign_student/dashboard']).then(() => {
      window.location.reload();
    });
  }

  // Запрос на просмотр Buddy пары
  async onInfoBuddy() {
    this.isInfoBuddy = true;
    this.buddyInfo = await this.authService.getMyBuddy();
  }

  onAcceptReview() {
    this.isShow = false;
    this.isAcceptMessage = false;
  }

  async onStudentInfo() {
    this.isShowStudentInfo = true;
    this.studentInfo = await this.authService.getById(this.USER_ID);
  }
}
