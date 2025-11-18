// src/app/features/auth/components/forgot-password/forgot-password.component.spec.ts
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ForgotPasswordComponent } from './forgot-password.component';
import { SharedModule } from '../../../../shared/shared.module';


describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPasswordComponent ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        SharedModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create, ForgotPasswordComponent', () => {
    expect(component).toBeTruthy();
  });


  it('should initialize form with empty email', () => {
    expect(component.forgotPasswordForm.get('email')?.value).toBe('');
  });


  it('should validate email is required', () => {
    const emailControl = component.forgotPasswordForm.get('email');
    expect(emailControl?.hasError('required')).toBe(true);
  });



  it('should validate email format', () => {
    const emailControl = component.forgotPasswordForm.get('email');
    emailControl?.setValue('invalid-email');
    expect(emailControl?.hasError('email')).toBe(true);
    emailControl?.setValue('valid@example.com');
    expect(emailControl?.valid).toBe(true);
  });


  it('should not submit form when email is invalid', () => {
    component.onSubmit();
    expect(component.isSubmitted).toBe(false);
    expect(component.forgotPasswordForm.get('email')?.touched).toBe(true);
  });


  it('should set isSubmitted to true after successful submission', fakeAsync(() => {
    component.forgotPasswordForm.patchValue({
      email: 'test@example.com'
    });
    component.onSubmit();
    expect(component.isLoading).toBe(true);
    tick(1500); // Fast-forward through setTimeout
    expect(component.isLoading).toBe(false);
    expect(component.isSubmitted).toBe(true);
  }));


  it('should return true when email has error and is touched', () => {
    const emailControl = component.forgotPasswordForm.get('email');
    emailControl?.markAsTouched();
    expect(component.hasError()).toBe(true);
  });


  it('should return appropriate error messages', () => {
    const emailControl = component.forgotPasswordForm.get('email');
    // Required error
    emailControl?.markAsTouched();
    expect(component.getErrorMessage()).toBe('Email is required');
    // Email format error
    emailControl?.setValue('invalid');
    expect(component.getErrorMessage()).toBe('Please enter a valid email address');
  });


  it('should reset form when resetForm is called', () => {
    component.isSubmitted = true;
    component.forgotPasswordForm.patchValue({
      email: 'test@example.com'
    });
    component.resetForm();
    expect(component.isSubmitted).toBe(false);
    expect(component.forgotPasswordForm.get('email')?.value).toBe(null);
  });


  it('should display success message after submission', fakeAsync(() => {
    component.forgotPasswordForm.patchValue({
      email: 'test@example.com'
    });
    component.onSubmit();
    tick(1500);
    fixture.detectChanges();
    const successTitle = fixture.nativeElement.querySelector('.success-title');
    expect(successTitle).toBeTruthy();
    expect(successTitle.textContent).toContain('Check Your Email');
  }));

});

