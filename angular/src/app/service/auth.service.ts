import { Injectable } from '@angular/core';
import { Account } from '../models/account';
import { ApiService } from './api.service';
import { infoUser } from '../models/infoUser';

//have to change this to sessionId
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private account: string | null = null;
  private email: string | null = null;
  constructor(private service: ApiService) {}

  setAccount(sessionId: string) {
    this.account = sessionId;
    localStorage.setItem('sessionId', sessionId);
    this.getEmailObservable(sessionId).subscribe({
      next: (user) => (this.email = user.email),
      error: (error) => console.error(error),
    });
  }
  getEmailObservable(sessionId: string) {
    return this.service.getmail(sessionId);
  }

  getEmail(): string | null {
    return this.email;
  }

  getAccount(): string | null {
    return this.account;
  }

  clearAccount() {
    localStorage.removeItem('sessionId');
    if (this.account) {
      this.service.logout(this.account);
      this.account = null;
    }
  }
}
