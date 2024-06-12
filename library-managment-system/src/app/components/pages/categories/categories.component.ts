import { Component, ElementRef, Input, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime } from 'rxjs';
import { initFlowbite } from 'flowbite';
import { ICategory, ICategoryReq, ITableSetting } from '../../../models';
import { WrapperComponent ,CreateUpdateModalComponent, DeleteModalComponent , } from '../../shared';
import { CrudService } from '../../../services';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [WrapperComponent,
    CommonModule,
    FormsModule,
    CreateUpdateModalComponent,
    DeleteModalComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
  providers: [CrudService]
})
export class CategoriesComponent {
  @ViewChild('editButton') editButton!: ElementRef;
  @ViewChild('deleteButton') deleteButton!: ElementRef;

  private searchSubject: Subject<string> = new Subject<string>();
  private crudService=inject(CrudService)

  title:string = 'Categories';
  size=10;
  totalSize:number=1;
  page=1;
  items:any[] = [];
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
      name : 'Description',
      key: 'description',
      type: 'text'
    },
    {
      name :'Books',
      key: 'books',
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
    this.getSize();
    this.searchSubject.pipe(debounceTime(1000)).subscribe((search:string)=>{
      this.getAll({size:10,page:1,search:search});
      this.getSize(search);
    });
  }

  getAll({size,page,search}:ICategoryReq={size:this.size,page:this.page,search:''}){
    this.loadingState = true;
    this.crudService.getItems(size,page,'categories','name',search).subscribe((items:ICategory[])=>{
      this.items = items;
      this.loadingState = false;
    })
  }

  getSize(search?:string){
    this.crudService.getItemsSize('categories','name',search??'').subscribe((size:number)=>{
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
      this.crudService.addItem($event.data,'categories').then((res)=>{
        this.getAll();
        this.getSize();
      }).catch((err)=>{
        console.log(err);
      })
    } else {
      this.crudService.updateItemById(this.selectedItem?.id ?? '', $event.data, 'categories').subscribe({
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

  searchChanges($event:any){
    this.searchSubject.next($event);
  }

  deleteCategory($event:ICategory){
    this.loadingState = true;
    this.crudService.deleteItemById($event?.id??'','categories').subscribe({
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
