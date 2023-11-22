import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/auth.service';
import { CookieService } from 'ngx-cookie';
import data from '../../../config/dataCollections.json';
import { Router } from '@angular/router';
import { checkData } from '../../../checkData';
import { GLOBAL_LOCALIZATION, PLACEHOLDER_LOCALIZATION, POPUP_LOCALIZATION } from '../../../config/constants';
import { EditBuddy } from '../../../interfaces';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  buddyInfo: EditBuddy | null = null;
  gender: string | null = null;
  campus: string | null = null;
  tagName1: string | null = null;
  tagName2: string | null = null;
  tagName3: string | null = null;

  isShowPopUp = false;

  protected readonly HEADER: string = 'Edit my profile';
  protected readonly POPUP_LOCALIZATION = POPUP_LOCALIZATION;
  protected readonly PLACEHOLDER_LOCALIZATION = PLACEHOLDER_LOCALIZATION;
  protected readonly GLOBAL_LOCALIZATION = GLOBAL_LOCALIZATION;

  protected readonly genderCollection  = data.genderData;
  protected readonly campusCollection = data.campusData;
  protected readonly citizenshipCollection = data.citizenshipData;
  protected readonly tagCollection = data.tagData;
  protected readonly facultyCollection = data.facultyData;

  private readonly USER_ID: string;

  constructor(private authService: AuthService,
              private cookieService: CookieService,
              private router: Router) {
    this.USER_ID = this.cookieService.get('user-id');
  }

  ngOnInit(): void {
    this.authService.getById(this.USER_ID)
        .then((response) => {
          this.buddyInfo = response;
          this.gender = checkData.gender( this.buddyInfo.gender);
          this.campus = checkData.campus( this.buddyInfo.campus);
          this.tagName1 =  this.buddyInfo.tagList[0].name;
          this.tagName2 =  this.buddyInfo.tagList[1].name;
          this.tagName3 =  this.buddyInfo.tagList[2].name;
        });
  }

  async onSubmit() {

    this.buddyInfo = {
      ...this.buddyInfo,
      gender: this.gender.toLowerCase(),
      campus: checkData.campusDB(this.campus),
      tagList: [
        {name: this.tagName1},
        {name: this.tagName2},
        {name: this.tagName3},
      ]
    };

    this.authService.editBuddy(this.buddyInfo)
        .then(() => {
          this.router.navigate(['/buddy/profile']);
        });
  }
}

