import { Component } from '@angular/core';
import { GLOBAL_LOCALIZATION } from '../../../config/constants';

@Component({
  selector: 'app-sign-up4',
  templateUrl: './sign-up4.component.html',
  styleUrls: ['./sign-up4.component.scss']
})
export class SignUp4Component {
  protected readonly HEADER: string = 'Completion of registration';
  protected readonly TITLE: string = 'Your profile has been created';
  protected readonly TEXT: string = 'Sign in to to continue';
  protected readonly GLOBAL_LOCALIZATION = GLOBAL_LOCALIZATION;
}

