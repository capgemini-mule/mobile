import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }])
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {

  input_search : any;

  constructor(){

    

  }

  setFilteredItems(value){

    console.log("value", value)

  }

  ngOnInit() {
    this.input_search = "sasahusha"
    console.log("this.input_search", this.input_search)
  }


}