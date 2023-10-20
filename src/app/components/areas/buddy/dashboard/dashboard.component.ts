import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/auth.service';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { checkData } from '../../../../checkData';
import { acceptPopup, Email } from '../../../../textIntoBlock';

@Component({
  selector: 'app-buddy-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardBuddyComponent implements OnInit {

  disabled = true;
  checked = true;
  typePassword = 'password';
  typeNumber = 'number';
  phoneMask = ' (000) 000-00-00';
  phonePrefix = '+7';
  id;
  gender = '';
  localFaculty = '';
  birthDate = '';
  homeCountry = '';
  homeUniversity = '';
  about = '';
  localGroup = '';
  arrivalDate = '';
  arrivalTime = '';
  address = '';
  arrivalPlace = '';
  residenceNote = '';
  residencePlace = '';
  email = '';
  campus = '';
  tagList;
  student;
  date = [];
  matchingId;
  isShowPopUp = false;
  adminEmail = Email;
  title = acceptPopup;
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
    const userInfo = await this.authService.getListSearching();
    this.student = userInfo;
    console.log(this.student);
    for (let i = 0; i < this.student.length; i++) {
      this.date[i] = new Date(this.student[i].foreignStudent.arrivalDateTime);
    }

  }

  takeHandler(id: number) {
    this.matchingId = id;
    this.isShowPopUp = true;
  }

  // Запрос на формирование пары по id студента
  async onSubmit() {
    const result = await this.authService.matchWith(this.matchingId);
    this.router.navigate(['/buddy/my_students']).then(() => {
      window.location.reload();
    });
  }

  async onInfoStudent(tagList, id, gender, birthdate, citizenship, campus, localFaculty, homeUniversity, localGroup, about, arrivalDateTime, arrivalPlace, residencePlace, address, email) {
    this.gender = checkData.gender(gender);
    this.localFaculty = localFaculty;
    this.birthDate = checkData.birthDate(birthdate);
    this.homeCountry = citizenship;
    this.homeUniversity = homeUniversity;
    this.about = about;
    this.tagList = tagList;
    this.id = id;
    this.localGroup = localGroup;
    this.arrivalDate = checkData.arrivalDate(arrivalDateTime);
    this.arrivalTime = checkData.arrivalTime(arrivalDateTime);
    this.arrivalPlace = arrivalPlace;
    this.residencePlace = residencePlace;
    this.address = address;
    this.email = email;
    this.campus = campus;
  }
}
