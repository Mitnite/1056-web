import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftMenuBuddyComponent } from './components/left-menu/left-menu-buddy.component';
import { SharedModule } from "@shared/shared.module";
import { RouterModule } from '@angular/router';
import { LeftMenuFilterPipe } from './pipes/left-menu-filter.pipe';


@NgModule({
  declarations: [
    LeftMenuBuddyComponent,
    LeftMenuFilterPipe
  ],
  exports: [
    LeftMenuBuddyComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ]
})
export class LeftMenuBuddyModule {
}
