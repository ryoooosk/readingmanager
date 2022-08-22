import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

// 一度だけ取り込むモジュール

@NgModule({
  declarations: [
    HeaderComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    HeaderComponent,
    NotFoundComponent
  ]
})
export class CoreModule { }
