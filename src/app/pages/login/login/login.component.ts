import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    ButtonModule,
    ToastModule,
    DialogModule,
    ToastModule,
    MessagesModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  sessionActive = false;
  messages: Message[] = []; // Usado para armazenar mensagens
  existingIp: string | null = null;

constructor(
  private authService: AuthService,
  private router: Router

) {}

login() {
  this.authService.login({ email: this.email, password: this.password }).subscribe(
    () => {
      this.router.navigate(['/dashboard']);
    },
    (error) => {
      console.error('Erro durante o login: ', error);
      if (error.status === 409 && error.error && error.error.confirm_session_termination) {
        this.sessionActive = true;
        this.existingIp = error.error.existing_ip;
        this.messages = [{ severity: 'warn', summary: 'Sessão Ativa', detail: error.error.message }];
      } else {
        this.messages = [{ severity: 'error', summary: 'Erro', detail: 'Erro de login: ' + (error.error.erro || 'Erro desconhecido') }];
      }
    }
  );
}

encerrarSessaoAnterior() {
  this.authService.encerrarSessaoAnterior({ email: this.email, password: this.password }).subscribe(
    () => {
      // Após encerrar a sessão anterior, realizar o login novamente
      this.login();
      this.sessionActive = false; // Fecha o modal
      this.messages = [{ severity: 'success', summary: 'Sucesso', detail: 'Sessão anterior encerrada com sucesso. Você está logado.' }];
    },
    (error) => {
      this.messages = [{ severity: 'error', summary: 'Erro', detail: 'Erro ao encerrar a sessão anterior: ' + error }];
    }
  );
}

cancelarSessao() {
  // Fecha o modal e cancela a tentativa de login
  this.sessionActive = false;
}
}