// src/app/features/dashboard/components/admin-dashboard/admin-dashboard.component.ts 
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUser, selectUserDisplayName } from '../../../../store/auth/auth-selectors';
import { User } from '../../../../store/auth/auth-actions';


/**
 * AdminDashboardComponent: Provides system-wide overview for administrators
 * Key Features:
 * - System statistics (total users, active sessions, etc.)
 * - Quick action buttons for common admin tasks
 * - Recent activity feed
 * - System health indicators
 * - Links to user management and system settings
 * Access Control:
 * - Only accessible by users with ADMIN role
 * - Protected by RoleGuard in routing
 * Teaching Points:
 * - Dashboard design patterns for admin users
 * - Stat card layout for metrics
 * - Action-oriented UI for quick access
 * - Mock data structure (replace with real API calls in production)
 * Accessibility:
 * - Semantic HTML with proper heading hierarchy
 * - ARIA labels for icon-only buttons
 * - Focus management for keyboard navigation
 * - Screen reader friendly stat cards */


// Interface for statistics cards
interface StatCard {
  label: string;
  value: string | number;
  icon: string;
  trend?: 'up' | 'down';
  trendValue?: string;
  color: 'blue' | 'green' | 'purple' | 'orange';
  ariaLabel?: string;
}


// Interface for recent activities
interface Activity {
  id: string;
  user: string;
  action: string;
  timestamp: Date;
  type: 'user' | 'system' | 'security';
}


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  
  user$!: Observable<User | null>; // Observable streams from store
  userName$!: Observable<string>;

  // Dashboard statistics (in production, fetch from API)
  stats: StatCard[] = [
    {
      label: 'Total Users',
      value: '2,847',
      icon: '👥',
      trend: 'up',
      trendValue: '+12.5%',
      color: 'blue',
      ariaLabel: 'Total users: 2,847, up 12.5% from last month'
    },
    {
      label: 'Active Sessions',
      value: '1,234',
      icon: '🔐',
      trend: 'up',
      trendValue: '+5.2%',
      color: 'green',
      ariaLabel: 'Active sessions: 1,234, up 5.2% from last hour'
    },
    {
      label: 'System Health',
      value: '99.8%',
      icon: '❤️',
      trend: 'up',
      trendValue: '+0.2%',
      color: 'purple',
      ariaLabel: 'System health: 99.8%, up 0.2% from yesterday'
    },
    {
      label: 'Pending Actions',
      value: 23,
      icon: '⚠️',
      trend: 'down',
      trendValue: '-8',
      color: 'orange',
      ariaLabel: 'Pending actions: 23, down 8 from yesterday'
    }
  ];

  // Recent activities (in production, fetch from API)
  recentActivities: Activity[] = [
    {
      id: '1',
      user: 'John Doe',
      action: 'Created new user account',
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      type: 'user'
    },
    {
      id: '2',
      user: 'System',
      action: 'Automated backup completed',
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      type: 'system'
    },
    {
      id: '3',
      user: 'Jane Smith',
      action: 'Updated system settings',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      type: 'security'
    },
    {
      id: '4',
      user: 'Mike Johnson',
      action: 'Failed login attempt detected',
      timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
      type: 'security'
    }
  ];

  constructor(private store: Store) {}

  ngOnInit(): void {
    // Subscribe to user data from store
    this.user$ = this.store.select(selectUser);
    this.userName$ = this.store.select(selectUserDisplayName);
  }


  /**
   * Format timestamp to relative time (e.g., "5 minutes ago")
   * Teaching Point: Helper functions for data formatting
   * Keep UI logic out of templates for better testability */
  getRelativeTime(date: Date): string {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  }


  /*** Get icon for activity type. Provides visual indication of activity category */
  getActivityIcon(type: Activity['type']): string {
    const icons = {
      user: '👤',
      system: '⚙️',
      security: '🔒'
    };
    return icons[type];
  }


  /*** Get CSS class for activity type. Used for color-coding different activity types */
  getActivityClass(type: Activity['type']): string {
    return `activity-${type}`;
  }


  navigateToUserManagement(): void {
    console.log('Navigate to user management');
    // this.router.navigate(['/admin/users']);
  }


  navigateToSystemSettings(): void {
    console.log('Navigate to system settings');
    // this.router.navigate(['/admin/settings']);
  }


  navigateToAuditLogs(): void {
    console.log('Navigate to audit logs');
    // this.router.navigate(['/admin/logs']);
  }


  refreshDashboard(): void {
    console.log('Refreshing dashboard data...');
    // Dispatch action to refresh data:
    // this.store.dispatch(loadDashboardStats());
  }

  /*** TrackBy function for ngFor optimization. Helps Angular efficiently update the DOM */
  trackByActivityId(index: number, activity: Activity): string {
    return activity.id;
  }

}
