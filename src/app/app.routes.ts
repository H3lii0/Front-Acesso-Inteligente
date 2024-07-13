import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AcessoLiberadoComponent } from './pages/acesso-liberado/acesso-liberado.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'acesso-liberado', component: AcessoLiberadoComponent }
];
