import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('JWT_TOKEN');
  const router = inject(Router);

  if (token) {
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });

    return next(authReq).pipe(
      catchError((error) => {
        if (error.status === 401) {
          // Sessão expirada ou não autorizada
          localStorage.removeItem('JWT_TOKEN');
          router.navigate(['/login']);
          console.error('Sessão expirada ou não autorizada. Faça login novamente.');
        } else if (error.error && error.error.message) {
          // Exibe a mensagem de erro retornada pela API
          console.error('Erro:', error.error.message);
        } else {
          // Exibe o erro desconhecido
          console.error('Erro desconhecido:', error);
        }
        return throwError(() => new Error(error.error?.message || 'Erro desconhecido')); // Garante que a mensagem de erro seja tratada
      })
    );
  }

  return next(req);
};
