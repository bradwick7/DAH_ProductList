import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewShoppingCartPageRoutingModule } from './view-shopping-cart-routing.module';

import { ViewShoppingCartPage } from './view-shopping-cart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewShoppingCartPageRoutingModule
  ],
  declarations: [ViewShoppingCartPage]
})
export class ViewShoppingCartPageModule {}
