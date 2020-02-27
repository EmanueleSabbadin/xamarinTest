import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  
  { 
    path: '', 
    loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule) 
  },
  {
    canActivate:[AuthGuard], 
    path: 'home', 
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) 
  },
  { 
    path: 'login', loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule) 
  },
  {
    canActivate:[AuthGuard],
    path: 'users', loadChildren: () => import('./components/users/users.module').then(m => m.UsersModule) 
  },
  {
    canActivate:[AuthGuard],
    path: 'places', loadChildren: () => import('./components/places/places.module').then(m => m.PlacesModule) 
  },
  {
    canActivate:[AuthGuard],
    path: 'students', loadChildren: () => import('./components/students/students.module').then(m => m.StudentsModule) 
  },
  {
    canActivate:[AuthGuard],
    path: 'activity', loadChildren: () => import('./components/activity/activity.module').then(m => m.ActivityModule) 
  },
  {
    canActivate:[AuthGuard],
    path: 'report', loadChildren: () => import('./components/report/report.module').then(m => m.ReportModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
