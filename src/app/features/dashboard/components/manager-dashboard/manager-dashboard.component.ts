// src/app/features/dashboard/components/manager-dashboard/manager-dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUser, selectUserDisplayName } from '../../../../store/auth/auth-selectors';
import { User } from '../../../../store/auth/auth-actions';

/**
 * ManagerDashboardComponent: Provides team overview and management capabilities for managers
 * Key Features:
 * - Team performance metrics
 * - Team member list with status
 * - Quick team actions
 * - Recent team activities
 * - Reports and analytics preview
 * Access Control:
 * - Accessible by MANAGER and ADMIN roles
 * - Protected by RoleGuard in routing
 * Teaching Points:
 * - Team-focused dashboard design
 * - Member status indicators
 * - Performance tracking visualization
 * - Hierarchical data display
 * Accessibility:
 * - Table semantics for team member list
 * - Status badges with aria-label
 * - Keyboard navigable team cards
 * - Screen reader friendly metrics  */


// Interface for team metrics
interface TeamMetric {
  label: string;
  value: string | number;
  icon: string;
  color: 'blue' | 'green' | 'purple' | 'orange';
  subtitle?: string;
}


// Interface for team members
interface TeamMember {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'away' | 'offline';
  tasksCompleted: number;
  avatar: string;
}


// Interface for team activities
interface TeamActivity {
  id: string;
  member: string;
  action: string;
  project: string;
  timestamp: Date;
}


@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.scss']
})
export class ManagerDashboardComponent implements OnInit {
  // Observable streams from store
  user$!: Observable<User | null>;
  userName$!: Observable<string>;

  
  // Team metrics (in production, fetch from API)
  teamMetrics: TeamMetric[] = [
    {
      label: 'Team Members',
      value: 12,
      icon: '👥',
      color: 'blue',
      subtitle: '2 new this month'
    },
    {
      label: 'Tasks Completed',
      value: '284',
      icon: '✅',
      color: 'green',
      subtitle: '92% completion rate'
    },
    {
      label: 'Active Projects',
      value: 8,
      icon: '📊',
      color: 'purple',
      subtitle: '3 due this week'
    },
    {
      label: 'Team Performance',
      value: '94%',
      icon: '🎯',
      color: 'orange',
      subtitle: '+6% from last month'
    }
  ];


  // Team members (in production, fetch from API)
  teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Senior Developer',
      status: 'active',
      tasksCompleted: 28,
      avatar: 'SJ'
    },
    {
      id: '2',
      name: 'Mike Chen',
      role: 'UX Designer',
      status: 'active',
      tasksCompleted: 24,
      avatar: 'MC'
    },
    {
      id: '3',
      name: 'Emma Wilson',
      role: 'Frontend Developer',
      status: 'away',
      tasksCompleted: 19,
      avatar: 'EW'
    },
    {
      id: '4',
      name: 'David Brown',
      role: 'Backend Developer',
      status: 'offline',
      tasksCompleted: 22,
      avatar: 'DB'
    }
  ];


  // Recent team activities (in production, fetch from API)
  recentActivities: TeamActivity[] = [
    {
      id: '1',
      member: 'Sarah Johnson',
      action: 'Completed task',
      project: 'Mobile App Redesign',
      timestamp: new Date(Date.now() - 1000 * 60 * 10)
    },
    {
      id: '2',
      member: 'Mike Chen',
      action: 'Updated design mockups',
      project: 'Dashboard UI Update',
      timestamp: new Date(Date.now() - 1000 * 60 * 25)
    },
    {
      id: '3',
      member: 'Emma Wilson',
      action: 'Fixed bug',
      project: 'User Authentication',
      timestamp: new Date(Date.now() - 1000 * 60 * 40)
    }
  ];

  constructor(private store: Store) {}

  ngOnInit(): void {
    // Subscribe to user data from store
    this.user$ = this.store.select(selectUser);
    this.userName$ = this.store.select(selectUserDisplayName);
  }


  /*** Format timestamp to relative time */
  getRelativeTime(date: Date): string {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  }


  /*** Get status display text for accessibility */
  getStatusLabel(status: TeamMember['status']): string {
    const labels = {
      active: 'Active now',
      away: 'Away',
      offline: 'Offline'
    };
    return labels[status];
  }


  /*** Get status color class */
  getStatusClass(status: TeamMember['status']): string {
    return `status-${status}`;
  }

  /*** Navigate to team member profile */
  viewMemberProfile(memberId: string): void {
    console.log('View profile for member:', memberId);
    // this.router.navigate(['/team/member', memberId]);
  }


  /*** Navigate to team reports */
  viewTeamReports(): void {
    console.log('Navigate to team reports');
    // this.router.navigate(['/reports']);
  }


  /*** Navigate to project details */
  viewProject(projectName: string): void {
    console.log('View project:', projectName);
    // this.router.navigate(['/projects', projectName]);
  }


  /*** TrackBy function for team member*/
  trackByMemberId(index: number, member: TeamMember): string {
    return member.id;
  }


  /*** TrackBy function for activities */
  trackByActivityId(index: number, activity: TeamActivity): string {
    return activity.id;
  }

}
