import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaTipoIdentificacaoPage } from './lista-tipo-identificacao.page';

const routes: Routes = [
  {
    path: '',
    component: ListaTipoIdentificacaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaTipoIdentificacaoPageRoutingModule {}
