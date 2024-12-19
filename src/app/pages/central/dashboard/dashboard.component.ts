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
import { Frequencia } from '../../../models/frequencia.model';
import { AcessoService } from '../../../services/acesso.service';

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
  frequencias: Frequencia[] = [];
  totalRecords: number = 0;
  loading: boolean = true;
  totalAcessos: number = 0;

  constructor (
    private authService: AuthService,
    private alunoService: AlunoService,
    private AcessoService: AcessoService
  ) {}

  ngOnInit(): void {
    this.authService.usuarioAunteticado().subscribe(autenticado => {
      if (autenticado && this.authService.exibirMensagem()) {
        this.messages.push({ severity: 'success', summary: 'Bem-vindo', detail: 'Você está logado!', life: 3000});
      }
    });

    setInterval(() => this.loadTotalAcessos(), 10000);
    this.carregarFrequencias();
  }

  loadTotalAcessos(): void {
    this.AcessoService.getTotalAcessos().subscribe(data => {
      this.totalAcessos = data.total;
    });
  }
  
  carregarFrequencias() {
    this.loading = true;
    this.alunoService.getAlunoFrequencia(1, 10).subscribe({
      next: (response) => {
        this.frequencias = response.data.map(frequencia => ({
          ...frequencia,
          data_acesso: new Date(frequencia.data_acesso)
        }));
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar as frequências:', error);
        this.loading = false;
      }
    });
  }

  logout() {
    this.authService.logout()
  }
}
