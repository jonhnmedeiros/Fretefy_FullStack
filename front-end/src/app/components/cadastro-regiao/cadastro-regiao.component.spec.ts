import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroRegiaoComponent } from './cadastro-regiao.component';

describe('CadastroRegiaoComponent', () => {
  let component: CadastroRegiaoComponent;
  let fixture: ComponentFixture<CadastroRegiaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroRegiaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroRegiaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
