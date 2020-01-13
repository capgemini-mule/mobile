import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormOrgaoPage } from './form-orgao.page';

describe('FormOrgaoPage', () => {
  let component: FormOrgaoPage;
  let fixture: ComponentFixture<FormOrgaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormOrgaoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormOrgaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
