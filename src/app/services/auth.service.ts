import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly EXPIRATION_KEY = 'auth_expiration';

  constructor() { }

  login(username: string, password: string): boolean {
    if (username === 'gruas' && password === '123') {
      const expirationDate = new Date();
      expirationDate.setMinutes(expirationDate.getMinutes() + 30);
      if (this.isLocalStorageAvailable()) {
        localStorage.setItem(this.TOKEN_KEY, 'mock_token');
        localStorage.setItem(this.EXPIRATION_KEY, expirationDate.toString());
      }
      return true;
    }
    return false;
  }

  logout(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.EXPIRATION_KEY);
    }
  }

  isLoggedIn(): boolean {
    if (this.isLocalStorageAvailable()) {
      const token = localStorage.getItem(this.TOKEN_KEY);
      const expiration = localStorage.getItem(this.EXPIRATION_KEY);
      if (token && expiration) {
        const expirationDate = new Date(expiration);
        if (new Date() < expirationDate) {
          return true;
        } else {
          this.logout();
        }
      }
    }
    return false;
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const test = 'test';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
}
