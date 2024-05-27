import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RoleService} from "../../../service/role.service";
import {Role} from "../../../models/role";
import {AccountService} from "../../../service/account.service";
import {UserService} from "../../../service/user.service";
import {User} from "../../../models/user";

@Component({
  selector: 'app-add.user',
  templateUrl: './add.user.component.html',
})
export class AddUserComponent {

  formGroup!: FormGroup;
  roles!: Role[];

  constructor(private formBuilder: FormBuilder,
              private roleService : RoleService,
              private userService : UserService) {}

  ngOnInit(): void {
    this.roleService.getRoles().subscribe(out => this.roles = out);
    this.formGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      roles: this.formBuilder.array([], Validators.required)
    });
  }

  onSubmit(): void {
    let user : User = this.formGroup.value;
    this.userService.addUser(user).subscribe(_ => console.log("Utilisateurs ajouté"))
  }

}
