import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ExportService } from '@core/export.service';
import { AuthService } from '@core/auth.service';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { checkData } from '../../../../../../checkData';

@Component({
  selector: 'app-matching-chart',
  templateUrl: './matching-chart.component.html',
  styleUrls: ['./matching-chart.component.scss']
})
export class MatchingChartComponent implements OnInit {

  data = [];
  isEdit = false;
  isShowStudentInfo = false;
  isShowBuddyInfo = false;
  addToDelete = false;
  isShowScore = false;
  score = 0;
  studentsId = -1;
  name = '';
  index = -1;
  id = 0;
  title = 'Are you sure you want to delete a pair?';
  reviewText = 'Some reviewText';
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

  @ViewChild('matchingChartTable') userTable: ElementRef;

  private USER_ID;

  constructor(private authService: AuthService,
              private cookieService: CookieService,
              private exportService: ExportService,
              private router: Router
              ) {
  }

  ngOnInit(): void {
    this.USER_ID = this.cookieService.get('user-id');
    this.loadData();
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
    this.StudentLocalGroup = userInfo.foreignStudent.localGroup;
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
    this.BuddyBirthDate = checkData.birthDate(userInfo.birthDate);
    this.BuddyEmail = userInfo.email;
    this.BuddyPhone = userInfo.phone;
    this.BuddyCitizenship = userInfo.citizenship;
    this.BuddyCampus = checkData.campus(userInfo.campus);
    this.BuddyHSEFaculty = userInfo.localFaculty;
    this.BuddyAbout = userInfo.about;
    this.BuddyTagList = userInfo.tagList;
  }

  async loadData() {
    this.data = await this.authService.getAllMatches();
    // console.log(this.data);
  }


  exportElmToExcel(): void {
    this.exportService.exportTableElmToExcel(this.userTable, 'matchingChartTable');
  }

    async acceptHandler() {
      this.addToDelete = false;

      const process = await this.authService.deleteMatch(this.data[this.index].foreignStudent.id, this.data[this.index].buddy.id);

      this.router.navigate(['/admin/management/matching-chart']).then(() => {
        window.location.reload();
      });
    }

  setIdHandler(i: number, id: number) {
    this.index = i;
    this.id = id;
  }

  isEditHandler() {
    this.isEdit = false;
    this.id = 0;
    this.index = -1;
  }

  showScoreHandler(score: number, id: number, reviewText: string) {
    this.score = score;
    this.studentsId = id;
    this.isShowScore = true;
    reviewText.length > 0 ? this.reviewText = reviewText : this.reviewText = 'Some review Some review Some review Some review Some review Some reviewSome reviewSome reviewSome reviewSome reviewSome reviewSome reviewSome review';
  }
}
