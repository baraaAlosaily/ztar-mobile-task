import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './components/books/books.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { ResolverService } from '../../services';

const routes: Routes = [
  { path: '', component: BooksComponent },
  {
    path: ':id',
    component: BookDetailsComponent,
    resolve: { data: ResolverService },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule {}
