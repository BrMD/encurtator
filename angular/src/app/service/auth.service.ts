import { Injectable } from '@angular/core';
import { Account } from '../models/account';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private account: Account | null = null;

  setAccount(account: Account) {
    this.account = account;
  }

  getAccount(): Account | null {
    return this.account;
  }

  clearAccount() {
    this.account = null;
  }
}
