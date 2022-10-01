import { EmpolyeeDashboardComponent } from './empolyee-dashboard/empolyee-dashboard.component';
import { LoginComponent } from './login/login.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogoutComponent } from './logout/logout.component';
import { RouterGuard } from './shared/router.guard';
const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:"full"},
  {path:'login',component:LoginComponent},
  {path:'logout',component:LogoutComponent},
  {path:'dashboard/:name',component:EmpolyeeDashboardComponent,canActivate: [RouterGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
