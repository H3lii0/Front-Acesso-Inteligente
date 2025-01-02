import { Component, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { SideBarComponent } from '../../../central/side-bar/side-bar.component';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ConfirmationService, MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { AlunoService } from '../../../../services/aluno.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Aluno } from '../../../../models/aluno.model';
import { CommonModule, DatePipe, formatDate } from '@angular/common';
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

registerLocaleData(localePt); // Registra o local pt-BR

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
    ReactiveFormsModule

  ],
  templateUrl: './aluno-informacoes-detalhe.component.html',
  styleUrl: './aluno-informacoes-detalhe.component.css',
  providers: [
    MessageService, 
    ConfirmationService,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class AlunoInformacoesDetalheComponent implements OnInit{
alunos!: Aluno;
informacoesAluno!: FormGroup;
id?: number;
students: Aluno[] = [];
   constructor(
     private alunoService: AlunoService,
     private fb: FormBuilder,
    private route: ActivatedRoute
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
   }
}
