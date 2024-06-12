import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-create-update-modal',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './create-update-modal.component.html',
  styleUrl: './create-update-modal.component.scss'
})
export class CreateUpdateModalComponent {
  @ViewChild('closeModal') closeModal!:ElementRef;

  @Input() selectedItem!:any | null | undefined;
  @Input() dataBase!: string | null | undefined;
  @Input() allItems!: any | null | undefined;

  @Output() addUpdateEmitter=new EventEmitter();

  fb=inject(FormBuilder);

  title:string='Create New';
  button:string='Create';

  categoriesForm=this.fb.group({
    name:['',Validators.required],
    description:['',Validators.required],
    books:['',Validators.required]
  });

  booksForm=this.fb.group({
    name:['',Validators.required],
    category:['',Validators.required],
    description:['',Validators.required],
    author:['',Validators.required]
  });

  ngOnChanges(changes: SimpleChanges): void {
    if(this.dataBase==='books'){
      if(changes['selectedItem']&&changes['selectedItem']?.currentValue!==null){
        this.booksForm.patchValue(changes['selectedItem'].currentValue);
        this.title='Edit';
        this.button='Update';
      }else{
        this.booksForm.reset();
        this.title='Create New';
        this.button='Create';
      }
    }else{
      if(changes['selectedItem']?.currentValue!==null){
        this.categoriesForm.patchValue(changes['selectedItem'].currentValue);
        this.title='Edit';
        this.button='Update';
      }else{
        this.categoriesForm.reset();
        this.title='Create New';
        this.button='Create';
      }
    }

  }

  onSubmit(){
    if(this.dataBase==='books'){
      if(this.booksForm.valid){
        this.addUpdateEmitter.emit({data:this.booksForm.value,action:this.button});
        this.closeModal.nativeElement.click();
        this.booksForm.reset();
      }else{
        this.booksForm.markAllAsTouched();
        console.log('Form is invalid');
      }
    }else{
      if(this.categoriesForm.valid){
        this.addUpdateEmitter.emit({data:this.categoriesForm.value,action:this.button});
        this.closeModal.nativeElement.click();
        this.categoriesForm.reset();
      }else{
        this.categoriesForm.markAllAsTouched();
        console.log('Form is invalid');
      }
    }

  }

  close(){
    if(this.dataBase==='books') this.booksForm.reset();
    else this.categoriesForm.reset();
  }
}
