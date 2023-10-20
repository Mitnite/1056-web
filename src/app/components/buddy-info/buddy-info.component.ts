import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-buddy-info',
  templateUrl: './buddy-info.component.html',
  styleUrls: ['./buddy-info.component.scss']
})
export class BuddyInfoComponent implements OnInit {

  @Input() name = '';
  @Input() surname = '';
  @Input() gender: string;
  @Input() birthDate: string;
  @Input() email: string;
  @Input() phone: string;
  @Input() citizenship: string;
  @Input() campus: string;
  @Input() HSEFaculty: string;
  @Input() about: string;
  @Input() tagList: any[];
  @Input() category: string;

  @Input() isAssign = false;
  @Output() clicked: EventEmitter<any> = new EventEmitter();
  @Output() assign: EventEmitter<any> = new EventEmitter();
  position = 1;

  disabled = true;
  checked = true;
  typePassword = 'password';
  typeNumber = 'number';
  phoneMask = ' (000) 000-00-00';
  phonePrefix = '+7';



  constructor() {
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

  onClick(): void {
    this.clicked.emit();
  }
}
