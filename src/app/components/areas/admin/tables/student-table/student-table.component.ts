import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '@core/auth.service';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { checkData } from '../../../../../checkData';

interface IStudentTable {
  isArchive: boolean;
  id: number;
  name: string;
  Email: string;
  faculty: string;
  citizenship: string;
  buddy?: { id: number, name: string };
}

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.scss']
})
export class StudentTableComponent implements OnInit {

  @Input() isEmail: boolean;
  @Input() isArchive: boolean;
  @Input() isEdit: boolean;
  @Input() isSave = false;
  @Output() reload: EventEmitter<any> = new EventEmitter();

  @Input() isAddStudent: boolean;
  @Output() studentId: EventEmitter<number> = new EventEmitter();

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
  buddyInfo = {};
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
    this.data = await this.authService.getAllStudent();
    for (const d of this.data) {
      if (d.foreignStudent.volunteerId) {
        this.buddyInfo = await this.authService.getById(d.foreignStudent.volunteerId);
        d.buddyInfo = this.buddyInfo;
      }
    }
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
    this.BuddyBirthDate = checkData.birthDate(userInfo.birthDate);
    this.BuddyEmail = userInfo.email;
    this.BuddyPhone = userInfo.phone;
    this.BuddyCitizenship = userInfo.citizenship;
    this.BuddyCampus = checkData.campus(userInfo.campus);
    this.BuddyHSEFaculty = userInfo.localFaculty;
    this.BuddyAbout = userInfo.about;
    this.BuddyTagList = userInfo.tagList;
  }

  async addBuddy(idBuddy: number) {
    this.showTable = false;
    const process = await this.authService.match(idBuddy, this.id);
  }

  setBuddyId(index: number) {
    this.id = index;
    this.showTable = true;
  }

  setStudentId(id: number) {
    this.id = id;
    this.isShowMessage = true;
  }

  studentIdHandler() {
    this.studentId.emit(this.id);
  }

  setIdHandler(i: number, id: number) {
    this.index = i;
    this.id = id;
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnChanges() {
    if (this.isSave) {
      this.data.forEach((d) => {
        if (d.id === this.id) {
          // d.isArchive = !d.isArchive;
          this.reload.emit(d);
        }
      });
      this.id = 0;
      this.index = -1;
      this.reload.emit();
    }

  }

}
