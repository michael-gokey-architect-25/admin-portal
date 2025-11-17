// src/app/core/guards/role.guard.ts
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectUserRole } from '../../store/auth/auth-selectors';
import { UserRole } from '../../store/auth/auth-actions';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private store: Store,
    private router: Router
  ) {}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // Get required roles from route data
    const requiredRoles = route.data['roles'] as UserRole[];

    if (!requiredRoles || requiredRoles.length === 0) {
      // No roles required, allow access
      return true;
    }

    return this.store.select(selectUserRole).pipe(
      take(1),
      map(userRole => {
        if (!userRole) {
          // No user role found, redirect to login
          return this.router.createUrlTree(['/auth/login']);
        }

        if (requiredRoles.includes(userRole)) {
          // User has required role, allow access
          return true;
        } else {
          // User doesn't have required role, redirect to their dashboard
          return this.getRedirectUrlByRole(userRole);
        }
      })
    );
  }


  /*** Get redirect URL based on user role  */
  private getRedirectUrlByRole(role: UserRole): UrlTree {
    switch (role) {
      case UserRole.ADMIN:
        return this.router.createUrlTree(['/dashboard/admin']);
      case UserRole.MANAGER:
        return this.router.createUrlTree(['/dashboard/manager']);
      case UserRole.USER:
        return this.router.createUrlTree(['/dashboard/user']);
      default:
        return this.router.createUrlTree(['/dashboard']);
    }
  }
}

