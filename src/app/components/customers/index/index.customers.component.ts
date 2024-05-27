import {Component, OnInit} from '@angular/core';
import {Customer} from "../../../models/customer";
import {HttpClient, HttpParams} from "@angular/common/http";
import {CustomerService} from "../../../service/customer.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../service/auth.service";

@Component({
  selector: 'app-customers-index',
  templateUrl: './index.customers.component.html'
})
export class IndexCustomersComponent implements OnInit{

  protected searchForm! : FormGroup;
  protected customers! : Array<Customer>;
  constructor(private http : HttpClient,
              private customerRepository : CustomerService,
              private formBuilder : FormBuilder,
              public authService : AuthService) {}
  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({ q: new FormControl(null, [Validators.required]) });
    this.handleSearchCustomers();
  }

  handleSearchCustomers() : void {
    const q : string | null = this.searchForm.get("q")?.value;
    this.customerRepository.getCustomers(q)
      .subscribe(value => {
        this.customers = value;
      });
  }

  handleDeleteCustomer(customer : Customer) {
    const confirmDelete: boolean = confirm(`Vous être sure de supprimer le client ${customer.name}`);
    if (!confirmDelete) return;

    this.customerRepository.deleteCustomer(customer).subscribe(out => {
      this.customers = this.customers.filter(c => c.id != customer.id);
      alert("Success delete");
    });
  }
}
