import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface Regiao {
  id: number;
  nome: string;
  cidades: { cidade: string; uf: string }[];
  ativa: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class RegiaoService {
  private regioes: Regiao[] = [];
  private regioesSubject = new BehaviorSubject<Regiao[]>(this.regioes);

  listarRegioes(): Observable<Regiao[]> {
    return this.regioesSubject.asObservable();
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

  verificarNomeUnico(nome: string): boolean {
    return this.regioes.some((r) => r.nome.toLowerCase() === nome.toLowerCase());
  }
}