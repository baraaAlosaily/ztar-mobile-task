import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { AuthService } from '../../../services';

@Component({
  selector: 'app-wrapper',
  standalone: true,
  imports: [HeaderComponent,FooterComponent],
  templateUrl: './wrapper.component.html',
  styleUrl: './wrapper.component.scss'
})
export class WrapperComponent implements OnInit{
  authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.authService.currentUserSig.set({
          email: user.email??'',
          displayName: user.displayName??'',
        });
      }else{
        this.authService.currentUserSig.set(null);
      }
    });  }

}
