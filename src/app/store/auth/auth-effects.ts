import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, exhaustMap, tap } from 'rxjs/operators';
import * as AuthActions from './auth-actions';
import { AuthService } from '../../core/services/auth.service';


@Injectable()
export class AuthEffects {
  
  // Login Effect
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          map(response => 
            AuthActions.loginSuccess({ 
              user: response.user, 
              token: response.token 
            })
          ),
          catchError(error => 
            of(AuthActions.loginFailure({ 
              error: error.message || 'Login failed' 
            }))
          )
        )
      )
    )
  );

  // Login Success - Navigate and Store Token
  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ token }) => {
          // Store token in localStorage
          this.authService.setToken(token);
          
          // Navigate to dashboard
          this.router.navigate(['/dashboard']);
        })
      ),
    { dispatch: false }
  );

  // Logout Effect
  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      exhaustMap(() =>
        this.authService.logout().pipe(
          map(() => AuthActions.logoutSuccess()),
          catchError(() => of(AuthActions.logoutSuccess())) // Always succeed logout
        )
      )
    )
  );

  // Logout Success - Clear Token and Navigate
  logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logoutSuccess),
        tap(() => {
          // Clear token from localStorage
          this.authService.clearToken();
          
          // Navigate to login
          this.router.navigate(['/auth/login']);
        })
      ),
    { dispatch: false }
  );

  // Register Effect
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      exhaustMap(({ email, password, firstName, lastName }) =>
        this.authService.register({ email, password, firstName, lastName }).pipe(
          map(response => 
            AuthActions.registerSuccess({ 
              user: response.user, 
              token: response.token 
            })
          ),
          catchError(error => 
            of(AuthActions.registerFailure({ 
              error: error.message || 'Registration failed' 
            }))
          )
        )
      )
    )
  );

  // Register Success - Store Token and Navigate
  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.registerSuccess),
        tap(({ token }) => {
          // Store token in localStorage
          this.authService.setToken(token);
          
          // Navigate to dashboard
          this.router.navigate(['/dashboard']);
        })
      ),
    { dispatch: false }
  );

  // Refresh Token Effect
  refreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshToken),
      exhaustMap(() =>
        this.authService.refreshToken().pipe(
          map(token => AuthActions.refreshTokenSuccess({ token })),
          catchError(error => 
            of(AuthActions.refreshTokenFailure({ 
              error: error.message || 'Token refresh failed' 
            }))
          )
        )
      )
    )
  );

  // Refresh Token Success - Update Stored Token
  refreshTokenSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.refreshTokenSuccess),
        tap(({ token }) => {
          this.authService.setToken(token);
        })
      ),
    { dispatch: false }
  );

  // Load User Profile Effect
  loadUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadUserProfile),
      exhaustMap(() =>
        this.authService.getUserProfile().pipe(
          map(user => AuthActions.loadUserProfileSuccess({ user })),
          catchError(error => 
            of(AuthActions.loadUserProfileFailure({ 
              error: error.message || 'Failed to load profile' 
            }))
          )
        )
      )
    )
  );

  // Check Auth Status on App Init
  checkAuthStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.checkAuthStatus),
      exhaustMap(() => {
        const token = this.authService.getToken();
        
        if (token && !this.authService.isTokenExpired(token)) {
          // Token exists and is valid, load user profile
          return this.authService.getUserProfile().pipe(
            map(user => 
              AuthActions.loginSuccess({ 
                user, 
                token 
              })
            ),
            catchError(() => of(AuthActions.logoutSuccess()))
          );
        } else {
          // No valid token, logout
          return of(AuthActions.logoutSuccess());
        }
      })
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
