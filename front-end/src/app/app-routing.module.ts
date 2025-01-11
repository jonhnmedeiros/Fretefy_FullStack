import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarRegioesComponent } from './regiao/listar-regioes/listar-regioes.component';
import { CadastroRegiaoComponent } from './regiao/cadastro-regiao/cadastro-regiao.component';

const routes: Routes = [
  { path: '', redirectTo: 'regioes', pathMatch: 'full' },
  { path: 'regioes', component: ListarRegioesComponent },
  { path: 'regioes/cadastro', component: CadastroRegiaoComponent },
  { path: 'regioes/editar/:id', component: CadastroRegiaoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}