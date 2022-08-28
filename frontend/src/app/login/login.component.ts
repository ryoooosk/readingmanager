import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/service/auth.service';
import { User } from '../user';
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
    this.user = form.value;
    this.authService.login(this.user.email, this.user.password)
      .then(() => this.router.navigateByUrl('/'));
  }

}
