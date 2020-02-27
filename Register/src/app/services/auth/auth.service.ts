import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { CurrentUserService } from './current-user.service';
import { Token } from 'src/app/models/token';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  fromBAckend:any;

  constructor(private http: HttpClient, private _snackBar: MatSnackBar, public tokenserv: CurrentUserService) { }
  uri = 'https://backendtestgruppo4.azurewebsites.net';

  login(credntial){
    return this.http.post(`${this.uri}/weblogin`, credntial);     
  }
  changePassword(newPass){
    return this.http.post(`${this.uri}/change/password`,newPass);
  }

  logout(){
    this.tokenserv.deleteToken()
  }
}
