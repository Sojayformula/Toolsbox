import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginModel } from '../app/model/auth';
import { environment } from '../app/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

      constructor(private http: HttpClient){}

  getLogin(payload: LoginModel): Observable<any>{
    return this.http.post(`${environment.baseUrl}/authentication/login`, payload)
  }
 
  //  isLoggedIn(){
  //   return !!localStorage.getItem('token'); 
  // }

  // Routeguard service
   isLoggedIn(){
   const token = localStorage.getItem('token');
  console.log('Auth token:', token);
  return !!token;
   }

  //  logout() {
  //   localStorage.removeItem('token');
  // }




  
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  // isLoggedIn(): boolean {
  //   return !!this.getToken();
  // }

  logout(): void {
    localStorage.clear();
  }

}