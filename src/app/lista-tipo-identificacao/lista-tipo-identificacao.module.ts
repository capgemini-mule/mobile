import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaTipoIdentificacaoPageRoutingModule } from './lista-tipo-identificacao-routing.module';

import { ListaTipoIdentificacaoPage } from './lista-tipo-identificacao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaTipoIdentificacaoPageRoutingModule
  ],
  declarations: [ListaTipoIdentificacaoPage]
})
export class ListaTipoIdentificacaoPageModule {}
