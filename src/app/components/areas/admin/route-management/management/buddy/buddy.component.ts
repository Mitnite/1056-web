import { Component, ElementRef, ViewChild } from '@angular/core';
import { ExportService } from '@core/export.service';
import { AuthService } from '@core/auth.service';
import { CookieService } from 'ngx-cookie';
import { EditBuddy } from '../../../../../../interfaces';

@Component({
  selector: 'app-buddy_manual',
  templateUrl: './buddy.component.html',
  styleUrls: ['./buddy.component.scss']
})
export class AllBuddiesComponent {

  isArchive = false;
  isEdit = false;
  isSave = false;
  addToArchive = false;
  isDelete = false;
  name = '';
  role = 'role_volunteer';
  buddy!: EditBuddy;
  title = 'Are you sure you want to add?';
  deleteTitle = 'Are you sure you want to delete';

  @ViewChild('buddyTable') userTable: ElementRef;

  constructor(
    private exportService: ExportService,
    private authService: AuthService,
    private cookieService: CookieService,
  ) {
  }

  exportElmToExcel(): void {
    this.exportService.exportTableElmToExcel(this.userTable, 'buddyTable');
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

  async acceptHandler() {
    this.isSave = true;
    this.addToArchive = false;

    const USER: EditBuddy = {
      id: this.buddy.id,
      email: this.buddy.email,
      name: this.buddy.name,
      surname: this.buddy.surname,
      gender: this.buddy.gender,
      citizenship: this.buddy.citizenship,
      campus: this.buddy.campus,
      tagList: this.buddy.tagList,
      birthDate: this.buddy.birthDate,
      phone: this.buddy.phone,
      localFaculty: this.buddy.localFaculty,
      about: this.buddy.about,
      role: this.role,
      archived: !this.buddy.archived
    };
    await this.authService.addBuddyToArchive(USER);
  }

  reloadHandler(buddy: any) {
    this.buddy = buddy;
    this.isSave = false;
  }

  async deleteHandler() {
    await this.authService.deleteUser(this.buddy.id);
  }

}
