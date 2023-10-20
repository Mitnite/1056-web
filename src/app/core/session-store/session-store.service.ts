import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Session } from '@core/session-store/session.interface';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root'
})
export class SessionStoreService {
  private readonly USER_LANG = 'user-lang';
  private readonly USER_ID = 'user-id';
  private readonly ACCESS_TOKEN = 'access-token';

  session: Session;
  isBrowser: boolean;
  session$: BehaviorSubject<Session> = new BehaviorSubject<Session>(null);

  constructor(@Inject(PLATFORM_ID) platformId: object,
              private cookieService: CookieService) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  getSession(): Session | null {
    return this.session;
  }

  setSession(session: Session | null) {
    this.session = session;
    this.cookieService.put(this.ACCESS_TOKEN, session.accessToken);
    this.cookieService.put(this.USER_ID, String(session.id));
    this.session$.next(session);
  }

  clearSession() {
    this.cookieService.removeAll();
  }

  getAccessToken() {
    return this.cookieService.get(this.ACCESS_TOKEN);
  }
}
