import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// コンポーネント
import { HeaderComponent } from './components/header/header.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MessageComponent } from './components/message/message.component';
import { RouterModule } from '@angular/router';

// Angular Firebase
import { environment } from '../../environments/environment';
import { getApp, provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth, } from '@angular/fire/auth';
import { getDatabase } from "firebase/database";
import { AngularFireModule } from '@angular/fire/compat';


// 一度だけ取り込むモジュール

@NgModule({
  declarations: [
    HeaderComponent,
    NotFoundComponent,
    MessageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    // firebase 9系の初期化
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    // firebase 8以前の初期化
    AngularFireModule.initializeApp(environment.firebase),
  ],
  exports: [
    HeaderComponent,
    NotFoundComponent,
    MessageComponent
  ]
})
export class CoreModule { }
