import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunoHistoricoAcessoDetalhadoComponent } from './aluno-historico-acesso-detalhado.component';

describe('AlunoHistoricoAcessoDetalhadoComponent', () => {
  let component: AlunoHistoricoAcessoDetalhadoComponent;
  let fixture: ComponentFixture<AlunoHistoricoAcessoDetalhadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlunoHistoricoAcessoDetalhadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlunoHistoricoAcessoDetalhadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
