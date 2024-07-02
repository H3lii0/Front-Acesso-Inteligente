import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Aluno } from '../models/aluno.model';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  apiUrl = "http://127.0.0.1:8000/api/"

  httOptions = {
    headers:  new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }

  public getAluno (): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(`${this.apiUrl}aluno`, this.httOptions)
  }
}
