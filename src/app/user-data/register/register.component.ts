import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonComponent } from '../../shared/button/button.component';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { Router, RouterLink } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { RegisterPayload, RegisterResponse } from '../../models/register.model';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ToastService } from '../../services/toast.service';
import { CommonModule } from '@angular/common';
import { passwordValidator } from '../../validators/password.validator';
import { DialogModule } from 'primeng/dialog';

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
    ToastModule,
    DialogModule,
  ],
  providers: [MessageService],
  templateUrl: './register.component.html',
  styleUrls: ['../user-data.component.scss'],
})
export class RegisterComponent implements OnInit {
  termsVisible: boolean = false;
  privacyVisible: boolean = false;
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private messageService: MessageService,
    private toastService: ToastService, // Inject ToastService
    private router: Router // Injetar Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        fullName: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    // Regular expressions for password validation
    const minLengthRegex = /.{8,}/; // At least 8 characters
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/; // At least one special character
    const upperCaseRegex = /[A-Z]/; // At least one uppercase letter

    // Validate password rules
    if (password) {
      if (!minLengthRegex.test(password)) {
        formGroup.get('password')?.setErrors({ minLength: true });
      } else if (!specialCharRegex.test(password)) {
        formGroup.get('password')?.setErrors({ specialChar: true });
      } else if (!upperCaseRegex.test(password)) {
        formGroup.get('password')?.setErrors({ upperCase: true });
      } else {
        formGroup.get('password')?.setErrors(null); // Clear errors if valid
      }
    }

    // If confirmPassword is empty, mark it as required
    if (!confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ required: true });
    }
    // If passwords don't match, mark it as invalid (mismatch error)
    else if (password && confirmPassword && password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ mismatch: true });
    }
    // If passwords match, clear any previous errors
    else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }

    return null; // Return null to continue with the form validation process
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const payload: RegisterPayload = {
        username: this.registerForm.value.fullName,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
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
          this.toastService.showError(
            'Ocorreu um erro durante o registro. Por favor, tente novamente.'
          );
        },
      });
    } else {
      this.toastService.showError(
        'Formulário inválido! Por favor, preencha todos os campos corretamente.'
      );
      console.log('Formulário inválido');
    }
  }

  showTerms() {
    this.termsVisible = true;
    console.log("clicked terms")
  }

  showPrivacy() {
    this.privacyVisible = true;
  }
}
