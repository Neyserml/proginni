import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { getConfiguracionState } from '../@store';
import * as configuracionAction from '../@store/configuracion.action';
import * as store from 'app/@compartidos/store';

@Injectable()
export class ConfiguracionResolve implements Resolve<any> {
  public configuracionState$: Subscription;

  constructor(private appState$: Store<store.State>) {}

  resolve(): Observable<any> {
    this.appState$.dispatch(new configuracionAction.LoadAction());

    return new Observable(observer => {
      this.configuracionState$ = this.appState$.select(getConfiguracionState).subscribe(state => {
        if ((state.data && state.loading === false) || state.failed) {
          observer.next(true);
          observer.complete();
          this.configuracionState$.unsubscribe();
        }
      });
    });
  }
}
