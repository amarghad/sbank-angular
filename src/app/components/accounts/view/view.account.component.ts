import {Component, OnInit} from '@angular/core';
import {Account} from "../../../models/account";
import {AccountService} from "../../../service/account.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {OperationService} from "../../../service/operation.service";
import {Operation} from "../../../models/operation";
import {AccountStatus} from "../../../models/acount-status";
import {AuthService} from "../../../service/auth.service";

@Component({
  selector: 'app-view.account',
  templateUrl: './view.account.component.html'
})
export class ViewAccountComponent implements OnInit {

  protected account! : Account;
  protected operations! : Array<Operation>;
  protected operationFormGroup! : FormGroup;


  constructor(private accountRepository : AccountService,
              private operationRepository : OperationService,
              private activatedRoute : ActivatedRoute,
              private formBuilder : FormBuilder,
              protected authService : AuthService) {}

  public ngOnInit(): void {

    this.loadAccount();

    this.operationFormGroup = this.formBuilder.group({
      type: new FormControl(),
      amount: new FormControl(null, [
        Validators.required, Validators.min(0)
      ]),
      dest: new FormControl(null)
    });

  }

  loadAccount() {
    const accountId = this.activatedRoute.snapshot.paramMap.get("accountId");
    if(accountId == null) return;

    this.accountRepository.getAccount(accountId)
      .subscribe(out => {
        this.account = out;
        this.loadOperations();
      });
  }

  loadOperations() {
    this.accountRepository.getAccountOperations(this.account.id)
      .subscribe(out => this.operations = out);
  }

  protected handleSaveOperation() {
    const operation = this.operationFormGroup.value;

    let repository;
    switch (operation.type) {
      case "TRANSFER": repository = this.operationRepository.transfer(this.account, operation.dest, operation.amount); break;
      case "CREDIT": repository = this.operationRepository.credit(this.account, operation.amount); break
      case "DEBIT": repository = this.operationRepository.debit(this.account, operation.amount); break
    }

    repository?.subscribe(out => {
      this.loadOperations();
      alert("Operation effectué");
    });

  }


  protected readonly AccountStatus = AccountStatus;
}
