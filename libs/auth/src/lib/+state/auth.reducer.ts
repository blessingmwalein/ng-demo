import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import { AuthEntity } from './auth.models';
import { User } from '@demo-app/data-models';

export const AUTH_FEATURE_KEY = 'auth';

export interface State extends EntityState<AuthEntity> {
  selectedId?: string | number; // which Auth record has been selected
  loaded: boolean; // has the Auth list been loaded
  error?: string | null; // last known error (if any)
}

export interface AuthData {
  loading: boolean;
  user: User;
  error: Error
}

export interface AuthState {
  readonly auth: AuthData;
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: AuthState;
}

export const authAdapter: EntityAdapter<AuthEntity> =
  createEntityAdapter<AuthEntity>();

  export const initialState: State = authAdapter.getInitialState({
    action: AuthActions,
    loaded: false,
  });

const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({ ...state, loading: true })),
  on(AuthActions.loginSuccess, (state) => ({
    ...state,
    user: AuthActions.loginSuccess,
    loading: false,
  })),
  on(AuthActions.loginFailure, (state) => ({
    ...state,
    user: null,
    loading: false,
  }))
);


export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
