import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompartirService {
  private usuarioSubject = new BehaviorSubject<any>(null);
  usuario$ = this.usuarioSubject.asObservable();

  setUsuario(usuario: any) {
    this.usuarioSubject.next(usuario);
  }

  getUsuario() {
    return this.usuarioSubject.value;
  }
}
