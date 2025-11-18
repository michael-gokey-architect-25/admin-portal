// src/app/shared/components/loading-spinner/loading-spinner.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingSpinnerComponent } from './loading-spinner.component';


describe('LoadingSpinnerComponent', () => {
  let component: LoadingSpinnerComponent;
  let fixture: ComponentFixture<LoadingSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingSpinnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create, LoadingSpinnerComponent', () => {
    expect(component).toBeTruthy();
  });


  it('should have default size as md', () => {
    expect(component.size).toBe('md');
  });


  it('should have default color as primary', () => {
    expect(component.color).toBe('primary');
  });


  it('should return correct wrapper classes for default', () => {
    const classes = component.getWrapperClasses();
    
    expect(classes).toContain('spinner-wrapper');
    expect(classes).not.toContain('spinner-wrapper-fullscreen');
    expect(classes).not.toContain('spinner-wrapper-inline');
  });


  it('should return correct wrapper classes for fullscreen', () => {
    component.fullscreen = true;
    
    const classes = component.getWrapperClasses();
    
    expect(classes).toContain('spinner-wrapper');
    expect(classes).toContain('spinner-wrapper-fullscreen');
  });

  it('should return correct wrapper classes for inline', () => {
    component.inline = true;
    
    const classes = component.getWrapperClasses();
    
    expect(classes).toContain('spinner-wrapper');
    expect(classes).toContain('spinner-wrapper-inline');
  });


  it('should return correct spinner classes', () => {
    component.size = 'lg';
    component.color = 'secondary';
    
    const classes = component.getSpinnerClasses();
    
    expect(classes).toBe('spinner spinner-lg spinner-secondary');
  });

});
