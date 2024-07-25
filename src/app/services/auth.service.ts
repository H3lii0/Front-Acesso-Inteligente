import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private usuarioLogado?: string;
  private autenticado = new BehaviorSubject<boolean>(false);
  private router = inject(Router);
  private http = inject(HttpClient);
  private apiUrl = 'http://127.0.0.1:8000/api/login';

  constructor() { }

  login (user: {
    email: string, password: string
  }): Observable<any> {
    return this.http.post<any>(this.apiUrl, user).pipe(
      tap((response: any) => this.usuarioLogar(user.email, response.token))
    );
  }

  private usuarioLogar (email: string, token: any) {
    this.usuarioLogado = email;
    this.salvarToken(token);
    this.autenticado.next(true);
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


}
