import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../core/models/user';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user: User = { email: '', password: ''};

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  signup(form: NgForm): void {
    this.user = form.value;
    // [(ngModel)]を使っていないため、<input>の値を先に代入する必要あり
    this.userService.create(this.user.email, this.user.password)
      .then(() => this.router.navigateByUrl('/users/new'));
    // thenメソッド
    // 連続して処理を繋げることがでる。rxjsのpipe的な？？
    // リターンした値は次のthenの引数に渡る
    // Promise オブジェクトでは実行した返り値は Promiseオブジェクト自身を返す
    // callback を複数設定できる

    alert(`下記の内容で会員登録します${JSON.stringify(this.user)}`);
  }

}
