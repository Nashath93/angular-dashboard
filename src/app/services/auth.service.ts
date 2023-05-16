import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { users } from './users';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  setRole(role: string): void {
    localStorage.setItem('role', role);
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  removeRole(): void {
    localStorage.removeItem('role');
  }

  login({ userName, password }: any): Observable<any> {
    const user = users.find(
      (u) => u.userName === userName && u.password === password
    );
    if (user !== null) {
      this.setToken('abc345jkl876');
      this.setRole(<string>user?.role);
      return of(user);
      // return of({
      //   name: 'Mohamed Nashath',
      //   email: 'mohamed.nashath1993@gmail.com',
      // });
    }
    const err = new Error('Login failed');
    return throwError(() => err);
  }
}
