import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map, mergeMap } from 'rxjs';
import * as ProductsFeature from './products.reducer';
import { ProductsService } from '../services/products/products.service';
import { Product } from '@demo-app/data-models';
import * as ProductActions from './../+state/products.actions';
@Injectable()
export class ProductsEffects {
  private actions$ = inject(Actions);
  constructor(private productService:ProductsService){

  }

  init$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.ProductsActionTypes.LoadProducts),
    mergeMap(() =>
      this.productService.getProducts().pipe(
        map(
          (products: Product[]) =>
            ProductActions.loadProductsSuccess({ payload: products })
        ),
        catchError((error) => of(ProductActions.loadProductsFailure({ error })))
      )
    )
  ));
}
