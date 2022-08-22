import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MessageComponent } from './components/message/message.component';

// 一度だけ取り込むモジュール

@NgModule({
  declarations: [
    HeaderComponent,
    NotFoundComponent,
    MessageComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    HeaderComponent,
    NotFoundComponent,
    MessageComponent
  ]
})
export class CoreModule { }
