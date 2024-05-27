import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {AccountStatus} from "../../../models/acount-status";
import {Customer} from "../../../models/customer";
import {AccountType} from "../../../models/account-type";
import {CustomerService} from "../../../service/customer.service";
import {Account} from "../../../models/account";
import {AccountService} from "../../../service/account.service";

@Component({
  selector: 'app-add.account',
  templateUrl: './add.account.component.html'
})
export class AddAccountComponent implements OnInit{

  protected customers! : Array<Customer>
  protected formGroup! : FormGroup;
  constructor(private formBuilder : FormBuilder,
              private customerService : CustomerService,
              private accountService : AccountService) {
  }

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe(out => this.customers = out);
    this.formGroup = this.formBuilder.group({
      balance : new FormControl(0.00),
      customerDto : new FormControl(),
      type: new FormControl(),
      overDraft: new FormControl(),
      interestRate: new FormControl()
    });
  }


  handleSubmit() {
    let account : Account = this.formGroup.value;
    this.accountService.addAccount(account).subscribe({
      next: value => console.log(value)
    });
  }
}
