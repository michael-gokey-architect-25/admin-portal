// src/app/features/auth/auth-routing.module.ts 
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';


/**
 * Auth Module Routes:
 * - /auth/login         → LoginComponent
 * - /auth/register      → RegisterComponent
 * - /auth/forgot-password → ForgotPasswordComponent
 * - /auth (default)     → redirects to /auth/login
 * Teaching Points:
 * - These are child routes (loaded under /auth path in app-routing)
 * - No guards needed (these are public routes)
 * - Default redirect ensures /auth goes to login
 * - pathMatch: 'full' ensures exact path matching  */
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    // Default route: redirect empty path to login
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
