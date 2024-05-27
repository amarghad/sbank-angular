import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  getAllUsers() {
    return this.http.get<Array<User>>(`${environment.repository}/users`);
  }

  addUser(user : User) {
    return this.http.post<User>(`${environment.repository}/users`, user);
  }


}
