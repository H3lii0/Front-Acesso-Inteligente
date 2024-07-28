import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { RouterLink } from '@angular/router';
import { ListaAlunosComponent } from "../../alunos/lista-alunos/lista-alunos.component";
import { SideBarComponent } from "../side-bar/side-bar.component";
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    ListaAlunosComponent,
    SideBarComponent,
    MessagesModule
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  title = 'Dashboard'
  messages: Message[] = [];

  constructor (
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.usuarioAunteticado().subscribe(autenticado => {
      if (autenticado && this.authService.exibirMensagem()) {
        this.messages.push({ severity: 'success', summary: 'Bem-vindo', detail: 'Você está logado!', life: 3000});
      }
    });

    // setTimeout(function() {
    //   location.reload();
    //   }, 10000);
  }
  
  logout() {
    this.authService.logout()
  }
}
