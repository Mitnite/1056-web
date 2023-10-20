import { Pipe, PipeTransform } from '@angular/core';
import { LeftMenuItem } from '@shared/modules/left-menu/types/left-menu-item.interface';
import { SessionStoreService } from '@core/session-store/session-store.service';


@Pipe({
  name: 'leftMenuFilter'
})
export class LeftMenuFilterPipe{

  constructor(private sessionStore: SessionStoreService) {}

}
