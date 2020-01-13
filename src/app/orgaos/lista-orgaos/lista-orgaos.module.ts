import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaOrgaosPageRoutingModule } from './lista-orgaos-routing.module';

import { ListaOrgaosPage } from './lista-orgaos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaOrgaosPageRoutingModule
  ],
  declarations: [ListaOrgaosPage]
})
export class ListaOrgaosPageModule {}
