import { AuthenticationService } from '../_services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'ngx-angular8-sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;
  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService
  ) {

    if (this.authService.currentUserValue) {
      this.router.navigate(['/todos']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.invalid) {
      if (this.loginForm.value.email.length === 0 || this.loginForm.value.password.length === 0) {
        Swal.fire(
          'Something went wrong!',
          'Some field is empty',
          'error'
        );
      }
    } else {
      this.authService.login(this.loginForm.value).subscribe((result) => {
        this.router.navigate(['todos']);
      },
        err => {
          this.errorMessage = err;
          Swal.fire(
            'Something went wrong!',
            this.errorMessage,
            'error'
          );
        }
      );
    }
  }
}
