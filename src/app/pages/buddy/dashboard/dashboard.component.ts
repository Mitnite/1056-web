import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/auth.service';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { acceptPopup, Email } from '../../../textIntoBlock';
import { EditStudent } from '../../../interfaces';

@Component({
  selector: 'app-buddy-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardBuddyComponent implements OnInit {

  studentInfo: EditStudent | null = null;
  students: EditStudent[] = [];

  disabled = true;
  checked = true;
  id = -1;

  date = [];
  matchingId = -1;
  isShowPopUp = false;
  ADMIN_EMAIL = Email;
  TITLE = acceptPopup;
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

  takeHandler(id: number) {
    this.matchingId = id;
    this.isShowPopUp = true;
  }

  // Запрос на формирование пары по id студента
  async onSubmit() {
    const result = await this.authService.matchWith(this.matchingId);
    this.router.navigate(['/buddy/my_students']).then(() => {
      window.location.reload();
    });
  }

  async onInfoStudent(student: EditStudent) {
    this.studentInfo = student;
    this.id = student.id;

  }
}
