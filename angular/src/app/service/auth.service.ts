import { Injectable } from '@angular/core';
import { Account } from '../models/account';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private account: string | null = null;

  setAccount(email: string) {
    this.account = email;
    localStorage.setItem('user', email);
  }

  getAccount(): string | null {
    return this.account;
  }

  clearAccount() {
    this.account = null;
    localStorage.removeItem('user');
  }
}
