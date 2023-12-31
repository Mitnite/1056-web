import { NgModule, OnInit } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in-up-all/sign-in/sign-in.component';
import { SignUpBuddyComponent } from './components/sign-in-up-all/sign-up-buddy/sign-up-buddy.component';
import { SignUpStudentComponent } from './components/sign-in-up-all/sign-up-student/sign-up-student.component';
import { SignUp2Component } from './components/sign-in-up-all/sign-up2/sign-up2.component';
import { SignUp4Component } from './components/sign-in-up-all/sign-up4/sign-up4.component';
import { AuthorizationGuard, UnAuthorizationGuard } from './authorization.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { GetHelpComponent } from './components/get-help/get-help.component';
import { EditProfileComponent } from './pages/buddy/edit-profile/edit-profile.component';
import { HomeBuddyComponent } from './pages/buddy/home/home.component';
import { DashboardBuddyComponent } from './pages/buddy/dashboard/dashboard.component';
import { ProfileBuddyComponent } from './pages/buddy/profile/profile.component';
import { MyStudentsComponent } from './pages/buddy/mystudents/mystudents.component';
import { BuddyComponent } from './pages/buddy/buddy_manual/buddy.component';
import { HomeStudentComponent } from './pages/student/home/home.component';
import { DashboardStudentComponent } from './pages/student/dashboard/dashboard.component';
import { ProfileStudentComponent } from './pages/student/profile/profile.component';
import { EditProfileStudentComponent } from './pages/student/edit-profile/edit-profile.component';
import { EditArrivalComponent } from './pages/student/edit-arrival/edit-arrival.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { RouteManagementComponent } from './pages/admin/route-management/route-management.component';
import { ManagementComponent } from './pages/admin/route-management/management/management.component';
import { SemesterOverviewComponent } from './pages/admin/semester-overview/semester-overview.component';
import { AllBuddiesComponent } from './pages/admin/route-management/management/buddy/buddy.component';
import { MatchingChartComponent } from './pages/admin/route-management/management/matching-chart/matching-chart.component';
import { AllStudentsComponent } from './pages/admin/route-management/management/student/student.component';
import { ActionLogComponent } from './pages/admin/route-management/management/action-log/action-log.component';
import { HomeComponent } from './pages/admin/home/home.component';


const routes: Routes = [

  {path: '404', component: PageNotFoundComponent},


  {
    path: '',
    component: SignInComponent,
    // canActivate: [UnAuthorizationGuard],
  },
  {
    path: 'auth',
    component: SignInComponent,
    canActivate: [UnAuthorizationGuard],
  },
  {
    path: 'sign-up-buddy_manual',
    component: SignUpBuddyComponent,
    canActivate: [UnAuthorizationGuard],
  },
  {
    path: 'sign-up-student',
    component: SignUpStudentComponent,
    canActivate: [UnAuthorizationGuard],
  },

  {
    path: 'sign-up2',
    component: SignUp2Component,
    canActivate: [UnAuthorizationGuard],
  },
  {
    path: 'sign-up4',
    component: SignUp4Component,
    canActivate: [UnAuthorizationGuard],
  },

  {
    path: 'foreign_student',
    component: HomeStudentComponent,
    canActivate: [AuthorizationGuard],
    data: {roles: ['ROLE_FOREIGN_STUDENT']},
    children: [
      {
        path: 'profile',
        component: ProfileStudentComponent
      },
      {
        path: 'edit_profile',
        component: EditProfileStudentComponent
      },
      {
        path: 'edit_arrival',
        component: EditArrivalComponent
      },
      {
        path: 'dashboard',
        component: DashboardStudentComponent
      },
      {
        path: 'help',
        component: GetHelpComponent
      }
    ]
  },

  {
    path: 'buddy',
    component: HomeBuddyComponent,
    canActivate: [AuthorizationGuard],
    data: {roles: ['ROLE_VOLUNTEER']},
    children: [
      {
        path: 'dashboard',
        component: DashboardBuddyComponent
      },
      {
        path: 'my_students',
        component: MyStudentsComponent
      },
      {
        path: 'profile',
        component: ProfileBuddyComponent
      },
      {
        path: 'edit_profile',
        component: EditProfileComponent
      },
      {
        path: 'buddy_manual',
        component: BuddyComponent
      },
      {
        path: 'help',
        component: GetHelpComponent
      }
    ]
  },
  {
    path: 'admin',
    component: HomeComponent,
    canActivate: [AuthorizationGuard],
    data: {roles: ['ROLE_ADMIN']},
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'management',
        component: RouteManagementComponent,
        children: [
          {
            path: '',
            component: ManagementComponent,
          },
          {
            path: 'all-buddies',
            component: AllBuddiesComponent
          },
          {
            path: 'international-buddies',
            component: AllStudentsComponent
          },
          {
            path: 'matching-chart',
            component: MatchingChartComponent
          },
          {
            path: 'action-log',
            component: ActionLogComponent
          },
        ]
      },
      {
        path: 'semester_overview',
        component: SemesterOverviewComponent
      },
      {
        path: 'help',
        component: GetHelpComponent
      }
    ]
  },
  { path: '**', pathMatch: 'full',
    component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
