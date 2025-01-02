import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunoInformacoesDetalheComponent } from './aluno-informacoes-detalhe.component';

describe('AlunoInformacoesDetalheComponent', () => {
  let component: AlunoInformacoesDetalheComponent;
  let fixture: ComponentFixture<AlunoInformacoesDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlunoInformacoesDetalheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlunoInformacoesDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
