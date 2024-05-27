import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../../../service/customer.service";
import {Customer} from "../../../models/customer";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add.customer',
  templateUrl: './add.customer.component.html'
})
export class AddCustomerComponent implements OnInit{

  public formGroup! : FormGroup;


  constructor(private formBuilder : FormBuilder,
              private customerRepository : CustomerService,
              private router : Router) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: new FormControl("", [ Validators.required, Validators.email ]),
      name: new FormControl("", [ Validators.required, Validators.min(5) ])
    });
  }

  handleSaveCustomer() {
    const customer : Customer = this.formGroup.value
    this.customerRepository.saveCustomer(customer).subscribe(out => {
      alert("Ajouté avec succès");
      this.router.navigateByUrl("/admin/customers");
    });
  }

}
