import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcessoLiberadoComponent } from './acesso-liberado.component';

describe('AcessoLiberadoComponent', () => {
  let component: AcessoLiberadoComponent;
  let fixture: ComponentFixture<AcessoLiberadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcessoLiberadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcessoLiberadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
