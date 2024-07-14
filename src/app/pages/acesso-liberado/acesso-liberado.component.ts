import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Aluno } from '../../models/aluno.model';
import { AlunoService } from '../../services/aluno.service';
import { CommonModule, DatePipe } from '@angular/common';
import { ImageModule } from 'primeng/image';
import { Message, MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { DataFormatadaPipe } from '../../pipes/data-formatada.pipe';

@Component({
  selector: 'app-acesso-liberado',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    ImageModule,
    MessagesModule,
    DatePipe,
    DataFormatadaPipe
  ],
  templateUrl: './acesso-liberado.component.html',
  styleUrl: './acesso-liberado.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AcessoLiberadoComponent implements OnInit{
  alunos: Aluno[] = [];
  aluno: any;
  id?: number;
  messages: Message[] = [];

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private alunoService: AlunoService
  ) {}

  ngOnInit(): void {
    this.messages = [
      {severity: 'success', detail:'Sucesso!'}
    ]
    // this.limparMesssagem();
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : null

    if (id != null) {
      this.alunoService.getAlunoId(id).subscribe(response =>{
        this.aluno = response
      })
    }
    
    setTimeout (() => {
        this.router.navigate(['/'])
      }, 6000) 
    }
}
