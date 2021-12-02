import { Photo } from './home/photo';
import { Saving } from './savings/savings';
import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PhotosService {
  apiURL: string = environment.apiURLBase + '/api/photos';

  constructor(private httpClient: HttpClient) {}

  savePhoto(photo: Photo): Observable<Saving> {
    return this.httpClient.post<Saving>(this.apiURL, photo);
  }

  // Observable<any> - Any por que no back está retornando void
  uploadPhoto(photo: Photo, formData: FormData): Observable<any> {
    return this.httpClient.put(`${this.apiURL}/${photo.id}/photos`, formData, {
      responseType: 'blob',
    }); // responseType: 'blob'- está invertendo o JSON para um array de bytes
  }

  getPhoto(): Observable<Photo[]> {
    return this.httpClient.get<Photo[]>(this.apiURL);
  }

  getByIdPhoto(id: number): Observable<Photo> {
    return this.httpClient.get<Photo>(`${this.apiURL}/${id}`);
  }

  listPhoto(): Observable<Photo> {
    return this.httpClient.get<any>(`${this.apiURL}`);
  }

  // Observable<any> - Any por que no back está retornando void
  deletePhoto(photo: Photo): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiURL}/${photo.id}`);
  }
}
