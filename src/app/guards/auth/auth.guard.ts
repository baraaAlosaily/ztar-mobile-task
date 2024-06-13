import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  if (auth.currentUser) {
    return of(true);
  }

  return new Observable<boolean>((observer) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        observer.next(true);
      } else {
        router.navigate(['/login']);
        observer.next(false);
      }
      observer.complete();
      unsubscribe();
    });
  });
};
