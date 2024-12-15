import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcessoAlunoHistoricoComponent } from './acesso-aluno-historico.component';

describe('AcessoAlunoHistoricoComponent', () => {
  let component: AcessoAlunoHistoricoComponent;
  let fixture: ComponentFixture<AcessoAlunoHistoricoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcessoAlunoHistoricoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcessoAlunoHistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
