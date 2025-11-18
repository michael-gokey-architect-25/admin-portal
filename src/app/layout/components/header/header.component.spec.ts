// src/app/layout/components/header/header.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { HeaderComponent } from './header.component';
import { SharedModule } from '../../../shared/shared.module';
import { UserRole, logout } from '../../../store/auth/auth-actions';
import { 
  selectUser, 
  selectUserDisplayName, 
  selectUserInitials,
  selectUserRole 
} from '../../../store/auth/auth-selectors';



describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let store: MockStore;

  const initialState = {
    auth: {
      user: {
        id: '1',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        role: UserRole.ADMIN
      },
      isAuthenticated: true,
      isLoading: false,
      error: null,
      token: null
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [
        RouterTestingModule,
        SharedModule
      ],
      providers: [
        provideMockStore({ initialState })
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    store.overrideSelector(selectUser, initialState.auth.user);
    store.overrideSelector(selectUserDisplayName, 'Test User');
    store.overrideSelector(selectUserInitials, 'TU');
    store.overrideSelector(selectUserRole, UserRole.ADMIN);
    fixture.detectChanges();
  });


  it('should create, HeaderComponent', () => {
    expect(component).toBeTruthy();
  });


  it('should initialize observables on ngOnInit', () => {
    expect(component.user$).toBeDefined();
    expect(component.userDisplayName$).toBeDefined();
    expect(component.userInitials$).toBeDefined();
    expect(component.userRole$).toBeDefined();
  });


  it('should toggle user menu when toggleUserMenu is called', () => {
    expect(component.showUserMenu).toBe(false);
    component.toggleUserMenu();
    expect(component.showUserMenu).toBe(true);
    component.toggleUserMenu();
    expect(component.showUserMenu).toBe(false);
  });


  it('should emit toggleSidebar event when menu toggle is clicked', () => {
    spyOn(component.toggleSidebar, 'emit');
    const button = fixture.nativeElement.querySelector('.menu-toggle');
    button.click();
    expect(component.toggleSidebar.emit).toHaveBeenCalled();
  });


  it('should dispatch logout action when onLogout is called', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.onLogout();
    expect(dispatchSpy).toHaveBeenCalledWith(logout());
    expect(component.showUserMenu).toBe(false);
  });


  it('should close user menu when logout is clicked', () => {
    component.showUserMenu = true;
    component.onLogout();
    expect(component.showUserMenu).toBe(false);
  });

});
