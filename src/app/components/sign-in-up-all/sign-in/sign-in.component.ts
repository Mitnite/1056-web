import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth.service';
import { SessionStoreService } from '@core/session-store/session-store.service';
import { GLOBAL_LOCALIZATION, PLACEHOLDER_LOCALIZATION } from '../../../config/constants';
import { User } from '../../../interfaces';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
    typePassword = 'password';

    email: string | null = null;
    password: string | null = null;
    path: string | null = null;
    error: string | null = null;

    protected readonly HEADER: string = 'Sign in';
    protected readonly DESCRIPTION: string = 'Register if you don\'t have an account.';
    protected readonly PLACEHOLDER_LOCALIZATION = PLACEHOLDER_LOCALIZATION;
    protected readonly GLOBAL_LOCALIZATION = GLOBAL_LOCALIZATION;

    constructor(private router: Router,
                private auth: AuthService,
                private sessionStore: SessionStoreService) {
    }


    setPath(role: string) {
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
        const user: User = {
            username: this.email,
            password: this.password,
        };

        try {
            const result = await this.auth.login(user);
            this.sessionStore.setSession(result);
            const session = this.sessionStore.getSession();
            this.setPath(this.sessionStore.session.roles[0]);
            this.goToMainPage();
        } catch (err) {
            this.error = 'Invalid username or password';
        }


    }

}
