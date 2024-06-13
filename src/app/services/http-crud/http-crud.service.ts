import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environments';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpCrudService {
  http = inject(HttpClient);

  getBookDetails(name: string): Observable<any> {
    return this.http.get(
      `${environment.GOOGLE_BOOKS_URL}?q=${name}&key=${environment.GOOGLE_BOOKS_API_KEY}`,
    );
  }
}
