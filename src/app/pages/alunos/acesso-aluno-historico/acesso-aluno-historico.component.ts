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
export class AcessoAlunoHistoricoComponent implements OnInit{
  @ViewChild('dt1') dt1!: Table; // Referência à tabela no template.

  titulo = 'Historico de acesso';

  frequencias: Frequencia[] = [];
  page = 0;
  perPage = 10;
  totalRecords: number = 0;
  loading: boolean = true;
  searchValue: string | undefined;

    constructor (
          private alunoService: AlunoService,
    ) {}

    ngOnInit(): void {
    // this.loadFrequencias(this.page, this.perPage);
      
    // }

    // loadFrequencias(page: number = 1, perPage: number = 10): void {
    //   this.loading = true;
    //   this.alunoService.getAlunosAcessoFrequencia(this.page, this.perPage).subscribe({
    //     next: (response) => {
    //       this.frequencias = response.data;
    //       this.totalRecords = response.total;
    //       this.loading = false;
    //     },
    //     error: (error) => {
    //       console.error('Erro ao carregar frequências:', error);
    //       this.loading = false;
    //     }
    //   });

      this.carregarFrequencias();
    }

    carregarFrequencias() {
        this.loading = true;
        this.alunoService.getFrequencias(1, 10).subscribe((response) =>{
          this.frequencias = response.data;
          this.loading = false;
        },
        (error) => {
          console.error('Erro ao carregar as frequencias:', error);
          this.loading = false;
        }
      )
    }

    clear(table: Table) {
      table.clear();
      this.searchValue = '';
    }

    applyFilter(event: Event) {
      const inputElement = event.target as HTMLInputElement; // Fazemos o type assertion aqui.
      const value = inputElement.value || ''; // Pega o valor do input, ou uma string vazia se for undefined.
      this.dt1.filterGlobal(value, 'contains');
    }
  

    // next() {
    //   if (!this.isLastPage()) {
    //     this.page += 1;
    //     this.loadFrequencias(this.page, this.perPage);
    //   }
    // }
      
    // prev() {
    //   if (!this.isFirstPage()) {
    //     this.page -= 1;
    //     this.loadFrequencias(this.page, this.perPage)
    //   }
    //     this.loadFrequencias(this.page, this.perPage);
    // }
  
    // reset() {
    //     this.page = 1;
    //     this.loadFrequencias(this.page, this.perPage);
    // }
  
    // pageChange(event: any) {
    //     this.page = event.page ? event.page + 1 : 1;
    //     console.log(this.page);
    //     this.perPage = event.rows;
    //     this.loadFrequencias(this.page, this.perPage);
    // }
  
    // isLastPage(): boolean {
    //   return this.page === 1;
    // }
  
    // isFirstPage(): boolean {
    //   return this.page >= Math.ceil(this.totalRecords / this.perPage);
    // }
}
