import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fashion } from './models/fashion';

@Injectable({
  providedIn: 'root'
})
export class FashionService {
  private apiUrl = 'http://localhost:4000/api/fashions';
  private stylesUrl = 'http://localhost:4000/api/styles';

  constructor(private http: HttpClient) { }

  getFashions(): Observable<Fashion[]> {
    return this.http.get<Fashion[]>(this.apiUrl);
  }

  getFashion(id: string): Observable<Fashion> {
    return this.http.get<Fashion>(`${this.apiUrl}/${id}`);
  }

  getFashionsByStyle(style: string): Observable<Fashion[]> {
    return this.http.get<Fashion[]>(`${this.apiUrl}/style/${style}`);
  }

  getStyles(): Observable<string[]> {
    return this.http.get<string[]>(this.stylesUrl);
  }
}
