import { Component } from '@angular/core';
import { timeout } from 'rxjs';
import { enableProdMode } from '@angular/core';

enableProdMode();
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  inputValue: string;

  constructor() {

  }
  onInput(event: any) {
    console.log('Event', event);
    this.inputValue = event.target.value;
  }
  onClick() {
    console.log('Click');
  }

}

