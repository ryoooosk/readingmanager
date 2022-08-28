import { Injectable } from '@angular/core';

// AngularFire
import { Auth } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: Auth) {
    // デベロッパーツールで確認できる
    this.afAuth.onAuthStateChanged(user => console.log(user));
  }

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

  login(email: string, password: string): any {
    return signInWithEmailAndPassword(this.afAuth, email, password)
      .catch(error => console.error(error));
  }

  logout(): Promise<void> {
    return signOut(this.afAuth);
  }


}
