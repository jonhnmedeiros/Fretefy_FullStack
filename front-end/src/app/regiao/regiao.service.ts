import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface Regiao {
  id: number;
  nome: string;
  cidades: {id:string; cidade: string; uf: string }[];
  ativa: boolean;
}
interface Cidade { 
  id: string;
  cidade: string;
  uf: string;
}

@Injectable({
  providedIn: 'root',
})
export class RegiaoService {
  private regioes: Regiao[] = [
    {
      id: 1,
      nome: 'Sul',
      cidades: [
        {id:'1', cidade: 'Curitiba', uf: 'PR' },
        {id:'13', cidade: 'Florianópolis', uf: 'SC' },
        {id:'12', cidade: 'Porto Alegre', uf: 'RS' },
      ],
      ativa: true,
    },
    {
      id: 2,
      nome: 'Sudeste',
      cidades: [
        {id:'2', cidade: 'São Paulo', uf: 'SP' },
        {id:'3', cidade: 'Rio de Janeiro', uf: 'RJ' },
        {id:'4', cidade: 'Belo Horizonte', uf: 'MG' },
      ],
      ativa: true,
    },
    {
      id: 3,
      nome: 'Centro-Oeste',
      cidades: [
        {id:'5', cidade: 'Brasília', uf: 'DF' },
        {id:'6', cidade: 'Goiânia', uf: 'GO' },
        {id:'11', cidade: 'Cuiabá', uf: 'MT' },
      ],
      ativa: true,
    },
    {
      id: 4,
      nome: 'Nordeste',
      cidades: [
        {id:'8', cidade: 'Salvador', uf: 'BA' },
        {id:'9', cidade: 'Recife', uf: 'PE' },
        {id:'10', cidade: 'Fortaleza', uf: 'CE' },
      ],
      ativa: true,
    },
    {
      id: 5,
      nome: 'Norte',
      cidades: [
        {id:'7', cidade: 'Manaus', uf: 'AM' },
        {id:'15', cidade: 'Belém', uf: 'PA' },
        {id:'14', cidade: 'Porto Velho', uf: 'RO' },
      ],
      ativa: true,
    },
  ];
  private regioesSubject = new BehaviorSubject<Regiao[]>(this.regioes);

  private cidades: Cidade[] = [
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
  private cidadesSubject = new BehaviorSubject<Cidade[]>(this.cidades);

  verificarNomeUnico(nome: string): boolean {
    return this.regioes.some((r) => r.nome === nome);
  }

  listarRegioes(): Observable<Regiao[]> {
    return this.regioesSubject.asObservable();
  }

  listarRegioesXlsx(): Observable<Regiao[]> {
    return this.regioesSubject.asObservable();
  }

  listarCidades(): Observable<Cidade[]> {
    return this.cidadesSubject.asObservable();
  }

  obterCidadePorId(id: string): Cidade | undefined {
    return this.cidades.find((c) => c.id === id);
  }

  adicionarRegiao(regiao: Regiao): void {
    this.regioes.push(regiao);
    this.regioesSubject.next(this.regioes);
  }

  editarRegiao(id: number, regiaoAtualizada: Regiao): void {
    const index = this.regioes.findIndex((r) => r.id === id);
    if (index !== -1) {
      this.regioes[index] = regiaoAtualizada;
      this.regioesSubject.next(this.regioes);
    }
  }

  ativarOuDesativarRegiao(id: number): void {
    const regiao = this.regioes.find((r) => r.id === id);
    if (regiao) {
      regiao.ativa = !regiao.ativa;
      this.regioesSubject.next(this.regioes);
    }
  }
}