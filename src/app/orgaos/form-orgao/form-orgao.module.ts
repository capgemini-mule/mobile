import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormOrgaoPageRoutingModule } from './form-orgao-routing.module';

import { FormOrgaoPage } from './form-orgao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormOrgaoPageRoutingModule
  ],
  declarations: [FormOrgaoPage]
})
export class FormOrgaoPageModule {}
