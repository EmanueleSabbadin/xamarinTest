import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  filter:any;

  allstudent: Observable<any>;

  uri = 'https://backendtestgruppo4.azurewebsites.net';
  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  getAllStudent():Observable<any>{
    return this.http.get(`${this.uri}/get/student`)
  }
  getFilteredStudent(student):Observable<any>{
    return this.http.post(`${this.uri}/get/students`, student)
  }
  getOneStudent(stud){
    return this.http.post(`${this.uri}/get/student`, stud)
  }
  createStudent(student):Observable<any> {
     return this.http.post(`${this.uri}/new/student`, student)
  } 
  modStudent(student):Observable<any>{
    return this.http.post(`${this.uri}/modify/student`, student)
  }
  delStudent(student):Observable<any>{
    return this.http.post(`${this.uri}/delete/student`, student)
  }
  assignActivity(toAssign):Observable<any>{
    return this.http.post(`${this.uri}/new/assign/studenttoactivity`, toAssign)
  }
}
