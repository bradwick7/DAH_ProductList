import { Injectable } from '@angular/core';
import { Product, ProductList } from '../models/products';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public products: Product[];
  public cartProducts: Product[];
  public total: number;

  constructor() {
    this.products = ProductList;
    this.cartProducts = [];
    this.total = 0;
  }

  public getProducts(): Product[] {
    return this.products;
  }

  public getTotal(): number {
    return this.total;
  }

  public getCartProducts(): Product[] {
    return this.cartProducts;
  }

  public addToCart(product: Product) {
    this.cartProducts.push(product);
    this.total += product.price;
  }

  public removeProduct(index: number): Product[] {
    this.products.splice(index, 1);
    return this.products;
  }

  public removeProductCart(index: number, prod: Product): Product[] {
    this.total = this.total - prod.price;
    this.cartProducts.splice(index, 1);
    return this.cartProducts;
  }

  public getProductName(name: string): Product {
    let item: Product;
    item = this.products.find((item) => {
      return item.name === name;
    });
    return item;
  }

  public addProduct(product: Product) {
    this.products.push(product);
  }
}
