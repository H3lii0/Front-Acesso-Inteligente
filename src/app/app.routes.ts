import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AcessoLiberadoComponent } from './pages/acesso-liberado/acesso-liberado.component';
import { LoginComponent } from './pages/login/login/login.component';
import { DashboardComponent } from './pages/central/dashboard/dashboard.component';
import { ListaAlunosComponent } from './pages/alunos/lista-alunos/lista-alunos.component';
import { CadastrarAlunosComponent } from './pages/alunos/cadastrar-alunos/cadastrar-alunos.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'acesso-liberado', component: AcessoLiberadoComponent },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'lista-alunos', component: ListaAlunosComponent },
    { path: 'cadastrar-alunos', component: CadastrarAlunosComponent }
];
