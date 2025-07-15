import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Item } from '../models/item.model';
import { v4 as uuid } from 'uuid';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ItemService {
  private readonly apiUrl = 'http://localhost:3000/api';
  public readonly imageBaseUrl = 'http://localhost:3000';
  private items: Item[] = [];

  constructor(private http: HttpClient) {}

  getItems(page: number = 1, limit: number = 10): Observable<Item[]> {
    return this.http.get<{ items: Item[] }>(`${this.apiUrl}/items?page=${page}&limit=${limit}`)
      .pipe(
        map(response => {
          this.items = response.items;
          return response.items;
        })
      );
  }

  getItem(id: string): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}/items/${id}`);
  }

  createItem(data: { name: string; description: string }): Observable<Item> {
    return this.http.post<Item>(`${this.apiUrl}/items`, data);
  }

  uploadImage(itemId: string, file: File): Observable<Item> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post<Item>(`${this.apiUrl}/items/${itemId}/images`, formData);
  }

  markPrimaryImage(itemId: string, imageId: string): Observable<Item> {
    return this.http.put<Item>(`${this.apiUrl}/items/${itemId}/images/${imageId}/primary`, {});
  }
}
