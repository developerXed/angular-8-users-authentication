import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import Swal from 'ngx-angular8-sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  returnUrl: string;
  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  validateEmail() {
    const preg = /\S+@\S+\.\S+/;
    return preg.test(this.registerForm.value.email);
  }

  submit() {
    const checkEmail = this.validateEmail();
    if (checkEmail === false) {
      Swal.fire(
        'Something went wrong!',
        'Email is not valid , provide a valid Email',
        'error'
      );
    }
    if (this.registerForm.invalid) {
      if (this.registerForm.value.email.length === 0 || this.registerForm.value.password.length === 0) {
        Swal.fire(
          'Something went wrong!',
          'Some field is empty',
          'error'
        );
      }
    } else {
      this.authService.register(this.registerForm.value).subscribe((response) => {
        this.router.navigate(['login']);
      }, err => {
        this.errorMessage = err;
        Swal.fire(
          'Something went wrong!',
          this.errorMessage,
          'error'
        );
      });
    }
  }
}
