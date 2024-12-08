import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { ButtonComponent } from '../../shared/button/button.component';
import { Router } from "@angular/router";
import { LoginService } from '../../services/login.service';
import { LoginPayload, LoginResponse } from '../../models/login.model';
import { RouterLink } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    PasswordModule,
    ButtonComponent,
    ReactiveFormsModule,
    RouterLink
  ],
  providers: [ToastService], // Provide ToastService
  templateUrl: './login.component.html',
  styleUrls: ['../user-data.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private toastService: ToastService // Inject ToastService
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
          localStorage.setItem('authToken', response.data.token);
          localStorage.setItem('userId', response.data.userId);

          // Show success toast message
          this.toastService.showSuccess('Login realizado com sucesso!');

          // Redirect on success
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Login failed', error);

          // Show error toast message
          this.toastService.showError('Erro ao fazer login. Verifique suas credenciais e tente novamente.');
        }
      });
    } else {
      this.toastService.showError('Formulário inválido! Por favor, preencha todos os campos corretamente.');
      console.log('Formulário inválido');
    }
  }
}
