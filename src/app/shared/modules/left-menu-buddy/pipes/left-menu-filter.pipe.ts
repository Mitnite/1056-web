import { Pipe, PipeTransform } from '@angular/core';
import { LeftMenuItem } from '@shared/modules/left-menu-buddy/types/left-menu-item.interface';


@Pipe({
  name: 'leftMenuFilter'
})
export class LeftMenuFilterPipe{
  constructor() {
  }
}
