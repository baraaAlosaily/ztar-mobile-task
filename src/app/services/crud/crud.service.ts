import { Injectable, inject } from '@angular/core';
import {
  Database,
  ref,
  set,
  get,
  update,
  remove,
  child,
  onValue,
  push,
  query,
  orderByKey,
  limitToFirst,
  endAt,
  orderByChild,
  startAt,
} from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  private db = inject(Database);
  private dbRef = ref(this.db);

  // addItem
  addItem<T>(data: T, dbName: string): Promise<void> {
    const reference = ref(this.db, dbName);
    const newReference = push(reference);
    return set(newReference, { ...data, id: newReference.key });
  }

  // getItems
  getItems(
    pageSize: number,
    pageNumber: number,
    dbName: string,
    orderBy: string,
    searchTerm = '',
  ): Observable<any[]> {
    return new Observable((observer) => {
      const reference = ref(this.db, dbName);
      let referenceQuery;

      if (searchTerm) {
        const searchTermEnd = searchTerm + '\uf8ff';
        referenceQuery = query(
          reference,
          orderByChild(orderBy),
          startAt(searchTerm),
          endAt(searchTermEnd),
        );
      } else {
        referenceQuery = query(reference, orderByChild(orderBy));
      }

      const startIndex = (pageNumber - 1) * pageSize;
      referenceQuery = query(
        referenceQuery,
        limitToFirst(startIndex + pageSize),
      );

      onValue(
        referenceQuery,
        (snapshot) => {
          const data = snapshot.val();
          const categories = data ? Object.values(data) : [];

          const paginatedCategories = categories.slice(
            startIndex,
            startIndex + pageSize,
          );

          observer.next(paginatedCategories);
          observer.complete();
        },
        (error) => {
          observer.error(error);
        },
      );
    });
  }

  getAllItems(dbName: string, orderBy: string): Observable<any[]> {
    return new Observable((observer) => {
      const reference = ref(this.db, dbName);
      const referenceQuery = query(reference, orderByChild(orderBy));

      onValue(
        referenceQuery,
        (snapshot) => {
          const data = snapshot.val();
          const items = data ? Object.values(data) : [];

          observer.next(items);
          observer.complete();
        },
        (error) => {
          observer.error(error);
        },
      );
    });
  }

  // getItemById
  getItemById(id: string, dbName: string): Observable<any> {
    return new Observable((observer) => {
      const reference = ref(this.db, `${dbName}/${id}`);

      get(reference)
        .then((snapshot) => {
          if (snapshot.exists()) {
            observer.next(snapshot.val());
          } else {
            observer.next(null);
          }
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  // updateItemById
  updateItemById(
    id: string,
    updatedData: any,
    dbName: string,
  ): Observable<void> {
    return new Observable((observer) => {
      const reference = ref(this.db, `${dbName}/${id}`);
      update(reference, updatedData)
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  // deleteItemById
  deleteItemById(id: string, dbName: string): Observable<void> {
    return new Observable((observer) => {
      const reference = ref(this.db, `${dbName}/${id}`);

      remove(reference)
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  // getItemsSize
  getItemsSize(
    dbName: string,
    orderBy: string,
    searchTerm = '',
  ): Observable<number> {
    return new Observable((observer) => {
      const reference = ref(this.db, dbName);
      let referenceQuery;
      if (searchTerm) {
        const searchTermEnd = searchTerm + '\uf8ff';
        referenceQuery = query(
          reference,
          orderByChild(orderBy),
          startAt(searchTerm),
          endAt(searchTermEnd),
        );
      } else {
        referenceQuery = query(reference, orderByChild(orderBy));
      }
      get(referenceQuery)
        .then((snapshot) => {
          let size = 0;
          snapshot.forEach(() => {
            size++;
          });
          observer.next(size);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}
