import { Component, OnInit, HostListener } from '@angular/core';
import { StudentService } from 'src/app/services/student/student.service';
import { UserService } from 'src/app/services/user/user.service';
import { ActivityService } from 'src/app/services/activity/activity.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { PlaceService } from 'src/app/services/place/place.service';
import { ReportService } from 'src/app/services/report/report.service';
import { DatePipe } from '@angular/common';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from 'src/app/models/todo';
import { FormBuilder, FormControl,FormGroup, Validators } from '@angular/forms';
import { element } from 'protractor';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public innerWidth: any;
  public doughnutChartLabels = [];
  public doughnutChartData = [];
  public doughnutChartType = 'doughnut';
  public doughnutColors:any[] = [
  { backgroundColor: [ "#41CC26", "#00ADB0","#C400EC","#BB0523","#D6E600","#C4A649"] },
  { borderColor: ["#AEEBF2", "#FEFFC9"] }];
  displayedColumns: string[] = ['ID','Note', 'Visibility','Done'];
  dataSource: any;
  checkin=0
  checkout=0
  //Numbers 
  nstud : number;
  nUser: number;
  nAct:number;
  nLoc:number;

  sizeClass:number
  //todo
  listTodo:Todo;
  formTodo:FormGroup;
  Note:string;
  Visibility:number;
  canDelete:boolean
  visibilitOpz = [
    {value: 1, viewValue: 'All'},
    {value: 2, viewValue: 'Me'},
  ];

  constructor(
    private studServ : StudentService, 
    private usServ : UserService,
    private actServ :ActivityService, 
    public _snackBar : MatSnackBar, 
    private locServ: PlaceService, 
    private repServ: ReportService,
    private datepipe :DatePipe, 
    private todoServ : TodoService, 
    ) { }
  @HostListener('window:resize', ['$event'])

  onResize(event) {
    this.innerWidth = window.innerWidth;
    if(this.innerWidth < 950){
      this.sizeClass = 1
    }
    if(this.innerWidth < 650){
      this.sizeClass = 2
    }
    if(this.innerWidth < 550){
      this.sizeClass = 3
    }
  }
  ngOnInit() {
    
    this.canDelete = false;
    this.getNstud();
    this.getNuser();
    this.getNact()
    this.getNloc();
    this.getLog();
    this.getTods();
    this.doughnutChartLabels = ['Chek-In', 'Check-Out', ];
    this.Visibility=null;
    this.Note=null;
    this.formTodo = new FormGroup({
      "Visibility":new FormControl(this.Visibility, Validators.required),    
      "Note":new FormControl(this.Note,Validators.compose([
        Validators.required,
        Validators.maxLength(70)])),
     })
  }

  getNstud(){
    var filter ={
      ID:null,
      name:null,
      surname:null,
      registration_number:null
    }
    this.studServ.getFilteredStudent(filter).subscribe(
      data => {
        this.nstud = data.length
      },(error) => this._snackBar.open("Error", error.statusText, {
        duration: 2000,  
       }
      ));
  }
  getNuser(){
    
    var filter = {
      ID : null,
      Email: null,
      Role_id:null
    };
    this.usServ.getUser(filter).subscribe(
      data => {
        this.nUser = data.length
      },(error) => this._snackBar.open("Error", error.statusText, {
        duration: 2000,  
       }
      ));
  }
  getNact(){
      var filter = {
        name:null,
        locayion:null,
        startDate:null,
        endDate:null,
      }
      this.actServ.getFilteredActivity(filter)
        .subscribe((data)=>{this.nAct = data.length}
        ,(error) => this._snackBar.open("Error", error.statusText, {
          duration: 2000,  
         }
        ));
  }
  getNloc(){
      var filter ={
        location:null,
        address:null,
        type:null
      }
      this.locServ.getFilteredPlace(filter)
      .subscribe(data=>{
        this.nLoc = data.length
      },(error) => this._snackBar.open("Error", error.statusText, {
        duration: 2000,  
       }
      ));
  }
  getLog(){
    var toDay = Date.now();
    var datefilt= this.datepipe.transform(toDay,'M/d/yy, h:mm a' )
    console.log(datefilt);
    //console.log("mokup logs, modificare")
    var filter ={
      activity_id:null,
      student_id:null,
      date: datefilt//"12/13/19, 12:15 PM"
    }
    this.repServ.getFilterReportr(filter)
      .subscribe((data)=>{
        
        for (let i = 0; i < data.length; i++) {
          const element = data[i];
          if(element.checkin != null){
            this.checkin++;
          }
          if(element.checkout != null){
            this.checkout++;
          }
        }
        this.doughnutChartData = [this.checkin, this.checkout];
      },(error) => this._snackBar.open("Error", error.statusText, {
        duration: 2000,  
       }
      ));
  }
  //todo
  getTods(){
    this.todoServ.getTodos()
      .subscribe((data)=>{
        this.dataSource = data;
      },(error) => this._snackBar.open("Error", error.statusText, {
        duration: 2000,  
       }
      ));
  }
  createTodo(){
    if(this.formTodo.valid){
      var toCreate = this.formTodo.value;
      this.todoServ.createTodo(toCreate)
      .subscribe((data)=>{
        console.log(data)
        this.getTods();
      },(error) => this._snackBar.open("Error", error.statusText, {
        duration: 2000,  
       }
      ));
    }
    
  }
  deleteTodo(element){
    console.log(element);
    this.todoServ.delTodo(element.ID)
      .subscribe((data)=>{
        console.log(data)
        this.getTods();
      },(error) => this._snackBar.open("Error", error.statusText, {
        duration: 2000,  
       }
      ));
  }
}
