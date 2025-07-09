import { inject, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MovieStore } from '../../store/movie.store';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  loginError = false;

  private movieStore = inject(MovieStore);
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[^\\s@]+@[^\\s@]+\\.[^\\s@]+$'),
      ]),
      password: new FormControl('', Validators.required),
    });
  }

  loginSubmit() {
    const enteredEmail = this.loginForm.value.email;
    const enteredPassword = this.loginForm.value.password;

    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      const users = JSON.parse(savedUsers);

      const matchedUser = users.find(
        (user: any) =>
          user.email === enteredEmail && user.password === enteredPassword
      );

      if (matchedUser) {
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('userData', JSON.stringify(matchedUser));

        this.movieStore.loadUserWatchList();

        this.router.navigate(['/']);
        return;
      }
    }

    this.loginError = true;
  }
}
