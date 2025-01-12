import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RegiaoService } from '../regiao.service';
import { nomeUnicoValidator } from '../nome-unico.validator';

@Component({
  selector: 'app-cadastro-regiao',
  templateUrl: './cadastro-regiao.component.html',
})
export class CadastroRegiaoComponent implements OnInit {
  regiaoForm!: FormGroup;
  editMode = false;
  regiaoId: number | null = null;
  cidadeSelecionada = { id: '', cidade: '', uf: '' };

  constructor(
    private regiaoService: RegiaoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.regiaoForm = new FormGroup({
      nome: new FormControl('', [Validators.required, nomeUnicoValidator(this.regiaoService)]),
      cidades: new FormArray([], [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;
        this.regiaoId = +params['id'];
        this.carregarDadosRegiao(this.regiaoId);
      }
    });
  }

  get cidades(): FormArray {
    return this.regiaoForm.get('cidades') as FormArray;
  }

  get cidadeControl(): FormControl {
    return this.regiaoForm.get('cidades') as FormControl;
  }

  adicionarCidade(): void {
    const novaCidade = this.cidadeSelecionada;
    const cidadesJaAdicionadas = this.cidades.value.map((c: any) => c.cidade);

    if (!cidadesJaAdicionadas.includes(novaCidade.cidade)) {
      const cidadeGroup = new FormGroup({
        id: new FormControl(novaCidade.id),
        cidade: new FormControl(novaCidade.cidade, [Validators.required]),
        uf: new FormControl(novaCidade.uf, [Validators.required]),
      });
      this.cidades.push(cidadeGroup);
    } else {
      alert('Cidade já adicionada.');
    }
  }

  removerCidade(index: number): void {
    this.cidades.removeAt(index);
  }

  salvar(): void {
    if (this.regiaoForm.invalid) {
      this.regiaoForm.markAllAsTouched();
      return;
    }

    if (this.regiaoId === null) {
      this.regiaoService.listarRegioes().subscribe((regioes) => {
        this.regiaoId = regioes.length + 1;
      });
    }
    
    const regiao = {
      id: this.regiaoId!,
      nome: this.regiaoForm.get('nome')?.value || '',
      cidades: this.cidades.value,
      ativa: true // ou false, dependendo do estado da região
    };

    if (this.editMode) {
      this.regiaoService.editarRegiao(this.regiaoId!, regiao);
    } else {
      this.regiaoService.adicionarRegiao(regiao);
    }

    this.router.navigate(['/regioes']);
  }

  cancelar(): void {
    this.router.navigate(['/regioes']);
  }

  private carregarDadosRegiao(id: number): void {
    this.regiaoService.listarRegioes().subscribe((regioes) => {
      const regiao = regioes.find((r) => r.id === id);
      if (regiao) {
        console.log('Região:', regiao);
        this.regiaoForm.get('nome')?.setValue(regiao.nome);
        regiao.cidades.forEach((cidade) => {
          const cidadeGroup = new FormGroup({
            id: new FormControl(cidade.id),
            cidade: new FormControl(cidade.cidade, [Validators.required]),
            uf: new FormControl(cidade.uf, [Validators.required]),
          });
          this.cidades.push(cidadeGroup);
        }
        );
      }
    });
  }
  
  getFormControl(control: AbstractControl | null): FormControl {
    return control as FormControl;
  }
}