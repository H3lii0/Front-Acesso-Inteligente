import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';

constructor(
  private authService: AuthService,
  private router: Router
) {}

  login(event: Event) {
    event.preventDefault();
    this.authService.login({email: this.email, password: this.password}).subscribe(() => {
      alert('Login realizado com sucesso!')
      this.router.navigate(['dashboard'])
    }) 
  }
}
