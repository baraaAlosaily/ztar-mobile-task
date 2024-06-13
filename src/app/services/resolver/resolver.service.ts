import { Injectable, inject } from '@angular/core';
import { CrudService } from '../crud/crud.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResolverService {
  crudService = inject(CrudService);

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<any> {
    const id = route.paramMap.get('id');
    return this.crudService.getItemById(id ?? '', 'books');
  }
}
