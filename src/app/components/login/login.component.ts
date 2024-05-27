import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit{

  protected formGroup! : FormGroup;
  protected authStatus! : boolean | null;

  constructor(private formBuilder : FormBuilder,
              private authService : AuthService,
              private router : Router) {
    this.formGroup = this.formBuilder.group({
      username: new FormControl("", [ Validators.required ]),
      password: new FormControl("", [ Validators.required ])
    })
  }

  ngOnInit(): void {
        this.authStatus = null;
    }

  handleLogin() {
    const username : string = this.formGroup.value.username;
    const password : string = this.formGroup.value.password;

    this.authService.attempt(username, password).subscribe({
      next: out => {
        this.authStatus = true
        this.authService.login(out.accessToken)
        this.router.navigateByUrl("/admin/customers")
      },
      error: _ => this.authStatus = false
    });
  }
}
