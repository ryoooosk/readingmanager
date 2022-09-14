import { Injectable } from '@angular/core';

import { Auth } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private afAuth: Auth) { }

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
        sendEmailVerification(user, actionCodeSettings);
        // actionCodeSettingsをオプションにすると、認証画面がら指定URLに飛べる
      });
  }
  // thenメソッド
  // 連続して処理を繋げることがでる。rxjsのpipe的な？？
  // リターンした値は次のthenの引数に渡る
  // Promise オブジェクトでは実行した返り値は Promiseオブジェクト自身を返す
  // callback を複数設定できる

  
  // update(values: { displayName?: string, photoURL?: string }): Promise<void> {
  // // ?がつくと省略可能
  //   return this.afAuth.currentUser.then((user) => {
  //     if(user) {
  //       user.updateProfile(values)
  //         .then(() => this.db.object(`/users/${user.uid}`).update(values))
  //         .catch(error => console.error(error));
  //     }
  //   });
  // }

}


