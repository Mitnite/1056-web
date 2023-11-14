import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '@core/auth.service';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { checkData } from '../../../../../checkData';

interface IBuddyTable {
  isArchive: boolean;
  id: number;
  name: string;
  Email: string;
  faculty: string;
  citizenship: string;
  students: { id: number, name: string }[];
}

@Component({
  selector: 'app-buddy-table',
  templateUrl: './buddy-table.component.html',
  styleUrls: ['./buddy-table.component.scss']
})
export class BuddyTableComponent implements OnInit {

  @Input() isEmail: boolean;
  @Input() isArchive: boolean;
  @Input() isEdit: boolean;
  @Output() reload: EventEmitter<any> = new EventEmitter();
  @Input() isExcel: boolean;
  @Input() isAddBuddy: boolean;

  @Output() BuddyId: EventEmitter<number> = new EventEmitter();


  BuddyName = '';
  BuddySurname = '';
  BuddyGender = '';
  BuddyBirthDate = '';
  BuddyEmail = '';
  BuddyPhone = '';
  BuddyCitizenship = '';
  BuddyCampus = '';
  BuddyHSEFaculty = '';
  BuddyAbout = '';
  BuddyTagList = [];

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

  data = [];

  isShowStudentInfo = false;

  isShowBuddyInfo = false;

  name = '';

  index = -1;

  id = 0;

  showTable = false;

  isShowMessage = false;

  title = 'Are you sure you want to assign?';

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
    const UserInfo = await this.authService.getAllBuddy();
    this.data = UserInfo;
    console.log(this.data);
  }

  async getStudentNameHandler(id: number) {
    this.isShowStudentInfo = true;
    const userInfo = await this.authService.getById(id);

    this.StudentGender = userInfo.gender;
    this.StudentLocalFaculty = userInfo.foreignStudent.localFaculty;
    this.StudentBirthDate = checkData.birthDate(userInfo.birthDate);
    this.StudentCitizenship = userInfo.foreignStudent.homeCountry;
    this.StudentHomeUniversity = userInfo.foreignStudent.homeUniversity;
    this.StudentAbout = userInfo.about;
    this.StudentTagList = userInfo.tagList;
    this.StudentLocalGroup = checkData.localGroup(userInfo.foreignStudent.localGroup);
    this.StudentArrivalDate = checkData.arrivalDate(userInfo.foreignStudent.arrivalDateTime);
    this.StudentArrivalTime = checkData.arrivalTime(userInfo.foreignStudent.arrivalDateTime);
    this.StudentArrivalPlace = userInfo.foreignStudent.arrivalPlace;
    this.StudentResidencePlace = userInfo.residencePlace;
    this.StudentAddress = userInfo.foreignStudent.address;
    this.StudentEmail = userInfo.email;
    this.StudentName = userInfo.name;
    this.StudentSurName = userInfo.surname;
    this.StudentCampus = userInfo.campus;
  }

  async getBuddyNameHandler(id: number) {
    this.isShowBuddyInfo = true;
    const userInfo = await this.authService.getById(id);
    this.BuddyName = userInfo.name;
    this.BuddySurname = userInfo.surname;
    this.BuddyGender = userInfo.gender;
    this.BuddyEmail = userInfo.email;
    this.BuddyPhone = userInfo.phone;
    this.BuddyCitizenship = userInfo.citizenship;
    this.BuddyBirthDate = checkData.birthDate(userInfo.birthDate);
    this.BuddyCampus = checkData.campus(userInfo.campus);
    this.BuddyHSEFaculty = userInfo.localFaculty;
    this.BuddyAbout = userInfo.about;
    this.BuddyTagList = userInfo.tagList;
  }

  setIdHandler(i: number, id: number) {
    this.index = i;
    this.id = id;
    this.reload.emit(id);
  }

  setStudentId(index: number) {
    this.id = index;
    this.showTable = true;
  }

  async addStudent(idStudent: number) {
    this.showTable = false;
    const process = await this.authService.match(idStudent, this.id);
  }

  setBuddyId(id: number) {
    this.id = id;
    this.isShowMessage = true;
  }

  buddyIdHandler() {
    this.BuddyId.emit(this.id);
  }



}
