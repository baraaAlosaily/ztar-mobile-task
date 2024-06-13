import { Component, OnInit, inject } from '@angular/core';
import { SeoOptimizationService } from '../../../../services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit{
  seo=inject(SeoOptimizationService);
  ngOnInit(): void {
    this.seo.setTitle('Home');
    this.seo.setMetaAuthor('ztar mobile');
    this.seo.setMetaDescription('Home page');
    this.seo.setMetaTags('home, home page, ztar mobile, library management system');
    this.seo.setMetaTags('home, home page, ztar mobile, library management system');
  }
}
