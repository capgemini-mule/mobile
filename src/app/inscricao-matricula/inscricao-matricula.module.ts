import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InscricaoMatriculaPageRoutingModule } from './inscricao-matricula-routing.module';

import { InscricaoMatriculaPage } from './inscricao-matricula.page';

import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InscricaoMatriculaPageRoutingModule,
    IonicSelectableModule    
  ],
  declarations: [InscricaoMatriculaPage]
})
export class InscricaoMatriculaPageModule {}
