// src/app/features/admin/admin.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';

/**
 * Admin Feature Module
 * Encapsulates all user management functionality (CRUD operations).
 * This is a lazy-loaded feature module that only loads when user navigates to /admin routes.
 * Module Structure:
 * ├── Declarations (Components used only in this module)
 * │   ├── UserListComponent
 * │   └── UserEditComponent
 * ├── Imports (Dependencies this module needs)
 * │   ├── CommonModule (ng directives, pipes)
 * │   ├── ReactiveFormsModule (FormBuilder, FormGroup, Validators)
 * │   ├── FormsModule (ngModel, form directives)
 * │   ├── SharedModule (shared UI components, pipes, directives)
 * │   └── AdminRoutingModule (routing configuration)
 * └── No Providers or Exports (self-contained)
 * Key Principles:
 * 1. LAZY LOADING: Module is only loaded when user navigates to /admin
 * 2. ENCAPSULATION: Components are declared only here, not exported
 * 3. REUSABILITY: Imports SharedModule for common UI components
 * 4. ROUTING: Self-contained routing prevents conflicts with other modules
 * 5. FORM MANAGEMENT: Provides FormBuilder and reactive forms capabilities
 * Dependencies:
 * - CommonModule: For *ngIf, *ngFor, async pipe
 * - ReactiveFormsModule: For FormBuilder, FormGroup, FormControl, Validators
 * - FormsModule: For template-driven form directives (if needed)
 * - SharedModule: For reusable components (buttons, inputs, cards, alerts, spinner)
 * - AdminRoutingModule: For feature routing with role guards
 * Component Roles:
 * - UserListComponent: Display all users in paginated table with search/filter/sort
 * - UserEditComponent: Create new users or edit existing user details and permissions
 * Security:
 * All routes are protected by:
 * - AuthGuard: Ensures user is authenticated
 * - RoleGuard: Ensures user has ADMIN role
 * Lazy Loading Path:
 * app-routing.module.ts → admin path uses loadChildren → lazy loads AdminModule 
 * Memory Management:
 * - Components properly unsubscribe from observables using takeUntil(destroy$)
 * - No memory leaks from form subscriptions
 * - Proper cleanup in ngOnDestroy
 * Example Usage in App Routing:
 * {
 *   path: 'admin',
 *   loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule),
 *   canActivate: [AuthGuard]
 * }
 */

@NgModule({
  declarations: [
    UserListComponent,
    UserEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
