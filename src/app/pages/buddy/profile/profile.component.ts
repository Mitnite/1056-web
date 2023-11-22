import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/auth.service';
import { CookieService } from 'ngx-cookie';
import { checkData } from '../../../checkData';
import { EditBuddy } from '../../../interfaces';
import { PLACEHOLDER_LOCALIZATION } from '../../../config/constants';

@Component({
    selector: 'app-buddy-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileBuddyComponent implements OnInit {

    buddyInfo: EditBuddy | null = null;

    protected readonly PLACEHOLDER_LOCALIZATION = PLACEHOLDER_LOCALIZATION;
    protected readonly checkData = checkData;
    protected readonly TITLE: string = 'Buddy profile';
    protected readonly disabled = true;
    private readonly USER_ID: string;

    constructor(private authService: AuthService,
                private cookieService: CookieService) {
        this.USER_ID = this.cookieService.get('user-id');
    }

    ngOnInit(): void {
        this.authService.getById(this.USER_ID)
            .then((response) => {
                this.buddyInfo = response;
            });
    }
}
