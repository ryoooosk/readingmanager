import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BooklistComponent } from './components/booklist/booklist.component';
import { DetailComponent } from './components/detail/detail.component';


const Routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'booklist', component: BooklistComponent },
  { path: 'book-detail/:id', component: DetailComponent },
]


@NgModule({
  imports: [
    RouterModule.forChild(Routes)
  ],
  exports: [
    RouterModule
  ]
})
export class FeatureRoutingModule { }
