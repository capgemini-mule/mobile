import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListaTipoIdentificacaoPage } from './lista-tipo-identificacao.page';

describe('ListaTipoIdentificacaoPage', () => {
  let component: ListaTipoIdentificacaoPage;
  let fixture: ComponentFixture<ListaTipoIdentificacaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaTipoIdentificacaoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaTipoIdentificacaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
