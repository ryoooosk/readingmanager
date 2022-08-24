import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignUpComponent } from './sign-up/sign-up.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';


const Routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'signup', component: SignUpComponent },
  { path: 'dashboard', loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule) },
  { path: '**', component: NotFoundComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(Routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
