import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/products';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.page.html',
  styleUrls: ['./edit-product.page.scss'],
})
export class EditProductPage implements OnInit {
  public product: Product;
  public id: string;
  public updatedProduct: Product;
  public myForm: FormGroup;
  public validationMessages: Object;

  constructor(
    private productService: ProductService,
    private activatedRouteService: ActivatedRoute,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private router: Router
  ) {
    this.product = {
      name: '',
      price: 0,
      image: '',
    };
  }

  ngOnInit() {
    this.activatedRouteService.queryParams.subscribe((params) => {
      this.id = params.id;
      this.productService.getProductById(params.id).subscribe((item) => {
        this.product = item as Product;
        console.log(this.product.name);
      });
    });

    this.myForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      price: [0, Validators.compose([Validators.required])],
      image: ['', Validators.compose([Validators.required])],
    });
  }

  updateProduct() {
    if (this.myForm.valid) {
      this.product = {
        name: this.myForm.get('name').value,
        price: this.myForm.get('price').value,
        image: this.myForm.get('image').value,
      };
      this.productService.updateProduct(this.product, this.id);
      console.log(this.product);

      this.back();
    } else {
      this.presentAlert('All values are required');
    }
  }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      header: msg,
      buttons: ['OK'],
    });

    await alert.present();
  }

  back(): void {
    this.router.navigate(['..']);
  }
}
