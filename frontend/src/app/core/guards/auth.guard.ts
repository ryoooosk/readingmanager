import { Injectable } from '@angular/core';

import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Auth, authState } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(
    private afAuth: Auth,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return authState(this.afAuth).pipe(
    // authState ログイン情報をobservableで取得
      map((user) => {
        if(!user) {
          return true;
        } else {
          // this.router.navigateByUrl('/');
          // return false;
          // UrlTree(parseUrl) を使うと上の２文を１文で書ける↓
          return this.router.parseUrl('/');
        }
      })
    );

  }

}
