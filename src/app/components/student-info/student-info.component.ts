import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '@core/auth.service';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { checkData } from '../../checkData';
import { GLOBAL_LOCALIZATION, PLACEHOLDER_LOCALIZATION } from '../../config/constants';
import { EditStudent } from '../../interfaces';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.scss']
})
export class StudentInfoComponent implements OnInit {

  @Input() studentInfo: EditStudent;

  @Input() isShowName = true;
  @Input() isAssign = false;
  @Input() isTaken = false;

  @Output() deny: EventEmitter<any> = new EventEmitter();
  @Output() assign: EventEmitter<number> = new EventEmitter();

  position = 1;

  isShowPopUp = false;

  protected readonly disabled = true;
  protected readonly TITLE: string = 'Are you sure you want to take?';
  protected readonly checkData = checkData;
  protected readonly PLACEHOLDER_LOCALIZATION = PLACEHOLDER_LOCALIZATION;
  protected readonly GLOBAL_LOCALIZATION = GLOBAL_LOCALIZATION;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
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


  // Запрос на формирование пары по id студента
  async onSubmit() {
    await this.authService.matchWith(this.studentInfo.id);
    this.router.navigate(['/buddy/my_students']).then(() => {
      window.location.reload();
    });
  }

}
