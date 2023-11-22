import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GLOBAL_LOCALIZATION, POPUP_LOCALIZATION } from '../../config/constants';

@Component({
    selector: 'app-popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.scss']
})
export class PopupComponent {
    @Output() deny: EventEmitter<any> = new EventEmitter();

    @Output() accept: EventEmitter<any> = new EventEmitter();

    @Input() title: string;

    protected readonly GLOBAL_LOCALIZATION = GLOBAL_LOCALIZATION;
    protected readonly POPUP_LOCALIZATION = POPUP_LOCALIZATION;
}
