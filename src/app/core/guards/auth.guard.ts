// src\app\core\guards\auth.guard.ts
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from '../../store/auth/auth-selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private store: Store,
    private router: Router
  ) {}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    return this.store.select(selectIsAuthenticated).pipe(
      take(1),
      map(isAuthenticated => {
        if (isAuthenticated) {
          // User is authenticated, allow access
          return true;
        } else {
          // User is not authenticated, redirect to login
          // Store the attempted URL for redirecting after login
          return this.router.createUrlTree(['/auth/login'], {
            queryParams: { returnUrl: state.url }
          });
        }
      })
    );
  }
}
