// src/app/layout/components/sidebar/sidebar.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserRole } from '../../../store/auth/auth-actions';
import { 
  selectIsAdmin, 
  selectIsManager, 
  selectCanManageUsers,
  selectCanViewTeamData 
} from '../../../store/auth/auth-selectors';


interface NavItem {
  label: string;
  icon: string;
  route: string;
  roles?: UserRole[];
  badge?: string;
}


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() isCollapsed = false;

  isAdmin$!: Observable<boolean>;
  isManager$!: Observable<boolean>;
  canManageUsers$!: Observable<boolean>;
  canViewTeamData$!: Observable<boolean>;

  // in a future, the nav items could be coming from the back-end, as dynamic
  mainNavItems: NavItem[] = [
    { label: 'Dashboard', icon: '📊', route: '/dashboard' },
    { label: 'My Profile', icon: '👤', route: '/profile' },
    { label: 'Notifications', icon: '🔔', route: '/notifications', badge: '3' },
  ];


  managementNavItems: NavItem[] = [
    { 
      label: 'Team Overview', 
      icon: '👥', 
      route: '/team',
      roles: [UserRole.MANAGER, UserRole.ADMIN]
    },
    { 
      label: 'Reports', 
      icon: '📈', 
      route: '/reports',
      roles: [UserRole.MANAGER, UserRole.ADMIN]
    },
  ];


  adminNavItems: NavItem[] = [
    { label: 'User Management', icon: '👨‍💼', route: '/admin/users' },
    { label: 'System Settings', icon: '⚙️', route: '/admin/settings' },
    { label: 'Audit Logs', icon: '📋', route: '/admin/logs' },
  ];


  settingsNavItems: NavItem[] = [
    { label: 'Preferences', icon: '🎨', route: '/settings/preferences' },
    { label: 'Security', icon: '🔒', route: '/settings/security' },
    { label: 'Help & Support', icon: '❓', route: '/help' },
  ];


  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isAdmin$ = this.store.select(selectIsAdmin);
    this.isManager$ = this.store.select(selectIsManager);
    this.canManageUsers$ = this.store.select(selectCanManageUsers);
    this.canViewTeamData$ = this.store.select(selectCanViewTeamData);
  }
}
