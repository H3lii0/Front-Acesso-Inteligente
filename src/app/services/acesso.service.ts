import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcessoService {

  apiUrl = "http://127.0.0.1:8000/api/"

  httpOptions = {
    headers:  new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getTotalAcessos(): Observable<{total: number}> {
    return this.http.get<{total: number}>(`${this.apiUrl}total-acessos`, this.httpOptions)
  }
}
