// src/app/layout/components/main-layout/main-layout.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { SharedModule } from '../../../shared/shared.module';
import { MainLayoutComponent } from './main-layout.component';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { checkAuthStatus } from '../../../store/auth/auth-actions';


describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        MainLayoutComponent,
        HeaderComponent,
        SidebarComponent,
        FooterComponent
      ],
      imports: [
        RouterTestingModule,
        SharedModule
      ],
      providers: [
        provideMockStore()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create, MainLayoutComponent', () => {
    expect(component).toBeTruthy();
  });


  it('should dispatch checkAuthStatus on ngOnInit', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(checkAuthStatus());
  });


  it('should toggle sidebar collapsed state on desktop', () => {
    component.isMobile = false;
    component.sidebarCollapsed = false;
    component.onToggleSidebar();
    expect(component.sidebarCollapsed).toBe(true);
    component.onToggleSidebar();
    expect(component.sidebarCollapsed).toBe(false);
  });


  it('should toggle sidebar open state on mobile', () => {
    component.isMobile = true;
    component.sidebarOpen = false;
    component.onToggleSidebar();
    expect(component.sidebarOpen).toBe(true);
    component.onToggleSidebar();
    expect(component.sidebarOpen).toBe(false);
  });


  it('should close sidebar when closeSidebar is called', () => {
    component.sidebarOpen = true;
    component.closeSidebar();
    expect(component.sidebarOpen).toBe(false);
  });


  it('should detect mobile screen size', () => {
    // Mock window.innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500
    });
    component['checkScreenSize']();
    expect(component.isMobile).toBe(true);
  });


  it('should detect desktop screen size', () => {
    // Mock window.innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024
    });
    component['checkScreenSize']();
    expect(component.isMobile).toBe(false);
  });


  it('should close sidebar when switching from mobile to desktop', () => {
    component.sidebarOpen = true;
    component.isMobile = true;
    // Simulate resize to desktop
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024
    });
    component['checkScreenSize']();
    expect(component.isMobile).toBe(false);
    expect(component.sidebarOpen).toBe(false);
  });

});
