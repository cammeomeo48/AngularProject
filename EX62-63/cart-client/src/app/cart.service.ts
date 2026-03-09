import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:4004';

  constructor(private http: HttpClient) { }

  // Ex 62
  getContact(): Observable<string> {
    return this.http.get(`${this.apiUrl}/contact`, { responseType: 'text' });
  }

  // Ex 63
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products`);
  }

  getCart(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cart`);
  }

  addToCart(productId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/cart`, { productId });
  }

  updateCartQuantity(productId: string, quantity: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/cart/${productId}`, { quantity });
  }

  removeFromCart(productId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cart/${productId}`);
  }
}
