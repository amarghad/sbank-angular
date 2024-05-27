import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../service/user.service";
import {User} from "../../../models/user";
import {RoleService} from "../../../service/role.service";

@Component({
  selector: 'app-index.user',
  templateUrl: './index.user.component.html',
})
export class IndexUserComponent implements OnInit{
  users!: Array<User>;


  constructor(private userService : UserService) {
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(out => this.users = out);
  }

  handleDeleteUser(user: User) {

  }
}
