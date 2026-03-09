import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  // Ex 60 APIs
  createCookie(): Observable<any> {
    return this.http.get(`${this.apiUrl}/create-cookie`, { withCredentials: true, responseType: 'text' });
  }

  readCookie(): Observable<any> {
    return this.http.get(`${this.apiUrl}/read-cookie`, { withCredentials: true, responseType: 'text' });
  }

  clearCookie(): Observable<any> {
    return this.http.get(`${this.apiUrl}/clear-cookie`, { withCredentials: true, responseType: 'text' });
  }

  // Ex 61 APIs
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials, { withCredentials: true });
  }

  getLoginCookie(): Observable<any> {
    return this.http.get(`${this.apiUrl}/login-cookie`, { withCredentials: true });
  }
}
