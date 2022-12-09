import { Component, OnInit } from '@angular/core';
import { Product } from '../models/products';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.page.html',
  styleUrls: ['./view-product.page.scss'],
})
export class ViewProductPage implements OnInit {
  public product: Product;
  public id: string;

  constructor(
    private productService: ProductService,
    private activatedRouteService: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.product = {
      name: '',
      price: 0,
      image: '',
    };

    this.activatedRouteService.queryParams.subscribe((params) => {
      this.id = params.id;
      this.productService.getProductById(params.id).subscribe((item) => {
        this.product = item as Product;
      });
    });
  }
}
