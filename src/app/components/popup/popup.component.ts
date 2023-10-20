import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {
  @Output() deny: EventEmitter<any> = new EventEmitter();

  @Output() accept: EventEmitter<any> = new EventEmitter();

  @Input() title: string;
}
