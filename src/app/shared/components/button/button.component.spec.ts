// src/app/shared/components/button/button.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';


describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create, ButtonComponent', () => {
    expect(component).toBeTruthy();
  });


  it('should have default type as button', () => {
    expect(component.type).toBe('button');
  });


  it('should have default variant as primary', () => {
    expect(component.variant).toBe('primary');
  });

  
  it('should emit clicked event when button is clicked and not disabled', () => {
    spyOn(component.clicked, 'emit');
    const event = new Event('click');
    
    component.handleClick(event);
    
    expect(component.clicked.emit).toHaveBeenCalledWith(event);
  });


  it('should not emit clicked event when button is disabled', () => {
    spyOn(component.clicked, 'emit');
    component.disabled = true;
    const event = new Event('click');
    
    component.handleClick(event);
    
    expect(component.clicked.emit).not.toHaveBeenCalled();
  });


  it('should not emit clicked event when button is loading', () => {
    spyOn(component.clicked, 'emit');
    component.isLoading = true;
    const event = new Event('click');
    
    component.handleClick(event);
    
    expect(component.clicked.emit).not.toHaveBeenCalled();
  });


  it('should return correct button classes', () => {
    component.variant = 'success';
    component.size = 'lg';
    component.block = true;
    
    const classes = component.getButtonClasses();
    
    expect(classes).toContain('btn-success');
    expect(classes).toContain('btn-lg');
    expect(classes).toContain('btn-block');
  });

});
