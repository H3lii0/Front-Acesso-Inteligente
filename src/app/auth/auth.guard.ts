import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  let routeService = inject(Router);

  if (!authService) {
    routeService.navigate(['/login']);
    return false;
  }
  return true;
};
