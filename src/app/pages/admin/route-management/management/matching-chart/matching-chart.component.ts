import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ExportService } from '@core/export.service';
import { AuthService } from '@core/auth.service';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { checkData } from '../../../../../checkData';
import {EditBuddy, EditStudent} from "../../../../../interfaces";

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

  buddyInfo: EditBuddy | null = null;
  studentInfo: EditStudent | null = null;

  @ViewChild('matchingChartTable') userTable: ElementRef;

  constructor(private authService: AuthService,
              private cookieService: CookieService,
              private exportService: ExportService,
              private router: Router
              ) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  async getStudentNameHandler(id: number) {
    this.isShowStudentInfo = true;
    this.studentInfo = await this.authService.getById(id);
  }

  async getBuddyNameHandler(id: number) {
    this.isShowBuddyInfo = true;
    this.buddyInfo = await this.authService.getById(id);
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
