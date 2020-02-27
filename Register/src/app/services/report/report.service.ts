import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }
  uri = 'https://backendtestgruppo4.azurewebsites.net';

  getReport():Observable<any>{    
    return this.http.get(`${this.uri}/get/logs` )
  }  

  getFilterReportr(filter):Observable<any>{
    
    return this.http.post(`${this.uri}/get/logs`, filter)
  }  
  
}
