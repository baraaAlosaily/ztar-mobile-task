import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  return new Observable<boolean>(observer => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        observer.next(true);
        observer.complete();
      } else {
        router.navigate(['/login']);
        observer.next(false);
        observer.complete();
      }
    });

    return { unsubscribe };
  });
};
