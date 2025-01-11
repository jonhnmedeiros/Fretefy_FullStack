import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-seletor-cidade',
  templateUrl: './seletor-cidade.component.html',
})
export class SeletorCidadeComponent implements OnInit {
  @Input() formControl!: FormControl;
  @Output() cidadeSelecionada = new EventEmitter<{id:string; cidade: string; uf: string }>();

  cidades = [
    { id:'0', cidade: 'Selecione a cidade para adicionar', uf: '' },
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

  selectedCidadeId: string = '0'; // Default selected city ID

  ngOnInit(): void {
    console.log('Form control:', this.formControl);
    if (this.formControl) {
      this.formControl.valueChanges.subscribe((value) => {
        console.log('Form control value:', value);
        //this.selectedCidadeId = value.id;
        this.setSelectedCidade(this.selectedCidadeId);
      });
    }
    this.setSelectedCidade(this.selectedCidadeId);
  }

  setSelectedCidade(id: string) {
    const cidade = this.cidades.find((cidade) => cidade.id === id);
    if (cidade) {
      console.log('Cidade selecionada set:', cidade);
      this.selectedCidadeId = cidade.id;
    }
  }

  onSelect(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    console.log('Cidade selecionada:', value);
    const cidade = this.cidades.find((cidade) => cidade.id === value);
    console.log('Cidade:', cidade);
    if (cidade) {
      this.setSelectedCidade(cidade.id);
      this.cidadeSelecionada.emit(cidade);
    }
  }
}