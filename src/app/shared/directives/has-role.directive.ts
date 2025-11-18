// src/app/shared/directives/has-role.directive.ts
import { Directive, Input, TemplateRef, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { selectUserRole } from '..//../store/auth/auth-selectors';
import { UserRole } from '../../store/auth/auth-actions';


@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit, OnDestroy {
  private requiredRoles: UserRole[] = [];
  private destroy$ = new Subject<void>();

  // @Decorators like Input and Output are important, see comments below.
  @Input() set appHasRole(roles: UserRole | UserRole[]) {
    this.requiredRoles = Array.isArray(roles) ? roles : [roles];
    this.updateView();
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private store: Store
  ) {}


  ngOnInit(): void {
    // Subscribe to user role changes
    this.store.select(selectUserRole)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.updateView();
      });
  }

  // Learn to always break down this to free up resources
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  private updateView(): void {
    this.store.select(selectUserRole)
      .pipe(takeUntil(this.destroy$))
      .subscribe(userRole => {
        // Clear the view
        this.viewContainer.clear();

        // Show the element if user has one of the required roles
        if (userRole && this.requiredRoles.includes(userRole)) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        }
      });
  }

}

/**
Decorators like @Input and @Output are important because they enable 
modular and reusable components by facilitating communication between 
parent and child components. @Input passes data from a parent to a child, 
while @Output allows a child to emit events or data back to the parent, 
creating a clean, bi-directional data flow for building 
dynamic and testable user interfaces  */
