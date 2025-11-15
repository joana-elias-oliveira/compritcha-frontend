import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Purchase } from '../interfaces/purchase';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private apiUrl = `${environment.apiBaseUrl}/api/purchases`;

  constructor(private http: HttpClient) {}

  getAll(status?: string): Observable<Purchase[]> {
    let params = new HttpParams();
    if (status) {
      params = params.set('status', status);
    }
    return this.http.get<Purchase[]>(this.apiUrl, { params });
  }

  getById(id: number): Observable<Purchase> {
    return this.http.get<Purchase>(`${this.apiUrl}/${id}`);
  }

  create(purchase: Purchase): Observable<Purchase> {
    return this.http.post<Purchase>(this.apiUrl, purchase);
  }

  update(id: number, purchase: Purchase): Observable<Purchase> {
    return this.http.put<Purchase>(`${this.apiUrl}/${id}`, purchase);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateStatus(id: number, status: 'PENDING' | 'COMPLETED' | 'REJECTED'): Observable<Purchase> {
    return this.http.patch<Purchase>(`${this.apiUrl}/${id}/status?status=${status}`, {});
  }

}
