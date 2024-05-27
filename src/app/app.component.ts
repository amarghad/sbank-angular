import {Component, OnInit} from '@angular/core';
import {AuthService} from "./service/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'SBank - A micro bank system';
  constructor(private authService : AuthService) {
  }
  ngOnInit(): void {
    this.authService.loadAccessTokenFromLocalStorage();
  }

}
