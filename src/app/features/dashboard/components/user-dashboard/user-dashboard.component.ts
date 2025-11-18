// src/app/features/dashboard/components/user-dashboard/user-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User, UserRole } from '../../../../store/auth//auth-actions';
import { 
  selectUser, 
  selectUserDisplayName,
  selectUserRole 
} from '../../../../store/auth/auth-selectors';


/**
 * UserDashboardComponent: Personal dashboard for regular users
 * Key Features:
 * - User profile summary
 * - Personal statistics
 * - Recent activities
 * - Quick actions
 * - Notifications
 * Access Control:
 * - Accessible by all authenticated users (USER, MANAGER, ADMIN)
 * - Default dashboard for regular users
 * Teaching Points:
 * - User-centric dashboard design
 * - Personal data display
 * - Activity timeline
 * - Self-service features
 * Accessibility:
 * - Profile card with semantic markup
 * - Notification badges with aria-live
 * - Action buttons with descriptive labels
 * - Keyboard navigable interface  */

interface PersonalStat {
  label: string;
  value: string | number;
  icon: string;
  color: string;
}


interface RecentActivity {
  id: string;
  action: string;
  details: string;
  timestamp: Date;
  icon: string;
}


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  user$!: Observable<User | null>;
  userName$!: Observable<string>;
  userRole$!: Observable<UserRole | null>;

  personalStats: PersonalStat[] = [
    { label: 'Tasks Completed', value: 24, icon: '✅', color: '#10b981' },
    { label: 'Active Projects', value: 3, icon: '📁', color: '#3b82f6' },
    { label: 'Notifications', value: 5, icon: '🔔', color: '#f59e0b' },
    { label: 'Messages', value: 12, icon: '💬', color: '#8b5cf6' }
  ];

  recentActivities: RecentActivity[] = [
    {
      id: '1',
      action: 'Completed task',
      details: 'Updated user documentation',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      icon: '✅'
    },
    {
      id: '2',
      action: 'Started project',
      details: 'Website Redesign Phase 2',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      icon: '🚀'
    },
    {
      id: '3',
      action: 'Updated profile',
      details: 'Changed contact information',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
      icon: '👤'
    }
  ];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.user$ = this.store.select(selectUser);
    this.userName$ = this.store.select(selectUserDisplayName);
    this.userRole$ = this.store.select(selectUserRole);
  }

  getRelativeTime(date: Date): string {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  }

  trackByActivityId(index: number, activity: RecentActivity): string {
    return activity.id;
  }

}
