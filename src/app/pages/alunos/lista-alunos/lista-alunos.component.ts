import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SideBarComponent } from "../../central/side-bar/side-bar.component";

@Component({
  selector: 'app-lista-alunos',
  standalone: true,
  imports: [
    CommonModule,
    SideBarComponent
],
  templateUrl: './lista-alunos.component.html',
  styleUrl: './lista-alunos.component.css'
})
export class ListaAlunosComponent {
  title = 'Lista de Alunos'
}
