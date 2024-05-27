import {Customer} from "./customer";
import {AccountStatus} from "./acount-status";
import {AccountType} from "./account-type";

export interface Account {
  id : string,
  balance : number,
  createdAt : string,
  status : AccountStatus,
  customerDto : Customer;
  type: AccountType,
  overDraft?: number,
  interestRate?: number
}
