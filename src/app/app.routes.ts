import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AcessoLiberadoComponent } from './pages/acesso-liberado/acesso-liberado.component';
import { LoginComponent } from './pages/login/login/login.component';
import { DashboardComponent } from './pages/central/dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'acesso-liberado', component: AcessoLiberadoComponent },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent }
];
