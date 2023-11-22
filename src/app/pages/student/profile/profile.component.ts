import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/auth.service';
import { CookieService } from 'ngx-cookie';
import { checkData } from '../../../checkData';
import { PLACEHOLDER_LOCALIZATION } from '../../../config/constants';
import { EditStudent } from '../../../interfaces';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileStudentComponent implements OnInit {

  studentInfo: EditStudent | null = null;
  disabled = true;

  protected readonly PLACEHOLDER_LOCALIZATION = PLACEHOLDER_LOCALIZATION;
  protected readonly INFORMATION_TITLE: string = 'Personal information';
  protected readonly ARRIVAL_TITLE: string = 'Arrival & residence';
  protected readonly TITLE: string = 'Student profile';
  protected readonly checkData = checkData;
  private readonly USER_ID: string;

  constructor(private authService: AuthService,
              private cookieService: CookieService) {
    this.USER_ID = this.cookieService.get('user-id');
  }
  ngOnInit(): void {
    this.authService.getById(this.USER_ID)
      .then((response) => {
      this.studentInfo = response;
    });
  }
}
