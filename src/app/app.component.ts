import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Aluno } from './models/aluno.model';
import { TableModule } from 'primeng/table';
import { CommonModule, DatePipe } from '@angular/common';
import { DataFormatadaPipe } from './pipes/data-formatada.pipe';
import { AlunoService } from './services/aluno.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TableModule,
    CommonModule,
    DatePipe,
    DataFormatadaPipe
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit{
  title = 'acesso-inteligente';
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
