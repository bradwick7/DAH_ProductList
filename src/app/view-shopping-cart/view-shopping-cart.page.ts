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
  public products: Product[];
  public total: number = 0;

  constructor(
    private alertController: AlertController,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.productService.getCartProducts().subscribe((res) => {
      this.products = res;
      console.log(this.products);

      this.getTotal();
    });
  }

  public getTotal() {
    this.products.forEach((element) => {
      this.total += element.price;
    });
  }

  public viewProduct(id: string) {
    this.router.navigate(['/view-product'], {
      queryParams: { id: id },
    });
  }

  public async removeProduct(id: string) {
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
            this.total = 0;
            this.productService.removeProductCart(id);
          },
        },
      ],
    });
    await alert.present();
  }
}
