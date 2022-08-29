import { Injectable } from '@angular/core';

// AngularFire
import { Auth } from '@angular/fire/auth';
import { signOut, signInWithEmailAndPassword } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: Auth) {
    // デベロッパーツールで確認できる
    this.afAuth.onAuthStateChanged(user => console.log(user));
  }

  login(email: string, password: string): any {
    return signInWithEmailAndPassword(this.afAuth, email, password)
      .catch(error => console.error(error));
  }

  logout(): Promise<void> {
    return signOut(this.afAuth);
  }


}
