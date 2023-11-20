import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/auth.service';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { checkData } from '../../../checkData';
import data from '../../../config/dataCollections.json';
import { UpdatePopup } from '../../../textIntoBlock';

@Component({
  selector: 'app-edit-arrival',
  templateUrl: './edit-arrival.component.html',
  styleUrls: ['./edit-arrival.component.scss']
})
export class EditArrivalComponent implements OnInit {

  residenceCollection = data.residenceData;

  disabled = true;
  checked = true;
  residencePlace = '';
  arrivalDate = '';
  arrivalPlace = '';
  address = '';
  arrivalTime = '';
  isShowPopUp = false;
  timeMask = '00:00';
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
    const array = userInfo.foreignStudent.arrivalDateTime.split(' ');
    this.arrivalDate = array[0];
    this.arrivalTime = array[1];
    this.arrivalPlace = userInfo.foreignStudent.arrivalPlace;
    this.address = userInfo.foreignStudent.address;
    this.residencePlace = checkData.placeOfResidence(userInfo.foreignStudent.residencePlace);
  }

  async onSubmit() {
    const time = this.arrivalTime.replace(':', '').split('');
    const editStudent = {
      arrivalDateTime: `${this.arrivalDate} ${time[0]}${time[1]}:${time[2]}${time[3]}`,
      arrivalPlace: this.arrivalPlace,
      /*      address: this.address,
            residencePlace: this.residencePlace,*/
    };
    await this.authService.editStudentArrival(editStudent);
    await this.router.navigate(['/foreign_student/profile']);


  }
}
