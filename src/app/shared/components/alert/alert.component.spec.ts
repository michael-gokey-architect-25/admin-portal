// src/app/shared/components/alert/alert.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertComponent } from './alert.component';


describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create, AlertComponent', () => {
    expect(component).toBeTruthy();
  });


  it('should have default type as info', () => {
    expect(component.type).toBe('info');
  });


  it('should return correct alert classes', () => {
    component.type = 'success';
    
    const classes = component.getAlertClasses();
    
    expect(classes).toBe('alert alert-success');
  });


  it('should return correct icon for success type', () => {
    component.type = 'success';
    expect(component.getIcon()).toBe('✓');
  });


  it('should return correct icon for error type', () => {
    component.type = 'error';
    expect(component.getIcon()).toBe('✕');
  });


  it('should return correct icon for warning type', () => {
    component.type = 'warning';
    expect(component.getIcon()).toBe('⚠');
  });


  it('should return correct icon for info type', () => {
    component.type = 'info';
    expect(component.getIcon()).toBe('ℹ');
  });


  it('should emit dismissed event when dismiss is called', () => {
    spyOn(component.dismissed, 'emit');
    
    component.dismiss();
    
    expect(component.dismissed_state).toBe(true);
    expect(component.dismissed.emit).toHaveBeenCalled();
  });


  it('should not be dismissible by default', () => {
    expect(component.dismissible).toBe(false);
  });


});


