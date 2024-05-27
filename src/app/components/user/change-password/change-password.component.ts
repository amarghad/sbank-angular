import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../service/user.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../service/auth.service";

@Component({
  selector: 'app-modify-password',
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent implements OnInit{
  protected formGroup!: FormGroup;


  constructor(private authService : AuthService,
              private formBuilder : FormBuilder) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      oldPassword: new FormControl("", [Validators.required]),
      newPassword: new FormControl("", [Validators.required]),
      confirmNewPassword: new FormControl("", [Validators.required])
    });
  }

  handleChangePassword() {
    let details = this.formGroup.value
    this.authService.changePassword(details.oldPassword, details.newPassword).subscribe(out => {
      alert("Password est changé avec succès")
    });
  }
}
