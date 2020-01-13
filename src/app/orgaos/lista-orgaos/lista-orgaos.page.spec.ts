import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListaOrgaosPage } from './lista-orgaos.page';

describe('ListaOrgaosPage', () => {
  let component: ListaOrgaosPage;
  let fixture: ComponentFixture<ListaOrgaosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaOrgaosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaOrgaosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
