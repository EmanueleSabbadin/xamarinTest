import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }
  uri = 'https://backendtestgruppo4.azurewebsites.net';

  getTodos():Observable<any>{
    return this.http.get(`${this.uri}/get/todos`)
  }
  createTodo(id):Observable<any> {
     return this.http.post(`${this.uri}/new/todo`, id)
  } 
  delTodo(todo):Observable<any>{
    return this.http.post(`${this.uri}/delete/todo`, todo)
  }
}
