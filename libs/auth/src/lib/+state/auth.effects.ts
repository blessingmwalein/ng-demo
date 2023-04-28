import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map, tap } from 'rxjs';
import * as AuthActions from './auth.actions';
import * as AuthFeature from './auth.reducer';
import { AuthActionTypes } from './auth.actions';
import { AuthService } from '@demo-app/auth';
import { fetch } from '@nrwl/angular';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.Login),
      fetch({
        run: (action) => {
          return this.authService.login(action) as any;
        },
        onError: (action, error) => {
          return AuthActions.loginFailure(error);
        },
      })
    )
  );

  navigateToProfile$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActionTypes.LoginSuccess),
        map((action: AuthActionTypes.LoginSuccess) => action),
        tap(() => this.router.navigate([`/products`]))
      ),
    { dispatch: false }
  );

  constructor(private authService: AuthService, private router: Router) {}
}
