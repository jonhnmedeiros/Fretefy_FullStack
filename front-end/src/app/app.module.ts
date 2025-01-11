import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroRegiaoComponent } from './regiao/cadastro-regiao/cadastro-regiao.component';
import { ListarRegioesComponent } from './regiao/listar-regioes/listar-regioes.component';
import { SeletorCidadeComponent } from './regiao/seletor-cidade/seletor-cidade.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CadastroRegiaoComponent,
    ListarRegioesComponent,
    SeletorCidadeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
