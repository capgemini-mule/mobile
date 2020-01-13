import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaOrgaosPage } from './lista-orgaos.page';

const routes: Routes = [
  {
    path: '',
    component: ListaOrgaosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaOrgaosPageRoutingModule {}
