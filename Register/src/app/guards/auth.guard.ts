import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CurrentUserService } from '../services/auth/current-user.service';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: CurrentUserService,
    public _snackBar : MatSnackBar,){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.auth.isAuth){
        return true;
      }
      else{
        this._snackBar.open("Error", "Acces deneid" , {
          duration: 2000,  
         });
        console.log("Acces deneid")
      }
  }
  
}
