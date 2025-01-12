import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-seletor-cidade',
  templateUrl: './seletor-cidade.component.html',
})
export class SeletorCidadeComponent implements OnInit {
  @Input() control!: FormControl;
  @Input() label = true;
  @Output() cidadeSelecionada = new EventEmitter<{id:string; cidade: string; uf: string }>();

  cidades = [
    { id:'0', cidade: 'Cidade', uf: '' },
    { id:'1', cidade: 'Curitiba', uf: 'PR' },
    { id:'2', cidade: 'São Paulo', uf: 'SP' },
    { id:'3', cidade: 'Rio de Janeiro', uf: 'RJ' },
    { id:'4', cidade: 'Belo Horizonte', uf: 'MG' },
    { id:'5', cidade: 'Brasília', uf: 'DF' },
    { id:'6', cidade: 'Goiânia', uf: 'GO' },
    { id:'7', cidade: 'Manaus', uf: 'AM' },
    { id:'8', cidade: 'Salvador', uf: 'BA' },
    { id:'9', cidade: 'Recife', uf: 'PE' },
    { id:'10', cidade: 'Fortaleza' , uf: 'CE' },
    { id:'11', cidade: 'Cuiabá', uf: 'MT' },
    { id:'12', cidade: 'Porto Alegre', uf: 'RS' },
    { id:'13', cidade: 'Florianópolis', uf: 'SC' },
    { id:'14', cidade: 'Porto Velho', uf: 'RO' },
    { id:'15', cidade: 'Belém', uf: 'PA' },
    { id:'16', cidade: 'Porto Alegre', uf: 'RS' },
  ];

  constructor() {}

  ngOnInit(): void {
    if (!this.control) {
      this.control = new FormControl('0');
    }
  }

  onSelect(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    const cidade = this.cidades.find((cidade) => cidade.id === value);
    if (cidade) {
      this.cidadeSelecionada.emit(cidade);
    }
  }
}