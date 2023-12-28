import { Component, ElementRef, ViewChild } from '@angular/core';
import { ExportService } from '@core/export.service';
import { EditStudent } from '../../../../../interfaces';
import { AuthService } from '@core/auth.service';
import { GLOBAL_LOCALIZATION, POPUP_LOCALIZATION } from '../../../../../config/constants';

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
    studentInfo: EditStudent | null = null;
    search: string | null = null;

    @ViewChild('internationalStudentTable') userTable: ElementRef;

    protected readonly HEADER: string = 'All international students';
    protected readonly POPUP_LOCALIZATION = POPUP_LOCALIZATION;
    protected readonly GLOBAL_LOCALIZATION = GLOBAL_LOCALIZATION;

    constructor(
        private exportService: ExportService,
        private authService: AuthService,
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

    acceptHandler() {
        this.addToArchive = false;
        this.studentInfo.archived = !this.studentInfo.archived;
        this.authService.addStudentToArchive(this.studentInfo)
            .then(() => {
                window.location.reload();
            });
    }

    reloadHandler(id: number) {
        this.authService.getById(id)
            .then((response) => {
                this.studentInfo = response;
            });
    }

    deleteHandler() {
        this.authService.deleteUser(this.studentInfo.id)
            .then(() => {
                window.location.reload();
            });
    }
}
