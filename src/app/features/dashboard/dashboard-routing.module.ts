// src/app/features/dashboard/dashboard-routing.module.ts 

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ManagerDashboardComponent } from './components/manager-dashboard/manager-dashboard.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AuthGuard } from '../../core/guards/auth.guard';
import { RoleGuard } from '../../core/guards/role.guard';
import { UserRole } from '../../store/auth/auth-actions';


/**
 * Dashboard Module Routes
 * Route Structure with Role-Based Access Control:
 * - /dashboard/admin    → AdminDashboardComponent (ADMIN only)
 * - /dashboard/manager  → ManagerDashboardComponent (MANAGER, ADMIN)
 * - /dashboard/user     → UserDashboardComponent (All authenticated users)
 * - /dashboard (default) → redirects to /dashboard/user
 * Teaching Points:
 * - Role-based routing with RoleGuard
 * - Multiple guards on a single route (AuthGuard + RoleGuard)
 * - Route data for passing role requirements
 * - Default redirect based on common use case
 * Guard Execution Order:
 * 1. AuthGuard checks if user is authenticated
 * 2. RoleGuard checks if user has required role
 * 3. If both pass, route activates
 * Accessibility:
 * - Each dashboard sets document title for screen readers
 * - Focus management when navigating between dashboards  */
const routes: Routes = [
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { 
      roles: [UserRole.ADMIN],
      title: 'Admin Dashboard'
    }
  },
  {
    path: 'manager',
    component: ManagerDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { 
      roles: [UserRole.MANAGER, UserRole.ADMIN],
      title: 'Manager Dashboard'
    }
  },
  {
    path: 'user',
    component: UserDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { 
      roles: [UserRole.USER, UserRole.MANAGER, UserRole.ADMIN],
      title: 'My Dashboard'
    }
  },
  {
    // Default route: redirect to user dashboard
    // This is the most common case for regular users
    path: '',
    redirectTo: 'user',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

