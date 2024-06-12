import { Component, OnInit, inject } from '@angular/core';
import { WrapperComponent } from '../../shared';
import { initFlowbite } from 'flowbite';
import { CrudService } from '../../../services';
import {} from '@angular/common/http';
import { HttpCrudService } from '../../../services/http-crud.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [WrapperComponent,CommonModule],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss',
  providers: [HttpCrudService]
})
export class BookDetailsComponent {
   httpCrud=inject(HttpCrudService)
   route=inject(ActivatedRoute)
   data: any;
   details: any=null;
   loadingState: boolean = false;

  ngOnInit(): void {
    initFlowbite();
    this.route.data.subscribe(data => {
      console.log(data)
      this.data = data['data'];
    });
  }

  getDetails(name: string){
    this.loadingState = true;
    this.httpCrud.getBookDetails(name).subscribe(data => {
      this.loadingState = false;
      this.details = data.items[0].volumeInfo;
    });
  }
}
