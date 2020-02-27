import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Student } from 'src/app/models/student';
import { FormBuilder, FormControl,FormGroup, Validators } from '@angular/forms';
import { StudentService } from 'src/app/services/student/student.service';
import { UserService } from 'src/app/services/user/user.service';
import { Account } from 'src/app/models/account';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Activity } from 'src/app/models/activity';
import { ActivityService } from 'src/app/services/activity/activity.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  
  displayedColumns: string[] = ['ID', 'Account', 'Name', 'Surname', 'Course', 'More','Activity'];
  dataSource: any;
  ID:number;
  Course:string;
  Name:string;
  LastName:string;
  filterStudForm:FormGroup
  new:boolean
 
  constructor( private dialog : MatDialog, private studServ: StudentService, public _snackBar : MatSnackBar  ) { }

  ngOnInit() {
  

    this.ID=null;
    this.Course=null;
    this.Name=null;
    this.LastName=null;
    this.filterStudForm = new FormGroup({
      "registration_number":new FormControl(this.ID),    
      "course":new FormControl(this.Course),
      "name":new FormControl(this.Name),
      "surname":new FormControl(this.LastName),
     })
     this.getFilterStud();
  }

  getStudent(){
    this.studServ.getAllStudent().subscribe(
      (data) => {
        this.dataSource = data
      },(error) => this._snackBar.open("Error", error.statusText, {
        duration: 2000,  
       }
      ));
  }
  removeFilter(){
    this.ID=null;
    this.Course=null;
    this.Name=null;
    this.LastName=null;
    this.filterStudForm.reset()
    var filter = this.filterStudForm.value;
    this.studServ.getFilteredStudent(filter).subscribe(
      (data) => {
        this.dataSource = data
      },(error) => this._snackBar.open("Error", error.statusText, {
        duration: 2000,  
       }
      ));
  }
  getFilterStud(){
    var filter = this.filterStudForm.value;
    this.studServ.getFilteredStudent(filter).subscribe(
      (data) => {
        this.dataSource = data
      },(error) => this._snackBar.open("Error", error.statusText, {
        duration: 2000,  
       }
      ));
  }


  openDialog(element): void {
   this.studServ.getOneStudent(element.matricola)
    .subscribe((res) =>{ 
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        width: '800px',
        height:'595px',
        data: res
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.removeFilter();
      });
    },(error) => this._snackBar.open("Error", error.statusText, {
      duration: 2000,  
     }
    ));
    
  }
  openDialogNew(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '800px',
      height:'300px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      this.removeFilter();
      console.log('The dialog was closed');
    },(error) => this._snackBar.open("Error", error.statusText, {
      duration: 2000,  
     }
    ));
  }
  openDialogAssign(element): void {
    
    this.studServ.getOneStudent(element.matricola)
    .subscribe((res) =>{
      var assign ={
        data:res,
        assign:true
      }
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        width: '800px',
        height:'300',
        data: assign
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.removeFilter();
      });
    },(error) => this._snackBar.open("Error", error.statusText, {
      duration: 2000,  
     }
    ));
  }
  
}
//
//  DIALOG for modify or create new student
//
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'students-dialog.components.html',
  styleUrls: ['./students.component.scss']
})


export class DialogOverviewExampleDialog {
  
