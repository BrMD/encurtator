import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '../models/account';
import { Encurtator } from '../models/encurtator';
import { session } from '../models/sessionId';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly API = '/api';
  private readonly Redirect = '/redirect';
  private readonly Auth = '/auth';
  constructor(private httpClient: HttpClient) {}

  login(User: Account) {
    return this.httpClient.post<session>(`${this.Auth}/login`, User);
  }

  createUser(User: Account) {
    const a = this.httpClient.post<Account>(`${this.API}/createUser`, User);
    console.log(a);
    return a;
  }

  getEncurtatorbyId(id: String) {
    return this.httpClient.get<Array<Encurtator>>(
      `${this.API}/encurtator/${id}`
    );
  }

  createEncurtator(id: String, normalUrl: String) {
    return this.httpClient.post<Encurtator>(`${this.API}/encurtator`, {
      id,
      normalUrl,
    });
  }

  deleteEncurtator(id: String) {
    return this.httpClient.delete(`${this.API}/encuratator/${id}`);
  }

  redirect(shortUrl: String) {
    return this.httpClient.get<String>(`${this.Redirect}/${shortUrl}`);
  }
}
