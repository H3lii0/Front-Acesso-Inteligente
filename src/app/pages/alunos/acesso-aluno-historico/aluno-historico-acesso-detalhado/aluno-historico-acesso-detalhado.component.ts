import { Component, ViewChild } from '@angular/core';
import { SideBarComponent } from '../../../central/side-bar/side-bar.component';
import { Frequencia } from '../../../../models/frequencia.model';
import { Table, TableModule } from 'primeng/table';
import { Aluno } from '../../../../models/aluno.model';
import { AlunoService } from '../../../../services/aluno.service';
import { PrimeNGConfig } from 'primeng/api';
import * as xlsx from 'xlsx';
import { saveAs } from 'file-saver';
import { FrequenciaService } from '../../../../services/frequencia.service';
import { DataFormatadaPipe } from '../../../../pipes/data-formatada.pipe';
import { SiglasCursoFormatadasPipe } from '../../../../pipes/siglas-curso-formatadas.pipe';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-aluno-historico-acesso-detalhado',
  standalone: true,
  imports: [
    SideBarComponent,
    DataFormatadaPipe,
    SiglasCursoFormatadasPipe,
    TableModule,
    ButtonModule,
    FormsModule,
    ButtonModule,
    InputTextModule
  ],
  templateUrl: './aluno-historico-acesso-detalhado.component.html',
  styleUrl: './aluno-historico-acesso-detalhado.component.css'
})
export class AlunoHistoricoAcessoDetalhadoComponent {
  @ViewChild('dt1') dt1!: Table; // Referência à tabela no template.
  frequencias: Frequencia[] = [];
  aluno: Aluno[] = [];
  page = 0;
  perPage = 10;
  totalRecords: number = 0;
  loading: boolean = true;
  searchValue: string | undefined;
  id: number | undefined;

  constructor(
    private alunoService: AlunoService,
    private primengConfig: PrimeNGConfig,
    private frequenciaService: FrequenciaService,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.id = params['id'];});
    this.carregarFrequenciaAluno();
    this.configureTranslations();
  }

  carregarFrequenciaAluno() {
    this.loading = true;
    this.frequenciaService.getFrequenciaAluno(this.id!).subscribe({
      next: (response) => {
        console.log('Frequências carregadas:', response.data);
        
        this.frequencias = response.data.map(frequencia => ({
          ...frequencia,
          data_acesso: frequencia.data_acesso
            ? new Date(frequencia.data_acesso)
            : null
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

  exportExcel() {
    const data = this.frequencias.map(f => ({
      Matricula: f.aluno.matricula,
      Nome: f.aluno.nome,
      Telefone: f.aluno.telefone,
      Turma: f.aluno.serie,
      Curso: f.aluno.curso,
      'Data de Acesso': f.data_acesso,
      'Hora de Acesso': f.hora_acesso,
      'Dia da Semana': f.dia_semana
    }));

    const worksheet = xlsx.utils.json_to_sheet(data);
    const workbook = { Sheets: { 'Dados': worksheet }, SheetNames: ['Dados'] };
    const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });

    saveAs(new Blob([excelBuffer], { type: 'application/octet-stream' }), 'relátorio de frequencia.xlsx');
  }
}
