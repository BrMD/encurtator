import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly API = '/api';

  constructor(private httpClient: HttpClient) {}

  login(User: Login) {
    return this.httpClient.post<Login>(`${this.API}/login/user`, User);
  }
}
