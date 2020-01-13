import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormOrgaoPage } from './form-orgao.page';

const routes: Routes = [
  {
    path: '',
    component: FormOrgaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormOrgaoPageRoutingModule {}
