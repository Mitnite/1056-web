import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up1',
  templateUrl: './sign-up1.component.html',
  styleUrls: ['./sign-up1.component.scss']
})
export class SignUp1Component implements OnInit {
  email = '';
  password = '';
  typePassword = 'password';
  constructor() { }

  ngOnInit(): void {
  }

}
