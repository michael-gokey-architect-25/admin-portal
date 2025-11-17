// src\app\store\auth\auth-actions.ts
import { createAction, props } from '@ngrx/store';


// Models for Auth
export interface LoginCredentials {
  email: string;
  password: string;
}


export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}


export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  USER = 'USER'
}


export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}


// Login Actions
export const login = createAction(
  '[Auth] Login',
  props<{ credentials: LoginCredentials }>()
);


export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: User; token: AuthToken }>()
);


export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);


// Logout Actions
export const logout = createAction('[Auth] Logout');

export const logoutSuccess = createAction('[Auth] Logout Success');


// Register Actions
export const register = createAction(
  '[Auth] Register',
  props<{ 
    email: string; 
    password: string; 
    firstName: string; 
    lastName: string; 
  }>()
);


export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ user: User; token: AuthToken }>()
);


export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: string }>()
);


// Token Refresh Actions
export const refreshToken = createAction('[Auth] Refresh Token');


export const refreshTokenSuccess = createAction(
  '[Auth] Refresh Token Success',
  props<{ token: AuthToken }>()
);


export const refreshTokenFailure = createAction(
  '[Auth] Refresh Token Failure',
  props<{ error: string }>()
);


// Load User Profile
export const loadUserProfile = createAction('[Auth] Load User Profile');


export const loadUserProfileSuccess = createAction(
  '[Auth] Load User Profile Success',
  props<{ user: User }>()
);


export const loadUserProfileFailure = createAction(
  '[Auth] Load User Profile Failure',
  props<{ error: string }>()
);


// Check Auth Status (on app init)
export const checkAuthStatus = createAction('[Auth] Check Auth Status');
