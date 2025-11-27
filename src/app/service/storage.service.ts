// src/app/services/storage.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  // Guarda un item en localStorage
  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Obtiene un item de localStorage
  getItem(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  // Elimina un item de localStorage
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Limpia todo el localStorage
  clear(): void {
    localStorage.clear();
  }
}
