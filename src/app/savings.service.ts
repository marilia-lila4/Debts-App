import { Photo } from './home/photo';
import { Saving } from './savings/savings';
import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SavingsService {
  apiURL: string = environment.apiURLBase + '/api/savings';

  constructor(private httpClient: HttpClient) {}

  saveSaving(saving: Saving): Observable<Saving> {
    return this.httpClient.post<Saving>(this.apiURL, saving);
  }

  // Observable<any> - Any por que no back está retornando void
  updateSaving(saving: Saving): Observable<any> {
    return this.httpClient.put<Saving>(`${this.apiURL}/${saving.id}`, saving);
  }

  getSaving(): Observable<Saving[]> {
    return this.httpClient.get<Saving[]>(this.apiURL);
  }

  getByIdSaving(id: number): Observable<Saving> {
    return this.httpClient.get<Saving>(`${this.apiURL}/${id}`);
  }

  // Observable<any> - Any por que no back está retornando void
  deleteSaving(saving: Saving): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiURL}/${saving.id}`);
  }
}
