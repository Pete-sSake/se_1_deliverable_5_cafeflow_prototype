import {Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';

const VALID_USERS = [
  {username: 'admin', password: 'password123'},
  {username: 'manager', password: 'cafe-password'}
];

@Component({
  selector: 'app-login.component',
  imports: [
    ReactiveFormsModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSignIn() {
    if (this.loginForm.invalid) return;

    const { username, password } = this.loginForm.value;

    // Logic to verify against your hard-coded list
    const user = VALID_USERS.find(u => u.username === username && u.password === password);

    if (user) {
      this.auth.login();
      this.router.navigate(['/menu-management']);
    } else {
      alert('Invalid username or password');
    }
  }

}
