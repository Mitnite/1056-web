import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '@core/auth.service';
import { EditBuddy, EditStudent, IBuddyTable } from '../../../../interfaces';
import { GLOBAL_LOCALIZATION, PLACEHOLDER_LOCALIZATION, POPUP_LOCALIZATION } from '../../../../config/constants';

@Component({
    selector: 'app-buddy-table',
    templateUrl: './buddy-table.component.html',
    styleUrls: ['./buddy-table.component.scss']
})
export class BuddyTableComponent implements OnInit {

    @Input() isEmail: boolean;
    @Input() isArchive: boolean;
    @Input() isEdit: boolean;
    @Output() reload: EventEmitter<any> = new EventEmitter();
    @Input() isExcel: boolean;
    @Input() isAddBuddy: boolean;

    @Output() BuddyId: EventEmitter<number> = new EventEmitter();

    buddyInfo: EditBuddy | null = null;
    studentInfo: EditStudent | null = null;

    buddies: IBuddyTable[] = [];

    isShowStudentInfo = false;

    isShowBuddyInfo = false;
    index = -1;

    buddyID = 0;

    isShowTable = false;

    isShowMessage = false;

    protected readonly GLOBAL_LOCALIZATION = GLOBAL_LOCALIZATION;
    protected readonly PLACEHOLDER_LOCALIZATION = PLACEHOLDER_LOCALIZATION;
    protected readonly POPUP_LOCALIZATION = POPUP_LOCALIZATION;
    protected readonly STUDENT: string = '';
    protected readonly ASSIGN_STUDENT: string = 'Assign student';
    protected readonly NUMBER_OF_IS: string = 'Number of is';

    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {
        this.getData();
    }

    getData() {
        this.authService.getAllBuddy()
            .then((response) => {
                this.buddies = response;
            });
    }

    isShowStudentInfoHandler(id: number) {
        this.isShowStudentInfo = true;
        this.authService.getById(id)
            .then((response) => {
                this.studentInfo = response;
            });
    }

    isShowBuddyInfoHandler(id: number) {
        this.isShowBuddyInfo = true;
        this.authService.getById(id)
            .then((response) => {
                this.buddyInfo = response;
            });
    }

    setIdHandler(i: number, id: number) {
        this.index = i;
        this.buddyID = id;
        this.reload.emit(id);
    }

    showTable(index: number) {
        this.buddyID = index;
        this.isShowTable = true;
    }

    showMessage(id: number) {
        this.buddyID = id;
        this.isShowMessage = true;
    }

    addStudent(StudentId: number) {
        this.isShowTable = false;
        this.authService.matchBuddyStudent(StudentId, this.buddyID)
            .then(() => {
                this.getData();
            });
    }

    buddyIdHandler() {
        this.BuddyId.emit(this.buddyID);
    }


}
