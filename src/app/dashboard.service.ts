import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from  'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

    constructor(private httpClient: HttpClient) {}
   API_SERVER = "http://10.30.8.231:3000/";
  userlist() 
  {
    return this.httpClient.get(`${this.API_SERVER}userlist`);
  }
}
