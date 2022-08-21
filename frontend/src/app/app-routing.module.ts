import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooklistComponent } from './booklist/booklist.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailComponent } from './detail/detail.component';
import { SignUpComponent } from './sign-up/sign-up.component';


const Routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'signup', component: SignUpComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'booklist', component: BooklistComponent },
  { path: 'book-detail/delete', redirectTo: '/booklist', pathMatch: 'full'},
  { path: 'book-detail/:id', component: DetailComponent},
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
