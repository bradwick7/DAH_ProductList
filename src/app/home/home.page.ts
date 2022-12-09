import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../models/products';
import { ProductService } from '../services/product.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public products: Product[];
  public newProduct: Product;
  public product: Product;
  public id: string;

  constructor(
    private productService: ProductService,
    private alertController: AlertController,
    private router: Router
  ) {
    this.productService.getProducts().subscribe((res) => {
      this.products = res;
      console.log(this.products);
    });
  }

  ngOnInit(): void {
    this.product = {
      name: '',
      price: 0,
      image: '',
    };
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
            this.productService.removeProduct(id);
          },
        },
      ],
    });
    await alert.present();
  }

  public async addProductCart(prod: Product) {
    this.productService.addToCart(prod);
    const alert = await this.alertController.create({
      subHeader: prod.name + ' added to cart!',
      buttons: ['OK'],
    });
    await alert.present();
  }

  public updateProduct(id: String) {
    this.router.navigate(['/edit-product'], {
      queryParams: { id: id },
    });
  }

  public viewShoppingCart() {
    this.router.navigate(['/view-shopping-cart'], {});
  }

  public viewProduct(id: string) {
    this.router.navigate(['/view-product'], {
      queryParams: { id: id },
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
