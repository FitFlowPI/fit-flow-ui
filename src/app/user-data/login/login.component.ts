import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { ButtonComponent } from '../../shared/button/button.component';
import { Router } from "@angular/router";
import { LoginService } from '../../services/login.service';
import { LoginPayload, LoginResponse } from '../../models/login.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    InputTextModule,
    PasswordModule,
    ButtonComponent,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrls: ['../user-data.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const payload: LoginPayload = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      this.loginService.authenticate(payload).subscribe({
        next: (response: LoginResponse) => {
          console.log('Login successful', response);
          localStorage.setItem('authToken', response.data.token); // Store token
          this.router.navigate(['/home']); // Redirect on success
        },
        error: (error) => {
          console.error('Login failed', error);
          // Handle the error here, e.g., show an error message
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
