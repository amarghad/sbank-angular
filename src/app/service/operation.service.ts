import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Account} from "../models/account";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OperationService {



  constructor(private http : HttpClient) {}

  debit(account : Account, amount : number) {
    return this.http.post(`http://localhost:8080/accounts/${account.id}/operations/debit`, amount);
  }

  credit(account : Account, amount : number) {
    return this.http.post(`http://localhost:8080/accounts/${account.id}/operations/credit`, amount);
  }

  transfer(account : Account, destinationId : string, amount : number) {
    return this.http.post(`http://localhost:8080/accounts/${account.id}/operations/transfer`, {
      destinationId,
      amount
    });
  }


}
