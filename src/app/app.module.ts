import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { IndexCustomersComponent } from './components/customers/index/index.customers.component';
import { AddCustomerComponent } from './components/customers/add/add.customer.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { IndexAccountComponent } from './components/accounts/index/index.account.component';
import { AddAccountComponent } from './components/accounts/add/add.account.component';
import { ViewAccountComponent } from './components/accounts/view/view.account.component';
import { LoginComponent } from './components/login/login.component';
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import { DashboardComponent } from './components/layout/dashboard/dashboard.component';
import { ChangePasswordComponent } from './components/user/change-password/change-password.component';
import {IndexUserComponent} from "./components/users/index/index.user.component";
import { AddUserComponent } from './components/users/add/add.user.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    IndexCustomersComponent,
    AddCustomerComponent,
    IndexAccountComponent,
    AddAccountComponent,
    ViewAccountComponent,
    LoginComponent,
    DashboardComponent,
    ChangePasswordComponent,
    IndexUserComponent,
    AddUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
