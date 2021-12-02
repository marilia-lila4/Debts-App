import { environment } from './../environments/environment';
import { Debt } from './debts/debt';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DebtsService {
  apiURL: string = environment.apiURLBase + '/api/debts';

  constructor(private httpClient: HttpClient) {}

  saveDebt(debt: Debt): Observable<Debt> {
    return this.httpClient.post<Debt>(this.apiURL, debt);
  }

  // Observable<any> - Any por que no back está retornando void
  updateDebt(debt: Debt): Observable<any> {
    return this.httpClient.put<Debt>(`${this.apiURL}/${debt.id}`, debt);
  }

  getDebts(): Observable<Debt[]> {
    return this.httpClient.get<Debt[]>(this.apiURL);
  }

  getByIdDebt(id: number): Observable<Debt> {
    return this.httpClient.get<Debt>(`${this.apiURL}/${id}`);
  }

  // Observable<any> - Any por que no back está retornando void
  deleteDebt(debt: Debt): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiURL}/${debt.id}`);
  }
}
