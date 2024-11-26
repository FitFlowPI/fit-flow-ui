import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../shared/button/button.component';
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { Router, RouterLink } from "@angular/router";
import { RegisterService } from '../../services/register.service';
import { RegisterPayload, RegisterResponse } from '../../models/register.model';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ToastService } from '../../services/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    InputTextModule,
    PasswordModule,
    RouterLink,
    ReactiveFormsModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './register.component.html',
  styleUrls: ['../user-data.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private messageService: MessageService,
    private toastService: ToastService, // Inject ToastService
    private router: Router // Injetar Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
  
    if (!confirmPassword) {
      // If confirmPassword is empty, mark it as required
      formGroup.get('confirmPassword')?.setErrors({ required: true });
    } else if (password && confirmPassword && password !== confirmPassword) {
      // If passwords don't match, mark as invalid
      formGroup.get('confirmPassword')?.setErrors({ mismatch: true });
    } else {
      // If passwords match, remove any errors (if any)
      formGroup.get('confirmPassword')?.setErrors(null);
    }
  
    return null;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const payload: RegisterPayload = {
        username: this.registerForm.value.fullName,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        active_plan: true,
        user_type: 'auto_trainer',
        gender: 'male',
        weight: 70.5,
        height: 175.0
      };

      this.registerService.registerUser(payload).subscribe({
        next: (response: RegisterResponse) => {
          const token = response.data.token;
          localStorage.setItem('authToken', token);

          // Show success toast message
          this.toastService.showSuccess('Você foi registrado com sucesso!');

          // Navigate to the home page (or any other page)
          this.router.navigate(['/user/login']);
        },
        error: (error) => {
          console.error('Falha no registro', error);

          // Show error toast message
          this.toastService.showError('Ocorreu um erro durante o registro. Por favor, tente novamente.');
        }
      });
    } else {
      this.toastService.showError('Formulário inválido! Por favor, preencha todos os campos corretamente.');
      console.log('Formulário inválido');
    }
  }
}
