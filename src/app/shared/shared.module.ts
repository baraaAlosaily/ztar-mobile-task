import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BannerComponent } from './components/banner/banner.component';
import { CreateUpdateModalComponent } from './components/create-update-modal/create-update-modal.component';
import { HeaderComponent } from './components/header/header.component';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoadingComponent } from './components/loading/loading.component';
import { NoDataFoundComponent } from './components/no-data-found/no-data-found.component';
import { SearchComponent } from './components/search/search.component';
import { ViewModalComponent } from './components/view-modal/view-modal.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';

@NgModule({
  declarations: [
    BannerComponent,
    CreateUpdateModalComponent,
    DeleteModalComponent,
    FooterComponent,
    HeaderComponent,
    LoadingComponent,
    NoDataFoundComponent,
    SearchComponent,
    ViewModalComponent,
    WrapperComponent,
  ],
  imports: [CommonModule, CommonModule, ReactiveFormsModule, RouterModule],
  exports: [
    BannerComponent,
    CreateUpdateModalComponent,
    DeleteModalComponent,
    FooterComponent,
    HeaderComponent,
    LoadingComponent,
    NoDataFoundComponent,
    SearchComponent,
    ViewModalComponent,
    WrapperComponent,
  ],
})
export class SharedModule {}
