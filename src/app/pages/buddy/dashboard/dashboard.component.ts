import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/auth.service';
import { Router } from '@angular/router';
import {
  POPUP_LOCALIZATION,
  EMAIL_LOCALIZATION,
  PLACEHOLDER_LOCALIZATION,
  GLOBAL_LOCALIZATION
} from '../../../config/constants';
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
  studentID = -1;

  date = [];
  matchingId = -1;
  isShowPopUp = false;
  isShowErrorPopup = false;

  protected readonly HEADER: string = 'Dashboard';
  protected readonly POPUP_LOCALIZATION = POPUP_LOCALIZATION;
  protected readonly EMAIL_LOCALIZATION = EMAIL_LOCALIZATION;
  protected readonly PLACEHOLDER_LOCALIZATION = PLACEHOLDER_LOCALIZATION;
  protected readonly GLOBAL_LOCALIZATION = GLOBAL_LOCALIZATION;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.authService.getListSearching()
      .then((response) => {
        this.students = response;
        for (let i = 0; i < this.students.length; i++) {
          this.date[i] = new Date(this.students[i].foreignStudent.arrivalDateTime);
        }
      });
  }

  takeHandler(id: number) {
    this.matchingId = id;
    this.isShowPopUp = true;
  }

  // Запрос на формирование пары по id студента
  async onSubmit() {
    this.authService.matchWith(this.matchingId)
      .then(() => {
        this.router.navigate(['/buddy/my_students']);
      })
      .catch(() => this.isShowErrorPopup = true);

  }

  async onInfoStudent(student: EditStudent) {
    this.studentInfo = student;
    this.studentID = student.id;
  }


}
