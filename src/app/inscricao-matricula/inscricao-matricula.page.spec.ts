import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InscricaoMatriculaPage } from './inscricao-matricula.page';

describe('InscricaoMatriculaPage', () => {
  let component: InscricaoMatriculaPage;
  let fixture: ComponentFixture<InscricaoMatriculaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InscricaoMatriculaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InscricaoMatriculaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
