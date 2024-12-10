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
  loginAttempts: { [email: string]: { count: number; blockedUntil: number } } = {};


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
    const email = this.loginForm.value.email;

    localStorage.setItem('email', email);

    if (this.isEmailBlocked(email)) {
      this.toastService.showError('Você atingiu o limite de tentativas. Tente novamente em alguns segundos.');
      return;
    }

    if (this.loginForm.valid) {
      const payload: LoginPayload = {
        email,
        password: this.loginForm.value.password
      };

      this.loginService.authenticate(payload).subscribe({
        next: (response: LoginResponse) => {

          localStorage.removeItem('email');
          if (this.loginAttempts[email]) delete this.loginAttempts[email];

          localStorage.setItem('authToken', response.data.token);
          this.toastService.showSuccess('Login realizado com sucesso!');
          this.router.navigate(['/home']);
        },
        error: (error) => {

          this.handleFailedAttempt(email);

          this.toastService.showError('Erro ao fazer login. Verifique suas credenciais e tente novamente.');
        }
      });
    } else {
      this.toastService.showError('Formulário inválido! Por favor, preencha todos os campos corretamente.');
    }
  }

  isEmailBlocked(email: string): boolean {
    const attemptData = this.loginAttempts[email];
    if (attemptData) {
      const currentTime = Date.now();
      if (attemptData.blockedUntil && attemptData.blockedUntil > currentTime) {
        return true;
      }
    }
    return false;
  }

  handleFailedAttempt(email: string): void {
    const currentTime = Date.now();

    if (!this.loginAttempts[email]) {
      this.loginAttempts[email] = { count: 0, blockedUntil: 0 };
    }

    const attemptData = this.loginAttempts[email];
    attemptData.count += 1;

    if (attemptData.count >= 3) {
      attemptData.blockedUntil = currentTime + 5000;
      this.toastService.showError(`Muitas tentativas falharam. Este email está bloqueado por 5 segundos.`);
    }
  }

}
