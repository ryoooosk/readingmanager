import { Injectable } from '@angular/core';

import { Auth } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private afAuth: Auth) { }

  create(email: string, password: string): Promise<void> {
    return createUserWithEmailAndPassword(this.afAuth, email, password)
      // credential ってなんだ？？
      .then((credential) => {
        const { user } = credential;
        // 新規登録ユーザーがメール認証を行ったかを解析可能↓
        const actionCodeSettings = {
          url: `http://localhost:4200/dashboard/?newAccount=true&email=${user.email}`
        };
        sendEmailVerification(user, actionCodeSettings);
      });
  }
  // authService.create(email, password)
  //   .then((credential) => credential)
  //   .catch((error) => error)

  // // ?があると省略が可能
  // update(values: { displayName?: string, photoURL?: string }): Promise<void> {
  //   return this.afAuth.currentUser.then((user) => {
  //     if(user) {
  //       user.updateProfile(values)
  //         .then(() => this.db.object(`/users/${user.uid}`).update(values))
  //     }
  //   });
  // }

}


