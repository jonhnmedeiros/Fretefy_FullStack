import { RouterModule, Routes } from '@angular/router';
//import { RegiaoComponent } from './regiao.component';
import { ListarRegioesComponent } from 'src/app/components/listar-regioes/listar-regioes.component';
import { CadastroRegiaoComponent } from 'src/app/components/cadastro-regiao/cadastro-regiao.component';

const routes: Routes = [
  // { 
  //   path: '',
  //   component: RegiaoComponent
  // },
  { path: '', redirectTo: 'regioes', pathMatch: 'full' },
  { path: 'regioes', component: ListarRegioesComponent },
  { path: 'regioes/cadastro', component: CadastroRegiaoComponent },
  { path: 'regioes/editar/:id', component: CadastroRegiaoComponent }
];

export const  RegiaoRoutingModule = RouterModule.forChild(routes);