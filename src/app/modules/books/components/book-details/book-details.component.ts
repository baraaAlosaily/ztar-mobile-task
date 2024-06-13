import { Component, OnInit, inject } from '@angular/core';
import { HttpCrudService } from '../../../../services';
import { ActivatedRoute } from '@angular/router';
import { IBook, IBookDetails } from '../../../../models';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss',
  providers: [HttpCrudService],
})
export class BookDetailsComponent implements OnInit {
  httpCrud = inject(HttpCrudService);
  route = inject(ActivatedRoute);
  data!: IBook;
  details: IBookDetails | null = null;
  loadingState = false;

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      console.log(data);
      this.data = data['data'];
    });
  }

  getDetails(name: string | undefined) {
    this.loadingState = true;
    this.httpCrud.getBookDetails(name??'').subscribe((data) => {
      this.loadingState = false;
      this.details = data.items[0].volumeInfo;
    });
  }
}


