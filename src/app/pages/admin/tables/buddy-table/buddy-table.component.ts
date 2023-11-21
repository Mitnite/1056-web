import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '@core/auth.service';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { EditBuddy, EditStudent } from '../../../../interfaces';

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

  buddyInfo: EditBuddy | null = null;
  studentInfo: EditStudent | null = null;

  data = [];

  isShowStudentInfo = false;

  isShowBuddyInfo = false;

  name = '';

  index = -1;

  buddyID = 0;

  isShowTable = false;

  isShowMessage = false;

  protected readonly TITLE: string = 'Are you sure you want to assign?';

  constructor(private authService: AuthService,
              private cookieService: CookieService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    this.data = await this.authService.getAllBuddy();
    // console.log(this.data);
  }

  async isShowStudentInfoHandler(id: number) {
    this.isShowStudentInfo = true;
    this.studentInfo = await this.authService.getById(id);
  }

  async isShowBuddyInfoHandler(id: number) {
    this.isShowBuddyInfo = true;
    this.buddyInfo = await this.authService.getById(id);
  }

  setIdHandler(i: number, id: number) {
    this.index = i;
    this.buddyID = id;
    this.reload.emit(id);
  }

  showTable(index: number) {
    this.buddyID = index;
    this.isShowTable = true;
  }

  showMessage(id: number) {
    this.buddyID = id;
    this.isShowMessage = true;
  }

  async addStudent(StudentId: number) {
    this.isShowTable = false;
    await this.authService.matchBuddyStudent(StudentId, this.buddyID);
    this.router.navigate(['admin/management/all-buddies']).then(() => {
      window.location.reload();
    });
  }

  buddyIdHandler() {
    this.BuddyId.emit(this.buddyID);
  }
}
