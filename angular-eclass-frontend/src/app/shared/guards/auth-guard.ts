import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { StudentUserService } from '../services/student-user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const studentUserService = inject(StudentUserService);
  const router = inject(Router);

  if (studentUserService.user$() && !studentUserService.isTokenExpired()) {
    return true;
  }

  return router.navigate(['login']);
};
