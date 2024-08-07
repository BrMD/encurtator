import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '../models/account';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly API = '/api';

  constructor(private httpClient: HttpClient) {}

  login(User: Account) {
    return this.httpClient.post<Account>(`${this.API}/login/user`, User);
  }
}
