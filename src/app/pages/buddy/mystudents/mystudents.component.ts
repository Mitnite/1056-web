import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/auth.service';
import { Router } from '@angular/router';
import { EditStudent } from '../../../interfaces';
import {
    DELETE_MATCH_LOCALIZATION,
    EMAIL_LOCALIZATION,
    GLOBAL_LOCALIZATION,
    PLACEHOLDER_LOCALIZATION
} from '../../../config/constants';
import { MY_STUDENTS_LOCALIZATION } from './config/constants';

@Component({
    selector: 'app-mystudents',
    templateUrl: './mystudents.component.html',
    styleUrls: ['./mystudents.component.scss']
})
export class MyStudentsComponent implements OnInit {

    students: EditStudent[] = [];
    studentInfo: EditStudent | null = null;

    studentID = -1;
    isShowPopUp = false;
    date: Date[] = [];
    isShowMessage = true;
    protected readonly currentDate: Date = new Date();

    protected readonly DELETE_MATCH_LOCALIZATION = DELETE_MATCH_LOCALIZATION;
    protected readonly EMAIL_LOCALIZATION = EMAIL_LOCALIZATION;
    protected readonly MY_STUDENTS_LOCALIZATION = MY_STUDENTS_LOCALIZATION;
    protected readonly PLACEHOLDER_LOCALIZATION = PLACEHOLDER_LOCALIZATION;
    protected readonly GLOBAL_LOCALIZATION = GLOBAL_LOCALIZATION;

    constructor(private authService: AuthService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.authService.getListMine()
            .then((response) => {
                this.students = response;
                for (let i = 0; i < this.students.length; i++) {
                    this.date[i] = new Date(this.students[i].foreignStudent.arrivalDateTime);
                }
            });
    }

    async acceptHandler(id: number) {
        const result = await this.authService.meetStudent(id);
        this.router.navigate(['/buddy/my_students']).then(() => {
            window.location.reload();
        });
    }


    onInfoStudent(student: EditStudent) {
        this.studentInfo = student;
        this.studentID = student.id;
    }

    findStudents(name: string): boolean {
        const find = this.students && this.students.find((student) => student.foreignStudent.isMatched === name);
        return !!find;
    }


}
