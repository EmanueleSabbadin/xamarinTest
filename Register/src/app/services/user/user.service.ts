import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter } from 'minimatch';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  uri = 'https://backendtestgruppo4.azurewebsites.net';

  getRole():Observable<any>{    
    return this.http.get(`${this.uri}/get/roles` )
  }  

  getUser(filter):Observable<any>{
    
    return this.http.post(`${this.uri}/get/users`, filter)
  }  
  getAvalableUser():Observable<any>{
    
    return this.http.get(`${this.uri}/get/free/users`)
  }  
  getFiltredUser(userid):Observable<any>{    
    console.log(userid)
    var filter ={
      id : userid
    }
    return this.http.post(`${this.uri}/get/user`,filter)
  }
  getOneUser(userid):Observable<any>{    
  
    return this.http.post(`${this.uri}/get/user`,userid)
  }
  createOneUser(user):Observable<any> {
     return this.http.post(`${this.uri}/new/user`, user)
  } 
   modUser(user):Observable<any>{
     console.log(user);
    return this.http.post(`${this.uri}/modify/user`, user)
  }
  delUser(userID):Observable<any>{
    return this.http.post(`${this.uri}/delete/user`, userID)
  }
}
