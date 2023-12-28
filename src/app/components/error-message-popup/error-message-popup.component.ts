import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GLOBAL_LOCALIZATION } from '../../config/constants';
import { ERROR_MESSAGE_LOCALIZATION } from './config/constants';

@Component({
  selector: 'error-message-popup',
  templateUrl: './error-message-popup.component.html',
  styleUrls: ['./error-message-popup.component.scss']
})
export class ErrorMessagePopupComponent {

  @Output() deny: EventEmitter<any> = new EventEmitter();

  @Output() accept: EventEmitter<any> = new EventEmitter();

  protected readonly GLOBAL_LOCALIZATION = GLOBAL_LOCALIZATION;

  protected readonly ERROR_MESSAGE_LOCALIZATION = ERROR_MESSAGE_LOCALIZATION;
}
