import { Component } from '@angular/core';
import { AuthService } from '@core/auth.service';
import data from '../../../config/dataCollections.json';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { checkData } from '../../../checkData';
import { SignBuddy } from '../../../interfaces';
import { GLOBAL_LOCALIZATION, PLACEHOLDER_LOCALIZATION } from '../../../config/constants';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-sign-up-buddy_manual',
  templateUrl: './sign-up-buddy.component.html',
  styleUrls: ['./sign-up-buddy.component.scss']
})
export class SignUpBuddyComponent {

  role = 'role_volunteer';

  error: Error;

  myForm = new FormGroup({

    name: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    about: new FormControl('', Validators.required),
    birthDate: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    localFaculty: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.pattern('[0-9]{10}')),
    surname: new FormControl('', Validators.required),
    tagName1: new FormControl('', Validators.required),
    tagName2: new FormControl('', Validators.required),
    tagName3: new FormControl('', Validators.required),
    campus: new FormControl('', Validators.required),
    citizenship: new FormControl('', Validators.required),
  });

  protected readonly HEADER: string = 'Personal information';
  protected readonly citizenshipCollection = data.citizenshipData;
  protected readonly facultyCollection = data.facultyData;
  protected readonly tagCollection = data.tagData;
  protected readonly campusCollection = data.campusData;
  protected readonly genderCollection = data.genderData;
  protected readonly PLACEHOLDER_LOCALIZATION = PLACEHOLDER_LOCALIZATION;
  protected readonly GLOBAL_LOCALIZATION = GLOBAL_LOCALIZATION;

  constructor(private auth: AuthService, private router: Router) {
  }

  async onSubmit() {
    const userSignUp: SignBuddy = {

      email: this.myForm.controls.email.value,
      password: this.myForm.controls.password.value,
      role: this.role,
      name: this.myForm.controls.name.value,
      surname: this.myForm.controls.surname.value,
      gender: this.myForm.controls.gender.value,
      tagList: [
        {name: this.myForm.controls.tagName1.value},
        {name: this.myForm.controls.tagName2.value},
        {name: this.myForm.controls.tagName3.value}
      ],
      citizenship: this.myForm.controls.citizenship.value,
      birthDate: this.myForm.controls.birthDate.value,
      phone: this.myForm.controls.phone.value,
      localFaculty: this.myForm.controls.localFaculty.value,
      about: this.myForm.controls.about.value,
      campus: checkData.campusDB(this.myForm.controls.campus.value).toUpperCase(),
      archived: false,
      foreignStudent: {}

    };

    try {
      this.auth.signUpBuddy(userSignUp)
        .then(() => {
          this.router.navigate(['/sign-up4']);
        });

    } catch (err) {
      // @ts-ignore
      this.error = err.error.message;

    }
  }
}

