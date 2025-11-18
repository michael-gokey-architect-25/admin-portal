//  src/app/features/dashboard/components/admin-dashboard/admin-dashboard.component.spec.ts 
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { SharedModule } from '../../../../shared/shared.module';
import { selectUser, selectUserDisplayName } from '../../../../store/auth/auth-selectors';
import { UserRole } from '../../../../store/auth/auth-actions';


describe('AdminDashboardComponent', () => {
  let component: AdminDashboardComponent;
  let fixture: ComponentFixture<AdminDashboardComponent>;
  let store: MockStore;

  const mockUser = {
    id: '1',
    email: 'admin@example.com',
    firstName: 'Admin',
    lastName: 'User',
    role: UserRole.ADMIN
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDashboardComponent ],
      imports: [ SharedModule ],
      providers: [ provideMockStore() ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDashboardComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    
    store.overrideSelector(selectUser, mockUser);
    store.overrideSelector(selectUserDisplayName, 'Admin User');
    
    fixture.detectChanges();
  });

  it('should create, AdminDashboardComponent', () => {
    expect(component).toBeTruthy();
  });


  it('should have 4 stat cards', () => {
    expect(component.stats.length).toBe(4);
  });


  it('should have recent activities', () => {
    expect(component.recentActivities.length).toBeGreaterThan(0);
  });


  it('should format relative time correctly', () => {
    const fiveMinutesAgo = new Date(Date.now() - 1000 * 60 * 5);
    const result = component.getRelativeTime(fiveMinutesAgo);
    expect(result).toContain('minutes ago');
  });


  it('should return "Just now" for very recent timestamps', () => {
    const now = new Date();
    const result = component.getRelativeTime(now);
    expect(result).toBe('Just now');
  });


  it('should return correct icon for activity types', () => {
    expect(component.getActivityIcon('user')).toBe('👤');
    expect(component.getActivityIcon('system')).toBe('⚙️');
    expect(component.getActivityIcon('security')).toBe('🔒');
  });


  it('should return correct CSS class for activity types', () => {
    expect(component.getActivityClass('user')).toBe('activity-user');
    expect(component.getActivityClass('system')).toBe('activity-system');
    expect(component.getActivityClass('security')).toBe('activity-security');
  });


  it('should call console.log when navigating to user management', () => {
    spyOn(console, 'log');
    component.navigateToUserManagement();
    expect(console.log).toHaveBeenCalledWith('Navigate to user management');
  });


  it('should call console.log when refreshing dashboard', () => {
    spyOn(console, 'log');
    component.refreshDashboard();
    expect(console.log).toHaveBeenCalledWith('Refreshing dashboard data...');
  });


  it('should display user name from store', () => {
    fixture.detectChanges();
    const subtitle = fixture.nativeElement.querySelector('.dashboard-subtitle');
    expect(subtitle.textContent).toContain('Admin User');
  });


  it('should render all stat cards', () => {
    const statCards = fixture.nativeElement.querySelectorAll('.stat-card');
    expect(statCards.length).toBe(4);
  });


  it('should render action cards', () => {
    const actionCards = fixture.nativeElement.querySelectorAll('.action-card');
    expect(actionCards.length).toBe(3);
  });


  it('should have proper ARIA labels on stat cards', () => {
    const statCard = fixture.nativeElement.querySelector('[role="group"]');
    expect(statCard.getAttribute('aria-label')).toBeTruthy();
  });


  it('should track activities by id', () => {
    const activity = component.recentActivities[0];
    const trackById = component.trackByActivityId(0, activity);
    expect(trackById).toBe(activity.id);
  });

});
