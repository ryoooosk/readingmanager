import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { MessageComponent } from './message/message.component';
import { BooklistComponent } from './booklist/booklist.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailComponent } from './detail/detail.component';
import { SearchBooksComponent } from './search-books/search-books.component';
import { SignUpComponent } from './sign-up/sign-up.component';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    BooklistComponent,
    RegisterComponent,
    DashboardComponent,
    DetailComponent,
    SearchBooksComponent,
    SignUpComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    SharedModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
