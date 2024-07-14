import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Aluno } from '../models/aluno.model';
import { TableModule } from 'primeng/table';
import { CommonModule, DatePipe } from '@angular/common';
import { DataFormatadaPipe } from '../pipes/data-formatada.pipe';
import { AlunoService } from '../services/aluno.service';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    TableModule,
    CommonModule,
    DatePipe,
    DataFormatadaPipe,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    DialogModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  alunos: Aluno[] = [];
  id?: number;
  aluno: any;
  buscarAlunoForm!: FormGroup;
  alunoDialog: boolean = false;
  senhaDialog: boolean = false;
  senha: string = '';

  constructor (
    public alunoService: AlunoService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.buscarAlunoForm = fb.group({
      id: ['']
    })
  }

  ngOnInit(): void {

  }

  buscarAluno(): void {
    const id = this.buscarAlunoForm.get('id')?.value;
    this.alunoService.getAlunoId(id).subscribe(data => {
      this.aluno = data;
      this.alunoDialog = true
    })
  }
  
  showDialog() {
      this.alunoDialog = true;
  }

  showSenhaDialog() {
    this.senhaDialog = true;
  }

  confirmarSenha() {
    const id = this.aluno.id;

    this.alunoService.validarSenha(id, this.senha).subscribe(
      response => {
        if (response.acessoPermitido) {
          this.router.navigate(['/acesso-liberado', {id: id}] )
        } else {
          alert('Senha incorreta, tente novamente.');
        }
      }
    );
  }
}
