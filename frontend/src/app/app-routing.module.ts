import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// コンポーネント
import { SignUpComponent } from './sign-up/sign-up.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginGuard } from './core/guards/login.guard';


const Routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  // 遅延読み込み
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule)},
  { path: 'signup', component: SignUpComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule), canActivateChild : [LoginGuard] },
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
