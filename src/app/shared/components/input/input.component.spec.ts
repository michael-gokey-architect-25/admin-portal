// src/app/shared/components/input/input.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from './input.component';


describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create, InputComponent', () => {
    expect(component).toBeTruthy();
  });


  it('should have default type as text', () => {
    expect(component.type).toBe('text');
  });


  it('should generate unique id if not provided', () => {
    expect(component.id).toBeTruthy();
    expect(component.id).toContain('input-');
  });


  it('should update value when writeValue is called', () => {
    const testValue = 'test@example.com';
    
    component.writeValue(testValue);
    
    expect(component.value).toBe(testValue);
  });


  it('should call onChange when input value changes', () => {
    const onChangeSpy = jasmine.createSpy('onChange');
    component.registerOnChange(onChangeSpy);
    
    const event = { target: { value: 'new value' } } as any;
    component.onInputChange(event);
    
    expect(onChangeSpy).toHaveBeenCalledWith('new value');
  });


  it('should set disabled state', () => {
    component.setDisabledState(true);
    expect(component.disabled).toBe(true);
    
    component.setDisabledState(false);
    expect(component.disabled).toBe(false);
  });


  it('should set error state', () => {
    component.error = true;
    expect(component.hasError).toBe(true);
    
    component.error = false;
    expect(component.hasError).toBe(false);
  });

});
