import { Routes } from '@angular/router';
import {HomeComponent,LoginComponent,CategoriesComponent, BooksComponent, SignupComponent} from './components';
import {authGuard} from './guards/auth/auth.guard';
import { BookDetailsComponent } from './components/pages/book-details/book-details.component';
import { ResolverService } from './services/resolver/resolver.service';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'categories', component : CategoriesComponent, canActivate: [authGuard]},
  { path: 'books', component : BooksComponent , canActivate: [authGuard]},
  { path: 'book/:id', component : BookDetailsComponent , canActivate: [authGuard] , resolve: {data: ResolverService}},
  { path: 'login', component : LoginComponent },
  { path: 'signup', component : SignupComponent },
  { path: '**', redirectTo: ''}
];
