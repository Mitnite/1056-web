import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ExportService } from '@core/export.service';
import { AuthService } from '@core/auth.service';
import { CookieService } from 'ngx-cookie';
import { checkData } from '../../../../../../checkData';

@Component({
  selector: 'app-action-log',
  templateUrl: './action-log.component.html',
  styleUrls: ['./action-log.component.scss']
})
export class ActionLogComponent implements OnInit {

  data;
  isShowStudentInfo = false;
  isShowBuddyInfo = false;
  name = '';


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

  @ViewChild('actionLogTable') userTable: ElementRef;
  private USER_ID;

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private exportService: ExportService,
  ) {
  }


  ngOnInit(): void {
    this.USER_ID = this.cookieService.get('user-id');
    this.loadData();
  }

  async loadData() {
    this.data = await this.authService.getAllLogs();

    this.data.forEach((d: any) => {
      const dateTime = d.eventDateTime;
      d.eventDateTime = `${checkData.arrivalDate(dateTime)} ${checkData.arrivalTime(d.eventDateTime)}`;
    });

    console.log(this.data);
  }

  exportElmToExcel(): void {
    this.exportService.exportTableElmToExcel(this.userTable, 'actionLogTable');
  }

  async getStudentNameHandler(id: number) {
    this.isShowStudentInfo = true;
    const userInfo = await this.authService.getById(id);

    this.StudentGender = checkData.gender(userInfo.gender);
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
    this.BuddyGender = checkData.gender(userInfo.gender);
    this.BuddyEmail = userInfo.email;
    this.BuddyPhone = userInfo.phone;
    this.BuddyCitizenship = userInfo.citizenship;
    this.BuddyBirthDate = checkData.birthDate(userInfo.birthDate);
    this.BuddyCampus = checkData.campus(userInfo.campus);
    this.BuddyHSEFaculty = userInfo.localFaculty;
    this.BuddyAbout = userInfo.about;
    this.BuddyTagList = userInfo.tagList;
  }
}
