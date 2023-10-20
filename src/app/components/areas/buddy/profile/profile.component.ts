import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/auth.service';
import { CookieService } from 'ngx-cookie';
import { checkData } from '../../../../checkData';

@Component({
  selector: 'app-buddy-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileBuddyComponent implements OnInit {

  disabled = true;
  checked = true;
  typePassword = 'password';
  typeNumber = 'number';
  phoneMask = ' (000) 000-00-00';
  phonePrefix = '+7';

  about = '';
  birthDate = '';
  localFaculty = '';
  campus = '';
  citizenship = '';
  phone = '';
  email = '';
  gender = '';
  name = '';
  surname = '';
  tagList: any[];
  isLoading = true;
  private USER_ID;

  constructor(private authService: AuthService,
              private cookieService: CookieService) {
  }

  ngOnInit(): void {
    this.USER_ID = this.cookieService.get('user-id');
    this.loadData();
  }

  async loadData() {
    const userInfo = await this.authService.getById(this.USER_ID);
    this.isLoading = false;
    this.about = userInfo.about;
    this.birthDate = checkData.birthDate(userInfo.birthDate);
    this.localFaculty = userInfo.localFaculty;
    this.phone = userInfo.phone;
    this.email = userInfo.email;
    this.gender = checkData.gender(userInfo.gender);
    this.campus = checkData.campus(userInfo.campus);
    this.citizenship = userInfo.citizenship;
    this.name = userInfo.name;
    this.surname = userInfo.surname;
    this.tagList = userInfo.tagList;
  }

}
