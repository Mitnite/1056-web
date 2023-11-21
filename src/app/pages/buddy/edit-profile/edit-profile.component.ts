import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/auth.service';
import { CookieService } from 'ngx-cookie';
import data from '../../../config/dataCollections.json';
import { Router } from '@angular/router';
import { checkData } from '../../../checkData';
import { POPUP_LOCALIZATION } from '../../../config/constants';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  phoneMask = ' (000) 000-00-00';
  phonePrefix = '+7';
  genderCollection = data.genderData;
  campusCollection = data.campusData;
  citizenshipCollection = data.citizenshipData;
  tagCollection = data.tagData;
  facultyCollection = data.facultyData;

  token = '';
  about = '';
  birthDate = '';
  email = '';
  gender = '';
  localFaculty = '';
  campus = '';
  name = '';
  phone = '';
  role = 'ROLE_VOLUNTEER';
  surname = '';
  tagName1 = '';
  tagName2 = '';
  tagName3 = '';
  tagList: any[];
  citizenship = '';
  password = '';
  isShowPopUp = false;

  private readonly USER_ID: string;

  constructor(private authService: AuthService,
              private cookieService: CookieService,
              private router: Router) {
    this.USER_ID = this.cookieService.get('user-id');
  }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    const userInfo = await this.authService.getById(this.USER_ID);
    this.about = userInfo.about;
    this.birthDate = userInfo.birthDate;
    this.localFaculty = userInfo.localFaculty;
    this.citizenship = userInfo.citizenship;
    this.phone = userInfo.phone;
    this.email = userInfo.email;
    this.gender = checkData.gender(userInfo.gender);
    this.campus = checkData.campus(userInfo.campus);
    this.tagList = userInfo.tagList;
    this.tagName1 = userInfo.tagList[0].name;
    this.tagName2 = userInfo.tagList[1].name;
    this.tagName3 = userInfo.tagList[2].name;
    this.name = userInfo.name;
    this.surname = userInfo.surname;
    this.password = userInfo.password;

  }

  async onSubmit() {
    const editBuddy = {
      email: this.email,
      name: this.name,
      surname: this.surname,
      gender: this.gender,
      citizenship: this.citizenship,
      campus: checkData.campusDB(this.campus).toUpperCase(),
      tagList: [
        {name: this.tagName1},
        {name: this.tagName2},
        {name: this.tagName3}
      ],
      birthDate: this.birthDate,
      phone: this.phone,
      localFaculty: this.localFaculty,
      about: this.about,
      role: this.role,
    };
    const result = await this.authService.editBuddy(editBuddy);
    await this.router.navigate(['/buddy/profile']);

  }

  protected readonly POPUP_LOCALIZATION = POPUP_LOCALIZATION;
}

