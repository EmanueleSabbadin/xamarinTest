import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Token } from 'src/app/models/token';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  token:string;
  isAuth:boolean;
  mustChange:boolean;
  constructor(public router : Router) {this.isAuth= false; }

  setToken(token){

    if(token.token){   
      this.mustChange = token.changePassword
      this.token = token.token;
      this.isAuth = true;
      if(this.mustChange == false){
        this.router.navigate(['home'])
      }
      
      
    }
    else{
      this.isAuth = false;
      this.router.navigate(['login'])
    }
  
      
    
  }
  deleteToken(){
    this.token = null;
     //sthis.isAuth = false;
      this.mustChange = false;
  }
}
