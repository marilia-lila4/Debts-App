import { CardSearch } from './card/card-list/cardSearch';
import { environment } from './../environments/environment';
import { Observable } from 'rxjs';
import { Card } from './card/card';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  apiURL: string = environment.apiURLBase + '/api/cards';

  constructor(private httpClient: HttpClient) {}

  saveCard(card: Card): Observable<Card> {
    return this.httpClient.post<Card>(this.apiURL, card);
  }

  searchCard(name: string, month: number): Observable<CardSearch[]> {
    const httpParams = new HttpParams()
      .set('name', name)
      .set('month', month ? month.toString() : '');

    const url = this.apiURL + '?' + httpParams.toString();
    return this.httpClient.get<any>(url);
  }
  // Observable<any> - Any por que no back está retornando void
  updateCards(card: Card): Observable<any> {
    return this.httpClient.put<Card>(`${this.apiURL}/${card.id}`, card);
  }

  getCards(): Observable<Card[]> {
    return this.httpClient.get<Card[]>(this.apiURL);
  }

  getByIdCard(id: number): Observable<Card> {
    return this.httpClient.get<Card>(`${this.apiURL}/${id}`);
  }

  getByIdCardSearch(id: number): Observable<CardSearch> {
    return this.httpClient.get<CardSearch>(`${this.apiURL}/${id}`);
  }

  // Observable<any> - Any por que no back está retornando void
  deleteCard(card: Card): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiURL}/${card.id}`);
  }
}
