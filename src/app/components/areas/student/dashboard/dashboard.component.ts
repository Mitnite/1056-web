import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/auth.service';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { checkData } from '../../../../checkData';
import { deleteMatch, Email } from '../../../../textIntoBlock';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardStudentComponent implements OnInit {

  disabled = true;
  checked = true;
  typePassword = 'password';
  typeNumber = 'number';
  phoneMask = ' (000) 000-00-00';
  phonePrefix = '+7';
  status = '';
  nameBuddy = '';
  emailBuddy = '';
  isInfoBuddy = false;
  isShow = false;
  isShowDeleteMessage = false;
  numberOfStars = 0;
  name = '';
  surname = '';
  gender = '';
  birthDate = '';
  email = '';
  phone = '';
  citizenship = '';
  campus = '';
  HSEFaculty = '';
  about = '';
  tagList = [];
  deleteMatch = deleteMatch;
  AdminEmail = Email;
  isAcceptMessage = false;


  StudentName = '';
  StudentSurName = '';
  StudentGender = '';
  StudentLocalFaculty = '';
  StudentBirthDate = '';
  StudentCitizenship = '';
  StudentHomeUniversity = '';
  StudentAbout = '';
  StudentTagList = [];
  StudentCampus = '';
  StudentLocalGroup = '';
  StudentArrivalDate = '';
  StudentArrivalTime = '';
  StudentArrivalPlace = '';
  StudentResidencePlace = '';
  StudentAddress = '';
  StudentEmail = '';
  isShowStudentInfo = false;



  private USER_ID;

  constructor(private authService: AuthService,
              private cookieService: CookieService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.USER_ID = this.cookieService.get('user-id');
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
    const result = await this.authService.startSearching();
    this.router.navigate(['/foreign_student/dashboard']).then(() => {
      window.location.reload();
    });
  }

  // Запрос на изменение статуса -> ожидание
  async onSubmit2() {
    const result = await this.authService.stopSearching();
    this.router.navigate(['/foreign_student/dashboard']).then(() => {
      window.location.reload();
    });
  }

  // Запрос на просмотр Buddy пары
  async onInfoBuddy() {
    this.isInfoBuddy = true;
    const userInfo = await this.authService.getMyBuddy();
    this.name = userInfo.name;
    this.surname = userInfo.surname;
    this.gender = checkData.gender(userInfo.gender);
    this.birthDate = checkData.birthDate(userInfo.birthDate);
    this.email = userInfo.email;
    this.phone = userInfo.phone;
    this.citizenship = userInfo.citizenship;
    this.HSEFaculty = userInfo.localFaculty;
    this.about = userInfo.about;
    this.tagList = userInfo.tagList;
    this.campus = checkData.campus(userInfo.campus);
  }

  onAcceptReview() {
    this.isShow = false;
    this.isAcceptMessage = false;
  }

  async onStudentInfo() {
    this.isShowStudentInfo = true;
    const userInfo = await this.authService.getById(this.USER_ID);
    console.log(userInfo);
    this.StudentGender = checkData.gender(userInfo.gender);
    this.StudentLocalFaculty = userInfo.localFaculty;
    this.StudentBirthDate = checkData.birthDate(userInfo.birthDate);
    this.StudentCitizenship = userInfo.foreignStudent.homeCountry;
    this.StudentHomeUniversity = userInfo.foreignStudent.homeUniversity;
    this.StudentAbout = userInfo.about;
    this.StudentTagList = userInfo.tagList;
    this.StudentLocalGroup = checkData.localGroup(userInfo.foreignStudent.localGroup);
    this.StudentArrivalDate = checkData.arrivalDate(userInfo.foreignStudent.arrivalDateTime);
    this.StudentArrivalTime = checkData.arrivalTime(userInfo.foreignStudent.arrivalDateTime);
    this.StudentArrivalPlace = userInfo.foreignStudent.arrivalPlace;
    this.StudentResidencePlace = checkData.placeOfResidence(userInfo.foreignStudent.residencePlace);
    this.StudentAddress = userInfo.foreignStudent.address;
    this.StudentEmail = userInfo.email;
    this.StudentName = userInfo.name;
    this.StudentSurName = userInfo.surname;
    this.StudentCampus = checkData.campus(userInfo.campus)
  }
}
