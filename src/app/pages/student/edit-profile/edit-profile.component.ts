import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/auth.service';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { checkData } from '../../../checkData';
import data from '../../../config/dataCollections.json';
import { EditStudent } from '../../../interfaces';
import {GLOBAL_LOCALIZATION, PLACEHOLDER_LOCALIZATION, POPUP_LOCALIZATION} from '../../../config/constants';

@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileStudentComponent implements OnInit {

    studentInfo: EditStudent | null = null;

    gender: string | null = null;
    campus: string | null = null;
    localGroup: string | null = null;
    tagName1: string | null = null;
    tagName2: string | null = null;
    tagName3: string | null = null;

    isShowPopUp = false;

    protected readonly genderCollection = data.genderData;
    protected readonly citizenshipCollection = data.citizenshipData;
    protected readonly facultyCollection = data.facultyData;
    protected readonly tagCollection = data.tagData;
    protected readonly localGroupCollection = data.localGroupData;
    protected readonly campusCollection = data.campusData;

    protected readonly PLACEHOLDER_LOCALIZATION = PLACEHOLDER_LOCALIZATION;
    protected readonly GLOBAL_LOCALIZATION = GLOBAL_LOCALIZATION;
    protected readonly TITLE: string = POPUP_LOCALIZATION.UPDATE_POPUP;

    protected readonly HEADER: string = 'Edit my profile';

    private readonly USER_ID: string;

    constructor(private authService: AuthService,
                private cookieService: CookieService,
                private router: Router) {
        this.USER_ID = this.cookieService.get('user-id');
    }

    ngOnInit(): void {
        this.authService.getById(this.USER_ID)
            .then((response) => {
                this.studentInfo = response;
                this.gender = checkData.gender(this.studentInfo.gender);
                this.campus = checkData.campus(this.studentInfo.campus);
                this.localGroup = checkData.localGroup(this.studentInfo.foreignStudent.localGroup);
                this.tagName1 = this.studentInfo.tagList[0].name;
                this.tagName2 = this.studentInfo.tagList[1].name;
                this.tagName3 = this.studentInfo.tagList[2].name;
            });
    }

    onSubmit() {
        this.studentInfo = {
            ...this.studentInfo,
            gender: this.gender.toLowerCase(),
            campus: checkData.campusDB(this.campus),
            foreignStudent: {
                ...this.studentInfo.foreignStudent,
                localGroup: checkData.localGroupDB(this.localGroup)
            },
            tagList: [
                {name: this.tagName1},
                {name: this.tagName2},
                {name: this.tagName3},
            ]
        };

        this.authService.editStudent(this.studentInfo)
            .then(() => {
                this.router.navigate(['/foreign_student/profile']);
            });
    }
}
