import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewShoppingCartPage } from './view-shopping-cart.page';

const routes: Routes = [
  {
    path: '',
    component: ViewShoppingCartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewShoppingCartPageRoutingModule {}
