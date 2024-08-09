import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '../models/account';
import { Encurtator } from '../models/encurtator';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly API = '/api';
  private readonly Redirect = '/redirect';

  constructor(private httpClient: HttpClient) {}

  login(User: Account) {
    return this.httpClient.post<Account>(`${this.API}/login/user`, User);
  }

  createUser(User: Account) {
    return this.httpClient.post<Account>(`${this.API}/createUser`, User);
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
