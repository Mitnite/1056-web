import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/auth.service';
import { CookieService } from 'ngx-cookie';
import { checkData } from '../../../../checkData';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileStudentComponent implements OnInit {

  disabled = true;
  checked = true;
  typePassword = 'password';
  typeNumber = 'number';
  phoneMask = ' (000) 000-00-00';
  phonePrefix = '+7';
  name = '';
  surname = '';
  about = '';
  birthDate = '';
  email = '';
  gender = '';
  localFaculty = '';
  campus = '';
  localGroup = '';
  residencePlace = '';
  homeCountry = '';
  homeFaculty = '';
  homeUniversity = '';
  arrivalDate = '';
  arrivalTime = '';
  arrivalPlace = '';
  address = '';
  tagList: any[];
  isLoading = true;
  private USER_ID;
  constructor(private authService: AuthService,
              private cookieService: CookieService) { }
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
    this.email = userInfo.email;
    this.gender = checkData.gender(userInfo.gender);
    this.name = userInfo.name;
    this.surname = userInfo.surname;
    this.tagList = userInfo.tagList;
    this.localGroup = checkData.localGroup(userInfo.foreignStudent.localGroup);
    this.homeCountry = userInfo.foreignStudent.homeCountry;
    this.homeFaculty = userInfo.foreignStudent.homeFaculty;
    this.homeUniversity = userInfo.foreignStudent.homeUniversity;
    this.arrivalDate = checkData.arrivalDate(userInfo.foreignStudent.arrivalDateTime);
    this.arrivalTime = checkData.arrivalTime(userInfo.foreignStudent.arrivalDateTime);
    this.arrivalPlace = userInfo.foreignStudent.arrivalPlace;
    this.residencePlace = checkData.placeOfResidence(userInfo.foreignStudent.residencePlace);
    this.address = userInfo.foreignStudent.address;
    this.campus = checkData.campus(userInfo.campus);
  }

}
