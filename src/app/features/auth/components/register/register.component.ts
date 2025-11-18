// src/app/features/auth/components/register/register.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { register } from '../../../../store/auth/auth-actions';
import { 
  selectIsLoading, 
  selectAuthError,
  selectIsAuthenticated 
} from '../../../../store/auth/auth-selectors';


/**
 * RegisterComponent: Handles new user registration.
 * Key Features:
 * - Reactive form with custom validators
 * - Password confirmation matching
 * - Dispatches register action to NgRx store
 * - Real-time validation feedback
 * - Redirects to dashboard on successful registration
 * Form Validation:
 * - First Name: required, min 2 characters
 * - Last Name: required, min 2 characters
 * - Email: required, valid email format
 * - Password: required, min 8 characters, complexity rules
 * - Confirm Password: required, must match password
 * Teaching Points:
 * - Custom validator functions (passwordMatch)
 * - FormGroup-level validation
 * - Accessing form errors in template  */

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm!: FormGroup; // Reactive form for registration
  isLoading$!: Observable<boolean>;  // Observable streams from NgRx store
  errorMessage$!: Observable<string | null>;
  private destroy$ = new Subject<void>(); // Subject for managing subscriptions
  showPassword = false; // Flags to show/hide passwords
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) {}


  ngOnInit(): void {
    // Initialize the reactive form with validators
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required, 
        Validators.minLength(8),
        this.passwordStrengthValidator
      ]],
      confirmPassword: ['', [Validators.required]]
    }, {
      // Add form-level validator for password matching
      validators: this.passwordMatchValidator
    });

    // Subscribe to store selectors
    this.isLoading$ = this.store.select(selectIsLoading);
    this.errorMessage$ = this.store.select(selectAuthError);
    
    // Navigate on successful registration
    this.store.select(selectIsAuthenticated)
      .pipe(takeUntil(this.destroy$))
      .subscribe(isAuthenticated => {
        if (isAuthenticated) {
          this.router.navigate(['/dashboard']);
        }
      });
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  /**
   * Custom validator: Password strength
   * Requires at least one uppercase, one lowercase, and one number */
  private passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    
    if (!value) {
      return null; // Don't validate empty values (required validator handles this)
    }

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);

    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;

    return passwordValid ? null : { passwordStrength: true };
  }


  /**
   * Custom validator: Password match
   * Validates that password and confirmPassword fields match */
  private passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    // If either field is empty, don't validate
    if (!password || !confirmPassword) {
      return null;
    }

    // Check if passwords match
    return password === confirmPassword ? null : { passwordMismatch: true };
  }


  /*** Handle form submission */
  onSubmit(): void {
    // Mark all fields as touched to show validation errors
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    // Extract form values
    const { firstName, lastName, email, password } = this.registerForm.value;
    // Dispatch register action to NgRx store
    this.store.dispatch(register({ 
      firstName,
      lastName,
      email,
      password
    }));
  }


  /*** Toggle password visibility */
  togglePasswordVisibility(field: 'password' | 'confirmPassword'): void {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }


  /*** Check if a form field has an error and has been touched */
  hasError(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }


  /*** Check if the form has a password mismatch error */
  hasPasswordMismatch(): boolean {
    const confirmPasswordField = this.registerForm.get('confirmPassword');
    return !!(
      this.registerForm.hasError('passwordMismatch') && 
      confirmPasswordField?.touched
    );
  }


  /*** Get error message for a specific field */
  getErrorMessage(fieldName: string): string {
    const field = this.registerForm.get(fieldName);
    
    if (field?.hasError('required')) {
      return `${this.capitalize(fieldName)} is required`;
    }
    
    if (field?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    
    if (field?.hasError('minlength')) {
      const minLength = field.errors?.['minlength'].requiredLength;
      return `Must be at least ${minLength} characters`;
    }

    if (field?.hasError('passwordStrength')) {
      return 'Password must contain uppercase, lowercase, and number';
    }
    
    return '';
  }

  /*** Utility function to capitalize field names */
  private capitalize(str: string): string {
    // Handle camelCase field names
    const formatted = str.replace(/([A-Z])/g, ' $1').trim();
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  }

}

