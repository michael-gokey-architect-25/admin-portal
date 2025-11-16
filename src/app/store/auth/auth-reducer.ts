import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth-actions';
import { User, AuthToken } from './auth-actions';


export interface AuthState {
  user: User | null;
  token: AuthToken | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}


export const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
};


export const authReducer = createReducer(
  initialState,

  // Login
  on(AuthActions.login, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),

  on(AuthActions.loginSuccess, (state, { user, token }) => ({
    ...state,
    user,
    token,
    isAuthenticated: true,
    isLoading: false,
    error: null
  })),

  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
    isAuthenticated: false
  })),

  // Logout
  on(AuthActions.logout, (state) => ({
    ...state,
    isLoading: true
  })),

  on(AuthActions.logoutSuccess, () => ({
    ...initialState
  })),

  // Register
  on(AuthActions.register, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),

  on(AuthActions.registerSuccess, (state, { user, token }) => ({
    ...state,
    user,
    token,
    isAuthenticated: true,
    isLoading: false,
    error: null
  })),

  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
    isAuthenticated: false
  })),

  // Token Refresh
  on(AuthActions.refreshToken, (state) => ({
    ...state,
    isLoading: true
  })),

  on(AuthActions.refreshTokenSuccess, (state, { token }) => ({
    ...state,
    token,
    isLoading: false,
    error: null
  })),

  on(AuthActions.refreshTokenFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
    isAuthenticated: false,
    token: null,
    user: null
  })),

  // Load User Profile
  on(AuthActions.loadUserProfile, (state) => ({
    ...state,
    isLoading: true
  })),

  on(AuthActions.loadUserProfileSuccess, (state, { user }) => ({
    ...state,
    user,
    isLoading: false,
    error: null
  })),

  on(AuthActions.loadUserProfileFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),

  // Check Auth Status
  on(AuthActions.checkAuthStatus, (state) => ({
    ...state,
    isLoading: true
  }))

);

