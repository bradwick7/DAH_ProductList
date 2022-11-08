import { Component } from '@angular/core';
import { Product } from '../models/products';
import { ProductService } from '../services/product.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public products: Product[];
  public newProduct: Product;

  constructor(
    private productService: ProductService,
    private alertController: AlertController,
    private router: Router
  ) {
    this.products = this.productService.getProducts();
  }

  public async addProductCart(prod: Product) {
    this.productService.addToCart(prod);

    const alert = await this.alertController.create({
      subHeader: prod.name + ' added to cart!',
      buttons: ['OK'],
    });

    await alert.present();
  }

  public getProductName(name: String) {
    this.router.navigate(['/view-product'], {
      queryParams: { name: name },
    });
  }

  public viewShoppingCart() {
    this.router.navigate(['/view-shopping-cart'], {
      queryParams: { name: name },
    });
  }

  public async addNewProduct() {
    const alert = await this.alertController.create({
      header: "Enter the product's information",
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Name',
        },
        {
          name: 'price',
          type: 'number',
          placeholder: 'Price',
        },
        {
          name: 'image',
          type: 'text',
          placeholder: 'Image URL',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Accept',
          handler: async (data) => {
            if (data.name === '' || data.price === '' || data.image === '') {
              const alert = await this.alertController.create({
                header: 'Warning',
                subHeader: "Enter the product's data correctly",
                buttons: [
                  {
                    text: 'Accept',
                    role: 'confirm',
                    handler: () => {
                      this.addNewProduct();
                    },
                  },
                ],
              });
              await alert.present();
            } else {
              this.newProduct = {
                name: data.name,
                price: parseFloat(data.price),
                image: data.image,
              };
              this.productService.addProduct(this.newProduct);
            }
          },
        },
      ],
    });
    await alert.present();
  }
}
