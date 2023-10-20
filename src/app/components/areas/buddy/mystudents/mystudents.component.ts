import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/auth.service';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { checkData } from '../../../../checkData';
import { acceptPopup, deleteMatch, Email } from '../../../../textIntoBlock';

@Component({
  selector: 'app-mystudents',
  templateUrl: './mystudents.component.html',
  styleUrls: ['./mystudents.component.scss']
})
export class MyStudentsComponent implements OnInit {

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
  arrivalPlace = '';
  residenceNote = '';
  residencePlace = '';
  campus = '';
  email = '';
  tagList;
  student;
  name = '';
  matchingId;
  isShowPopUp = false;
  title = acceptPopup;
  date = [];
  isShowMessage = true;
  address = '';
  deleteMatch = deleteMatch;
  adminEmail = Email;
  currentDate = new Date();
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
    const userInfo = await this.authService.getListMine();
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

  async acceptHandler(id: number) {
    const result = await this.authService.meetStudent(id);
    this.router.navigate(['/buddy/my_students']).then(() => {
      window.location.reload();
    });
  }


  async onInfoStudent(tagList, id, gender, birthdate, citizenship, campus, localFaculty, homeUniversity, localGroup, about, arrivalDateTime, arrivalPlace, residencePlace, address, email, name, surname) {
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
    this.name = name + ' ' + surname;
    this.campus = campus;
  }
}
