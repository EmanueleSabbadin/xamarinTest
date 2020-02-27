import { Injectable } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from'@angular/common/http';
import { Observable } from'rxjs';
import { CurrentUserService } from './current-user.service';
import {tap} from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  constructor(private service:CurrentUserService,public router : Router){}
  intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>> {
   const Authorization=this.service.token;
    
   if (Authorization) {
   const cloned=req.clone({
   headers:req.headers.set("Authorization",
   "Bearer "+Authorization)
         });
    
   return next.handle(cloned);
       }
   else {
     
   return next.handle(req).pipe( tap(() => {},
   (err: any) => {
   if (err instanceof HttpErrorResponse) {
     if (err.status !== 401) {
      return;
     }
     this.router.navigate(['login']);
   }
 }));
};
       }
     }
    
