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
  page = 0;
  perPage = 10;
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
    // this.loadFrequencias(this.page, this.perPage);
    // this.loadTotalAcessos();
    setInterval(() => this.loadTotalAcessos(), 10000);
  }

  loadTotalAcessos(): void {
    this.AcessoService.getTotalAcessos().subscribe(data => {
      this.totalAcessos = data.total;
    });
  }
  
  // loadFrequencias(page: number = 1, perPage: number = 10): void {
  //   this.loading = true;
  //   this.alunoService.getAlunoFrequencia(this.page, this.perPage).subscribe({
  //     next: (response) => {
  //       this.frequencias = response.data;
  //       this.totalRecords = response.total;
  //       this.loading = false;
  //     },
  //     error: (error) => {
  //       console.error('Erro ao carregar frequências:', error);
  //       this.loading = false;
  //     }
  //   });
  // }
  
  // next() {
  //   if (!this.isLastPage()) {
  //     this.page += 1;
  //     this.loadFrequencias(this.page, this.perPage);
  //   }
  // }
    
  // prev() {
  //   if (!this.isFirstPage()) {
  //     this.page -= 1;
  //     this.loadFrequencias(this.page, this.perPage)
  //   }
  //     this.loadFrequencias(this.page, this.perPage);
  // }

  // reset() {
  //     this.page = 1;
  //     this.loadFrequencias(this.page, this.perPage);
  // }

  // pageChange(event: any) {
  //     this.page = event.page ? event.page + 1 : 1;
  //     console.log(this.page);
  //     this.perPage = event.rows;
  //     this.loadFrequencias(this.page, this.perPage);
  // }

  // isLastPage(): boolean {
  //   return this.page === 1;
  // }

  // isFirstPage(): boolean {
  //   return this.page >= Math.ceil(this.totalRecords / this.perPage);
  // }
  
  logout() {
    this.authService.logout()
  }
}
