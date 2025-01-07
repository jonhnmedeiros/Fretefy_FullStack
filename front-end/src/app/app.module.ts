import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './modules/home/home.module';
import { ToolbarModule } from './components/toolbar/toolbar.module';
import { RouterModule } from '@angular/router';
import { CadastroRegiaoComponent } from './components/cadastro-regiao/cadastro-regiao.component';
import { ListarRegioesComponent } from './components/listar-regioes/listar-regioes.component';
import { SeletorCidadeComponent } from './components/seletor-cidade/seletor-cidade.component';


@NgModule({
  declarations: [
    AppComponent,
    CadastroRegiaoComponent,
    ListarRegioesComponent,
    SeletorCidadeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    ReactiveFormsModule,
    HomeModule,
    ToolbarModule,

    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
