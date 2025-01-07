import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-seletor-cidade',
  templateUrl: './seletor-cidade.component.html',
})
export class SeletorCidadeComponent implements OnInit {
  @Input() formControl!: FormControl;
  @Output() cidadeSelecionada = new EventEmitter<{ cidade: string; uf: string }>();

  cidades = [
    { cidade: 'Curitiba', uf: 'PR' },
    { cidade: 'São Paulo', uf: 'SP' },
    { cidade: 'Rio de Janeiro', uf: 'RJ' },
  ];

  constructor() {}

  ngOnInit(): void {}

  onSelect(cidade: any): void {
    this.cidadeSelecionada.emit(cidade);
  }
}