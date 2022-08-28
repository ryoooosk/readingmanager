import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user';
import { AuthService } from '../core/service/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user: User = { email: '', password: ''};
  form: NgForm;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  signup(form): void {
    this.user = form.value;
    this.authService.create(this.user.email, this.user.password)
      .then(() => this.router.navigateByUrl('/users/new'));

    alert(JSON.stringify(this.user));
  }

}
