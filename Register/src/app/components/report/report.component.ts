import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl,FormGroup, Validators } from '@angular/forms';
import { ReportService } from 'src/app/services/report/report.service';
import { MatSnackBar } from '@angular/material';
import { StudentService } from 'src/app/services/student/student.service';
import { ActivityService } from 'src/app/services/activity/activity.service';
import { Student } from 'src/app/models/student';
import { Activity } from 'src/app/models/activity';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  student_id:number;
  activity_id:number;
  date:Date;

  students:Student[]
  activities:Activity[];

  filterLogForm:FormGroup
  displayedColumns: string[] = ['id', 'activity', 'student', 'check-in', 'check-out'];
  dataSource:any;
  constructor(
    private repServ:ReportService,
    public _snackBar : MatSnackBar,
    private studServ : StudentService, 
    private actServ :ActivityService,
    private datepipe :DatePipe, ) { }

  ngOnInit() {
    this.getAct();
    this.getStud();
    this.student_id=null;
    this.activity_id=null;
    this.date=null;

    this.filterLogForm = new FormGroup({
      "activity_id":new FormControl(this.activity_id),
      "student_id":new FormControl(this.student_id),
      "date":new FormControl(this.date),
     })
     this.getLog();
  }
  getLog(){
    
    var filter =this.filterLogForm.value
    if(filter.date!=null){
      var toDate = filter.date;
      filter.date =this.datepipe.transform(toDate, 'M/d/yy, h:mm a')
    }
    this.repServ.getFilterReportr(filter)
      .subscribe((data)=>{
        this.dataSource = data;
       
      },(error) => this._snackBar.open("Error", error.statusText, {
        duration: 2000,  
       }
      ));
  }
  removeFilter(){
    this.student_id=null;
    this.activity_id=null;
    this.date=null;
      this.filterLogForm.reset();
      var filter = this.filterLogForm.value;
    this.repServ.getFilterReportr(filter)
      .subscribe((data)=>{
        this.dataSource = data;
       
      },(error) => this._snackBar.open("Error", error.statusText, {
        duration: 2000,  
       }
      ));
  }
  getStud(){
    var filter ={
      ID:null,
      name:null,
      surname:null,
      registration_number:null
    }
    this.studServ.getFilteredStudent(filter).subscribe(
      data => {
        this.students= data
      },(error) => this._snackBar.open("Error", error.statusText, {
        duration: 2000,  
       }
      ));
  }
  getAct(){
    var filter = {
      name:null,
      locayion:null,
      startDate:null,
      endDate:null,
    }
    this.actServ.getFilteredActivity(filter)
      .subscribe((data)=>{
        
        this.activities = data}
      ,(error) => this._snackBar.open("Error", error.statusText, {
        duration: 2000,  
       }
      ));
}
}
