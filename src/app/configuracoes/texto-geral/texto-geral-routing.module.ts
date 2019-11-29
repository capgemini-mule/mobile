import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TextoGeralPage } from './texto-geral.page';

const routes: Routes = [
  {
    path: '',
    component: TextoGeralPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TextoGeralPageRoutingModule {}
