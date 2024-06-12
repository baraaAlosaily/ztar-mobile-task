import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services';
import { IUser } from '../../../models';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterModule],
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
