import { Component, OnInit } from '@angular/core';
import { SideBarComponent } from '../../central/side-bar/side-bar.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlunoService } from '../../../services/aluno.service';
import { CommonModule, formatDate } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { Router } from '@angular/router';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'app-cadastrar-alunos',
  standalone: true,
  imports: [
    SideBarComponent,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    InputTextModule,
    FloatLabelModule,
    InputNumberModule,
    PasswordModule,
    DividerModule,
    InputMaskModule
  ],
  templateUrl: './cadastrar-alunos.component.html',
  styleUrl: './cadastrar-alunos.component.css'
})
export class CadastrarAlunosComponent implements OnInit{
  title = 'Cadastrar Alunos'
  alunosFormCadastro!: FormGroup;
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

  constructor (
    private fb: FormBuilder,
    private alunoService: AlunoService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.alunosFormCadastro = this.fb.group({
      nome: ['', Validators.required],
      matricula: ['', Validators.required],
      data_nascimento: ['', Validators.required],
      sexo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      senha: ['', Validators.required],
      curso: ['', Validators.required],
      serie: ['', Validators.required],
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

  cadastrar() {
    if (this.alunosFormCadastro.valid) {
      const formData = this.alunosFormCadastro.value;

      if (formData.data_nascimento) {
        formData.data_nascimento = formatDate(formData.data_nascimento, 'dd/MM/yyyy', 'en-US');
      }

      console.log('Dados do formulário formatados:', formData);

      this.alunoService.cadastrarAluno(formData).subscribe(
        result => {
          setTimeout(() => {
            this.route.navigate(['/dashboard']);
          }, 2000);
          alert('Aluno(a) cadastrado com sucesso!')
        },
        error => {
          console.error('Erro ao cadastrar:', error.error.errors);
        }
      );
    } else {
      console.log('Formulário inválido');
      Object.keys(this.alunosFormCadastro.controls).forEach(field => {
        const control = this.alunosFormCadastro.get(field);
        control?.markAsDirty;
      });
    }
  }

}
