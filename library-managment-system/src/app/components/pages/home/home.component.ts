import { Component, inject } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { WrapperComponent, BannerComponent ,SearchComponent } from '../../shared';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [WrapperComponent,BannerComponent,SearchComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  ngOnInit(): void {
    initFlowbite();
  }
}
