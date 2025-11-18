// src/app/features/auth/auth.module.ts 
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

/**
 * AuthModule: Encapsulates all authentication-related functionality
 * Module Structure:
 * - Lazy-loaded from app-routing.module.ts
 * - Contains login, registration, and password reset features
 * - Uses ReactiveFormsModule for form handling
 * - Imports SharedModule for UI components (buttons, inputs, cards, alerts)
 * Key Features:
 * - Self-contained authentication flow
 * - No dependencies on other feature modules
 * - Uses NgRx store for state management (imported at root level)
 * Teaching Points:
 * - Feature modules should be focused and cohesive
 * - Import only what you need (CommonModule, not BrowserModule)
 * - ReactiveFormsModule is needed for FormBuilder and FormGroup
 * - SharedModule provides reusable UI components
 * - Declarations are private to this module (not exported)  */

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,       
    ReactiveFormsModule,    
    AuthRoutingModule,      
    SharedModule           
  ]
})
export class AuthModule { }
