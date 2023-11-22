import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ExportService } from '@core/export.service';
import { AuthService } from '@core/auth.service';
import { CookieService } from 'ngx-cookie';
import { checkData } from '../../../../../checkData';
import { EditBuddy, EditStudent, IActionLog } from '../../../../../interfaces';
import {GLOBAL_LOCALIZATION} from "../../../../../config/constants";

@Component({
  selector: 'app-action-log',
  templateUrl: './action-log.component.html',
  styleUrls: ['./action-log.component.scss']
})
export class ActionLogComponent implements OnInit {

  isShowStudentInfo = false;
  isShowBuddyInfo = false;
  actionLogs: IActionLog[] = [];

  buddyInfo: EditBuddy | null = null;
  studentInfo: EditStudent | null = null;

  @ViewChild('actionLogTable') userTable: ElementRef;
  protected readonly GLOBAL_LOCALIZATION = GLOBAL_LOCALIZATION;

  constructor(
    private authService: AuthService,
    private exportService: ExportService,
  ) {
  }


  ngOnInit(): void {
    this.authService.getAllLogs()
        .then((response) => {
          this.actionLogs = response;
        })
        .then(() => {
          this.actionLogs.forEach((actionLog: IActionLog) => {
            const dateTime: string = actionLog.eventDateTime;
            actionLog.eventDateTime = `${checkData.arrivalDate(dateTime)} ${checkData.arrivalTime(actionLog.eventDateTime)}`;
          });
        });
  }

  exportElmToExcel(): void {
    this.exportService.exportTableElmToExcel(this.userTable, 'actionLogTable');
  }

  isShowStudentInfoHandler(id: number) {
    this.isShowStudentInfo = true;
    this.authService.getById(id)
        .then((response) => {
          this.studentInfo = response;
        });
  }

  isShowBuddyInfoHandler(id: number) {
    this.isShowBuddyInfo = true;
    this.authService.getById(id)
        .then((response) => {
          this.buddyInfo = response;
        });
  }

}
