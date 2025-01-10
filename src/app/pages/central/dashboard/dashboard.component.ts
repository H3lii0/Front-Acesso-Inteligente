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
import { ChartModule } from 'primeng/chart';
import { FrequenciaService } from '../../../services/frequencia.service';

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
    DataFormatadaPipe,
    ChartModule
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
  data: any;
  options: any;
  startDate: string = '';
  endDate: string = '';

  constructor (
    private authService: AuthService,
    private alunoService: AlunoService,
    private frequenciaService: FrequenciaService,
  ) {}

  ngOnInit(): void {
    this.denifirSemanaAtual();
    this.configuraGrafico();
    
    this.authService.usuarioAunteticado().subscribe(autenticado => {
      if (autenticado && this.authService.exibirMensagem()) {
        this.messages.push({ severity: 'success', summary: 'Bem-vindo', detail: 'Você está logado!', life: 3000});
      }
    });

    this.carregarFrequencias();
    this.carregarDadosGrafico();
  }

  denifirSemanaAtual() {
    const today = new Date();
    const starOfweek = new Date(today.setDate(today.getDate() - today.getDay()));
    const endOfWeek = new Date(starOfweek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);

    this.startDate = starOfweek.toISOString().split('T')[0];
    this.endDate = endOfWeek.toISOString().split('T')[0];
  }

  alterarSemana(offset: number): void {
    const startDate = new Date(this.startDate);
    const endDate = new Date(this.endDate);

    startDate.setDate(startDate.getDate() + offset * 7);
    endDate.setDate(endDate.getDate() + offset * 7);

    this.startDate = startDate.toISOString().split('T')[0];
    this.endDate = endDate.toISOString().split('T')[0];

    this.carregarDadosGrafico();
  }
  configuraGrafico() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    
    this.options = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }

        }
    };
  }
  
  carregarDadosGrafico() {
    this.frequenciaService.getAcessosPorPeriodo(this.startDate, this.endDate).subscribe({
      next: (response) => {
        this.data = {
          labels: response.data.map((item: any) => {
            const date = new Date(item.data); 
            const ajustedDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
            return ajustedDate.toLocaleDateString('pt-BR', { weekday: 'short', month: 'short', day: 'numeric' });

          } 
        ),
          datasets: [
            {
              label: 'Total de acessos',
              backgroundColor: '#42A5F5',
              borderColor: '#1E88E5',
              data: response.data.map((item: any) => item.total_acessos),
            }
          ]
        }
      },
      error: (error) => 
        console.error('Erro ao carregar os dados do gráfico:', error),
    });
  }

  carregarFrequencias() {
    this.loading = true;
    this.alunoService.getAlunoFrequencia(1, 10).subscribe({
      next: (response) => {
        this.frequencias = response.data.map(frequencia => ({
          ...frequencia,
          data_acesso: frequencia.data_acesso ? new Date(frequencia.data_acesso) : null
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
