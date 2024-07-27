import { Component } from '@angular/core';
import { SideBarComponent } from '../../central/side-bar/side-bar.component';

@Component({
  selector: 'app-cadastrar-alunos',
  standalone: true,
  imports: [
    SideBarComponent
  ],
  templateUrl: './cadastrar-alunos.component.html',
  styleUrl: './cadastrar-alunos.component.css'
})
export class CadastrarAlunosComponent {
  title = 'Cadastrar Alunos'
}
