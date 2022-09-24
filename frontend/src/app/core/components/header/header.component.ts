import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogin: boolean;
  currentUser: string;

  constructor(
    private afAuth: Auth,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // ログイン状態を確認。
    this.afAuth.onAuthStateChanged((user) => {
    // onAuthStateChanged ログインが切り替わる度に実行されるコールバックを引数に受け取る
    // userオブジェクトはログインしている状態でしか渡ってこない
      this.isLogin = !!user;
      // [!!]で真偽値に変換
      // isLogin プロパティにはuserオブジェクトがある場合はtrueに、反対はfalseとなる
      if(user) {
        this.currentUser = user.displayName;
      }
    });
  }

  logout(): void {
    this.authService.logout()
      .then(() => this.router.navigateByUrl('/login'));
  }

}
