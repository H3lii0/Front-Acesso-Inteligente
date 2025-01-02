import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AcessoLiberadoComponent } from './pages/acesso-liberado/acesso-liberado.component';
import { LoginComponent } from './pages/login/login/login.component';
import { DashboardComponent } from './pages/central/dashboard/dashboard.component';
import { ListaAlunosComponent } from './pages/alunos/lista-alunos/lista-alunos.component';
import { CadastrarAlunosComponent } from './pages/alunos/cadastrar-alunos/cadastrar-alunos.component';
import { RecuperarSenhaComponent } from './pages/login/recuperar-senha/recuperar-senha.component';
import { AcessoAlunoHistoricoComponent } from './pages/alunos/acesso-aluno-historico/acesso-aluno-historico.component';
import { AlunoInformacoesDetalheComponent } from './pages/alunos/lista-alunos/aluno-informacoes-detalhe/aluno-informacoes-detalhe.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'acesso-liberado', component: AcessoLiberadoComponent },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'lista-alunos', component: ListaAlunosComponent },
    { path: 'informacoes-aluno-detalhe/:id', component: AlunoInformacoesDetalheComponent },
    { path: 'cadastrar-alunos', component: CadastrarAlunosComponent },
    { path: 'acesso-historico-aluno', component: AcessoAlunoHistoricoComponent },
    { path: 'recuperar-senha', component: RecuperarSenhaComponent }
];
