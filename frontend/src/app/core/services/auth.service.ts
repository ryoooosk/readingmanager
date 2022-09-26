import { Injectable } from '@angular/core';

// AngularFire
import { Auth } from '@angular/fire/auth';
import { signOut, signInWithEmailAndPassword } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUserId;

  constructor(private afAuth: Auth) {
    // デベロッパーツールで確認できる
    this.afAuth.onAuthStateChanged(user => {
      if(user) {
        this.currentUserId = user.uid;
        console.log(`uid: ${this.currentUserId}`);
      }
    });
  }

  login(email: string, password: string): any{
  // catchメソッドが使用された場合返り値がないため voidも指定
    return signInWithEmailAndPassword(this.afAuth, email, password)
      .catch(error => console.error(error));
  }

  logout(): Promise<void> {
    return signOut(this.afAuth);
  }


}