  account:number
  name:string;
  surname:string;
  course:string;
  idaccount:number;
  username:string
  hasAccount: boolean;
  hasActivity : boolean;
  hasLog:boolean;
  newStudent:boolean;
  freeUser:Account[];
  oldAccount:any;
  //form
  studentForm: FormGroup;
  studentForm1: FormGroup;
  studentForm2: FormGroup;
  accountForm: FormGroup;
 //new user
  id:number
  email:string;
  password:string;
  userForm:FormGroup;
  newUsId:number;
  regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  pRegex = /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})$/
  //stepper 
  isLinear = true;
  newAccount:boolean;
  //stepper assign
  assignActForm:FormGroup;
  actId:number;
  studId:number;
  studName:string;
  studLastN:string;
  actStart:string;
  actEnd:string;
  actSelected:boolean;
  actStartSelected:string;
  actEndSelected:string;
  lastAct:Activity;
  listStudAct:Activity[];
  listOfAct:Activity[];
  hasAct:boolean
  attivitaSelected:Activity;
  done:boolean
  toAssign:any;
  //wait for user creation
  isCreated:boolean;
  

  constructor(
    public StudentService : StudentService,
    private UserService : UserService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    public _snackBar : MatSnackBar,
    private actServ :ActivityService,  
    private datepipe :DatePipe,  
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(){ 
    this.getAllAct();
    if( this.data != undefined && this.data.assign != undefined){
      this.actSelected = false;;
      console.log(this.data)      
      this.listStudAct = [];
      if(this.data.data.attivita != 0){
        var listAct = this.data.data.attivita  
        this.listOfAct = listAct
        this.listStudAct = listAct
        this.hasAct = true
       /* this.lastAct = listAct[listAct.length - 1]
        var dateToget = this.datepipe.transform(this.lastAct.datafine,'M/d/yy, h:mm a')
        this.getAct(dateToget)
        this.actStart = this.datepipe.transform(this.lastAct.datainizio, 'M/d/yy').toString()
        this.actEnd = this.datepipe.transform(this.lastAct.datafine, 'M/d/yy').toString()*/
      } 
      else{
        this.getAllAct();
      }
      
      
      this.newStudent = null
      this.actId = null;
      this.studId = this.data.data.matricola;
      this.studName = this.data.data.nome;
      this.studLastN = this.data.data.cognome;

      this.assignActForm = this.formBuilder.group({
        "id_attivita":[this.name, Validators.required],
      })
    }
    else{
      this.getAvailableUsers();

    if (this.data != null && this.data.assign == undefined){
      this.newStudent = false
      if(this.data.user == null){
        this.hasAccount = false;
      }
      else{
        this.hasAccount = true;
        this.oldAccount= {
          email: this.data.user.email +"(current)",
          utente_id: this.data.user.utente_id,
        }
      }
      if (this.data.attivita.length != 0){
        this.hasActivity = true
      }else{
        this.hasActivity = false;
      }
      if (this.data.logs != undefined && this.data.logs.length !=0){
        
        this.hasLog = true
      }else{
        this.hasLog = false;
      }
      this.name = this.data.nome;
      this.surname = this.data.cognome;
      this.course = this.data.corso;
      this.account = this.oldAccount.utente_id;
      this.studentForm = new FormGroup({
        "name":new FormControl(this.name, Validators.required),    
        "surname":new FormControl(this.surname, Validators.required),
        "user":new FormControl(this.account),
        "course":new FormControl(this.course, Validators.required)
      })
    }
    else if(this.data == null ){
      this.newStudent = true;
      
      
     this.studentForm1 = this.formBuilder.group({
        "name":[this.name, Validators.required],    
        "surname":[this.surname, Validators.required],
      })
      this.studentForm2 =this.formBuilder.group({
        "course":[this.course, Validators.required],
      })
      this.accountForm = this.formBuilder.group({
        "user":[this.account, Validators.required],
      })
      this.email = null;
      this.password = null;    

      this.userForm = this.formBuilder.group({
   
        "email":[this.email, Validators.compose([
          Validators.required,
          Validators.pattern(this.regex)])],
        "password":[this.password, Validators.compose([
          Validators.required,
          Validators.pattern(this.pRegex)
        ])],
      })
    }
    }
    
    
      
  }
    getAvailableUsers(){
      this.UserService.getAvalableUser()
        .subscribe((data)=>{
          this.freeUser = data;
          if(this.oldAccount !=null){
            this.freeUser.push(this.oldAccount);
          }          
        }
        ,(error) => this._snackBar.open("Error", error.statusText, {
          duration: 2000,  
         }
        ));
        
    }
    editStudent(){
      if(!this.studentForm.invalid){
        
        var newStudent = this.studentForm.value;
        newStudent.registration_number = this.data.matricola;
        this.StudentService.modStudent(newStudent)
        .subscribe((res)=>{console.log(res);
          this.dialogRef.close();
          },(error) => this._snackBar.open("Error", error.statusText, {
            duration: 2000,  
           }
          ));
      }
      
    }
    deleteStudent(){
      var todel = this.data.matricola;
      let snackRef= this._snackBar.open("Are you sure?", "DELETE", {duration:1500});
      snackRef.onAction().subscribe(()=> {
        this.StudentService.delStudent(todel)
        .subscribe((res)=>{console.log(res)
          this.dialogRef.close();}
          ,(error) => this._snackBar.open("Error", error.statusText, {
            duration: 2000,  
          }
          ));
      })    
      
       
    }
    
  //test stepper 
  addStudent(){
      var newStudent1 = this.studentForm1.value;
      var newStudent2 = this.studentForm2.value;
      var newStudent3 = this.accountForm.value;
      
    if (this.newAccount == true){
      if(!this.userForm.invalid){     
        
        var toAdd={
          name:newStudent1.name,
          surname:newStudent1.surname,
          course:newStudent2.course,
          user:this.newUsId}

      this.StudentService.createStudent(toAdd)
      .subscribe((res)=>{console.log(res);
        this.dialogRef.close();
        },(error) => this._snackBar.open("Error", error.statusText, {
          duration: 2000,  
        }
        ));
      }
      
    }else{    
      var newStud = { 
        name:newStudent1.name,
        surname:newStudent1.surname,
        course:newStudent2.course,
        user:newStudent3.user,
      }

      this.StudentService.createStudent(newStud)
      .subscribe((res)=>{console.log(res);
        this.dialogRef.close();
        },(error) => this._snackBar.open("Error", error.statusText, {
          duration: 2000,  
        }
        ));
    }
  }
  addUser(){  
    this.isCreated = false;
    if(!this.userForm.invalid){
      var newUser = this.userForm.value;
      newUser.Role_id = 4;
    }
    this.UserService.createOneUser(newUser).subscribe(
      (data) => {
        console.log(data);
        
        var filter = {
          ID:null,
          Role_id:null,
          Email:newUser.email
        }
        this.UserService.getUser(filter)
        .subscribe((data)=>{this.newUsId = data[0].utente_id;
          this.isCreated=true;},
        (err)=>console.log(err))
        
      },(error) => this._snackBar.open("Error", error.statusText, {
        duration: 2000,  
      }
      ));
    
    
  }
  getAct(date){
    var filter = {
      attivita:null,
      luogo_id:null,
      datainizio:date,
      datafine:null,
    }
    this.actServ.getFutureActivity(filter)
      .subscribe((data)=>{this.listOfAct = data}
      ,(error) => this._snackBar.open("Error", error.statusText, {
        duration: 2000,  
      }
      ));
  }
  getAllAct(){
    var filter = {
      attivita:null,
      luogo_id:null,
      datainizio:null,
      datafine:null,
    }
    this.actServ.getFilteredActivity(filter)
      .subscribe((data)=>{this.listOfAct = data}
      ,(error) => this._snackBar.open("Error", error.statusText, {
        duration: 2000,  
      }
      ));
  }
  getSingleAct(name){
    this.actServ.getOneActivity(name)
      .subscribe((data)=>{this.listOfAct = data}
      ,(error) => this._snackBar.open("Error", error.statusText, {
        duration: 2000,  
      }
      ));
  }
  getOneActivity(){

    var attivitacheck= this.assignActForm.value;
    console.log(attivitacheck)
    var id = attivitacheck.id_attivita;
    this.actServ.getOneActivity(id)
      .subscribe((data)=>{this.attivitaSelected = data
      console.log(data)
    this.done = true;}
      ,(error) => this._snackBar.open("Error", error.statusText, {
        duration: 2000,  
      }
      ));
  }
  actSel(sel){
    this.actSelected = true;
    this.actStartSelected=this.datepipe.transform(sel.datainizio, 'M/d/yy').toString()
    this.actEndSelected=this.datepipe.transform(sel.datafine, 'M/d/yy').toString()
  }
  assign(){    
      console.log(this.attivitaSelected);
      if(this.listStudAct.length !=0) {
        this.listStudAct.every(element => {
          if((this.attivitaSelected.datainizio >= element.datainizio && this.attivitaSelected.datainizio <= element.datafine) || (this.attivitaSelected.datafine >= element.datainizio && this.attivitaSelected.datafine <= element.datafine))
          {
            
             this._snackBar.open("Error", "check date", {
              duration: 2000,  
            })
            return false
          }
          else{
            var attivita= this.assignActForm.value;
            this.toAssign ={
              id_attivita:attivita.id_attivita,
              id_studente:this.studId,
            }
            console.log(this.toAssign)
            this.StudentService.assignActivity(this.toAssign)
              .subscribe((res)=>{console.log(res)
                this.dialogRef.close();}
              ,(error) => this._snackBar.open("Error", error.statusText, {
                duration: 2000,  
              }
              ));
            
          }
      
        })
      }
      else{
        var attivita= this.assignActForm.value;
        this.toAssign ={
          id_attivita:attivita.id_attivita,
          id_studente:this.studId,
        }
        console.log(this.toAssign)
        this.StudentService.assignActivity(this.toAssign)
          .subscribe((res)=>{console.log(res)
            this.dialogRef.close();}
          ,(error) => this._snackBar.open("Error", error.statusText, {
            duration: 2000,  
          }
          ));
      }
     
    
    
   
  }

}
