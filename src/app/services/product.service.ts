import { Injectable } from '@angular/core';
import { Product, ProductList } from '../models/products';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public products: Product[];

  constructor(private firestore: AngularFirestore) {
    this.products = ProductList;
  }

  public getProducts() {
    return this.firestore
      .collection('products')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data() as Product;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  public getCartProducts() {
    return this.firestore
      .collection('cart')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            let data = a.payload.doc.data() as Product;
            const id = a.payload.doc.id;
            data.id = id;
            return { id, ...data };
          });
        })
      );
  }

  public removeProductCart(id: string) {
    this.firestore.collection('cart').doc(id).delete();
  }

  public addToCart(product: Product) {
    this.firestore.collection('cart').add(product);
  }

  public removeProduct(id: string) {
    this.firestore.collection('products').doc(id).delete();
  }

  public getProductById(id: string) {
    let result = this.firestore.collection('products').doc(id).valueChanges();
    return result;
  }

  public addProduct(product: Product) {
    this.firestore.collection('products').add(product);
  }

  public updateProduct(product: Product, id: string) {
    this.firestore.doc('products/' + id).update(product);
  }
}
