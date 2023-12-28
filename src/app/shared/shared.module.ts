import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppHeaderComponent } from './header/header.component';
import { AppFooterComponent } from './footer/footer.component';
import { AppInputComponent } from './components/ui/app-input/app-input.component';
import { AppIconComponent } from './components/ui/app-icon/app-icon.component';
import { RouterLink } from '@angular/router';
import { AppTextareaComponent } from './components/ui/app-textarea/app-textarea.component';
import { AppSlideToggleComponent } from './components/ui/app-slide-toggle/app-slide-toggle.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AppRadioButtonComponent } from './components/ui/app-radio-button/app-radio-button.component';
import { AppCheckboxComponent } from './components/ui/app-checkbox/app-checkbox.component';
import { AppMultiSelectComponent } from './components/ui/app-multi-select/app-multi-select.component';
import { MatMenuModule } from '@angular/material/menu';
import { AppFileUploadComponent } from './components/ui/app-file-upload/app-file-upload.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AppDatePickerComponent } from './components/ui/app-date-picker/app-date-picker.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMaskModule } from 'ngx-mask';
import { AutoHeightDirective } from '@shared/directives/autoheight.directive';
import { UpdatePasswordPopupComponent } from '../components/update-password-popup/update-password-popup.component';

const declarations = [
  AppHeaderComponent,
  UpdatePasswordPopupComponent,
  AppFooterComponent,
  AppInputComponent,
  AppIconComponent,
  AppTextareaComponent,
  AppSlideToggleComponent,
  AppRadioButtonComponent,
  AppCheckboxComponent,
  AppMultiSelectComponent,
  AppFileUploadComponent,
  AppDatePickerComponent,
  AutoHeightDirective
];

@NgModule({
  declarations: [
    ...declarations,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatProgressBarModule,
    MatDatepickerModule,
    NgxMaskModule.forRoot(),
  ],
  exports: [
    ...declarations,
  ]
})
export class SharedModule {
}
