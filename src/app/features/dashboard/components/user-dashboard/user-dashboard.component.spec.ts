// # src/app/features/dashboard/components/user-dashboard/user-dashboard.component.spec.ts 
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserDashboardComponent } from './user-dashboard.component';
import { SharedModule } from '../../../../shared/shared.module';


describe('UserDashboardComponent', () => {
  let component: UserDashboardComponent;
  let fixture: ComponentFixture<UserDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDashboardComponent ],
      imports: [ SharedModule, RouterTestingModule ],
      providers: [ provideMockStore() ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create, UserDashboardComponent', () => {
    expect(component).toBeTruthy();
  });


  it('should have personal stats', () => {
    expect(component.personalStats.length).toBe(4);
  });


  it('should format relative time', () => {
    const now = new Date();
    expect(component.getRelativeTime(now)).toBe('Just now');
  });

});
