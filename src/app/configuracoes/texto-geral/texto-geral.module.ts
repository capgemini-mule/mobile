import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TextoGeralPageRoutingModule } from './texto-geral-routing.module';

import { TextoGeralPage } from './texto-geral.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TextoGeralPageRoutingModule
  ],
  declarations: [TextoGeralPage]
})
export class TextoGeralPageModule {}
