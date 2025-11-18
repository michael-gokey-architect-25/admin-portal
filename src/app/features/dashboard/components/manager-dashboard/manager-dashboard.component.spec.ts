// src/app/features/dashboard/components/manager-dashboard/manager-dashboard.component.spec.ts 

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ManagerDashboardComponent } from './manager-dashboard.component';
import { SharedModule } from '../../../../shared/shared.module';
import { UserRole } from '../../../../store/auth/auth-actions';


describe('ManagerDashboardComponent', () => {
  let component: ManagerDashboardComponent;
  let fixture: ComponentFixture<ManagerDashboardComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerDashboardComponent ],
      imports: [ SharedModule ],
      providers: [ provideMockStore() ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerDashboardComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });


  it('should create, ManagerDashboardComponent', () => {
    expect(component).toBeTruthy();
  });


  it('should have 4 team metrics', () => {
    expect(component.teamMetrics.length).toBe(4);
  });


  it('should have team members', () => {
    expect(component.teamMembers.length).toBeGreaterThan(0);
  });


  it('should return correct status label', () => {
    expect(component.getStatusLabel('active')).toBe('Active now');
    expect(component.getStatusLabel('away')).toBe('Away');
    expect(component.getStatusLabel('offline')).toBe('Offline');
  });


  it('should return correct status class', () => {
    expect(component.getStatusClass('active')).toBe('status-active');
  });


  it('should format relative time', () => {
    const recent = new Date();
    expect(component.getRelativeTime(recent)).toBe('Just now');
  });


  it('should track members by id', () => {
    const member = component.teamMembers[0];
    expect(component.trackByMemberId(0, member)).toBe(member.id);
  });

});