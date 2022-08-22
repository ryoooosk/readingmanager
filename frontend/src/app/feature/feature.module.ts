import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooklistComponent } from './components/booklist/booklist.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DetailComponent } from './components/detail/detail.component';
import { SearchBooksComponent } from './components/search-books/search-books.component';

import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { AppRoutingModule } from '../app-routing.module';

// 特定のページを集めたモジュール

@NgModule({
  declarations: [
    BooklistComponent,
    RegisterComponent,
    DashboardComponent,
    DetailComponent,
    SearchBooksComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    // FeatureRoutingModuleを設定する↓
    AppRoutingModule,
  ],
  exports: [
    BooklistComponent,
    RegisterComponent,
    DashboardComponent,
    DetailComponent,
    SearchBooksComponent,
  ]
})
export class FeatureModule { }
