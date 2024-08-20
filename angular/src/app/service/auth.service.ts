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
    this.service.getmail(sessionId).subscribe({
      next: (user) => (this.email = user.email),
      error: (error) => console.error(error),
    });
    console.log(this.email);
  }

  getAccount(): string | null {
    return this.email;
  }

  clearAccount() {
    localStorage.removeItem('sessionId');
    if (this.account) {
      this.service.logout(this.account);
      this.account = null;
    }
  }
}
