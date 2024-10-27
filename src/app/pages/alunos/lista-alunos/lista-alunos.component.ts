import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SideBarComponent } from "../../central/side-bar/side-bar.component";
import { TableModule } from 'primeng/table';
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
    RippleModule
],
  templateUrl: './lista-alunos.component.html',
  styleUrl: './lista-alunos.component.css'
})
export class ListaAlunosComponent implements OnInit{
  title = 'Lista de Alunos'
  alunos: Aluno[] = [];
  page = 0;
  perPage = 10;
  totalRecords: number = 0;
  loading: boolean = true;
  visible: boolean = false;
  alunosFormEditar!: FormGroup;
  selectedAluno: Aluno | null = null; // Adicione isso na sua classe
  genderOptions = [
    { label: 'Masculino', value: 'masculino' },
    { label: 'Feminino', value: 'feminino'}
  ];
  serieOptions = [
    { name: '1 ANO A', code: '1 ANO A'},
    { name: '2 ANO A', code: '2 ANO A'},
    { name: '3 ANO A', code: '3 ANO A'},
    { name: '1 ANO B', code: '1 ANO B'},
    { name: '2 ANO B', code: '2 ANO B'},
    { name: '3 ANO B', code: '3 ANO B'},
  ];
  cursoOptions = [
    { name: 'SISTEMAS', code: 'TDS' },
    { name: 'LOGISTA', code: 'LOG' },
    { name: 'ADMINISTRAÇÃO', code: 'ADM' }
  ];
  pt: any;

  constructor(
    private alunoService: AlunoService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.carregarListaAlunos(this.page, this.perPage);

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
  }

  carregarListaAlunos(page: number = 1, perPage: number = 10): void {
    this.loading = true;
    this.alunoService.getListaAluno(this.page, this.perPage).subscribe({
      next:(response) => {
        console.log('Resposta da API:', response); // Log da resposta
        this.alunos = Array.isArray(response.data) ? response.data: [];
        this.totalRecords = response.total;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
      }
    })
  }

  next() {
    if (!this.isLastPage()) {
      this.page += 1;
      this.carregarListaAlunos(this.page, this.perPage);
    }
  }

  prev() {
    if (!this.isFirstPage()) {
      this.page -= 1;
      this.carregarListaAlunos(this.page, this.perPage);
    }
      this.carregarListaAlunos(this.page, this.perPage);
  }

  reset() {
    this.page = 1;
    this.carregarListaAlunos(this.page, this.perPage);
  }

  pageChange(event: any) {
    this.page = event.page ? event.page + 1 : 1;
    console.log(this.page);
    this.perPage = event.rows;
    this.carregarListaAlunos(this.page, this.perPage);
  }

  isLastPage(): boolean {
    return this.page === 1;
  }

  isFirstPage(): boolean {
    return this.page >= Math.ceil(this.totalRecords / this.perPage);
  }

  modalAlunoEditar(aluno: Aluno) {
    this.selectedAluno = { ...aluno }; // Clonar o objeto para evitar referências diretas
    this.alunosFormEditar.patchValue({
      matricula: aluno.matricula,
      nome: aluno.nome,
      email: aluno.email,
      telefone: aluno.telefone,
      curso: aluno.curso,
      serie: aluno.serie,
      sexo: aluno.sexo,
      data_nascimento: aluno.data_nascimento,
      senha: '' 
    });
    this.visible = true; // Abra o diálogo
}


salvarEdicao() {
    // Lógica para salvar as alterações do aluno
    this.visible = false; // Fechar o diálogo após salvar
  }

}
