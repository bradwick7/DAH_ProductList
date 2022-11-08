import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Product } from '../models/products';
import { ProductService } from '../services/product.service';

ProductService;

@Component({
  selector: 'app-view-shopping-cart',
  templateUrl: './view-shopping-cart.page.html',
  styleUrls: ['./view-shopping-cart.page.scss'],
})
export class ViewShoppingCartPage implements OnInit {
  public cartProducts: Product[];
  public total: number;

  constructor(
    private alertController: AlertController,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartProducts = this.productService.getCartProducts();
    this.total = this.productService.getTotal();
  }

  public getProductName(name: String) {
    this.router.navigate(['/view-product'], {
      queryParams: { name: name },
    });
  }

  public async removeProduct(pos: number, prod: Product) {
    const alert = await this.alertController.create({
      header: 'Are you sure?',
      subHeader: 'Do you wish to remove this item?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Yes',
          role: 'confirm',
          handler: () => {
            this.cartProducts = this.productService.removeProductCart(
              pos,
              prod
            );
            this.total = this.productService.getTotal();
          },
        },
      ],
    });
    await alert.present();
  }
}
