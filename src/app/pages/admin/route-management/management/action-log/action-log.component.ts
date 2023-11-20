import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ExportService } from '@core/export.service';
import { AuthService } from '@core/auth.service';
import { CookieService } from 'ngx-cookie';
import { checkData } from '../../../../../checkData';
import { EditBuddy, EditStudent, IActionLog } from '../../../../../interfaces';

@Component({
  selector: 'app-action-log',
  templateUrl: './action-log.component.html',
  styleUrls: ['./action-log.component.scss']
})
export class ActionLogComponent implements OnInit {

  isShowStudentInfo = false;
  isShowBuddyInfo = false;
  name: string | null = null;
  data: IActionLog[] = [];

  buddyInfo: EditBuddy | null = null;
  studentInfo: EditStudent | null = null;

  @ViewChild('actionLogTable') userTable: ElementRef;

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private exportService: ExportService,
  ) {
  }


  ngOnInit(): void {
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
    this.studentInfo = await this.authService.getById(id);
  }

  async getBuddyNameHandler(id: number) {
    this.isShowBuddyInfo = true;
    this.buddyInfo = await this.authService.getById(id);
  }
}
