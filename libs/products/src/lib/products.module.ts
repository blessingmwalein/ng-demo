import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { productsRoutes } from './lib.routes';
import { ProductsComponent } from './containers/products/products.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromProducts from './+state/products.reducer';
import { ProductsEffects } from './+state/products.effects';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(productsRoutes),
    StoreModule.forFeature(
      fromProducts.PRODUCTS_FEATURE_KEY,
      fromProducts.productsReducer
    ),
    EffectsModule.forFeature([ProductsEffects]),
  ],
  declarations: [ProductsComponent],
})
export class ProductsModule {}
