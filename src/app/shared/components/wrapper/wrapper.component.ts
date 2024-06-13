import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../services';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrl: './wrapper.component.scss',
})
export class WrapperComponent implements OnInit {
  authService = inject(AuthService);

  ngOnInit(): void {
    initFlowbite();
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.authService.currentUserSig.set({
          email: user.email ?? '',
          displayName: user.displayName ?? '',
        });
      } else {
        this.authService.currentUserSig.set(null);
      }
    });
  }
}
