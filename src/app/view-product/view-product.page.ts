import { Component, OnInit } from '@angular/core';
import { Product } from '../models/products';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.page.html',
  styleUrls: ['./view-product.page.scss'],
})
export class ViewProductPage implements OnInit {
  public product: Product;

  constructor(
    private productService: ProductService,
    private activatedRouteService: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRouteService.queryParams.subscribe((params) => {
      console.log(params);
      this.product = this.productService.getProductName(params.name);
    });
  }
}
