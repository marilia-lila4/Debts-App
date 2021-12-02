import { environment } from './../environments/environment';
import { Observable } from 'rxjs';
import { User } from './login/user';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiURL: string = environment.apiURLBase + '/api/users';
  tokenURL: string = environment.apiURLBase + environment.getTokenUrl;
  clientId: string = environment.clientId;
  clientSecret: string = environment.clientSecret;
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private httpClient: HttpClient) {}

  getToken() {
    const tokenString = localStorage.getItem('access_token');
    if (tokenString) {
      const token = JSON.parse(tokenString).access_token;
      return token;
    }
    return null;
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  getAuthenticatedUser() {
    const token = this.getToken();
    if (token) {
      const user = this.jwtHelper.decodeToken(token).user_name;
      return user;
    }
    return null;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (token) {
      const expired = this.jwtHelper.isTokenExpired(token);
      return !expired;
    }
    return false;
  }

  save(user: User): Observable<any> {
    return this.httpClient.post<any>(this.apiURL, user);
  }

  tryLogin(username: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('grant_type', 'password');
    const headers = {
      Authorization: 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    return this.httpClient.post(this.tokenURL, params.toString(), { headers });
  }
}
