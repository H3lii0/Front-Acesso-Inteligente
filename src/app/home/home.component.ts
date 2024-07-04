import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Aluno } from '../models/aluno.model';
import { TableModule } from 'primeng/table';
import { CommonModule, DatePipe } from '@angular/common';
import { DataFormatadaPipe } from '../pipes/data-formatada.pipe';
import { AlunoService } from '../services/aluno.service';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

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
    InputTextModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  alunos: Aluno[] = [];
  constructor (public alunoService: AlunoService) {

  }

  ngOnInit(): void {
    this.alunoService.getAluno().subscribe(response => {
      this.alunos = response
      console.log(this.alunos)
    })
  }
}
