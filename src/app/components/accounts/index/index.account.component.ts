import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../../service/account.service";
import {Account} from "../../../models/account";
import {AuthService} from "../../../service/auth.service";

@Component({
  selector: 'app-index.account',
  templateUrl: './index.account.component.html'
})
export class IndexAccountComponent implements OnInit{

  protected accounts! : Array<Account>;


  constructor(private accountService : AccountService,
              protected authService : AuthService) {}

  ngOnInit(): void {
    this.accountService.getAccounts().subscribe(out => this.accounts = out);
  }

  protected readonly Number = Number;
}
