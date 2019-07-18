import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Registration } from  './registration';
import { Observable } from  'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
	
  // constructor() { }
   
   constructor(private httpClient: HttpClient) {}
 API_SERVER = "http://10.30.8.231:3000/";
  register(registration: Registration) 
  {
    return this.httpClient.post(`${this.API_SERVER}saveuser`, registration);
  }
}
