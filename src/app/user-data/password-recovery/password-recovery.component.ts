import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordRecoveryService } from '../../services/password-recovery.service';
import { ButtonComponent } from "../../shared/button/button.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-password-recovery',
  standalone: true,
  imports: [
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './password-recovery.component.html',
  styleUrls: ['../user-data.component.scss']
})
export class PasswordRecoveryComponent {
  passwordRecoveryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private passwordRecoveryService: PasswordRecoveryService,
    private router: Router,
    private toastService: ToastService // Inject ToastService
  ) {
    this.passwordRecoveryForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get email() {
    return this.passwordRecoveryForm.get('email')!;
  }

  onSubmit(): void {
    if (this.passwordRecoveryForm.valid) {
      const email = this.passwordRecoveryForm.value.email;

      this.passwordRecoveryService.sendRecoveryEmail(email).subscribe({
        next: () => {
          // Call ToastService for success message
          this.toastService.showSuccess('Um link de recuperação foi enviado para o seu email!');
        },
        error: (err) => {
          console.error('Erro ao enviar email de recuperação:', err);
          // Call ToastService for error message
          this.toastService.showError('Erro ao enviar o email. Tente novamente.');
        }
      });
    }
  }
}
