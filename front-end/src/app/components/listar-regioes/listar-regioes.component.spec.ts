import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarRegioesComponent } from './listar-regioes.component';

describe('ListarRegioesComponent', () => {
  let component: ListarRegioesComponent;
  let fixture: ComponentFixture<ListarRegioesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarRegioesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarRegioesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
