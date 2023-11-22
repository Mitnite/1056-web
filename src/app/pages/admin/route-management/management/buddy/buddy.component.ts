import { Component, ElementRef, ViewChild } from '@angular/core';
import { ExportService } from '@core/export.service';
import { AuthService } from '@core/auth.service';
import { EditBuddy } from '../../../../../interfaces';
import { GLOBAL_LOCALIZATION, POPUP_LOCALIZATION } from '../../../../../config/constants';

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

    buddyInfo: EditBuddy | null = null;

    @ViewChild('buddyTable') userTable: ElementRef;

    protected readonly HEADER: string = 'All buddies';
    protected readonly POPUP_LOCALIZATION = POPUP_LOCALIZATION;
    protected readonly GLOBAL_LOCALIZATION = GLOBAL_LOCALIZATION;

    constructor(
        private exportService: ExportService,
        private authService: AuthService,
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

    acceptHandler() {
        this.addToArchive = false;
        this.buddyInfo.archived = !this.buddyInfo.archived;
        this.authService.addBuddyToArchive(this.buddyInfo)
            .then(() => {
                window.location.reload();
            });
    }

    reloadHandler(id: number) {
        this.authService.getById(id)
            .then((response) => {
                this.buddyInfo = response;
            });
    }

    deleteHandler() {
        this.authService.deleteUser(this.buddyInfo.id)
            .then(() => {
                window.location.reload();
            });
    }

}
