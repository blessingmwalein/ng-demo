import { Component } from '@angular/core';
import { Product } from '@demo-app/data-models';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadProducts } from '../../+state/products.actions';
import { ProductsState } from '../../+state/products.reducer';
import { productsQuery } from '../../+state/products.selectors';

@Component({
  selector: 'demo-app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  products$: Observable<Product[]> | undefined;

  constructor(private store: Store<ProductsState>) {}

  ngOnInit() {
    this.store.dispatch(loadProducts());
    this.products$ = this.store.pipe(select(productsQuery.getProducts));
  }
}
