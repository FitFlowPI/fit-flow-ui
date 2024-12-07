import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.value;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    // Ensure the password meets all the conditions
    const isValid =
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar &&
      password.length >= 8;

    // Return an error object if the password doesn't match the criteria
    if (!isValid) {
      return {
        upperCase: !hasUpperCase,
        lowerCase: !hasLowerCase,
        number: !hasNumber,
        specialChar: !hasSpecialChar,
        minlength: password.length < 8,
      };
    }

    return null;
  };
}