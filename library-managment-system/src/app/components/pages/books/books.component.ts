import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime } from 'rxjs';
import { initFlowbite } from 'flowbite';
import { ICategory, ICategoryReq, ITableSetting } from '../../../models';
import { WrapperComponent, CreateUpdateModalComponent, DeleteModalComponent} from '../../shared';
import { CrudService } from '../../../services';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [WrapperComponent,CommonModule,FormsModule,CreateUpdateModalComponent,DeleteModalComponent],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
  providers: [CrudService]
})
export class BooksComponent {
  @ViewChild('editButton') editButton!: ElementRef;
  @ViewChild('deleteButton') deleteButton!: ElementRef;

  private searchSubject: Subject<string> = new Subject<string>();
  private crudService=inject(CrudService)
  private router=inject(Router);

  title:string = 'Books';
  size=10;
  totalSize:number=1;
  page=1;
  items:any[] = [];
  allItems:any[] = [];
  loadingState:boolean = true;
  selectedItem:ICategory | null = null;
  searchQuery:string = '';
  settings:ITableSetting[] =[
    {
      name : 'Name',
      key: 'name',
      type: 'text'
    },
    {
      name :'Category',
      key: 'category',
      type: 'text'
    },
    {
      name : 'Description',
      key: 'description',
      type: 'text'
    },
    {
      name : 'Actions',
      key: 'actions',
      type: 'actions'
    }
  ]

  ngOnInit(): void {
    initFlowbite();
    this.getAll();
    this.getAllItems();
    this.getSize();
    this.searchSubject.pipe(debounceTime(1000)).subscribe((search:string)=>{
      this.page = 1;
      this.getAll({size:10,page:1,search:search});
      this.getSize(search);
    });
  }

  getAll({size,page,search}:ICategoryReq={size:this.size,page:this.page,search:''}){
    this.loadingState = true;
    this.crudService.getItems(size,page,'books','name',search).subscribe((items:ICategory[])=>{
      this.items = items;
      this.loadingState = false;
    })
  }

  getAllItems(){
    this.crudService.getAllItems('categories','name').subscribe((items:ICategory[])=>{
      this.allItems = items;
    })
  }

  getSize(search?:string){
    this.crudService.getItemsSize('books','name',search??'').subscribe((size:number)=>{
      this.totalSize = size;
    })
  }

  editMode(category:ICategory){
    console.log(category);
    this.selectedItem = category;
    this.editButton.nativeElement.click();
  }

  deleteMode(category:ICategory){
    this.selectedItem = category;
    this.deleteButton.nativeElement.click();
  }
  newMode(){
    this.selectedItem = null;
  }

  next(){
    if(this.page*this.size>=this.totalSize) return;
    this.page++;
    this.getAll();
  }
  previous(){
    if(this.page<=1) return;
    this.page--;
    this.getAll();
  }

  addNew($event:any){
    console.log($event)
    this.loadingState = true;
    if($event.action==='Create'){
      this.crudService.addItem($event.data,'books').then((res)=>{
        this.getAll();
        this.getSize();
      }).catch((err)=>{
        console.log(err);
      })
    }else{
      this.crudService.updateItemById(this.selectedItem?.id ?? '', $event.data,'books').subscribe({
        next: (data) => {
          this.getAll();
          this.getSize();
        },
        error: (error) => {
          console.error('There was an error!', error);
        }
      })}
    }

  searchChanges($event:any){
    this.searchSubject.next($event);
  }

  navigate(item:any,setting:any){
    if(setting.key==='name'){
      this.router.navigate(['/book',item.id]);
    }
  }

  deleteCategory($event:ICategory){
    this.loadingState = true;
    this.crudService.deleteItemById($event?.id??'','books').subscribe({
      next: (data) => {
        this.getAll();
        this.getSize();
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    })
  }
}
