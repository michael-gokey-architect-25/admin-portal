// src/app/core/interceptors/auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from '../services/auth.service';
import { logout } from '../../store/auth/auth-actions';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) {}


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Get the access token
    const accessToken = this.authService.getAccessToken();

    // Clone the request and add authorization header if token exists
    // Skip adding token for auth endpoints (login, register)
    if (accessToken && !this.isAuthEndpoint(request.url)) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }

    // Handle the request and catch errors
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Unauthorized - token expired or invalid
          this.handleUnauthorized();
        }

        if (error.status === 403) {
          // Forbidden - user doesn't have permission
          this.handleForbidden();
        }

        return throwError(() => error);
      })
    );
  }


  /*** Check if the request URL is an auth endpoint */
  private isAuthEndpoint(url: string): boolean {
    const authEndpoints = ['/auth/login', '/auth/register', '/auth/refresh'];
    return authEndpoints.some(endpoint => url.includes(endpoint));
  }


  /*** Handle 401 Unauthorized error */
  private handleUnauthorized(): void {
    // Clear token and dispatch logout action
    this.authService.clearToken();
    this.store.dispatch(logout());
    
    // Navigate to login page
    this.router.navigate(['/auth/login'], {
      queryParams: { returnUrl: this.router.url }
    });
  }


  /*** Handle 403 Forbidden error */
  private handleForbidden(): void {
    // Navigate to appropriate dashboard or show error
    this.router.navigate(['/dashboard']);
  }
}
