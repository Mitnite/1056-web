import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import data from '../../../config/dataCollections.json';
import { Router } from '@angular/router';
import { checkData } from '../../../checkData';
import { SignStudent } from '../../../interfaces';
import { GLOBAL_LOCALIZATION, PLACEHOLDER_LOCALIZATION } from '../../../config/constants';

@Component({
    selector: 'app-sign-up-student',
    templateUrl: './sign-up-student.component.html',
    styleUrls: ['./sign-up-student.component.scss']
})
export class SignUpStudentComponent {

    role = 'ROLE_FOREIGN_STUDENT';
    error: Error;

    myStudentForm = new FormGroup({

        name: new FormControl('', Validators.required),
        email: new FormControl('', [
            Validators.required,
            Validators.email
        ]),
        about: new FormControl('', Validators.required),
        birthDate: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        gender: new FormControl('', Validators.required),
        localFaculty: new FormControl('', Validators.required),
        phone: new FormControl('', Validators.required),
        surname: new FormControl('', Validators.required),
        tagName1: new FormControl('', Validators.required),
        tagName2: new FormControl('', Validators.required),
        tagName3: new FormControl('', Validators.required),
        campus: new FormControl('', Validators.required),
        citizenship: new FormControl('', Validators.required),
        localGroup: new FormControl('', Validators.required),
        homeUniversity: new FormControl('', Validators.required),

        arrivalDate: new FormControl('', Validators.required),
        arrivalTime: new FormControl('', Validators.required),
        arrivalPlace: new FormControl('', Validators.required),
        placeOfResidence: new FormControl('', Validators.required),
        address: new FormControl('', Validators.required),

    });

    protected readonly HEADER: string = 'Personal information';
    protected readonly HEADER_2: string = 'Arrival & residence';
    protected readonly PLACEHOLDER_LOCALIZATION = PLACEHOLDER_LOCALIZATION;
    protected readonly GLOBAL_LOCALIZATION = GLOBAL_LOCALIZATION;
    protected readonly genderCollection = data.genderData;
    protected readonly citizenshipCollection = data.citizenshipData;
    protected readonly facultyCollection = data.facultyData;
    protected readonly tagCollection = data.tagData;
    protected readonly localGroupCollection = data.localGroupData;
    protected readonly residenceCollection = data.residenceData;
    protected readonly campusCollection = data.campusData;

    constructor(private auth: AuthService, private router: Router) {
    }

    async onSubmit() {

        const time: string[] = this.myStudentForm.controls.arrivalTime.value.split('');
        const arrivalDate: string = this.myStudentForm.controls.arrivalDate.value + ' ' + `${time[0]}${time[1]}:${time[2]}${time[3]}`;
        const userSignUp: SignStudent = {
            email: this.myStudentForm.controls.email.value,
            password: this.myStudentForm.controls.password.value,
            role: this.role,
            name: this.myStudentForm.controls.name.value,
            surname: this.myStudentForm.controls.surname.value,
            gender: this.myStudentForm.controls.gender.value,
            tagList: [
                {name: this.myStudentForm.controls.tagName1.value},
                {name: this.myStudentForm.controls.tagName2.value},
                {name: this.myStudentForm.controls.tagName3.value}
            ],
            birthDate: this.myStudentForm.controls.birthDate.value,
            phone: this.myStudentForm.controls.phone.value,
            localFaculty: this.myStudentForm.controls.localFaculty.value,
            about: this.myStudentForm.controls.about.value,
            campus: checkData.campusDB(this.myStudentForm.controls.campus.value).toUpperCase(),
            citizenship: this.myStudentForm.controls.citizenship.value,

            foreignStudent: {
                homeCountry: this.myStudentForm.controls.citizenship.value,
                homeFaculty: '',
                homeUniversity: this.myStudentForm.controls.homeUniversity.value,
                arrivalDateTime: arrivalDate,
                arrivalPlace: this.myStudentForm.controls.arrivalPlace.value,
                residencePlace: checkData.placeOfResidenceDB(this.myStudentForm.controls.placeOfResidence.value).toUpperCase(),
                address: this.myStudentForm.controls.address.value,
                localGroup: checkData.localGroupDB(this.myStudentForm.controls.localGroup.value).toUpperCase(),
                isMatched: 'not_matched'
            }
        };
        try {
            this.auth.signUpStudent(userSignUp)
                .then(() => {
                    this.router.navigate(['/sign-up4']);
                });
        } catch (err) {
            // @ts-ignore
            this.error = err.error.message;
        }
    }


}
