import { inject, Injector, runInInjectionContext } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

export const AuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const injector = inject(Injector);

  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';

  if (!isLoggedIn) {
    runInInjectionContext(injector, () => {
      const messageService = inject(MessageService);
      messageService.add({
        severity: 'warn',
        summary: 'Unauthorized',
        detail: 'You must be logged in to access this page.',
      });
    });

    router.navigate(['/login']);
    return false;
  }

  return true;
};
