// src/app/features/auth/components/forgot-password/forgot-password.component.ts 
/**
 * ForgotPasswordComponent: Handles password reset requests.
 * Key Features:
 * - Simple email form for password reset
 * - Success message after submission
 * - Link back to login page
 * Form Validation: Email: required, valid email format
 * Teaching Points:
 * - Component state management (isSubmitted flag)
 * - Conditional template rendering
 * - Future: This would integrate with a password reset API
 * Note: This is a simplified implementation. In production:
 * 1. Would dispatch an action to call password reset API
 * 2. Would handle errors from API
 * 3. Would implement rate limiting
 * 4. Would show loading state during API call  */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  // Reactive form for email input
  forgotPasswordForm!: FormGroup;
  
  // Flag to track if form has been submitted successfully
  isSubmitted = false;
  
  // Simulate loading state (in production, this would come from store)
  isLoading = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Initialize the form with email field
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  /**
   * Handle form submission, in production, this would:
   * 1. Dispatch action to NgRx store
   * 2. Call API endpoint for password reset
   * 3. Send reset link to user's email
   * 4. Handle API errors    */
  onSubmit(): void {
    // Validate form
    if (this.forgotPasswordForm.invalid) {
      this.forgotPasswordForm.markAllAsTouched();
      return;
    }

    // Simulate API call
    this.isLoading = true;

    // In production, you would dispatch an action here:
    // this.store.dispatch(requestPasswordReset({ 
    //   email: this.forgotPasswordForm.value.email 
    // }));

    // Simulate API delay
    setTimeout(() => {
      this.isLoading = false;
      this.isSubmitted = true;
    }, 1500);
  }

  /*** Check if email field has an error and has been touched   */
  hasError(): boolean {
    const emailField = this.forgotPasswordForm.get('email');
    return !!(emailField && emailField.invalid && emailField.touched);
  }

  /*** Get error message for email field */
  getErrorMessage(): string {
    const emailField = this.forgotPasswordForm.get('email');
    
    if (emailField?.hasError('required')) {
      return 'Email is required';
    }
    
    if (emailField?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    
    return '';
  }

  /*** Reset form to allow user to try again with different email */
  resetForm(): void {
    this.isSubmitted = false;
    this.forgotPasswordForm.reset();
  }
}

