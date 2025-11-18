// src/app/features/auth/components/login/login.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { LoginComponent } from './login.component';
import { SharedModule } from '../../../../shared/shared.module';
import { login } from '../../../../store/auth/auth-actions';
import { 
  selectIsLoading, 
  selectAuthError,
  selectIsAuthenticated 
} from '../../../../store/auth/auth-selectors';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: MockStore;

  const initialState = {
    auth: {
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        SharedModule
      ],
      providers: [
        provideMockStore({ initialState })
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    
    store.overrideSelector(selectIsLoading, false);
    store.overrideSelector(selectAuthError, null);
    store.overrideSelector(selectIsAuthenticated, false);
    
    fixture.detectChanges();
  });


  it('should create, LoginComponent', () => {
    expect(component).toBeTruthy();
  });


  it('should initialize form with empty values', () => {
    expect(component.loginForm.get('email')?.value).toBe('');
    expect(component.loginForm.get('password')?.value).toBe('');
  });

  it('should mark email as invalid when empty', () => {
    const emailControl = component.loginForm.get('email');
    expect(emailControl?.valid).toBe(false);
    expect(emailControl?.hasError('required')).toBe(true);
  });


  it('should mark email as invalid when format is wrong', () => {
    const emailControl = component.loginForm.get('email');
    emailControl?.setValue('invalid-email');
    expect(emailControl?.valid).toBe(false);
    expect(emailControl?.hasError('email')).toBe(true);
  });

  it('should mark password as invalid when less than 6 characters', () => {
    const passwordControl = component.loginForm.get('password');
    passwordControl?.setValue('12345');
    expect(passwordControl?.valid).toBe(false);
    expect(passwordControl?.hasError('minlength')).toBe(true);
  });


  it('should mark form as valid when all fields are correct', () => {
    component.loginForm.patchValue({
      email: 'test@example.com',
      password: 'password123'
    });
    expect(component.loginForm.valid).toBe(true);
  });


  it('should not dispatch login action when form is invalid', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    
    component.onSubmit();
    
    expect(dispatchSpy).not.toHaveBeenCalled();
  });


  it('should dispatch login action when form is valid', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    
    component.loginForm.patchValue({
      email: 'test@example.com',
      password: 'password123'
    });
    
    component.onSubmit();
    
    expect(dispatchSpy).toHaveBeenCalledWith(login({
      credentials: {
        email: 'test@example.com',
        password: 'password123'
      }
    }));
  });


  it('should toggle password visibility', () => {
    expect(component.showPassword).toBe(false);
    
    component.togglePasswordVisibility();
    expect(component.showPassword).toBe(true);
    
    component.togglePasswordVisibility();
    expect(component.showPassword).toBe(false);
  });


  it('should return true when field has error and is touched', () => {
    const emailControl = component.loginForm.get('email');
    emailControl?.markAsTouched();
    
    expect(component.hasError('email')).toBe(true);
  });


  it('should return appropriate error message for required field', () => {
    const emailControl = component.loginForm.get('email');
    emailControl?.markAsTouched();
    
    const errorMsg = component.getErrorMessage('email');
    expect(errorMsg).toBe('Email is required');
  });


  it('should return appropriate error message for invalid email', () => {
    const emailControl = component.loginForm.get('email');
    emailControl?.setValue('invalid');
    emailControl?.markAsTouched();
    
    const errorMsg = component.getErrorMessage('email');
    expect(errorMsg).toBe('Please enter a valid email address');
  });


  it('should return appropriate error message for minlength', () => {
    const passwordControl = component.loginForm.get('password');
    passwordControl?.setValue('123');
    passwordControl?.markAsTouched();
    const errorMsg = component.getErrorMessage('password');
    expect(errorMsg).toContain('must be at least 6 characters');
  });

});


