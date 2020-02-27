import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, FormControl,FormGroup, Validators } from '@angular/forms';
import { CurrentUserService } from 'src/app/services/auth/current-user.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  mustChange:boolean;
  email:string;
  password:string;
  userForm: FormGroup;
  newPwd:FormGroup;
  newPss:String;
  loading:boolean;
  regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  pRegex = /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})$/
  constructor( private auth: AuthService, public currentUser : CurrentUserService, public router : Router, public _snackBar : MatSnackBar ) { }

  ngOnInit() {
    this.loading= false;
    this.email= null;
    this.password= null;
    this.newPss = null
    this.userForm = new FormGroup({
   
      "email":new FormControl(this.email, Validators.compose([
        Validators.required,
        Validators.pattern(this.regex)])),
      "password":new FormControl(this.password, Validators.required),
    })

    this.newPwd = new FormGroup({
      "password":new FormControl(this.newPss,Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(this.pRegex)])),
    })
  }


  login(){
    if(!this.userForm.invalid){
      var credential = this.userForm.value;}    
      this.auth.login(credential)
        .subscribe((res)=>{ this.currentUser.setToken(res);
          this.loading=true;
      },(error) => this._snackBar.open("Error", "Wrong credential", {
        duration: 2000,  
       }
      ));
      
  }
  changePWD(){
    var newP = this.newPwd.value;   
    this.auth.changePassword(newP)
      .subscribe((data)=>{console.log(data)
      this.router.navigate(['home']);
      },(error) => this._snackBar.open("Error", error.statusText, {
        duration: 2000,  
       }
      ));
  }
}
