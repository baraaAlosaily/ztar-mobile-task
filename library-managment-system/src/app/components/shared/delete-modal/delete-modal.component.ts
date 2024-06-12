import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ICategory } from '../../../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.scss'
})
export class DeleteModalComponent {
  @Input() selectedItem!:ICategory | null | undefined;

  @Output() deleteEmitter=new EventEmitter();

  deletedCategory!:ICategory | null | undefined;


  ngOnChanges(changes: SimpleChanges): void {
    if(changes['selectedItem'].currentValue!==null){
      this.deletedCategory=changes['selectedItem'].currentValue;
    }
  }

  onSubmit(){
    this.deleteEmitter.emit(this.deletedCategory);
  }
}
