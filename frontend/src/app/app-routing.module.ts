import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooklistComponent } from './feature/components/booklist/booklist.component';
import { DashboardComponent } from './feature/components/dashboard/dashboard.component';
import { DetailComponent } from './feature/components/detail/detail.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';


const Routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'signup', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'booklist', component: BooklistComponent },
  { path: 'book-detail/:id', component: DetailComponent },
  { path: '**', component: NotFoundComponent }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(Routes)
  ], exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
