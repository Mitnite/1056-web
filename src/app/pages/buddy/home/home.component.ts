import { Component } from '@angular/core';
import { FOOTER_LOCALIZATION } from '../../../config/constants';

@Component({
  selector: 'app-home-buddy',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeBuddyComponent {

    protected readonly FOOTER_LOCALIZATION = FOOTER_LOCALIZATION;
}
