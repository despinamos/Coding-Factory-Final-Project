import { CanActivateFn, Router } from '@angular/router';
import {inject} from '@angular/core';
import { StudentUserService } from '../services/student-user.service';

export const adminRoleGuard: CanActivateFn = (route, state) => {
  const studentUserService = inject(StudentUserService);
  const router = inject(Router);

  const userRoles = studentUserService.user$()?.roles;
  const hasPermission = userRoles?.includes("ADMIN");
  console.log("ADMIN ROLE GUARD", userRoles, hasPermission);

  if (studentUserService.user$() && hasPermission){
    return true;
  }

  return router.navigate(['restricted-content']);
};