import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { BooklistComponent } from './feature/components/booklist/booklist.component';
import { RegisterComponent } from './feature/components/register/register.component';
import { DashboardComponent } from './feature/components/dashboard/dashboard.component';
import { DetailComponent } from './feature/components/detail/detail.component';
import { SearchBooksComponent } from './feature/components/search-books/search-books.component';
import { SignUpComponent } from './sign-up/sign-up.component';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { FeatureModule } from './feature/feature.module';

@NgModule({
  declarations: [
    AppComponent,
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
    CoreModule,
    FeatureModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
