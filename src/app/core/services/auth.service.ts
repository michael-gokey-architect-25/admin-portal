import { Injectable } from '@angular/core';
import { LoginCredentials } from 'src/app/store/auth/auth-actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logout() {
    throw new Error('Method not implemented.');
  }
  login(credentials: LoginCredentials) {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}
