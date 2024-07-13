import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Aluno } from '../models/aluno.model';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  apiUrl = "http://127.0.0.1:8000/api/"

  httpOptions = {
    headers:  new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }

  public getAluno (): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(`${this.apiUrl}aluno`, this.httpOptions)
  }

  public getAlunoId (id: number): Observable<Aluno> {
    return this.http.get<Aluno>(`${this.apiUrl}aluno/${id}`, this.httpOptions)
  }

  public validarSenha (id: number, senha: string): Observable<{acessoPermitido: boolean}>{
    return this.http.post<{ acessoPermitido: boolean }>(`${this.apiUrl}aluno/${id}/validar-senha`, {senha}, this.httpOptions)
  }
}
