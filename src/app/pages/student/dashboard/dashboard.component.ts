import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/auth.service';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { EditBuddy, EditStudent } from '../../../interfaces';
import { STUDENT_DASHBOARD_LOCALIZATION } from './config/constants';
import {
  GLOBAL_LOCALIZATION,
  EMAIL_LOCALIZATION,
  POPUP_LOCALIZATION
} from '../../../config/constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardStudentComponent implements OnInit {


  status: string | null = null;
  nameBuddy: string | null = null;
  emailBuddy: string | null = null;

  isInfoBuddy = false;
  isShow = false;
  isShowDeleteMessage = false;
  numberOfStars = 0;


  isAcceptMessage = false;

  buddyInfo: EditBuddy | null = null;
  studentInfo: EditStudent | null = null;
  reviewText = '';
  isShowErrorPopup = false;
  isShowStudentInfo = false;

  protected readonly EMAIL_LOCALIZATION = EMAIL_LOCALIZATION;
  protected readonly STUDENT_DASHBOARD_LOCALIZATION = STUDENT_DASHBOARD_LOCALIZATION;
  protected readonly GLOBAL_LOCALIZATION = GLOBAL_LOCALIZATION;
  protected readonly POPUP_LOCALIZATION = POPUP_LOCALIZATION;

  private readonly USER_ID: string;

  constructor(private authService: AuthService,
              private cookieService: CookieService,
              private router: Router) {
    this.USER_ID = this.cookieService.get('user-id');
  }

  ngOnInit(): void {
    this.authService.getById(this.USER_ID)
      .then((response) => {
        this.status = response.foreignStudent.isMatched;
      })
      .then(() => {
        if (this.status === 'matched') {
          this.authService.getMyBuddy()
            .then((response) => {
              this.nameBuddy = response.surname + ' ' + response.name;
              this.emailBuddy = response.email;
            });
        }
      });
  }


  // Запрос на изменение статуса -> поиск
  onSubmit1() {
    this.authService.startSearching()
      .then(() => {
        this.router.navigate(['/foreign_student/dashboard'])
          .then(() => {
            window.location.reload();
          });
      })
      .catch(() => this.isShowErrorPopup = true);
  }

  // Запрос на изменение статуса -> ожидание
  onSubmit2() {
    this.authService.stopSearching()
      .then(() => {
        this.router.navigate(['/foreign_student/dashboard'])
          .then(() => {
            window.location.reload();
          });
      })
      .catch(() => this.isShowErrorPopup = true);
  }

  // Запрос на просмотр Buddy пары
  async onInfoBuddy() {
    this.isInfoBuddy = true;
    this.buddyInfo = await this.authService.getMyBuddy();
  }

  onAcceptReview() {
    this.isShow = false;
    this.isAcceptMessage = false;
    console.log(this.numberOfStars);
    console.log(this.reviewText);

    /*      this.authService.editStudent(this.studentInfo)
            .then(() => {
              this.router.navigate(['/foreign_student/profile']);
            })
            .catch(() => this.isShowErrorPopup = true);*/

  }

  async onStudentInfo() {
    this.isShowStudentInfo = true;
    this.studentInfo = await this.authService.getById(this.USER_ID);
  }

}
