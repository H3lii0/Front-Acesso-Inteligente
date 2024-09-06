import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SideBarComponent } from "../../central/side-bar/side-bar.component";
import { TableModule } from 'primeng/table';
import { Frequencia } from '../../../models/frequencia.model';
import { FrequenciaService } from '../../../services/frequencia.service';

@Component({
  selector: 'app-lista-alunos',
  standalone: true,
  imports: [
    CommonModule,
    SideBarComponent,
    TableModule
],
  templateUrl: './lista-alunos.component.html',
  styleUrl: './lista-alunos.component.css'
})
export class ListaAlunosComponent implements OnInit{
  title = 'Lista de Alunos'
  frequencias: Frequencia[] = [];

  constructor(private frequenciaService:FrequenciaService) {}

  ngOnInit(): void {
    this.frequenciaService.getFrequencia().subscribe(data => {
      this.frequencias = data;
    })
  }
}
