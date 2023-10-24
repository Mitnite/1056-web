import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from '@shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { LeftMenuModule } from '@shared/modules/left-menu/left-menu.module';
import { LeftMenuBuddyModule } from '@shared/modules/left-menu-buddy/left-menu.module';
import { LeftMenuAdminModule } from '@shared/modules/left-menu-admin/left-menu.module';

import { AppDashboardComponent } from '@shared/components/ui/app-dashboard/app-dashboard';
import { AppTagComponent } from '@shared/components/ui/app-tag/app-tag';
import { AppProfileComponent } from '@shared/components/ui/app-profile/app-profile.component';
import { SignInComponent } from './components/sign-in-up-all/sign-in/sign-in.component';
import { SignUp1Component } from './components/sign-in-up-all/sign-up1/sign-up1.component';
import { SignUp2Component } from './components/sign-in-up-all/sign-up2/sign-up2.component';
import { SignUpBuddyComponent } from './components/sign-in-up-all/sign-up-buddy/sign-up-buddy.component';
import { SignUpStudentComponent } from './components/sign-in-up-all/sign-up-student/sign-up-student.component';
import { SignUp4Component } from './components/sign-in-up-all/sign-up4/sign-up4.component';

import { BuddyComponent } from './components/areas/buddy/buddy_manual/buddy.component';
import { DashboardBuddyComponent } from './components/areas/buddy/dashboard/dashboard.component';
import { EditProfileComponent } from './components/areas/buddy/edit-profile/edit-profile.component';
import { HomeBuddyComponent } from './components/areas/buddy/home/home.component';
import { MyStudentsComponent } from './components/areas/buddy/mystudents/mystudents.component';
import { ProfileBuddyComponent } from './components/areas/buddy/profile/profile.component';

import { DashboardStudentComponent } from './components/areas/student/dashboard/dashboard.component';
import { EditArrivalComponent } from './components/areas/student/edit-arrival/edit-arrival.component';
import { EditProfileStudentComponent } from './components/areas/student/edit-profile/edit-profile.component';
import { HomeStudentComponent } from './components/areas/student/home/home.component';
import { ProfileStudentComponent } from './components/areas/student/profile/profile.component';

import { AppLoadService } from './app-load.service';
import { CookieModule } from 'ngx-cookie';
import { AuthInterceptor } from './auth.interceptor';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { GetHelpComponent } from './components/get-help/get-help.component';
import { DashboardComponent } from './components/areas/admin/dashboard/dashboard.component';
import { HomeComponent } from './components/areas/admin/home/home.component';
import { SemesterOverviewComponent } from './components/areas/admin/semester-overview/semester-overview.component';
import { RouteManagementComponent } from './components/areas/admin/route-management/route-management.component';
import { ManagementComponent } from './components/areas/admin/route-management/management/management.component';
import { ActionLogComponent } from './components/areas/admin/route-management/management/action-log/action-log.component';
import { AllStudentsComponent } from './components/areas/admin/route-management/management/student/student.component';
import { MatchingChartComponent } from './components/areas/admin/route-management/management/matching-chart/matching-chart.component';
import { AllBuddiesComponent } from './components/areas/admin/route-management/management/buddy/buddy.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { StudentTableComponent } from './components/areas/admin/tables/student-table/student-table.component';
import { PopupComponent } from './components/popup/popup.component';
import { BuddyTableComponent } from './components/areas/admin/tables/buddy-table/buddy-table.component';
import { StudentInfoComponent } from './components/student-info/student-info.component';
import { BuddyInfoComponent } from './components/buddy-info/buddy-info.component';
import { StudentsReviewComponent } from './components/students-review/students-review.component';
import { AuthorizationGuard, UnAuthorizationGuard } from './authorization.guard';
import { LoaderComponent } from './components/loader/loader.component';


@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,

    AppDashboardComponent,
    AppTagComponent,
    AppProfileComponent,
    SignInComponent,
    SignUp1Component,
    SignUp2Component,
    SignUpBuddyComponent,
    SignUpStudentComponent,
    SignUp4Component,

    PageNotFoundComponent,
    GetHelpComponent,
    BuddyComponent,
    DashboardBuddyComponent,
    EditProfileComponent,
    HomeBuddyComponent,
    MyStudentsComponent,
    ProfileBuddyComponent,
    EditArrivalComponent,
    DashboardStudentComponent,
    EditArrivalComponent,
    EditProfileStudentComponent,
    HomeStudentComponent,
    ProfileStudentComponent,
    DashboardComponent,
    HomeComponent,
    SemesterOverviewComponent,
    ManagementComponent,
    ManagementComponent,
    ActionLogComponent,
    AllStudentsComponent,
    MatchingChartComponent,
    AllBuddiesComponent,
    RouteManagementComponent,
    StudentTableComponent,
    PopupComponent,
    BuddyTableComponent,
    StudentInfoComponent,
    BuddyInfoComponent,
    StudentsReviewComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatDialogModule,
    LeftMenuModule,
    FormsModule,
    LeftMenuBuddyModule,
    CookieModule.withOptions(),
    LeftMenuAdminModule,
    SlickCarouselModule,
    LoaderComponent,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (appLoader: AppLoadService) => {
        return () => appLoader.initApp();
      },
      deps: [AppLoadService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthorizationGuard,
    UnAuthorizationGuard
  ]
})
export class AppModule {
}