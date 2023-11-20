import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/auth.service';
import { Router } from '@angular/router';
import { acceptPopup, deleteMatch, Email } from '../../../textIntoBlock';
import { EditStudent } from '../../../interfaces';

@Component({
  selector: 'app-mystudents',
  templateUrl: './mystudents.component.html',
  styleUrls: ['./mystudents.component.scss']
})
export class MyStudentsComponent implements OnInit {

  id = -1;
  students: EditStudent[] = [];
  studentInfo: EditStudent | null = null;

  matchingId;
  isShowPopUp = false;
  title = acceptPopup;
  date = [];
  isShowMessage = true;
  address = '';
  deleteMatch = deleteMatch;
  adminEmail = Email;
  currentDate = new Date();

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    this.students = await this.authService.getListMine();
    console.log(this.students);
    for (let i = 0; i < this.students.length; i++) {
      this.date[i] = new Date(this.students[i].foreignStudent.arrivalDateTime);
    }
  }

  takeHandler(id: number) {
    this.matchingId = id;
    this.isShowPopUp = true;
  }

  async acceptHandler(id: number) {
    const result = await this.authService.meetStudent(id);
    this.router.navigate(['/buddy/my_students']).then(() => {
      window.location.reload();
    });
  }


  async onInfoStudent(student: EditStudent) {
    this.studentInfo = student;
    this.id = student.id;
  }

  findStudents(name: string) {
    const find = this.students && this.students.find((student) => student.foreignStudent.isMatched === name);
    return !!find;
  }

}
