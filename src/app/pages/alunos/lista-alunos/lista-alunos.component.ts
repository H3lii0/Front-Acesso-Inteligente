import { CommonModule, formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SideBarComponent } from "../../central/side-bar/side-bar.component";
import { TableModule, Table } from 'primeng/table';
import { Aluno } from '../../../models/aluno.model';
import { AlunoService } from '../../../services/aluno.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { InputMaskModule } from 'primeng/inputmask';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { ConfirmationService, MessageService, PrimeNGConfig, MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { SiglasCursoFormatadasPipe } from '../../../pipes/siglas-curso-formatadas.pipe';
import { PanelMenuModule } from 'primeng/panelmenu';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-lista-alunos',
  standalone: true,
  imports: [
    CommonModule,
    SideBarComponent,
    TableModule,
    ConfirmDialogModule,
    DialogModule,
    InputTextModule,
    ReactiveFormsModule,
    FormsModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    FloatLabelModule,
    InputNumberModule,
    PasswordModule,
    DividerModule,
    InputMaskModule,
    ToastModule,
    RippleModule,
    ButtonModule,
    SiglasCursoFormatadasPipe,
    PanelMenuModule,
    OverlayPanelModule,
    MenuModule
  ],
  templateUrl: './lista-alunos.component.html',
  styleUrl: './lista-alunos.component.css',
  providers: [MessageService, ConfirmationService]
})
export class ListaAlunosComponent implements OnInit {
  @ViewChild('dt1') dt1!: Table;

  title = 'Lista de Alunos'
  alunos: Aluno[] = [];
  loading: boolean = true;
  visible: boolean = false;
  alunosFormEditar!: FormGroup;
  private isConfirmingDelete = false;
  selectedAluno: Aluno | null = null;
  searchValue: string | undefined;
  genderOptions = [
    { label: 'Masculino', value: 'masculino' },
    { label: 'Feminino', value: 'feminino' }
  ];
  serieOptions = [
    { name: '1 ANO A', code: '1 ANO A' },
    { name: '2 ANO A', code: '2 ANO A' },
    { name: '3 ANO A', code: '3 ANO A' },
    { name: '1 ANO B', code: '1 ANO B' },
    { name: '2 ANO B', code: '2 ANO B' },
    { name: '3 ANO B', code: '3 ANO B' },
  ];
  cursoOptions = [
    { name: 'SISTEMAS', code: 'TDS' },
    { name: 'LOGISTA', code: 'LOG' },
    { name: 'ADMINISTRAÇÃO', code: 'ADM' }
  ];
  pt: any;
  items: MenuItem[] = [];
  constructor(
    private alunoService: AlunoService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig
  ) { }

  ngOnInit(): void {
    this.carregarListaAlunos();
    this.configureTranslations();

    this.alunosFormEditar = this.fb.group({
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

    this.pt = {
      firstDayOfWeek: 0,
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
      dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
      monthNames: [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
      ],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      today: 'Hoje',
      clear: 'Limpar'
    };
  }

  getMenuItems(aluno: any): MenuItem[] {
    return [
      {
        label: 'Editar',
        icon: 'pi pi-user-edit',
        command: () => this.modalAlunoEditar(aluno)
      },
      {
        label: 'Excluir',
        icon: 'pi pi-trash',
        command: () => this.confirmDelete(aluno.id)
      }
    ];
  }

  confirmDelete(id: number) {
    if (this.isConfirmingDelete) return;
    this.isConfirmingDelete = true;

    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja excluir este registro?',
      header: 'Confirmação de Exclusão',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",
      accept: () => {
        this.apagarRegistro(id);
        this.isConfirmingDelete = false;
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelado', detail: 'A exclusão foi cancelada' });
        this.isConfirmingDelete = false;
      }
    });
  }

  carregarListaAlunos() {
    this.loading = true;
    this.alunoService.getListaAluno(1, 10).subscribe(
      (response) => {
        this.alunos = response.data
        this.loading = false;
      },
      (error) => {
        console.error('Erro ao carregar as frequências:', error);
        this.loading = false;
      }
    );
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

  modalAlunoEditar(aluno: Aluno) {
    this.selectedAluno = { ...aluno };
    const cursoSelecionado = this.cursoOptions.find(curso => curso.code === aluno.curso);
    const serieSelecionada = this.serieOptions.find(serie => serie.code === aluno.serie);

    this.alunosFormEditar.patchValue({
      matricula: aluno.matricula,
      nome: aluno.nome,
      email: aluno.email,
      telefone: aluno.telefone,
      curso: cursoSelecionado,
      serie: serieSelecionada,
      sexo: aluno.sexo,
      data_nascimento: new Date(aluno.data_nascimento),
      senha: aluno.senha
    });
    this.visible = true;
  }



  salvarEdicao() {
    if (this.alunosFormEditar.valid) {
      const formData = this.alunosFormEditar.value;

      if (formData.data_nascimento) {
        formData.data_nascimento = formatDate(formData.data_nascimento, 'yyyy-MM-dd', 'en-US');
      }

      const alunoAtualizado: Partial<Aluno> = {
        matricula: formData.matricula,
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
        curso: formData.curso.code,
        serie: formData.serie.code,
        sexo: formData.sexo,
        data_nascimento: formData.data_nascimento,
        senha: formData.senha,
      };

      this.alunoService.atualizarAluno(this.selectedAluno!.id, alunoAtualizado).subscribe({
        next: () => {
          this.visible = false;
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Registro do aluno(a) atualizado com sucesso' });
          this.carregarListaAlunos();
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possível atualizar o registro' });
        }
      });
    }
  }

  apagarRegistro(id: number) {
    this.alunoService.apagarRegistroAluno(id).subscribe({
      next: () => {
        this.alunos = this.alunos.filter(aluno => aluno.id !== id);
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Registro excluído com sucesso' });
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possível excluir o registro' });
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

}
