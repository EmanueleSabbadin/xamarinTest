import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private http: HttpClient) { }
  uri = 'https://backendtestgruppo4.azurewebsites.net';

  getPlace():Observable<any>{
    return this.http.get(`${this.uri}/get/user`)
  }
  getFilteredPlace(place):Observable<any>{
    return this.http.post(`${this.uri}/get/locations`, place)
  }
  createOnePlace(place):Observable<any> {
     return this.http.post(`${this.uri}/new/location`, place)
  } 
  modPlace(place):Observable<any>{
    return this.http.post(`${this.uri}/modify/location`, place)
  }
  delPlace(place):Observable<any>{
    return this.http.post(`${this.uri}/delete/location`, place)
  }
  getLocationType():Observable<any>{
    return this.http.get(`${this.uri}/get/location/types`)
  }
}
