import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftMenuAdminComponent } from './components/left-menu/left-menu-admin.component';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { LeftMenuFilterPipe } from './pipes/left-menu-filter.pipe';


@NgModule({
  declarations: [
    LeftMenuAdminComponent,
    LeftMenuFilterPipe
  ],
  exports: [
    LeftMenuAdminComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ]
})
export class LeftMenuAdminModule {
}
