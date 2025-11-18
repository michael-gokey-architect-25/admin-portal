// src/app/features/dashboard/dashboard.module.ts 

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ManagerDashboardComponent } from './components/manager-dashboard/manager-dashboard.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';


/**
 * DashboardModule: Encapsulates all dashboard-related functionality
 * Module Structure:
 * - Lazy-loaded from app-routing.module.ts
 * - Contains role-based dashboard views
 * - Uses SharedModule for UI components
 * - Routes protected by AuthGuard and RoleGuard
 * Key Features:
 * - Three distinct dashboard views (Admin, Manager, User)
 * - Role-based access control
 * - Shared UI components for consistency
 * - Self-contained feature module
 * Teaching Points:
 * - Feature module organization
 * - Role-based UI/UX patterns
 * - Component reusability with SharedModule
 * - Separation of concerns (each dashboard is independent)
 * Dashboard Hierarchy:
 * - Admin: System-wide view with management tools
 * - Manager: Team-focused view with reports
 * - User: Personal view with profile and activities
 * Data Flow:
 * 1. Components read user info from NgRx store
 * 2. Display role-appropriate content
 * 3. Provide quick actions relevant to role
 * 4. Show metrics and activities scoped to role  */

@NgModule({
  declarations: [
    AdminDashboardComponent,
    ManagerDashboardComponent,
    UserDashboardComponent
  ],
  imports: [
    CommonModule,              // Provides ngIf, ngFor, etc.
    DashboardRoutingModule,    // Dashboard-specific routes
    SharedModule               // Provides app-button, app-card, etc.
  ]
})
export class DashboardModule { }
