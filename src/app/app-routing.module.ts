import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexCustomersComponent} from "./components/customers/index/index.customers.component";
import {AddCustomerComponent} from "./components/customers/add/add.customer.component";
import {AddAccountComponent} from "./components/accounts/add/add.account.component";
import {IndexAccountComponent} from "./components/accounts/index/index.account.component";
import {ViewAccountComponent} from "./components/accounts/view/view.account.component";
import {LoginComponent} from "./components/login/login.component";
import {DashboardComponent} from "./components/layout/dashboard/dashboard.component";
import {AuthGuard} from "./guards/auth.guard";
import {HasRolesGuard} from "./guards/has.roles.guard";
import {ChangePasswordComponent} from "./components/user/change-password/change-password.component";
import {IndexUserComponent} from "./components/users/index/index.user.component";
import {AddUserComponent} from "./components/users/add/add.user.component";

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    component: DashboardComponent,
    path: "admin",
    children: [
      {
        path: 'customers',
        children: [
          { path: '', component: IndexCustomersComponent },
          { path: 'add', component : AddCustomerComponent, canActivate: [HasRolesGuard], data: { roles: ["ADMIN"] } }
        ]
      },
      {
        path: 'accounts',
        children: [
          { path: '', component: IndexAccountComponent },
          { path: 'add', component: AddAccountComponent, canActivate: [HasRolesGuard], data: { roles: ["ADMIN"] } },
          { path: ':accountId', component: ViewAccountComponent }
        ]
      },
      {
        path: 'users',
        children: [
          { path: '', component: IndexUserComponent },
          { path: 'add', component: AddUserComponent }
        ]
      },
      {
        path: 'user',
        children: [
          {
            path: 'change-password',
            component: ChangePasswordComponent
          }
        ]
      },
    ]
  },
  { path: 'login', component : LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
