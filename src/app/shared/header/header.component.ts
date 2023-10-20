import { Component, Input, OnInit } from '@angular/core';
import { SessionStoreService } from '@core/session-store/session-store.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { AuthService } from '@core/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  name = '';
  surname = '';
  role = '';
  routerLink = '';
  isShowProfile = false;
  gender = '';
  private USER_ID;

  constructor(private authService: AuthService, private sessionStore: SessionStoreService, private router: Router, private cookieService: CookieService) {
  }

  ngOnInit(): void {
    if (this.cookieService.get('user-id')) {
      this.USER_ID = this.cookieService.get('user-id');
      this.loadData();
      this.isShowProfile = true;
    } else {
      this.isShowProfile = false;
    }

  }

  setRole(role) {
    if (role.toUpperCase() === 'ROLE_VOLUNTEER') {
      this.role = 'Buddy';
      this.routerLink = '/buddy/dashboard';
    } else if (role.toUpperCase() === 'ROLE_FOREIGN_STUDENT') {
      this.role = 'Student';
      this.routerLink = '/foreign_student/dashboard';
    } else if (role.toUpperCase() === 'ROLE_ADMIN') {
      this.role = 'Administrator';
      this.routerLink = '/admin/dashboard';
    }
  }

  async loadData() {
    const userInfo = await this.authService.getById(this.USER_ID);
    this.setRole(userInfo.role);
    this.name = userInfo.name;
    this.surname = userInfo.surname;
    this.gender = userInfo.gender;
  }

  onLogoClick() {
    this.router.navigate([`${this.routerLink}`]);
  }

  logout() {
    this.sessionStore.clearSession();
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });

  }

}
