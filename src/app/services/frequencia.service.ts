import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Frequencia } from '../models/frequencia.model';

@Injectable({
  providedIn: 'root'
})
export class FrequenciaService {
  apiUrl = "http://127.0.0.1:8000/api/"

  httpOptions = {
    headers:  new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getFrequencia(): Observable<Frequencia[]> {
    return this.http.get<Frequencia[]>(`${this.apiUrl}frequencia`, this.httpOptions)
  }
  
}
