import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/auth.service';
import data from '../../areas/dataCollections.json';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { checkData } from '../../../checkData';

@Component({
  selector: 'app-sign-up-buddy_manual',
  templateUrl: './sign-up-buddy.component.html',
  styleUrls: ['./sign-up-buddy.component.scss']
})
export class SignUpBuddyComponent implements OnInit {
  phoneMask = ' (000) 000-00-00';
  phonePrefix = '+7';
  typePassword = 'password';

  citizenshipCollection = data.citizenshipData;
  facultyCollection = data.facultyData;
  tagCollection = data.tagData;
  campusCollection = data.campusData;
  genderCollection = data.genderData;

  campus = '';

  role = 'role_volunteer';

  error;

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

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
  }

  async onSubmit() {
    const userSignUp = {

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
      campus: checkData.campusDB(this.campus).toUpperCase(),
      archived: false,
      foreignStudent: {}

    };

    try {
      const result = await this.auth.signUpBuddy(userSignUp);
      this.router.navigate(['/sign-up4']);
    } catch (err) {
      // @ts-ignore
      this.error = err.error.message;

    }
  }
}

