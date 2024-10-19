import { Component, NgModule, OnInit } from '@angular/core';
import { SideBarComponent } from '../../central/side-bar/side-bar.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlunoService } from '../../../services/aluno.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastrar-alunos',
  standalone: true,
  imports: [
    SideBarComponent,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './cadastrar-alunos.component.html',
  styleUrl: './cadastrar-alunos.component.css'
})
export class CadastrarAlunosComponent implements OnInit{
  title = 'Cadastrar Alunos'
  alunosFormCadastro!: FormGroup;

  constructor (
    private fb: FormBuilder,
    private alunoService: AlunoService
  ) {}

  ngOnInit(): void {
    this.alunosFormCadastro = this.fb.group({
      nome: ['', Validators.required],
      matricula: ['', Validators.required],
      data_nascimento: ['', Validators.required],
      sexo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      senha: ['', Validators.required],
      curso: ['', Validators.required],
      serie: ['', Validators.required],
    });
    
  }

  cadastrar() {
    if (this.alunosFormCadastro.valid) {
      console.log('Dados do formulário:', this.alunosFormCadastro.value); // Verifica os dados do formulário
      this.alunoService.cadastrarAluno(this.alunosFormCadastro.value).subscribe(
        result => {
          console.log('Cadastro realizado com sucesso');
        },
        error => {
          console.error('Erro ao cadastrar:', error.error.errors); // Mostra os erros específicos do backend
        }
      );
    } else {
      console.log('Formulário inválido');
      this.alunosFormCadastro.markAllAsTouched(); // Marca todos os campos como tocados
    }
  }
}
