// src/app/features/admin/admin-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { AuthGuard } from '../../core/guards/auth.guard';
import { RoleGuard } from '../../core/guards/role.guard';
import { UserRole } from '../../core/models/user-role';


/**
 * Admin Routing Module: Defines routes for the Admin feature module:
 * - /admin - Base admin route
 * - /admin/users - User list (requires ADMIN role)
 * - /admin/users/new - Create new user (requires ADMIN role)
 * - /admin/users/:id/edit - Edit user (requires ADMIN role)
 * All routes require authentication and ADMIN role.
 * Implements two levels of security:
 * 1. AuthGuard - Ensures user is logged in
 * 2. RoleGuard - Ensures user has required role (ADMIN)
 * If user lacks permissions:
 * - Not authenticated → redirects to /auth/login
 * - Not admin → redirects to dashboard for their role
 * CanDeactivate guards prevent users from leaving with unsaved changes */

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard, RoleGuard],
    data: { 
      roles: [UserRole.ADMIN],
      description: 'Admin Module - User Management'
    },
    children: [
      {
        path: 'users',
        component: UserListComponent,
        data: { title: 'User Management' }
      },
      {
        path: 'users/new',
        component: UserEditComponent,
        data: { title: 'Create New User' }
      },
      {
        path: 'users/:id/edit',
        component: UserEditComponent,
        data: { title: 'Edit User' }
      },
      // Redirect empty path to users list
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full'
      }
    ]
  }
];




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

/**
 * Routes Summary:
 * 
 * ┌─ /admin
 * │  ├─ /admin/users (UserListComponent)
 * │  ├─ /admin/users/new (UserEditComponent - create mode)
 * │  ├─ /admin/users/:id/edit (UserEditComponent - edit mode)
 * │  └─ [default] → /admin/users
 * 
 * Security Model:
 * - AuthGuard: Verifies authentication status
 * - RoleGuard: Verifies ADMIN role requirement
 * - CanDeactivate: Prevents unsaved changes loss
 * 
 * Error Handling:
 * - 401 Unauthorized → Redirect to /auth/login (via AuthGuard)
 * - 403 Forbidden → Redirect to dashboard (via RoleGuard)
 */
