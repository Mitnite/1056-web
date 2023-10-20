import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '@core/auth.service';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { checkData } from '../../checkData';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.scss']
})
export class StudentInfoComponent implements OnInit {

  @Input() name = '';
  @Input() isAssign = false;
  @Input() gender: string;
  @Input() localFaculty: string;
  @Input() birthDate: string;
  @Input() citizenship: string;
  @Input() homeUniversity: string;
  @Input() about: string;
  @Input() tagList: any[];
  @Input() campus: string;
  @Input() category: string;
  @Input() arrivalDate: string;
  @Input() arrivalTime: string;
  @Input() arrivalPlace: string;
  @Input() place: string;
  @Input() address: string;
  @Input() email: string;
  @Input() id;
  @Input() isTaken: boolean;
  @Output() clicked: EventEmitter<any> = new EventEmitter();
  @Output() assign: EventEmitter<any> = new EventEmitter();

  position = 1;

  disabled = true;
  checked = true;
  typePassword = 'password';
  typeNumber = 'number';
  phoneMask = ' (000) 000-00-00';
  phonePrefix = '+7';

  phone = '';
  surname = '';

  isShowPopUp = false;
  title = 'Are you sure you want to take?';
  matchingId;

  constructor(private authService: AuthService,
              private cookieService: CookieService,
              private router: Router) {
  }

  ngOnInit(): void {

    this.category = checkData.localGroup(this.category);

    this.place = checkData.placeOfResidence(this.place);

    this.campus = checkData.campus(this.campus);
  }

  subtractPositionHandler() {
    if (this.position !== 2) {
      this.position = this.position + 1;
    }
  }

  addPositionHandler() {
    if (this.position !== 1) {
      this.position = this.position - 1;
    }
  }

  onClick(): void {
    this.clicked.emit();
  }

  takeHandler(id: number) {
    this.matchingId = id;
    this.isShowPopUp = true;
  }

  // Запрос на формирование пары по id студента
  async onSubmit() {
    const result = await this.authService.matchWith(this.matchingId);
    this.router.navigate(['/buddy/my_students']).then(() => {
      window.location.reload();
    });
  }


}
