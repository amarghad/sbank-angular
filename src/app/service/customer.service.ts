import { Injectable } from '@angular/core';
import {Customer} from "../models/customer";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private static REPOSITORY_URL : string = `${environment.repository}/customers`;

  constructor(private http : HttpClient) { }

  getCustomers(keyword : string | null = null) : Observable<Array<Customer>> {
    let params : HttpParams = new HttpParams();

    if (keyword != null) {
      params = params.set("q", keyword);
    }

    return this.http.get<Array<Customer>>(CustomerService.REPOSITORY_URL,{ params });
  }

  saveCustomer(customer : Customer) {
    return this.http.post(CustomerService.REPOSITORY_URL, customer);
  }

  deleteCustomer(customer : Customer) {
    return this.http.delete(CustomerService.REPOSITORY_URL + "/" + customer.id);
  }

}
