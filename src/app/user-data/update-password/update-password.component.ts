import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonComponent } from "../../shared/button/button.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { PaginatorModule } from "primeng/paginator";
import { Router, RouterLink } from "@angular/router";
import { PasswordModule } from "primeng/password";
import { UpdatePasswordService } from '../../services/update-password.service'; // Adjust path as necessary
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '../../services/toast.service';  // Import ToastService
import { passwordValidator } from '../../validators/password.validator';

@Component({
  selector: 'app-update-password',
  standalone: true,
  imports: [
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    PaginatorModule,
    RouterLink,
    PasswordModule,
    CommonModule
  ],
  templateUrl: './update-password.component.html',
  styleUrls: ['../user-data.component.scss']
})
export class UpdatePasswordComponent {
  passwordForm: FormGroup;
  token: string | null = null;
  email: string | null = null;

  constructor(
    private fb: FormBuilder,
    private updatePasswordService: UpdatePasswordService,
    private route: ActivatedRoute,
    private toastService: ToastService,  // Inject ToastService
    private router: Router // Inject Router
  ) {
    // Initialize the form
    this.passwordForm = this.fb.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            passwordValidator() // Apply custom password validator here
          ]
        ],
        confirmPassword: ['', Validators.required]
      },
      { validator: this.passwordMatchValidator }
    );

    // Get token and email from the query parameters
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      this.email = params['email'];
    });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    // If passwords don't match, set an error
    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ mismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null); // Clear errors if passwords match
    }

    return null; // Continue with the validation process
  }

  onSubmit() {
    if (this.passwordForm.valid && this.token && this.email) {
      const { password } = this.passwordForm.value;

      // Send the password, token, and email to the service for updating the password
      this.updatePasswordService.updatePassword(password, this.token, this.email).subscribe({
        next: () => {
          this.toastService.showSuccess('Senha atualizada com sucesso!'); // Show success toast
          this.router.navigate(['/user/login']);
        },
        error: (err) => {
          console.error(err);
          this.toastService.showError('Erro ao atualizar a senha.'); // Show error toast
        }
      });
    } else {
      this.toastService.showError('Por favor, corrija os erros de validação.'); // Show validation error toast
    }
  }
}
