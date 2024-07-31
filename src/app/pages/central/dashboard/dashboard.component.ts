import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { RouterLink } from '@angular/router';
import { ListaAlunosComponent } from "../../alunos/lista-alunos/lista-alunos.component";
import { SideBarComponent } from "../side-bar/side-bar.component";
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { AlunoService } from '../../../services/aluno.service';
import { Aluno } from '../../../models/aluno.model';
import { CommonModule } from '@angular/common';
import { DataFormatadaPipe } from '../../../pipes/data-formatada.pipe';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ListaAlunosComponent,
    SideBarComponent,
    MessagesModule,
    TableModule,
    ButtonModule,
    HttpClientModule,
    DataFormatadaPipe
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  title = 'Dashboard'
  messages: Message[] = [];

  alunos: Aluno[] = [];

    first = 0;

    rows = 10;
  constructor (
    private authService: AuthService,
    private alunoService: AlunoService
  ) {}

  ngOnInit(): void {
    this.authService.usuarioAunteticado().subscribe(autenticado => {
      if (autenticado && this.authService.exibirMensagem()) {
        this.messages.push({ severity: 'success', summary: 'Bem-vindo', detail: 'Você está logado!', life: 3000});
      }
    });

    this.alunoService.getAluno().subscribe(alunos => (this.alunos = alunos));

    // setTimeout(function() {
    //   location.reload();
    //   }, 10000);
  }
  
  next() {
      this.first = this.first + this.rows;
  }

  prev() {
      this.first = this.first - this.rows;
  }

  reset() {
      this.first = 0;
  }

  pageChange(event: { first: number; rows: number; }) {
      this.first = event.first;
      this.rows = event.rows;
  }

  isLastPage(): boolean {
      return this.alunos ? this.first >= (this.alunos.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.alunos ? this.first === 0 : true;
  }
  
  logout() {
    this.authService.logout()
  }
}
