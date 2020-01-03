import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InscricaoMatriculaPage } from './inscricao-matricula.page';

const routes: Routes = [
  {
    path: '',
    component: InscricaoMatriculaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InscricaoMatriculaPageRoutingModule {}
