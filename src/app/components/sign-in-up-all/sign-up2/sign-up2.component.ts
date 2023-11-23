import { Component } from '@angular/core';
import { GLOBAL_LOCALIZATION } from '../../../config/constants';

@Component({
    selector: 'app-sign-up2',
    templateUrl: './sign-up2.component.html',
    styleUrls: ['./sign-up2.component.scss']
})
export class SignUp2Component {
    protected readonly HEADER: string = 'Sign up';
    protected readonly BUDDY_TITLE: string = 'Buddy';
    protected readonly BUDDY_TEXT: string = 'Volunteer from a student organization';
    protected readonly STUDENT_TITLE: string = 'Student';
    protected readonly STUDENT_TEXT: string = 'A foreigner who studies at the HSE';
    protected readonly SELECT: string = 'Select the profile type';
    protected readonly GLOBAL_LOCALIZATION = GLOBAL_LOCALIZATION;
}
