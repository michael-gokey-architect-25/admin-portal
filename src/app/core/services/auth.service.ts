// src\app\core\services\auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User, AuthToken, LoginCredentials, UserRole } from '../../store/auth/auth-actions';


// API response interfaces
interface LoginResponse {
  user: User;
  token: AuthToken;
}

interface RegisterResponse {
  user: User;
  token: AuthToken;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getAccessToken() {
    throw new Error('Method not implemented.');
  }
  clearToken() {
    throw new Error('Method not implemented.');
  }
  private readonly TOKEN_KEY = 'admin_portal_token';
  private readonly API_URL = 'http://localhost:3000/api'; // Change to your API URL

  constructor(private http: HttpClient) {}

  // ==== API CALLS 
  /*** Login user with credentials */
  login(credentials: LoginCredentials): Observable<LoginResponse> {
    // TODO: Replace with actual API call
    // return this.http.post<LoginResponse>(`${this.API_URL}/auth/login`, credentials);
    
    // Mock implementation for development
    return this.mockLogin(credentials);
  }


  /*** Register new user */
  register(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Observable<RegisterResponse> {
    // TODO: Replace with actual API call
    // return this.http.post<RegisterResponse>(`${this.API_URL}/auth/register`, data);
    
    // Mock implementation for development
    return this.mockRegister(data);
  }
  
