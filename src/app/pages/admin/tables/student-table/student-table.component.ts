import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '@core/auth.service';
import { EditBuddy, EditStudent, IStudentTable } from '../../../../interfaces';
import { GLOBAL_LOCALIZATION, PLACEHOLDER_LOCALIZATION, POPUP_LOCALIZATION } from '../../../../config/constants';

@Component({
    selector: 'app-student-table',
    templateUrl: './student-table.component.html',
    styleUrls: ['./student-table.component.scss']
})
export class StudentTableComponent implements OnInit {

    @Input() isEmail: boolean;
    @Input() isArchive: boolean;
    @Input() isEdit: boolean;
    @Output() reload: EventEmitter<number> = new EventEmitter();

    @Input() isAddStudent: boolean;
    @Output() studentId: EventEmitter<number> = new EventEmitter();

    buddyInfo: EditBuddy | null = null;
    studentInfo: EditStudent | null = null;
    students: IStudentTable[] = [];

    isShowStudentInfo = false;
    isShowBuddyInfo = false;

    index = -1;
    studentID = 0;
    isShowTable = false;
    isShowMessage = false;

    protected readonly GLOBAL_LOCALIZATION = GLOBAL_LOCALIZATION;
    protected readonly PLACEHOLDER_LOCALIZATION = PLACEHOLDER_LOCALIZATION;
    protected readonly POPUP_LOCALIZATION = POPUP_LOCALIZATION;
    protected readonly BUDDY: string = 'Buddy';
    protected readonly ASSIGN_BUDDY: string = 'Assign buddy';

    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {
        this.getData();
    }

    getData() {
        this.authService.getAllStudent()
            .then((response) => {
                this.students = response;
            })
            .then(() => {
                for (const student of this.students) {
                    if (student.foreignStudent.volunteerId) {
                        this.authService.getById(student.foreignStudent.volunteerId)
                            .then((response) => {
                                student.buddyInfo = response;
                            });
                    }
                }
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

    addBuddy(idBuddy: number) {
        this.isShowTable = false;
        this.authService.matchBuddyStudent(this.studentID, idBuddy)
            .then(() => {
                this.getData();
            });
    }

    showTable(index: number) {
        this.studentID = index;
        this.isShowTable = true;
    }

    showMessage(id: number) {
        this.studentID = id;
        this.isShowMessage = true;
    }

    studentIdHandler() {
        this.studentId.emit(this.studentID);
    }

    setIdHandler(i: number, id: number) {
        this.index = i;
        this.studentID = id;
        this.reload.emit(id);
    }


}
