import { Component, EventEmitter, Output } from '@angular/core';
import { GLOBAL_LOCALIZATION, PLACEHOLDER_LOCALIZATION } from 'src/app/config/constants';
import { AbstractControl, FormControl, FormGroup, isFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
/* tslint:disable */
@Component({
  selector: 'update-password-popup',
  templateUrl: './update-password-popup.component.html',
  styleUrls: ['./update-password-popup.component.scss']
})
export class UpdatePasswordPopupComponent {
  @Output() deny: EventEmitter<any> = new EventEmitter();

  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const pass = group.get('password').value;
    const confirmPass = group.get('confirmPass').value;
    return pass === confirmPass ? null : {notSame: true};
  };

  changePasswordForm = new FormGroup({

    oldPassword: new FormControl(null, Validators.required),
    passwords: new FormGroup({
      password: new FormControl(null, Validators.required),
      confirmPass: new FormControl(null, Validators.required),
    }, {validators: this.checkPasswords})
  });

  protected readonly GLOBAL_LOCALIZATION = GLOBAL_LOCALIZATION;
  protected readonly PLACEHOLDER_LOCALIZATION = PLACEHOLDER_LOCALIZATION;
  protected readonly OLD_PASSWORD: string = 'Old password';
  protected readonly NEW_PASSWORD: string = 'New password';
  protected readonly CONFIRM_PASSWORD: string = 'Confirm password';
  onSubmit() {
    console.log(this.changePasswordForm.value);
  }


}
