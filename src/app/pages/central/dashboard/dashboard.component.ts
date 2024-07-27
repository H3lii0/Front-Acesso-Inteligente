import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ListaAlunosComponent } from "../../alunos/lista-alunos/lista-alunos.component";
import { SideBarComponent } from "../side-bar/side-bar.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    ListaAlunosComponent,
    SideBarComponent
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  title = 'Dashboard'
  constructor (
    private authService: AuthService
  ) {}

  logout() {
    this.authService.logout()
  }
}
