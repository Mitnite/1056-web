import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftMenuComponent } from './components/left-menu/left-menu.component';
import { SharedModule } from "@shared/shared.module";
import { RouterModule } from '@angular/router';
import { LeftMenuFilterPipe } from './pipes/left-menu-filter.pipe';


@NgModule({
  declarations: [
    LeftMenuComponent,
    LeftMenuFilterPipe
  ],
  exports: [
    LeftMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ]
})
export class LeftMenuModule {
}
