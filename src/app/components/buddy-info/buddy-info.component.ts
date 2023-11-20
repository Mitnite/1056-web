import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EditBuddy } from '../../interfaces';
import { GLOBAL_LOCALIZATION, PLACEHOLDER_LOCALIZATION } from '../../config/constants';
import { checkData } from '../../checkData';

@Component({
  selector: 'app-buddy-info',
  templateUrl: './buddy-info.component.html',
  styleUrls: ['./buddy-info.component.scss']
})
export class BuddyInfoComponent implements OnInit {

  @Input() buddyInfo: EditBuddy | null = null;
  @Input() isAssign = false;

  @Output() deny: EventEmitter<any> = new EventEmitter();
  @Output() assign: EventEmitter<any> = new EventEmitter();


  position = 1;

  protected readonly PLACEHOLDER_LOCALIZATION = PLACEHOLDER_LOCALIZATION;
  protected readonly GLOBAL_LOCALIZATION = GLOBAL_LOCALIZATION;
  protected readonly disabled = true;
  protected readonly checkData = checkData;

  constructor() {
  }

  ngOnInit(): void {
  }

}
