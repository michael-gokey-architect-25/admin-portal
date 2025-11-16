import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth-reducer';
import { UserRole } from './auth-actions';


// Feature selector
export const selectAuthState = createFeatureSelector<AuthState>('auth');


// Basic selectors
export const selectUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);


export const selectToken = createSelector(
  selectAuthState,
  (state: AuthState) => state.token
);


export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);


export const selectIsLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.isLoading
);


export const selectAuthError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);


// User role selector
export const selectUserRole = createSelector(
  selectUser,
  (user) => user?.role || null
);


// Role-based permission selectors
export const selectIsAdmin = createSelector(
  selectUserRole,
  (role) => role === UserRole.ADMIN
);


export const selectIsManager = createSelector(
  selectUserRole,
  (role) => role === UserRole.MANAGER
);


export const selectIsRegularUser = createSelector(
  selectUserRole,
  (role) => role === UserRole.USER
);


// Combined permission selectors
export const selectCanManageUsers = createSelector(
  selectUserRole,
  (role) => role === UserRole.ADMIN
);


export const selectCanViewTeamData = createSelector(
  selectUserRole,
  (role) => role === UserRole.ADMIN || role === UserRole.MANAGER
);


// User display info
export const selectUserDisplayName = createSelector(
  selectUser,
  (user) => user ? `${user.firstName} ${user.lastName}` : ''
);


export const selectUserInitials = createSelector(
  selectUser,
  (user) => user 
    ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
    : ''
);


// Token expiration check
export const selectIsTokenExpired = createSelector(
  selectToken,
  (token) => {
    if (!token) return true;
    const expirationTime = Date.now() + (token.expiresIn * 1000);
    return Date.now() > expirationTime;
  }
);


// Auth status check
export const selectAuthStatus = createSelector(
  selectIsAuthenticated,
  selectIsLoading,
  selectAuthError,
  (isAuthenticated, isLoading, error) => ({
    isAuthenticated,
    isLoading,
    hasError: !!error,
    error
  })
);

