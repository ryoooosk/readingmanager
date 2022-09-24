import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Auth } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, sendEmailVerification, getAuth } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(
    private afAuth: Auth,
    private anAuth: AngularFireAuth,
    private http: HttpClient
  ) { }

  private apiUrl = 'http://localhost:8000/api/user/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  create(email: string, password: string): Promise<void> {
  // ジェネリック型→型を利用する時に具体的な型が決まる仕組み。（Promiseはジェネリック型だからジェネリック指定の必要がある）
    return createUserWithEmailAndPassword(this.afAuth, email, password)
      // credential ってなんだ？？
      .then((credential) => {
        const { user } = credential;
        // 新規登録ユーザーがメール認証を行ったかを解析可能↓
        const actionCodeSettings = {
          url: `http://localhost:4200/dashboard/?newAccount=true&email=${user.email}`
        };
        // sendEmailVerification(user, actionCodeSettings);
        // actionCodeSettingsをオプションにすると、認証画面がら指定URLに飛べる
        const createuser = {uid: user.uid, email: user.email};
        this.http.post(`${this.apiUrl}register`, createuser, this.httpOptions)
          .subscribe(_ => console.log('New uid is added!'))
        // this.db.object(`/users/${user.uid}`).set({ uid: user.uid, email: user.email });
        // データベースにuser情報を登録する。Laravelデータベース側でuserテーブルを作っておき、bookテーブルとリレーションさせればできそう
      });
  }
  // thenメソッド
  // 連続して処理を繋げることがでる。rxjsのpipe的な？？
  // リターンした値は次のthenの引数に渡る
  // Promise オブジェクトでは実行した返り値は Promiseオブジェクト自身を返す
  // callback を複数設定できる

  update(values: { displayName?: string, photoURL?: string }): Promise<void> {
  // ?がつくと省略可能
    return this.anAuth.currentUser
    // currentUserで現在ログインしているユーザーを取得
      .then((user) => {
        if(user) {
          user.updateProfile(values)
            .then(() => {
              console.log(values);
              this.http.put(`${this.apiUrl}register/${user.uid}/displayName`, values, this.httpOptions)
                .subscribe(_ => console.log('New displayName is added!'));
          })
            // .then(() => {this.http.put(`/users/${user.uid}`).update(values)})
            .catch(error => console.error(error));
        }
      });
  }

}


