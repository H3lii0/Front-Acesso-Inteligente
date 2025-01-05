import { Time } from "@angular/common";
import { Aluno } from "./aluno.model";

export interface Frequencia {
    id: number,
    id_aluno: number, 
    data_acesso: Date | null,
    hora_acesso: Time,
    dia_semana: string,
    aluno: Aluno;
}