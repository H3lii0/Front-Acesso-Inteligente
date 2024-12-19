import { Component, OnInit, ViewChild } from '@angular/core';
import { SideBarComponent } from "../../central/side-bar/side-bar.component";
import { ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ProgressBarModule } from 'primeng/progressbar';
import { SliderModule } from 'primeng/slider';
import { Frequencia } from '../../../models/frequencia.model';
import { AlunoService } from '../../../services/aluno.service';
import { DataFormatadaPipe } from "../../../pipes/data-formatada.pipe";
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SiglasCursoFormatadasPipe } from "../../../pipes/siglas-curso-formatadas.pipe";
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-acesso-aluno-historico',
  standalone: true,
  imports: [
    SideBarComponent,
    TableModule,
    ButtonModule,
    CommonModule,
    ProgressSpinnerModule,
    ProgressBarModule,
    SliderModule,
    DataFormatadaPipe,
    OverlayPanelModule,
    SiglasCursoFormatadasPipe,
    FormsModule,
    InputTextModule
  ],
  templateUrl: './acesso-aluno-historico.component.html',
  styleUrl: './acesso-aluno-historico.component.css'
})
export class AcessoAlunoHistoricoComponent implements OnInit {
  @ViewChild('dt1') dt1!: Table; // Referência à tabela no template.

  titulo = 'Historico de acesso';

  frequencias: Frequencia[] = [];
  page = 0;
  perPage = 10;
  totalRecords: number = 0;
  loading: boolean = true;
  searchValue: string | undefined;

  constructor(
    private alunoService: AlunoService,
    private primengConfig: PrimeNGConfig
  ) { }

  ngOnInit(): void {
    this.carregarFrequencias();
    this.configureTranslations();
  }

  carregarFrequencias() {
    this.loading = true;
    this.alunoService.getFrequencias(1, 10).subscribe({
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
  
  configureTranslations() {
    this.primengConfig.setTranslation({
      startsWith: 'Começa com',
      contains: 'Contém',
      notContains: 'Não contém',
      endsWith: 'Termina com',
      equals: 'Igual a',
      notEquals: 'Diferente de',
      noFilter: 'Sem filtro',
      lt: 'Menor que',
      lte: 'Menor ou igual a',
      gt: 'Maior que',
      gte: 'Maior ou igual a',
      dateIs: 'Data é',
      dateIsNot: 'Data não é',
      dateBefore: 'Data antes',
      dateAfter: 'Data depois',
      clear: 'Limpar',
      apply: 'Aplicar',
      matchAll: 'Corresponder a todos',
      matchAny: 'Corresponder a qualquer',
      addRule: 'Adicionar Regra',
      removeRule: 'Remover Regra',
      accept: 'Sim',
      reject: 'Não',
      choose: 'Escolher',
      upload: 'Enviar',
      cancel: 'Cancelar'
    });
  }

  clear(table: Table) {
    table.clear();
    this.searchValue = '';
  }

  applyFilter(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value || ''; 
    this.dt1.filterGlobal(value, 'contains');
  }
}
