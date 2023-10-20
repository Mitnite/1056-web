import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/auth.service';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { checkData } from '../../../../checkData';
import data from '../../dataCollections.json';
import { UpdatePopup } from '../../../../textIntoBlock';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileStudentComponent implements OnInit {

  phoneMask = ' (000) 000-00-00';
  phonePrefix = '+7';
  genderCollection = data.genderData;
  citizenshipCollection = data.citizenshipData;
  facultyCollection = data.facultyData;
  tagCollection = data.tagData;
  localGroupCollection = data.localGroupData;
  residenceCollection = data.residenceData;
  campusCollection = data.campusData;
  about = '';
  phone = '';
  birthDate = '';
  email = '';
  gender = '';
  localFaculty = '';
  name = '';
  surname = '';
  tagName1 = '';
  tagName2 = '';
  tagName3 = '';
  campus = '';
  localGroup = '';
  residencePlace = '';
  citizenship = '';
  homeFaculty = '';
  homeUniversity = '';
  arrivalDate = '';
  arrivalPlace = '';
  arrivalNote = '';
  residenceNote = '';
  role = 'role_volunteer';
  tagList: any[];
  address = '';
  isShowPopUp = false;
  title = UpdatePopup;
  private USER_ID;

  constructor(private authService: AuthService,
              private cookieService: CookieService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.USER_ID = this.cookieService.get('user-id');
    this.loadData();
  }

  async loadData() {
    const userInfo = await this.authService.getById(this.USER_ID);
    this.about = userInfo.about;
    this.birthDate = userInfo.birthDate;
    this.localFaculty = userInfo.localFaculty;
    this.email = userInfo.email;
    this.gender = checkData.gender(userInfo.gender);
    this.name = userInfo.name;
    this.surname = userInfo.surname;
    this.campus = checkData.campus(userInfo.campus);
    this.localGroup = checkData.localGroup(userInfo.foreignStudent.localGroup);
    this.citizenship = userInfo.citizenship;
    this.homeUniversity = userInfo.foreignStudent.homeUniversity;
    this.tagName1 = userInfo.tagList[0].name;
    this.tagName2 = userInfo.tagList[1].name;
    this.tagName3 = userInfo.tagList[2].name;

    this.homeFaculty = userInfo.foreignStudent.homeFaculty;
    this.homeUniversity = userInfo.foreignStudent.homeUniversity;
    this.arrivalDate = userInfo.foreignStudent.arrivalDateTime;
    this.arrivalPlace = userInfo.foreignStudent.arrivalPlace;
    this.residencePlace = userInfo.foreignStudent.residencePlace;
    this.address = userInfo.foreignStudent.address;



  }

  async onSubmit() {
    const editStudent = {
      email: this.email,
      name: this.name,
      surname: this.surname,
      gender: this.gender,
      tagList: [
        {name: this.tagName1},
        {name: this.tagName2},
        {name: this.tagName3},
      ],
      role: this.role,
      birthDate: this.birthDate,
      phone: this.phone,
      localFaculty: this.localFaculty,
      about: this.about,
      campus: checkData.campusDB(this.campus).toUpperCase(),
      citizenship: this.citizenship,
      foreignStudent: {
        homeCountry: this.citizenship,
        homeFaculty: this.homeFaculty,
        homeUniversity: this.homeUniversity,
        arrivalDateTime: this.arrivalDate,
        arrivalPlace: this.arrivalPlace,
        residencePlace: this.residencePlace.toUpperCase(),
        localGroup:  checkData.localGroupDB(this.localGroup).toUpperCase(),
        address: this.address
      }
    };
    const result = await this.authService.editStudent(editStudent);
    await this.router.navigate(['/foreign_student/profile']);
  }
}
