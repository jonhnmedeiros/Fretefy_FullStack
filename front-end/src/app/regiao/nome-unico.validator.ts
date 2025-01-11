import { AbstractControl, ValidationErrors } from '@angular/forms';
import { RegiaoService } from './regiao.service';

export function nomeUnicoValidator(regiaoService: RegiaoService) {
  return (control: AbstractControl): ValidationErrors | null => {
    if (regiaoService.verificarNomeUnico(control.value)) {
      return { nomeUnico: true };
    }
    return null;
  };
}