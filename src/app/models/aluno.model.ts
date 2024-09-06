import { Frequencia } from "./frequencia.model";

export interface Aluno {
    id: number;
    nome: string;
    matricula: number;
    data_nascimento: Date;
    sexo: string;
    serie: string;
    curso: string;
    email: string;
    telefone: string;
    imagem?: string;
    senha: string;
    frequencias: Frequencia[];
}

export interface PaginatedResponse<T> {
    data: T[];
    current_page: number;
    per_page: number;
    total: number;
  }
  