import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private usuarioLogado?: string;
  private autenticado = new BehaviorSubject<boolean>(false);
  private router = inject(Router);
  private http = inject(HttpClient);
  private apiUrl = 'http://127.0.0.1:8000/api';
  private mensagemExibida = false;

  constructor() { }

  // login (user: {
  //   email: string, password: string
  // }): Observable<any> {
  //   return this.http.post<any>(this.apiUrl, user).pipe(
  //     tap((response: any) => this.usuarioLogar(user.email, response.token));
  //   ),
  // }
  login(user: { email: string, password: string }): Observable<any> {
    console.log(user);
    return this.http.post<any>(`${this.apiUrl}/login`, user).pipe(
      tap((response: any) => {
        if (response.confirm_session_termination) {
          // Caso o backend retorne que já há uma sessão ativa, pede confirmação
          const confirmSessionTermination = confirm('Sessão já ativa nesse dispositivo. Deseja encerrar a sessão anterior?');
          
          if (confirmSessionTermination) {
            // Se o usuário confirmar, encerra a sessão anterior e faz o login novamente
            this.encerrarSessaoAnterior(user).subscribe();
          }
        } else {
          // Caso o login seja bem-sucedido e não haja sessão anterior ativa, armazena o token
          this.usuarioLogar(user.email, response.token);
        }
      }),
      catchError(err => {
        if (err.status === 403 && err.error.erro === 'Sessão já ativa em outro dispositivo.') {
          // Retorna um erro específico para a sessão ativa, se necessário
          return throwError(() => new Error('session_active'));
        }
        // Tratamento de outros erros
        return throwError(() => err);
      })
    );
  }
  
  encerrarSessaoAnterior(user: { email: string, password: string }): Observable<any> {
    // Endpoint específico para encerrar a sessão anterior
    return this.http.post<any>(`${this.apiUrl}/terminate-session`, user).pipe(
      tap((response: any) => {
        // Armazena o novo token após encerrar a sessão anterior
        this.usuarioLogar(user.email, response.token);
      }),
      catchError(err => {
        console.error('Erro ao encerrar a sessão anterior:', err);
        return throwError(() => err);
      })
    );
  }
  
  // Método auxiliar para armazenar o token no local storage ou onde for necessário
  private usuarioLoga(email: string, token: string): void {
    localStorage.setItem('token', token);
    console.log(`Usuário ${email} logado com sucesso. Token armazenado.`);
  }
  

  private usuarioLogar (email: string, token: any) {
    this.usuarioLogado = email;
    this.salvarToken(token);
    this.autenticado.next(true);
    this.mensagemExibida = false;
  }

  private salvarToken(jwt: string): void {
    localStorage.setItem(this.JWT_TOKEN, jwt)
  }

  infoUsuarioAtual () {
    return this.http.get(this.apiUrl)
  }

  logado () {
    return !!localStorage.getItem(this.JWT_TOKEN)
  }

  logout () {
    localStorage.removeItem(this.JWT_TOKEN);
    this.autenticado.next(false);
    this.router.navigate(['/login']);
  }

  usuarioAunteticado(): Observable<boolean> {
    return this.autenticado.asObservable();
  }

  exibirMensagem(): boolean {
    if (!this.mensagemExibida) {
      this.mensagemExibida = true;
      return true;
    }
    return false;
  }
}
