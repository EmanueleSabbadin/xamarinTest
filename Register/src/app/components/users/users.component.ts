import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Student } from 'src/app/models/student';
import { FormBuilder, FormControl,FormGroup, Validators } from '@angular/forms';
import { Account } from 'src/app/models/account';
import { UserService } from 'src/app/services/user/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'email', 'role', 'more'];
  dataSource:any;
  new:boolean
  filterUserForm: FormGroup;
  //filter
  ID:number
  Email:string;
  Role_id:number;
  panelOpenState = false;
  //filterSelected
  filterSel:string;

  roles: any[]
  constructor(private dialog : MatDialog, public UserService : UserService, public _snackBar : MatSnackBar ) { }

  ngOnInit() {
    this.getUser();
    this.getRoles();
    
    this.ID=null;
    this.Email=null;
    this.Role_id=null;
    this.filterUserForm = new FormGroup({
      "ID":new FormControl(this.ID),    
      "Email":new FormControl(this.Email),
      "Role_id":new FormControl(this.Role_id),
     })
  }
  getRoles(){
    this.UserService.getRole()
      .subscribe(data => {
        this.roles = data;
      },(error) => this._snackBar.open("Error", error.statusText, {
        duration: 2000,  
       }
      ));
  }
  getUser(){  
    
    var filter = {
      ID : null,
      Email: null,
      Role_id:null
    };
    this.UserService.getUser(filter)
      .subscribe( (data) =>{
        this.dataSource = data 
      },(err)=>console.log(err))
  }
  removeFilter(){   
      this.ID=null;
      this.Email=null;
      this.Role_id=null;
      this.filterUserForm.reset();
      var filter = this.filterUserForm.value;
      this.UserService.getUser(filter)
        .subscribe( (data) =>{
          this.dataSource = data 
        },(err)=>console.log(err))   
  }
  getFilterUser(){
    var filter = this.filterUserForm.value
    this.UserService.getUser(filter)
      .subscribe( data =>{
        this.dataSource = data
      },(error) => this._snackBar.open("Error", error.statusText, {
        duration: 2000,  
       }
      ));
  }

  openDialog(element): void {
    var user;

    this.UserService.getOneUser(element.utente_id)
      .subscribe(data=>{ 
        user = data;
        const dialogRef = this.dialog.open(UserDialog, {
          width: '800px',
          height:'595px',
          data: user
        });
    
        dialogRef.afterClosed().subscribe(result => {
          this.getUser();
          console.log('The dialog was closed');
        });
      },(error) => this._snackBar.open("Error", error.statusText, {
        duration: 2000,  
       }
      ));
      

    
  }
  openDialogNew(): void {
    this.new=true;
    const dialogRef = this.dialog.open(UserDialog, {
      width: '800px',
      height:'300px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getUser();
      console.log('The dialog was closed');
    });
  }

}

//DIALOG

@Component({
  selector: 'user-dialog',
  templateUrl: 'user-dialog.component.html',
  styleUrls: ['./users.component.scss']
})


export class UserDialog {
  
  id:number
  email:string;
  password:string;
  int:string;
  ruolo_id:number;
  userForm: FormGroup;
  newAccount:boolean
  selectedOption:number;
  regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  pRegex = /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})$/

  roles: any[]
  isLinear=true;
  //stepper
  newUserForm1:FormGroup
  newUserForm2:FormGroup
  newUserForm3:FormGroup

  constructor(
    public UserService : UserService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UserDialog>,
    public _snackBar : MatSnackBar ,
    @Inject(MAT_DIALOG_DATA) public data: Account) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(){ 
    this.getRoles();
    if (this.data != null){
      this.newAccount = false;

      this.id = this.data.utente_id;
      this.email = this.data.email;
      this.ruolo_id = this.data.ruolo_id;    

      this.userForm = new FormGroup({
   
        "email":new FormControl(this.email, Validators.compose([
          Validators.required,
          Validators.pattern(this.regex)])),
        "Role_id":new FormControl(this.ruolo_id, Validators.required),
      })
    }
    else{      
      this.newAccount = true
      this.id = null;
      this.email = null;
      this.ruolo_id =  null;
      this.password = null;

      this.newUserForm1 = this.formBuilder.group({
        "email":[this.email, Validators.compose([
          Validators.required,
          Validators.pattern(this.regex)])],
      })
      this.newUserForm2 = this.formBuilder.group({
        "password":[this.password,Validators.compose([
          Validators.required,
          Validators.pattern(this.pRegex)])],
      })
      this.newUserForm3 = this.formBuilder.group({
        "Role_id":[this.ruolo_id, Validators.required],
      })
    }
    
      
  }
  getRoles(){
    this.UserService.getRole()
      .subscribe((data) => {
        this.roles = data;
      },(error) => this._snackBar.open("Error", error.statusText, {
        duration: 2000,  
       }
      ));
  }
    
    addUser(){

      if(!this.newUserForm1.invalid && !this.newUserForm1.invalid &&!this.newUserForm1.invalid ){
        var part1 = this.newUserForm1.value;
        var part2 = this.newUserForm2.value;
        var part3 = this.newUserForm3.value;
        var newUser = {
          email:part1.email,
          password:part2.password,
          Role_id:part3.Role_id
        }
       this.UserService.createOneUser(newUser).subscribe(
        (data) => {
          console.log(data);
          this.dialogRef.close();
        },(error) => this._snackBar.open("Error", error.statusText, {
          duration: 2000,  
         }
        ));
      }
      
    }
    editUser(){
      if(!this.userForm.invalid){
        var newUser = this.userForm.value;
        newUser.id = this.id;
       this.UserService.modUser(newUser)
        .subscribe((res)=>{
          console.log(res);
          this.dialogRef.close();
        },(error) => this._snackBar.open("Error", error.statusText, {
          duration: 2000,  
         }
        ));
      }
      
    }
    deleteUser(){    
     let snackRef= this._snackBar.open("Are you sure?", "DELETE", {duration:1500});
      snackRef.onAction().subscribe(()=>
      this.UserService.delUser(this.data.utente_id).subscribe(res=>{
        console.log(res);
        this.dialogRef.close();
      },(error) => this._snackBar.open("Error", error.statusText, {
       duration: 2000, })
      ));
    }
}
