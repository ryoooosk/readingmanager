import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  // signupForm: FormGroup;

  user: User = { email: '', password: ''};
  form: NgForm;

  onSubmit(form): void {
    alert(JSON.stringify(form.value));
  }

  constructor(
    private builder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.signupForm = this.builder.group([
    //   email: new FormControl('', [Validators.required,Validators.email]),
    //   password: new FormControl('', [Validators.required])
    // ]);
  }

}
