import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CategoriesComponent } from './components/categories/categories.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CategoriesComponent],
  imports: [CommonModule, CategoriesRoutingModule, FormsModule, SharedModule],
})
export class CategoriesModule {}
