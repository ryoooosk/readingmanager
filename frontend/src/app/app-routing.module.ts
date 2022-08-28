import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// コンポーネント
import { SignUpComponent } from './sign-up/sign-up.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { LoginComponent } from './login/login.component';


const Routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  // 遅延読み込み
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule)},
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
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
