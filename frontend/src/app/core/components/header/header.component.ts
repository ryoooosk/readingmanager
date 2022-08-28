import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogin: boolean;

  constructor(
    private afAuth: Auth,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // ログイン状態を確認。
    // onAuthStateChanged ログインが切り替わる度に実行されるコールバックを引数に受け取る
    // userオブジェクトはログインしている状態でしか渡ってこない
    // isLogin プロパティにはuserオブジェクトがある場合はtrueに、反対はfalseとなる
    this.afAuth.onAuthStateChanged((user) => {
      this.isLogin = !!user;
    });
  }

  logout(): void {
    this.authService.logout()
      .then(() => this.router.navigateByUrl('/login'));
  }

}
