import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../shared/button/button.component';
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { RouterLink } from "@angular/router";
import { RegisterService } from '../../services/register.service';
import { RegisterPayload, RegisterResponse } from '../../models/register.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ButtonComponent,
    InputTextModule,
    PasswordModule,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['../user-data.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private registerService: RegisterService) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required] // Keep this for validation
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
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

      // Call the register service to send the payload
      this.registerService.registerUser(payload).subscribe({
        next: (response: RegisterResponse) => {
          console.log('Registration successful', response);
          const token = response.data.token;
          localStorage.setItem('authToken', token); // Save the token
          console.log('Token saved to localStorage');
          // You can also navigate the user or show a success message here
        },
        error: (error) => {
          console.error('Registration failed', error);
          // Handle the error appropriately (e.g., show a message to the user)
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
