// src/app/layout/components/sidebar/sidebar.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { SharedModule } from '../../../shared/shared.module';
import { SidebarComponent } from './sidebar.component';
import { UserRole } from '../../../store/auth/auth-actions';
import { 
  selectIsAdmin, 
  selectIsManager, 
  selectCanManageUsers,
  selectCanViewTeamData 
} from '../../../store/auth/auth-selectors';


describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarComponent ],
      imports: [
        RouterTestingModule,
        SharedModule
      ],
      providers: [
        provideMockStore()
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    store.overrideSelector(selectIsAdmin, true);
    store.overrideSelector(selectIsManager, false);
    store.overrideSelector(selectCanManageUsers, true);
    store.overrideSelector(selectCanViewTeamData, true);
    fixture.detectChanges();
  });


  it('should create, SidebarComponent', () => {
    expect(component).toBeTruthy();
  });


  it('should initialize observables on ngOnInit', () => {
    expect(component.isAdmin$).toBeDefined();
    expect(component.isManager$).toBeDefined();
    expect(component.canManageUsers$).toBeDefined();
    expect(component.canViewTeamData$).toBeDefined();
  });


  it('should have main navigation items', () => {
    expect(component.mainNavItems.length).toBeGreaterThan(0);
    expect(component.mainNavItems[0].label).toBe('Dashboard');
  });


  it('should have management navigation items', () => {
    expect(component.managementNavItems.length).toBeGreaterThan(0);
    expect(component.managementNavItems[0].roles).toContain(UserRole.MANAGER);
    expect(component.managementNavItems[0].roles).toContain(UserRole.ADMIN);
  });


  it('should have admin navigation items', () => {
    expect(component.adminNavItems.length).toBeGreaterThan(0);
    expect(component.adminNavItems[0].label).toBe('User Management');
  });


  it('should have settings navigation items', () => {
    expect(component.settingsNavItems.length).toBeGreaterThan(0);
  });


  it('should apply collapsed class when isCollapsed is true', () => {
    component.isCollapsed = true;
    fixture.detectChanges();
    const sidebar = fixture.nativeElement.querySelector('.sidebar');
    expect(sidebar.classList.contains('collapsed')).toBe(true);
  });


  it('should not apply collapsed class when isCollapsed is false', () => {
    component.isCollapsed = false;
    fixture.detectChanges();
    const sidebar = fixture.nativeElement.querySelector('.sidebar');
    expect(sidebar.classList.contains('collapsed')).toBe(false);
  });

});

