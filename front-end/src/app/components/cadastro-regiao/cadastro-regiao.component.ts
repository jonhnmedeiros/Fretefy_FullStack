import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RegiaoService } from '../../modules/regiao/regiao.service';
import { nomeUnicoValidator } from '../../modules/regiao/nome-unico.validator';

@Component({
  selector: 'app-cadastro-regiao',
  templateUrl: './cadastro-regiao.component.html',
})
export class CadastroRegiaoComponent implements OnInit {
  regiaoForm: FormGroup;
  editMode = false;
  regiaoId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private regiaoService: RegiaoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.regiaoForm = this.fb.group({
      nome: ['', [Validators.required, nomeUnicoValidator(this.regiaoService)]],
      cidades: this.fb.array([], [Validators.required]),
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

  adicionarCidade(): void {
    const cidadeGroup = this.fb.group({
      cidade: ['', [Validators.required]],
      uf: ['', [Validators.required]],
    });

    this.cidades.push(cidadeGroup);
  }

  removerCidade(index: number): void {
    this.cidades.removeAt(index);
  }

  salvar(): void {
    if (this.regiaoForm.invalid) {
      this.regiaoForm.markAllAsTouched();
      return;
    }

    const regiao = {
      id: this.regiaoId ?? new Date().getTime(),
      nome: this.regiaoForm.value.nome,
      cidades: this.regiaoForm.value.cidades,
      ativa: true,
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
        this.regiaoForm.patchValue({
          nome: regiao.nome,
        });
        regiao.cidades.forEach((cidade) =>
          this.cidades.push(this.fb.group(cidade))
        );
      }
    });
  }
}