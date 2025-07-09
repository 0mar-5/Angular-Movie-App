import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ToastModule } from 'primeng/toast';

import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

function passwordMatchValidator(
  control: AbstractControl
): ValidationErrors | null {
  const passwordControl = control.get('password');
  const confirmPasswordControl = control.get('confermPassword');

  if (
    !passwordControl ||
    !confirmPasswordControl ||
    confirmPasswordControl.value === null
  ) {
    return null;
  }

  if (passwordControl.value !== confirmPasswordControl.value) {
    confirmPasswordControl.setErrors({ passwordMismatch: true });
    return { passwordMismatch: true };
  } else {
    if (confirmPasswordControl.hasError('passwordMismatch')) {
      confirmPasswordControl.setErrors(null);
    }
    return null;
  }
}

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, ToastModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
})
export class RegisterPage {
  myReactiveForm!: FormGroup;

  constructor(private messageService: MessageService, private router: Router) {}

  ngOnInit() {
    this.myReactiveForm = new FormGroup(
      {
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('[^\\s@]+@[^\\s@]+\\.[^\\s@]+$'),
        ]),

        password: new FormControl('', [
          Validators.required,
          Validators.pattern('^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{7,}$'),
        ]),
        confermPassword: new FormControl('', [Validators.required]),
      },
      { validators: passwordMatchValidator }
    );
  }

  formSubmit() {
    if (this.myReactiveForm.valid) {
      const formData = this.myReactiveForm.value;
      delete formData.confermPassword;

      const users = JSON.parse(localStorage.getItem('users') || '[]');

      const existingUser = users.find((u: any) => u.email === formData.email);
      if (existingUser) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Email Exists',
          detail: 'This email is already registered.',
        });
        return;
      }

      const newUser = {
        id: Date.now(),
        ...formData,
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      this.messageService.add({
        severity: 'success',
        summary: 'Registration Successful',
        detail: 'You can now log in with your account.',
      });

      this.myReactiveForm.reset();

      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1000);
    }
  }
}
