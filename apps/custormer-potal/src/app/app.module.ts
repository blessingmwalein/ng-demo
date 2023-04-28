import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { authRoutes, AuthModule, AuthGuard } from '@demo-app/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '../../../../libs/layout/src/lib/layout.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: 'products' },
      { path: 'auth', children: authRoutes },
      {
        path: 'products',
        loadChildren: () =>
          import('@demo-app/products').then((m) => m.ProductsModule),
        canActivate: [AuthGuard],
      },
    ]),
    AuthModule,
    LayoutModule,
    StoreModule.forRoot(
      {},
      {
        metaReducers: [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
