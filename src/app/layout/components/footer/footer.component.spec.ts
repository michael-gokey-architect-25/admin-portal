// src/app/layout/components/footer/footer.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';


describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create, FooterComponent', () => {
    expect(component).toBeTruthy();
  });


  it('should set currentYear to current year', () => {
    const expectedYear = new Date().getFullYear();
    expect(component.currentYear).toBe(expectedYear);
  });


  it('should display current year in template', () => {
    const compiled = fixture.nativeElement;
    const copyrightText = compiled.querySelector('.copyright').textContent;
    const expectedYear = new Date().getFullYear();
    
    expect(copyrightText).toContain(expectedYear.toString());
    expect(copyrightText).toContain('AdminPortal');
  });


  it('should have footer links', () => {
    const compiled = fixture.nativeElement;
    const links = compiled.querySelectorAll('.footer-link');
    
    expect(links.length).toBe(3);
  });


  it('should have Privacy Policy link', () => {
    const compiled = fixture.nativeElement;
    const links = Array.from(compiled.querySelectorAll('.footer-link'));
    const privacyLink = links.find((link: any) => link.textContent === 'Privacy Policy');
    
    expect(privacyLink).toBeTruthy();
  });


  it('should have Terms of Service link', () => {
    const compiled = fixture.nativeElement;
    const links = Array.from(compiled.querySelectorAll('.footer-link'));
    const termsLink = links.find((link: any) => link.textContent === 'Terms of Service');
    
    expect(termsLink).toBeTruthy();
  });


  it('should have Contact link', () => {
    const compiled = fixture.nativeElement;
    const links = Array.from(compiled.querySelectorAll('.footer-link'));
    const contactLink = links.find((link: any) => link.textContent === 'Contact');
    
    expect(contactLink).toBeTruthy();
  });

});
