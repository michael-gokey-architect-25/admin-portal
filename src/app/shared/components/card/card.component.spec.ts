// src/app/shared/components/card/card.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';


describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create, CardComponent', () => {
    expect(component).toBeTruthy();
  });


  it('should have default variant as default', () => {
    expect(component.variant).toBe('default');
  });


  it('should return correct card classes for default variant', () => {
    component.variant = 'default';
    
    const classes = component.getCardClasses();
    
    expect(classes).toContain('card');
    expect(classes).not.toContain('card-bordered');
    expect(classes).not.toContain('card-elevated');
  });


  it('should return correct card classes for bordered variant', () => {
    component.variant = 'bordered';
    
    const classes = component.getCardClasses();
    
    expect(classes).toContain('card');
    expect(classes).toContain('card-bordered');
  });


  it('should return correct card classes for elevated variant', () => {
    component.variant = 'elevated';
    
    const classes = component.getCardClasses();
    
    expect(classes).toContain('card');
    expect(classes).toContain('card-elevated');
  });


  it('should include hoverable class when hoverable is true', () => {
    component.hoverable = true;
    
    const classes = component.getCardClasses();
    
    expect(classes).toContain('card-hoverable');
  });


  it('should include compact class when compact is true', () => {
    component.compact = true;
    
    const classes = component.getCardClasses();
    
    expect(classes).toContain('card-body-compact');
  });

});
