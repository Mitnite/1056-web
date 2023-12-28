import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/auth.service';
import { EditStudent } from '../../../interfaces';
import { GLOBAL_LOCALIZATION, PLACEHOLDER_LOCALIZATION } from '../../../config/constants';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit {

  studentInfo: EditStudent | null = null;
  students: EditStudent[] = [];
  studentID = -1;

  date: Date[] = [];
  assignStudentId = -1;
  isShowTable = false;
  isShowErrorPopup = false;

  protected readonly HEADER: string = 'Dashboard';
  protected readonly ASSIGN_BUDDY: string = 'Assign buddy';
  protected readonly GLOBAL_LOCALIZATION = GLOBAL_LOCALIZATION;
  protected readonly PLACEHOLDER_LOCALIZATION = PLACEHOLDER_LOCALIZATION;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.authService.getListSearching()
      .then((response) => {
        this.students = response;
        for (let i = 0; i < this.students.length; i++) {
          this.date[i] = new Date(this.students[i].foreignStudent.arrivalDateTime);
        }
      });

  }

  // Сохранение id студента
  addStudentId(id: number) {
    this.assignStudentId = id;
    this.studentID = -1;
    this.isShowTable = true;
  }

  // Сохранение id Buddy
  addBuddyId(assignBuddyId: number) {
    this.isShowTable = false;
    this.onSubmit(assignBuddyId);
  }

  // Запрос на формирование пары по id студента и id бадди
  onSubmit(assignBuddyId: number) {
    this.authService.matchBuddyStudent(this.assignStudentId, assignBuddyId)
      .then(() => {
        this.loadData();
      })
      .catch(() => this.isShowErrorPopup = false);

  }

  onInfoStudent(student: EditStudent) {
    this.studentID = student.id;
    this.studentInfo = student;
  }

}
