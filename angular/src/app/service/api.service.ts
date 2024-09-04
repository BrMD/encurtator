import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '../models/account';
import { EncurtatorPost, EncurtatorResult } from '../models/encurtator';
import { session } from '../models/sessionId';
import { infoUser } from '../models/infoUser';
import { Url } from '../models/url';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly API = '/api';
  private readonly Redirect = '/redirect';
  private readonly Auth = '/auth';
  constructor(private httpClient: HttpClient) {}

  logout(sessionId: string) {
    this.httpClient.delete(`${this.Auth}/logout/${sessionId}`);
  }

  getmail(sessionId: string) {
    return this.httpClient.get<infoUser>(`${this.Auth}/getemail/${sessionId}`);
  }

  login(User: Account) {
    return this.httpClient.post<session>(`${this.Auth}/login`, User);
  }

  createUser(User: Account) {
    const a = this.httpClient.post<Account>(`${this.API}/createUser`, User);
    return a;
  }

  getEncurtatorsbyId(id: string) {
    console.log(id);
    return this.httpClient.get<Array<EncurtatorResult>>(
      `${this.API}/encurtator/all/${id}`
    );
  }

  createEncurtator(encuratorReq: EncurtatorPost) {
    return this.httpClient.post<EncurtatorResult>(
      `${this.API}/encurtator`,
      encuratorReq
    );
  }

  deleteEncurtator(id: String) {
    return this.httpClient.delete(`${this.API}/encurtator/${id}`);
  }

  redirect(shortUrl: String) {
    return this.httpClient.get<Url>(`${this.Redirect}/${shortUrl}`);
  }
}
