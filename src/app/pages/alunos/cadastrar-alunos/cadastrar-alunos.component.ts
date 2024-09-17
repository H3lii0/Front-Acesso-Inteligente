import { Component, OnInit } from '@angular/core';
import { SideBarComponent } from '../../central/side-bar/side-bar.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { TabViewModule } from 'primeng/tabview';
import { AlunoService } from '../../../services/aluno.service';

@Component({
  selector: 'app-cadastrar-alunos',
  standalone: true,
  imports: [
    SideBarComponent,
    InputTextModule,
    ReactiveFormsModule,
    FormsModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    InputMaskModule,
    InputNumberModule,
    TabViewModule
  ],
  templateUrl: './cadastrar-alunos.component.html',
  styleUrl: './cadastrar-alunos.component.css'
})
export class CadastrarAlunosComponent implements OnInit{
  title = 'Cadastrar Alunos'
  cadastroForm!: FormGroup;
  stateOptions: any[] = [
      { label: 'Masculino', value: 'M' },
      { label: 'Feminino', value: 'F' }
    ];
  cities: undefined;

  constructor(
    private fb: FormBuilder,
    private alunoService: AlunoService
  ) { }
 
  ngOnInit(): void {
    this.cadastroForm = this.fb.group({
      nome: ['', Validators.required],
      matricula: ['', Validators.required],
      data_nascimento: ['', Validators.required],
      sexo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      senha: ['', Validators.required],
      curso: [''],
      serie: [''],
    });    
  }

  cadastrar() {
    if (this.cadastroForm.valid) {
      console.log(this.cadastroForm.value);
      this.alunoService.cadastrarAluno(this.cadastroForm.value).subscribe(result => {
        console.log(this.cadastroForm.value);
      })
    } else {
      console.log('Formulário inválido');
    }
  }
}
