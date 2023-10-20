import { Injectable, Injector } from '@angular/core';
import { SessionStoreService } from '@core/session-store/session-store.service';

@Injectable({
  providedIn: 'root'
})
export class AppLoadService {
  constructor(private injector: Injector,
              private store: SessionStoreService,
  ) {}

  /**
   * Инициализация приложения
   */
  async initApp(): Promise<any> {
    try {
      if (this.store.getAccessToken()) {
      }
    } catch (e) {
      console.log(e);
    }
  }

}
