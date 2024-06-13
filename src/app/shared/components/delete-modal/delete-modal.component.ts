import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { IBook, ICategory } from '../../../models';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.scss',
})
export class DeleteModalComponent implements OnChanges {
  @Input() selectedItem!: ICategory| IBook | null ;

  @Output() deleteEmitter = new EventEmitter();

  deletedCategory!: ICategory | null | undefined;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedItem'].currentValue !== null) {
      this.deletedCategory = changes['selectedItem'].currentValue;
    }
  }

  onSubmit() {
    this.deleteEmitter.emit(this.deletedCategory);
  }
}
