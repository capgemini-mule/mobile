import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TextoGeralPage } from './texto-geral.page';

describe('TextoGeralPage', () => {
  let component: TextoGeralPage;
  let fixture: ComponentFixture<TextoGeralPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextoGeralPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TextoGeralPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
