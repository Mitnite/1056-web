import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/auth.service';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { checkData } from '../../../checkData';
import data from '../../../config/dataCollections.json';
import { IArrivalInfo } from '../../../interfaces';
import { GLOBAL_LOCALIZATION, PLACEHOLDER_LOCALIZATION, POPUP_LOCALIZATION } from '../../../config/constants';

@Component({
    selector: 'app-edit-arrival',
    templateUrl: './edit-arrival.component.html',
    styleUrls: ['./edit-arrival.component.scss']
})
export class EditArrivalComponent implements OnInit {

    studentInfo: IArrivalInfo | null = null;

    isShowPopUp = false;
    arrivalDate: string | null = null;
    arrivalTime: string | null = null;
    residencePlace: string | null = null;
    isShowErrorPopup = false;
    protected readonly TITLE = POPUP_LOCALIZATION.UPDATE_POPUP;
    protected readonly residenceCollection = data.residenceData;
    protected readonly HEADER: string = 'Edit my arrival & residence';
    protected readonly PLACEHOLDER_LOCALIZATION = PLACEHOLDER_LOCALIZATION;
    protected readonly GLOBAL_LOCALIZATION = GLOBAL_LOCALIZATION;

    private readonly USER_ID: string;

    constructor(private authService: AuthService,
                private cookieService: CookieService,
                private router: Router) {
        this.USER_ID = this.cookieService.get('user-id');
    }

    ngOnInit(): void {
        this.authService.getById(this.USER_ID)
            .then((response) => {
                this.studentInfo = {
                    arrivalDateTime: response.foreignStudent.arrivalDateTime,
                    arrivalPlace: response.foreignStudent.arrivalPlace,
                    residencePlace: response.foreignStudent.residencePlace,
                    address: response.foreignStudent.address,
                };
                this.arrivalDate = this.studentInfo.arrivalDateTime.split(' ')[0];
                this.arrivalTime = this.studentInfo.arrivalDateTime.split(' ')[1];
                this.residencePlace = checkData.placeOfResidence(this.studentInfo.residencePlace);
            })
        ;
    }

    onSubmit() {
        this.isShowPopUp = false;
        const time = this.arrivalTime.replace(':', '').split('');
        this.studentInfo = {
            ...this.studentInfo,
            residencePlace: checkData.placeOfResidenceDB(this.residencePlace),
            arrivalDateTime: `${this.arrivalDate} ${time[0]}${time[1]}:${time[2]}${time[3]}`,
        };
        this.authService.editStudentArrival(this.studentInfo)
            .then(() => {
                this.router.navigate(['/foreign_student/profile']);
            })
          .catch(() => this.isShowErrorPopup = true);
    }
}
