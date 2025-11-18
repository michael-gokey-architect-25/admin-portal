// src/app/layout/components/main-layout/main-layout.component.ts
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { checkAuthStatus } from '../../../store/auth/auth-actions';


@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  sidebarCollapsed = false;
  sidebarOpen = false;
  isMobile = false;

  constructor(private store: Store) {
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
  }

  ngOnInit(): void {
    // Check auth status on layout init
    this.store.dispatch(checkAuthStatus());
  }

  onToggleSidebar(): void {
    if (this.isMobile) {
      this.sidebarOpen = !this.sidebarOpen;
    } else {
      this.sidebarCollapsed = !this.sidebarCollapsed;
    }
  }

  closeSidebar(): void {
    this.sidebarOpen = false;
  }

  private checkScreenSize(): void {
    this.isMobile = window.innerWidth < 769;
    if (!this.isMobile) {
      this.sidebarOpen = false;
    }
  }

}
