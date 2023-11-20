import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/auth.service';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { EditStudent } from '../../../interfaces';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit {

  studentInfo: EditStudent | null = null;
  students: EditStudent[] = [];
  id = -1;

  date = [];
  assignStudentId;
  assignBuddyId;
  isShowTable = false;

  // protected readonly TITLE: string = 'Are you sure you want to take?';

  constructor(private authService: AuthService,
              private cookieService: CookieService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    this.students = await this.authService.getListSearching();
    for (let i = 0; i < this.students.length; i++) {
      this.date[i] = new Date(this.students[i].foreignStudent.arrivalDateTime);
    }
  }

  // Сохранение id студента
  addStudentId(id: number) {
    this.assignStudentId = id;
    this.id = -1;
    this.isShowTable = true;
  }

  // Сохранение id Buddy
  addBuddyId(assignBuddyId: number) {
    this.isShowTable = false;
    this.onSubmit(assignBuddyId);
  }

  // Запрос на формирование пары по id студента и id бадди
    async onSubmit(assignBuddyId: number) {
      await this.authService.matchBuddyStudent(this.assignStudentId, assignBuddyId);
      this.router.navigate(['dashboard']).then(() => {
        window.location.reload();
      });
    }

  async onInfoStudent(student: EditStudent) {
    this.id = student.id;
    this.studentInfo = student;
  }
}
