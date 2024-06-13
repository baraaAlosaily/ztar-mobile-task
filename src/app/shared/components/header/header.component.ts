import { Component, Input, inject } from '@angular/core';
import { AuthService } from '../../../services';
import { IUser } from '../../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [AuthService],
})
export class HeaderComponent {
  auth = inject(AuthService);
  router = inject(Router);
  @Input() isUserLoggedIn!: IUser | null | undefined;

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
