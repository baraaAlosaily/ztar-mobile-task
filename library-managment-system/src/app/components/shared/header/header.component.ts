import { Component, Input, inject } from '@angular/core';
import { AuthService } from '../../../services';
import { IUser } from '../../../models';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [AuthService]
})
export class HeaderComponent {
  auth=inject(AuthService);
  router=inject(Router);
  @Input() isUserLoggedIn!: IUser | null | undefined;

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
