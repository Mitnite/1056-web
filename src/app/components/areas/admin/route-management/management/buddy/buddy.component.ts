import { Component, ElementRef, ViewChild } from '@angular/core';
import { ExportService } from '@core/export.service';
import { AuthService } from '@core/auth.service';
import { CookieService } from 'ngx-cookie';
import { EditBuddy } from '../../../../../../interfaces';
import { checkData } from '../../../../../../checkData';

@Component({
  selector: 'app-buddy_manual',
  templateUrl: './buddy.component.html',
  styleUrls: ['./buddy.component.scss']
})
export class AllBuddiesComponent {

  isArchive = false;
  isEdit = false;
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
    this.addToArchive = false;
    this.buddy.archived = !this.buddy.archived;
    console.log(this.buddy);
    await this.authService.addBuddyToArchive(this.buddy);
  }

  async reloadHandler(id: number) {
    const userInfo = await this.authService.getById(id);
    this.buddy = userInfo;
  }

  async deleteHandler() {
    await this.authService.deleteUser(this.buddy.id);
  }

}
