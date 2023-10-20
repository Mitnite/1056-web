import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth.service';
import { SessionStoreService } from '@core/session-store/session-store.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  typePassword = 'password';

  email: string;
  password: string;
  path = '';
  error = '';
  constructor(private router: Router,
              private auth: AuthService,
              private sessionStore: SessionStoreService) {



  }



  ngOnInit(): void {
  }

  setPath(role) {
    if (role === 'ROLE_VOLUNTEER') {
      this.path = '/buddy/dashboard';
    } else if (role === 'ROLE_FOREIGN_STUDENT') {
      this.path = '/foreign_student/dashboard';
    } else if (role === 'ROLE_ADMIN') {
      this.path = '/admin/dashboard';
    }
  }

  goToMainPage() {
    this.router.navigate([this.path]);
  }

  async onSubmit() {
    const user = {
      username: this.email,
      password: this.password,
    };

    try {
      const result = await this.auth.login(user);
      this.sessionStore.setSession(result);
      const session = this.sessionStore.getSession();
      this.setPath(this.sessionStore.session.roles[0]);
      this.goToMainPage();
    }
    catch (err) {
      this.error = 'Invalid username or password';
    }


  }

}
