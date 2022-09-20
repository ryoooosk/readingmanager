import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { User } from '../core/models/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = {email: '', password: ''}

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  login(form: NgForm): void {
    // this.user = form.value;
    // ↑[(ngModel)]を使ってるので既にuserに<input>の値が代入されているので不必要
    this.authService.login(this.user.email, this.user.password)
      .then(() => this.router.navigateByUrl('/'));
  }

}
