import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  
filter:any;

  uri = 'https://backendtestgruppo4.azurewebsites.net';
  constructor(private http: HttpClient) { }

  getActivity():Observable<any>{
    return this.http.get(`${this.uri}/get/activity`)
  }
  getOneActivity(id):Observable<any>{
    return this.http.post(`${this.uri}/get/activity`,id)
  }
  getFilteredActivity(activity):Observable<any>{
    return this.http.post(`${this.uri}/get/activities`, activity)
  }
  getFutureActivity(activity):Observable<any>{
    return this.http.post(`${this.uri}/get/futureactivities`, activity)
  }
  createOneActivity(activity):Observable<any> {
     return this.http.post(`${this.uri}/new/activity`, activity)
  } 
  modActivity(activity):Observable<any>{
    return this.http.post(`${this.uri}/modify/activity`, activity)
  }
  delActivity(activity):Observable<any>{
    return this.http.post(`${this.uri}/delete/activity`, activity)
  }

}