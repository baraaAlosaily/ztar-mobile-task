import {
  Component,
  ElementRef,
  ViewChild,
  inject,
  OnInit,
} from '@angular/core';
import { Subject, debounceTime } from 'rxjs';
import { IBook, IBookFormEvent, ICategory, ICategoryReq, ITableSetting } from '../../../../models';
import { CrudService, SeoOptimizationService } from '../../../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
  providers: [CrudService],
})
export class BooksComponent implements OnInit {
  @ViewChild('editButton') editButton!: ElementRef;
  @ViewChild('deleteButton') deleteButton!: ElementRef;

  private searchSubject: Subject<string> = new Subject<string>();
  private crudService = inject(CrudService);
  private router = inject(Router);
  private seo=inject(SeoOptimizationService);


  title = 'Books';
  size = 10;
  totalSize = 1;
  page = 1;
  items: IBook[] = [];
  allItems: IBook[] = [];
  loadingState = true;
  selectedItem: IBook | ICategory | null = null;
  searchQuery = '';
  searchDropdown = '';
  dropdownItems: ICategory[] = [];

  settings: ITableSetting[] = [
    {
      name: 'Name',
      key: 'name',
      type: 'text',
    },
    {
      name: 'Category',
      key: 'category',
      type: 'text',
    },
    {
      name: 'Description',
      key: 'description',
      type: 'text',
    },
    {
      name: 'Actions',
      key: 'actions',
      type: 'actions',
    },
  ];

  ngOnInit(): void {
    this.seo.setTitle('Books');
    this.seo.setMetaAuthor('ztar mobile');
    this.seo.setMetaDescription('Books page');
    this.seo.setMetaTags('books, books page, ztar mobile, library management system');
    this.seo.setMetaTags('books, books page, ztar mobile, library management system');

    this.getAll();
    this.getAllItems();
    this.getSize();
    this.searchSubject.pipe(debounceTime(500)).subscribe((search: string) => {
      this.page = 1;
      this.getAll({ size: 10, page: 1, search: search });
      this.getSize(search);
    });
  }

  getAll(
    { size, page, search, field = 'name' }: ICategoryReq = {
      size: this.size,
      page: this.page,
      search: '',
    },
  ) {
    this.loadingState = true;
    this.crudService
      .getItems(size, page, 'books', field, search)
      .subscribe((items: IBook[]) => {
        this.items = items;
        this.loadingState = false;
      });
  }

  getAllItems() {
    this.crudService
      .getAllItems('categories', 'name')
      .subscribe((items: ICategory[]) => {
        this.dropdownItems = items;
      });
  }

  getSize(field = 'name', search?: string) {
    this.crudService
      .getItemsSize('books', field ?? '', search ?? '')
      .subscribe((size: number) => {
        this.totalSize = size;
      });
  }

  editMode(category: IBook) {
    console.log(category);
    this.selectedItem = category;
    this.editButton.nativeElement.click();
  }

  deleteMode(category: IBook) {
    this.selectedItem = category;
    this.deleteButton.nativeElement.click();
  }
  newMode() {
    this.selectedItem = null;
  }

  next() {
    if (this.page * this.size >= this.totalSize) return;
    this.page++;
    this.getAll();
  }
  previous() {
    if (this.page <= 1) return;
    this.page--;
    this.getAll();
  }

  addNew($event: IBookFormEvent) {
    console.log($event);
    this.loadingState = true;
    if ($event.action === 'Create') {
      this.crudService
        .addItem($event.data, 'books')
        .then(() => {
          this.getAll();
          this.getSize('name');
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.crudService
        .updateItemById(this.selectedItem?.id ?? '', $event.data, 'books')
        .subscribe({
          next: () => {
            this.getAll();
            this.getSize('name');
          },
          error: (error) => {
            console.error('There was an error!', error);
          },
        });
    }
  }

  searchChanges($event: string) {
    this.searchSubject.next($event);
  }

  navigate(item: IBook, setting: ITableSetting) {
    if (setting.key === 'name') {
      this.router.navigate(['/books', item.id]);
    }
  }

  deleteCategory($event: ICategory) {
    this.loadingState = true;
    this.crudService.deleteItemById($event?.id ?? '', 'books').subscribe({
      next: () => {
        this.getAll();
        this.getSize('name');
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }

  searchChangesDropdown($event: string) {
    this.searchDropdown = $event;
    if ($event === '') this.getAll();
    else {
      this.getSize($event, 'category');
      this.getAll({ size: 10, page: 1, search: $event, field: 'category' });
    }
  }

  resetSearch() {
    this.searchDropdown = '';
    this.getSize();
    this.getAll();
  }
}

