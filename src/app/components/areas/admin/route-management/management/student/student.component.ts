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
    this.addToArchive = false;
    this.student.archived = !this.student.archived;
    await this.authService.addStudentToArchive(this.student);
  }

  async reloadHandler(id: number) {
    const userInfo = await this.authService.getById(id);
    this.student = userInfo;
  }

  async deleteHandler() {
    await this.authService.deleteUser(this.student.id);
  }

}
