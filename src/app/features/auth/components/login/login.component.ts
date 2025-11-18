// src/app/features/auth/components/login/login.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Import NgRx actions and selectors
import { login } from '../../../../store/auth/auth-actions';
import { 
  selectIsLoading, 
  selectAuthError,
  selectIsAuthenticated 
} from '../../../../store/auth/auth-selectors';


/**
 * LoginComponent: Handles user authentication via email and password.
 * Key Features:
 * - Reactive form with validation
 * - Dispatches login action to NgRx store
 * - Subscribes to auth state (loading, error)
 * - Redirects to dashboard on successful login
 * - Displays error messages from API
 * Form Validation:
 * - Email: required, valid email format
 * - Password: required, minimum 6 characters  */

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  // Reactive form for login
  loginForm!: FormGroup;
  
  // Observable streams from NgRx store
  isLoading$!: Observable<boolean>;
  errorMessage$!: Observable<string | null>;
  
  // Subject for managing subscriptions (prevents memory leaks)
  private destroy$ = new Subject<void>();
  
  // Flag to show/hide password
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) {}


  ngOnInit(): void {
    // Initialize the reactive form with validators
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    // Subscribe to loading state from store
    this.isLoading$ = this.store.select(selectIsLoading);
    // Subscribe to error messages from store
    this.errorMessage$ = this.store.select(selectAuthError);
    // Listen for authentication success
    // When user logs in successfully, navigate to dashboard
    this.store.select(selectIsAuthenticated)
      .pipe(takeUntil(this.destroy$))
      .subscribe(isAuthenticated => {
        if (isAuthenticated) {
          this.router.navigate(['/dashboard']);
        }
      });
  }


  ngOnDestroy(): void {
    // Clean up subscriptions to prevent memory leaks
    this.destroy$.next();
    this.destroy$.complete();
  }


  /*** Handle form submission, Validates form and dispatches login action */
  onSubmit(): void {
    // Mark all fields as touched to show validation errors
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    // Extract form values
    const { email, password } = this.loginForm.value;
    // Dispatch login action to NgRx store
    // The effect will handle the API call
    this.store.dispatch(login({ 
      credentials: { email, password } 
    }));
  }


  /*** Toggle password visibility  */
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }


  /*** Check if a form field has an error and has been touched */
  hasError(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }


  /*** Get error message for a specific field  */
  getErrorMessage(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    
    if (field?.hasError('required')) {
      return `${this.capitalize(fieldName)} is required`;
    }
    
    if (field?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    
    if (field?.hasError('minlength')) {
      const minLength = field.errors?.['minlength'].requiredLength;
      return `${this.capitalize(fieldName)} must be at least ${minLength} characters`;
    }
    return '';
  }


  /*** Utility function to capitalize first letter */
  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

}

