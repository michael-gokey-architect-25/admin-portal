// src/app/features/auth/components/register/register.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { RegisterComponent } from './register.component';
import { SharedModule } from '../../../../shared/shared.module';
import { register } from '../../../../store/auth/auth-actions';


describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        SharedModule
      ],
      providers: [
        provideMockStore()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });


  it('should create, RegisterComponent', () => {
    expect(component).toBeTruthy();
  });


  it('should initialize form with empty values', () => {
    expect(component.registerForm.get('firstName')?.value).toBe('');
    expect(component.registerForm.get('email')?.value).toBe('');
  });


  it('should validate first name is required', () => {
    const firstNameControl = component.registerForm.get('firstName');
    expect(firstNameControl?.hasError('required')).toBe(true);
  });


  it('should validate password strength', () => {
    const passwordControl = component.registerForm.get('password');
    
    // Weak password (no uppercase)
    passwordControl?.setValue('password123');
    expect(passwordControl?.hasError('passwordStrength')).toBe(true);
    
    // Strong password
    passwordControl?.setValue('Password123');
    expect(passwordControl?.hasError('passwordStrength')).toBe(false);
  });


  it('should validate password match', () => {
    component.registerForm.patchValue({
      password: 'Password123',
      confirmPassword: 'Password456'
    });
    
    expect(component.registerForm.hasError('passwordMismatch')).toBe(true);
    
    component.registerForm.patchValue({
      confirmPassword: 'Password123'
    });
    
    expect(component.registerForm.hasError('passwordMismatch')).toBe(false);
  });


  it('should detect password mismatch', () => {
    component.registerForm.patchValue({
      password: 'Password123',
      confirmPassword: 'Different123'
    });
    component.registerForm.get('confirmPassword')?.markAsTouched();
    
    expect(component.hasPasswordMismatch()).toBe(true);
  });


  it('should dispatch register action when form is valid', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    
    component.registerForm.patchValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'Password123',
      confirmPassword: 'Password123'
    });
    
    component.onSubmit();
    
    expect(dispatchSpy).toHaveBeenCalledWith(register({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'Password123'
    }));
  });


  it('should toggle password visibility', () => {
    expect(component.showPassword).toBe(false);
    
    component.togglePasswordVisibility('password');
    expect(component.showPassword).toBe(true);
  });


  it('should toggle confirm password visibility', () => {
    expect(component.showConfirmPassword).toBe(false);
    
    component.togglePasswordVisibility('confirmPassword');
    expect(component.showConfirmPassword).toBe(true);
  });

});