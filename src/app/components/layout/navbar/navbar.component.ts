import { Component } from '@angular/core';
import {AuthService} from "../../../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  constructor(protected authService : AuthService, private router : Router) {  }

  handleLogout() {
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }
}
