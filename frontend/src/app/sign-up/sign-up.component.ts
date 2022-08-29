import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../core/services/user.service';

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
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  signup(form): void {
    this.user = form.value;
    this.userService.create(this.user.email, this.user.password)
      .then(() => this.router.navigateByUrl('/users/new'));

    alert(JSON.stringify(this.user));
  }

}
