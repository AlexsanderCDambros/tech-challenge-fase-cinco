import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModoFocoService {
  private modoFocoAtivo: BehaviorSubject<boolean> = new BehaviorSubject(false);

  toggleModoFoco() {
    this.modoFocoAtivo.next(!this.modoFocoAtivo.value);
  }

  get modoFocoAtivo$() {
    return this.modoFocoAtivo.asObservable();
  }
}
