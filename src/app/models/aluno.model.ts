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
}