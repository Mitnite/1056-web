import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/auth.service';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { checkData } from '../../../../checkData';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit {


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
  tagList;
  student;
  date = [];
  campus = '';
  name = '';
  assignStudentId;
  assignBuddyId;
  isShowTable = false;
  title = 'Are you sure you want to take?';

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

  // Сохранение id студента
  addStudentId(id: number) {
    this.assignStudentId = id;
    this.id = -1;
    this.isShowTable = true;
  }

  // Запрос на формирование пары по id студента и id бадди
  addBuddyId(id: number) {
    this.assignBuddyId = id;
    this.isShowTable = false;
  }


  /*  // Запрос на формирование пары по id студента
    async onSubmit() {
      const result = await this.authService.matchWith(this.assignStudentId);
      this.router.navigate(['/buddy_manual/my_students']).then(() => {
        window.location.reload();
      });
    }*/

  async onInfoStudent(tagList, id, gender, birthdate, citizenship, campus, localFaculty, homeUniversity, localGroup, about, arrivalDateTime, arrivalPlace, residencePlace, address, email, name, surname) {
    console.log(campus);
    this.gender = checkData.gender(gender);
    this.localFaculty = localFaculty;
    this.birthDate = checkData.birthDate(birthdate);
    this.homeCountry = citizenship;
    this.homeUniversity = homeUniversity;
    this.campus = campus;
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

  }
}
