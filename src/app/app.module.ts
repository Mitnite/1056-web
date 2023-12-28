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
import { SignUp2Component } from './components/sign-in-up-all/sign-up2/sign-up2.component';
import { SignUpBuddyComponent } from './components/sign-in-up-all/sign-up-buddy/sign-up-buddy.component';
import { SignUpStudentComponent } from './components/sign-in-up-all/sign-up-student/sign-up-student.component';
import { SignUp4Component } from './components/sign-in-up-all/sign-up4/sign-up4.component';

import { BuddyComponent } from './pages/buddy/buddy_manual/buddy.component';
import { DashboardBuddyComponent } from './pages/buddy/dashboard/dashboard.component';
import { EditProfileComponent } from './pages/buddy/edit-profile/edit-profile.component';
import { HomeBuddyComponent } from './pages/buddy/home/home.component';
import { MyStudentsComponent } from './pages/buddy/mystudents/mystudents.component';
import { ProfileBuddyComponent } from './pages/buddy/profile/profile.component';

import { DashboardStudentComponent } from './pages/student/dashboard/dashboard.component';
import { EditArrivalComponent } from './pages/student/edit-arrival/edit-arrival.component';
import { EditProfileStudentComponent } from './pages/student/edit-profile/edit-profile.component';
import { HomeStudentComponent } from './pages/student/home/home.component';
import { ProfileStudentComponent } from './pages/student/profile/profile.component';

import { AppLoadService } from './app-load.service';
import { CookieModule } from 'ngx-cookie';
import { AuthInterceptor } from './auth.interceptor';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { GetHelpComponent } from './components/get-help/get-help.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { HomeComponent } from './pages/admin/home/home.component';
import { SemesterOverviewComponent } from './pages/admin/semester-overview/semester-overview.component';
import { RouteManagementComponent } from './pages/admin/route-management/route-management.component';
import { ManagementComponent } from './pages/admin/route-management/management/management.component';
import { ActionLogComponent } from './pages/admin/route-management/management/action-log/action-log.component';
import { AllStudentsComponent } from './pages/admin/route-management/management/student/student.component';
import { MatchingChartComponent } from './pages/admin/route-management/management/matching-chart/matching-chart.component';
import { AllBuddiesComponent } from './pages/admin/route-management/management/buddy/buddy.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { StudentTableComponent } from './pages/admin/tables/student-table/student-table.component';
import { PopupComponent } from './components/popup/popup.component';
import { BuddyTableComponent } from './pages/admin/tables/buddy-table/buddy-table.component';
import { StudentInfoComponent } from './components/student-info/student-info.component';
import { BuddyInfoComponent } from './components/buddy-info/buddy-info.component';
import { StudentsReviewComponent } from './components/students-review/students-review.component';
import { AuthorizationGuard, UnAuthorizationGuard } from './authorization.guard';
import { LoaderComponent } from './components/loader/loader.component';
import { ErrorMessagePopupComponent } from './components/error-message-popup/error-message-popup.component';


@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,

    AppDashboardComponent,
    AppTagComponent,
    AppProfileComponent,
    SignInComponent,
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
    ErrorMessagePopupComponent,
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
  exports: [
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
