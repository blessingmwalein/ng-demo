import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AuthState } from '@demo-app/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store<AuthState>
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.pipe(
      map((user) => {
        if (user) {
          return true;
        } else {
          this.router.navigate([`/auth/login`]);
          return false;
        }
      })
    );
  }
}
