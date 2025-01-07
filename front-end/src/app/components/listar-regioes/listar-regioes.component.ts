import { Component, OnInit } from '@angular/core';
import { RegiaoService } from '../../modules/regiao/regiao.service';
import { Observable } from 'rxjs';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-listar-regioes',
  templateUrl: './listar-regioes.component.html',
})
export class ListarRegioesComponent implements OnInit {
  regioes$: Observable<any[]>;

  constructor(private regiaoService: RegiaoService) {
    this.regioes$ = this.regiaoService.listarRegioes();
  }

  ngOnInit(): void {}

  ativarOuDesativar(id: number): void {
    this.regiaoService.ativarOuDesativarRegiao(id);
  }

  exportarParaExcel(): void {
    this.regiaoService.listarRegioes().subscribe((regioes) => {
      const worksheet = XLSX.utils.json_to_sheet(regioes);
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
}