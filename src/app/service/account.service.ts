import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Account} from "../models/account";
import {Operation} from "../models/operation";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private static REPOSITORY_URL = `${environment.repository}/accounts`;

  constructor(private http : HttpClient) { }

  addAccount(account : Account) {
    return this.http.post<Account>(AccountService.REPOSITORY_URL, account);
  }

  getAccounts() {
    return this.http.get<Array<Account>>(AccountService.REPOSITORY_URL);
  }

  getAccount(accountId : string) {
    return this.http.get<Account>(AccountService.REPOSITORY_URL + "/" + accountId);
  }

  getAccountOperations(accountId : string) {
    return this.http.get<Array<Operation>>(`http://localhost:8080/accounts/${accountId}/operations`);
  }


}
