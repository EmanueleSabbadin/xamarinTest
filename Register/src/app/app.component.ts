import { Component, HostListener } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { StudentService } from './services/student/student.service';
import { AuthService } from './services/auth/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  url:string;
  constructor(private locationUrl : Location, public router: Router, private studService : StudentService, private auth : AuthService){
    this.router.navigate(['login'])    
    router.events.subscribe((event:Event) => {
      // see also 
      if (event instanceof NavigationEnd) {
        // Navigation Ended Successfully.
        this.url = event.url;
        // console.log(event.url);
        }
      
     // console.log(val instanceof NavigationEnd) 
  });
  }
  
  title = 'Register';
  goHome(){
    this.router.navigate(['home'])
  }
  goUsers(){
    this.router.navigate(['users'])
  }
  goStudents(){
    this.router.navigate(['students'])
  }
  goPlaces(){
    this.router.navigate(['places'])
  }
  goReports(){
    this.router.navigate(['report'])
  }
  goLogin(){
    this.router.navigate(['login'])
  }
  goCalendar(){
    this.router.navigate(['activity'])
  }
  logOut(){
    this.auth.logout();
    this.router.navigate(['login'])
  }
}
