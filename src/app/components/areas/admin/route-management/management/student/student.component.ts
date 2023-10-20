import { Component, ElementRef, ViewChild } from '@angular/core';
import { ExportService } from '@core/export.service';
import { EditStudent } from '../../../../../../interfaces';
import { AuthService } from '@core/auth.service';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class AllStudentsComponent {

  isArchive = false;
  isEdit = false;
  isSave = false;
  isDelete = false;
  addToArchive = false;
  name = '';
  student!: EditStudent;
  nameCollection = [
    {name: 'name'},
    {name: 'name1'},
    {name: 'name2'}
  ];
  role = 'ROLE_FOREIGN_STUDENT';
  title = 'Are you sure you want to add?';
  deleteTitle = 'Are you sure you want to delete';

  @ViewChild('internationalStudentTable') userTable: ElementRef;

  constructor(
    private exportService: ExportService,
    private authService: AuthService,
    private cookieService: CookieService,
  ) {
  }

  exportElmToExcel(): void {
    this.exportService.exportTableElmToExcel(this.userTable, 'internationalStudentTable');
  }

  setArchiveHandler(component: string) {
    switch (component) {
      case 'arc':
        this.isArchive = true;
        break;
      case 'act':
        this.isArchive = false;
        break;
    }
  }

  isEditHandler() {
    this.isEdit = !this.isEdit;
  }

  async acceptHandler() {
    this.isSave = true;
    this.addToArchive = false;

    const USER: EditStudent = {
      id: this.student.id,
      email: this.student.email,
      name: this.student.name,
      surname: this.student.surname,
      gender: this.student.gender,
      citizenship: this.student.citizenship,
      campus: this.student.campus,
      tagList: this.student.tagList,
      birthDate: this.student.birthDate,
      phone: this.student.phone,
      localFaculty: this.student.localFaculty,
      about: this.student.about,
      role: this.role,
      archived: !this.student.archived,

      foreignStudent: {
        homeCountry: this.student.foreignStudent.homeCountry,
        homeFaculty: this.student.foreignStudent.homeFaculty,
        homeUniversity: this.student.foreignStudent.homeUniversity,
        arrivalDateTime: this.student.foreignStudent.arrivalDateTime,
        arrivalPlace: this.student.foreignStudent.arrivalPlace,
        residencePlace: this.student.foreignStudent.residencePlace,
        address: this.student.foreignStudent.address,
        localGroup: this.student.foreignStudent.localGroup
      }
    };
    await this.authService.addStudentToArchive(USER);
  }

  reloadHandler(student: any) {
    this.student = student;
    this.isSave = false;
  }

  async deleteHandler() {
    await this.authService.deleteUser(this.student.id);
  }

}
