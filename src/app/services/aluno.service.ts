import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Aluno, PaginatedResponse } from '../models/aluno.model';
import { Frequencia } from '../models/frequencia.model';

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

  public getListaAluno (page: number, perPage: number): Observable<PaginatedResponse<Aluno>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('perp_page', perPage.toString());

    return this.http.get<PaginatedResponse<Aluno>>(`${this.apiUrl}aluno`, { params });
  }

  public getAlunoId (id: number): Observable<Aluno> {
    return this.http.get<Aluno>(`${this.apiUrl}aluno/${id}`, this.httpOptions);
  }

  public getFrequencias(page: number, perPage: number): Observable<PaginatedResponse<Frequencia>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());

    return this.http.get<PaginatedResponse<Frequencia>>(`${this.apiUrl}historico-frequencia`, { params });
}


  public getAlunoFrequencia (page: number, perPage: number): Observable<PaginatedResponse<Frequencia>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('perp_page', perPage.toString());

    return this.http.get<PaginatedResponse<Frequencia>>(`${this.apiUrl}frequencia`, { params });
  }

  public validarSenha (id: number, senha: string): Observable<{acessoPermitido: boolean}>{
    return this.http.post<{ acessoPermitido: boolean }>(`${this.apiUrl}aluno/${id}/validar-senha`, {senha}, this.httpOptions);
  }

  public cadastrarAluno(aluno: any):Observable<Aluno[]>  {
    return this.http.post<Aluno[]>(`${this.apiUrl}aluno`, aluno, this.httpOptions);
  }

  public atualizarAluno(id: number, aluno: Partial<Aluno>): Observable<Aluno>{
    return this.http.put<Aluno>(`${this.apiUrl}aluno/${id}`, aluno);
  }

  public apagarRegistroAluno(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}aluno/${id}`);
  }
}
