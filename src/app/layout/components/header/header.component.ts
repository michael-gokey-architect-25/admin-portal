// src/app/layout/components/header/header.component.ts
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { 
  selectUser, 
  selectUserDisplayName, 
  selectUserInitials,
  selectUserRole 
} from '../../../store/auth/auth-selectors';
import { User, UserRole, logout } from '../../../store/auth/auth-actions';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  user$!: Observable<any>;
  userDisplayName$!: Observable<string>;
  userInitials$!: Observable<string>;
  userRole$!: Observable<UserRole | null>;
  
  showUserMenu = false;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.user$ = this.store.select(selectUser);
    this.userDisplayName$ = this.store.select(selectUserDisplayName);
    this.userInitials$ = this.store.select(selectUserInitials);
    this.userRole$ = this.store.select(selectUserRole);
  } // should we have a ngOnDestroy, question for you the reader?

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }

  onLogout(): void {
    this.showUserMenu = false;
    this.store.dispatch(logout());
  }

}


