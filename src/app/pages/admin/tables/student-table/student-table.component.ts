import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '@core/auth.service';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { checkData } from '../../../../checkData';
import {EditBuddy, EditStudent} from "../../../../interfaces";

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
  @Output() reload: EventEmitter<number> = new EventEmitter();

  @Input() isAddStudent: boolean;
  @Output() studentId: EventEmitter<number> = new EventEmitter();

  buddyInfo: EditBuddy | null = null;
  studentInfo: EditStudent | null = null;

  data = [];
  isShowStudentInfo = false;
  isShowBuddyInfo = false;
  name = '';
  index = -1;
  studentID = 0;
  isShowTable = false;
  isShowMessage = false;

  protected readonly TITLE = 'Are you sure you want to assign?';

  constructor(private authService: AuthService,
              private cookieService: CookieService,
              private router: Router) {
  }

  ngOnInit(): void {
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

  async isShowStudentInfoHandler(id: number) {
    this.isShowStudentInfo = true;
    this.studentInfo = await this.authService.getById(id);
  }

  async isShowBuddyInfoHandler(id: number) {
    this.isShowBuddyInfo = true;
    this.buddyInfo = await this.authService.getById(id);
  }

  async addBuddy(idBuddy: number) {
    this.isShowTable = false;
    await this.authService.matchBuddyStudent(this.studentID, idBuddy);
    this.router.navigate(['admin/management/international-buddies']).then(() => {
      window.location.reload();
    });
  }

  showTable(index: number) {
    this.studentID = index;
    this.isShowTable = true;
  }

  showMessage(id: number) {
    this.studentID = id;
    this.isShowMessage = true;
  }

  studentIdHandler() {
    this.studentId.emit(this.studentID);
  }

  setIdHandler(i: number, id: number) {
    this.index = i;
    this.studentID = id;
    this.reload.emit(id);
  }
}
