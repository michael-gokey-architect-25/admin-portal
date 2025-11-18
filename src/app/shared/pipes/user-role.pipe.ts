// src/app/shared/pipes/user-role.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { UserRole } from '..//../store/auth/auth-actions';


@Pipe({
  name: 'userRole'
})
export class UserRolePipe implements PipeTransform {
  
  transform(role: UserRole | null | undefined): string {
    if (!role) {
      return 'Unknown';
    }

    const roleMap: Record<UserRole, string> = {
      [UserRole.ADMIN]: 'Administrator',
      [UserRole.MANAGER]: 'Manager',
      [UserRole.USER]: 'User'
    };

    return roleMap[role] || 'Unknown';
  }

}

/**
Transforms a UserRole enumeration value into a human-readable string 

* Input: It accepts a value that is likely an enum 
(e.g., UserRole.ADMIN, UserRole.MANAGER, UserRole.USER), which could also be null or undefined

* Mapping: It uses an internal roleMap to look up the corresponding descriptive string 
for the input enum value (e.g., ADMIN maps to 'Administrator', MANAGER maps to 'Manager', etc.) 

* Output: If the input is null, undefined, or the role is not found in the map, it returns 'Unknown'.
Otherwise, it returns the mapped descriptive string  */
