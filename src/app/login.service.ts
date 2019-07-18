import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from  './login';
import { Observable } from  'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

   constructor(private httpClient: HttpClient) {}
   API_SERVER = "http://10.30.8.231:3000/";
  login(login: Login) 
  {
    return this.httpClient.post(`${this.API_SERVER}login`, login);
  }
  
}
