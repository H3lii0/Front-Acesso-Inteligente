import { Component, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { SideBarComponent } from '../../../central/side-bar/side-bar.component';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { AlunoService } from '../../../../services/aluno.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Aluno } from '../../../../models/aluno.model';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ActivatedRoute } from '@angular/router';
import { SiglasCursoFormatadasPipe } from '../../../../pipes/siglas-curso-formatadas.pipe';
import { DataFormatadaPipe } from '../../../../pipes/data-formatada.pipe';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Table, TableModule } from 'primeng/table';
import { Frequencia } from '../../../../models/frequencia.model';
import { FrequenciaService } from '../../../../services/frequencia.service';
import { InputTextModule } from 'primeng/inputtext';
registerLocaleData(localePt);

@Component({
  selector: 'app-aluno-informacoes-detalhe',
  standalone: true,
  imports: [
    CommonModule,
    SideBarComponent,
    MenuModule,
    PanelMenuModule,
    DialogModule,
    FormsModule,
    ButtonModule,
    DividerModule,
    DropdownModule,
    SelectButtonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    DataFormatadaPipe,
    InputTextModule
  ],
  templateUrl: './aluno-informacoes-detalhe.component.html',
  styleUrl: './aluno-informacoes-detalhe.component.css',
  providers: [
    MessageService,
    ConfirmationService,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class AlunoInformacoesDetalheComponent implements OnInit {
  @ViewChild('dt1') dt1!: Table;

  alunos!: Aluno;
  frequencias: Frequencia[] = [];
  informacoesAluno!: FormGroup;
  id?: number | undefined;
  loading: boolean = true;
  searchValue: string | undefined;

  constructor(
    private alunoService: AlunoService,
    private frequenciaService: FrequenciaService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private primengConfig: PrimeNGConfig

  ) { }

  ngOnInit(): void {
    this.informacoesAluno = this.fb.group({
      matricula: ['', Validators.required],
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: [''],
      curso: [''],
      serie: [''],
      sexo: [''],
      data_nascimento: [''],
      senha: ['', Validators.required]
    });

    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id !== undefined) {
        this.alunoService.getAlunoId(this.id).subscribe((aluno: Aluno) => {
          const cursoFormatado = new SiglasCursoFormatadasPipe();
          const dataFormatada = new DataFormatadaPipe();

          const informacoesAlunoFormatada = {
            ...aluno,
            curso: cursoFormatado.transform(aluno.curso),
            data_nascimento: dataFormatada.transform(aluno.data_nascimento)
          }

          this.informacoesAluno.patchValue(informacoesAlunoFormatada);
        });
        this.informacoesAluno.disable();
      }
    });
    this.carregarFrequenciaAluno();
  }

  carregarFrequenciaAluno() {
    this.loading = true;
    this.frequenciaService.getFrequenciaAluno(this.id!).subscribe({
      next: (response) => {
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
}
