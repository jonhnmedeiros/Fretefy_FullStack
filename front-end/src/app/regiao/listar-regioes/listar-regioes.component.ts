import { Component, OnInit } from '@angular/core';
import { RegiaoService } from '../regiao.service';
import { Observable } from 'rxjs';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

interface Cidade { 
  id: string;
  cidade: string;
  uf: string;
}

@Component({
  selector: 'app-listar-regioes',
  templateUrl: './listar-regioes.component.html',
})
export class ListarRegioesComponent implements OnInit {
  regioes$: Observable<any[]>;

  constructor(private regiaoService: RegiaoService) {
    this.regioes$ = this.regiaoService.listarRegioes();

  }

  ngOnInit(): void {
    this.regioes$ = this.regiaoService.listarRegioes();
  }

  ativarOuDesativar(id: number): void {
    this.regiaoService.ativarOuDesativarRegiao(id);
  }

  exportarParaExcel(): void {
    let regioesFormatadas;
    this.regiaoService.listarRegioes().subscribe((regioes) => {
      regioesFormatadas = regioes.map((regiao: any) => {
          return {
            'Nome': regiao.nome,
            'Ativo': regiao.ativa ? 'Sim' : 'Não',
            'Cidades': regiao.cidades.map((cidade: any) => cidade.cidade).join(', '),
          };
      });
      const worksheet = XLSX.utils.json_to_sheet(regioesFormatadas);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Regiões');
  
      const excelBuffer: any = XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
  
      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      saveAs(blob, 'regioes.xlsx');
    });
  }

  public obterCidadePorId(id: string): Cidade | undefined {

    return this.regiaoService.obterCidadePorId(id);

  }
}