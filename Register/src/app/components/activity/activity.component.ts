import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Student } from 'src/app/models/student';
import { FormBuilder, FormControl,FormGroup, Validators } from '@angular/forms';
import { Activity } from 'src/app/models/activity';
import { ActivityService } from 'src/app/services/activity/activity.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { PlaceService } from 'src/app/services/place/place.service';
import { Place } from 'src/app/models/place';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  date: Date
  
  a: Activity[];
  displayedColumns: string[] = ['id','start_date', 'end_date', 'name', 'location', 'participants','more'];
  dataSource: any;
  name:string;
  location:number;
  star_date:Date;
  end_date:Date;
  filterActForm:FormGroup
  lacations: any[];

  constructor( private dialog : MatDialog, private actService: ActivityService, public _snackBar : MatSnackBar, private datepipe :DatePipe,private LocService : PlaceService, ) { }

  ngOnInit() {
  this.getAvailableLocation();
    this.name=null;
    this.location=null;
    this.star_date=null;
    this.end_date=null;
    this.filterActForm = new FormGroup({
      "attivita":new FormControl(this.name),    
      "luogo_id":new FormControl(this.location),
      "datainizio":new FormControl(this.star_date),
      "datafine":new FormControl(this.end_date),
     })
     this.getFilterActivity();
  }

  getActivity(){
    this.actService.getActivity()
      .subscribe(data=>{
        
        this.dataSource = data;
      },(error) => this._snackBar.open("Error", error.statusText, {
        duration: 2000,  
       }
      ));
  }

  getFilterActivity(){
    var filter = this.filterActForm.value;
    var dateStart = this.datepipe.transform(filter.datainizio,'M/d/yy, h:mm a' )
    var dateEnd = this.datepipe.transform(filter.datafine,'M/d/yy, h:mm a' )
    filter.datainizio = dateStart;
    filter.datafine= dateEnd;
    this.actService.getFilteredActivity(filter)
      .subscribe(data=>{
        this.dataSource = data;
      },(error) => this._snackBar.open("Error", error.statusText, {
        duration: 2000,  
       }
      ));
  }
  removeFilter(){
    var filter = {
      datainizio:null,
      datafine:null,
      attivita:null,
      luogo_id:null
    }
    this.filterActForm.reset()
    this.actService.getFilteredActivity(filter)
      .subscribe(data=>{
        this.dataSource = data;
      },(error) => this._snackBar.open("Error", error.statusText, {
        duration: 2000,  
       }
      ));
  }

  openDialog(element): void {
    this.actService.getOneActivity(element.attivita_id)
      .subscribe((res)=>{
        const dialogRef = this.dialog.open(ActivityDialog, {
          width: '800px',
          height:'595px',
          data: res
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          this.removeFilter()
        });
      },(error) => this._snackBar.open("Error", error.statusText, {
        duration: 2000,  
       }
      ));
    
  }
  openNewDialog(): void {
    
    const dialogRef = this.dialog.open(ActivityDialog, {
      width: '800px',
      height:'300px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      this.removeFilter()
      console.log('The dialog was closed');
    });
  }
  getAvailableLocation(){
    var filter = {
      type:null,
      location:null,
      address:null
    }
    this.LocService.getFilteredPlace(filter)
      .subscribe((data)=>{
       this.lacations = data;
      },(error) => this._snackBar.open("Error", error.statusText, {
        duration: 2000,  
       }
      ));
  }
}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'activity-dialog.components.html',
  styleUrls: ['./activity.component.scss']
})


export class ActivityDialog {
  newAct:boolean
  id:number
  name:string;
  surname:string;
  email:string;
  start_date:Date;
  location_id:number;
  end_date:Date;
  type: string;
  nome:string;
  students:Student[]; 
  nStud:number;
  //location
  place:string;
  adress:string;
  locType:string;
  hasLocation:boolean;
  availableLoc:Place[];
  //act fomr
  activityForm: FormGroup;
  hasStudents: boolean;
  //stepper
  newActForm1:FormGroup;
  newActForm2:FormGroup;
  newActForm3:FormGroup;
  isLinear = true
  
  lacations: any[];

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ActivityDialog>,
    private actService: ActivityService,
    private datepipe :DatePipe,
    public _snackBar : MatSnackBar,
    private LocService : PlaceService,
    @Inject(MAT_DIALOG_DATA) public data: Activity) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(){
    this.getAvailableLocation();
    if(this.data != null){
      this.id= this.data.attivita_id;
      this.newAct=false;
      if(this.data.studenti.length ==0){
        this.hasStudents = false;
      }
      else{
        this.hasStudents = true;
      }
      if(this.data.Location != null){
        this.hasLocation = true;
      }
      else{
        this.hasLocation = false;
      }
      //activity
      this.start_date= new Date( this.data.datainizio);
      this.end_date = new Date(this.data.datafine);
      this.nome = this.data.attivita;
      this.location_id = this.data.luogo_id
      //location
      this.place = this.data.Location.name;
      this.adress = this.data.Location.address
      this.locType = this.data.Location.type.type
      //students list
      this.students = this.data.studenti;
      
  
      this.activityForm = new FormGroup({
  
        "datainizio":new FormControl(this.datepipe.transform(this.start_date,'M/d/yy, h:mm a' ), Validators.required),    
        "datafine":new FormControl(this.datepipe.transform(this.end_date,'M/d/yy, h:mm a' ), Validators.required),
        "luogo_id":new FormControl(this.location_id, Validators.required),
        "attivita":new FormControl(this.nome, Validators.required),
      })
    }
    else{
      this.newAct=true;
      this.start_date= null;
      this.end_date = null;
      this.place = null;
      this.nome = null;
      this.nStud = null;

      this.newActForm1 =this.formBuilder.group({  
        "attivita":[this.nome, Validators.required],
      })
      this.newActForm2 =this.formBuilder.group({  
        "datainizio":[this.start_date, Validators.required],    
        "datafine":[this.end_date, Validators.required],
      })
      this.newActForm3 =this.formBuilder.group({ 
        "luogo_id":[this.place, Validators.required],
      })
    }
    }
    createNewAct(){
      var part1 = this.newActForm1.value
      var part2 = this.newActForm2.value
      var part3 = this.newActForm3.value
      var dStart = this.datepipe.transform(part2.datainizio,'M/d/yy, h:mm a' );
      var dEnd = this.datepipe.transform(part2.datafine,'M/d/yy, h:mm a' );
      if(dEnd >= dStart){
        var toCreate ={
          attivita:part1.attivita,
          datainizio: this.datepipe.transform(part2.datainizio,'M/d/yy, h:mm a' ),
          datafine: this.datepipe.transform(part2.datafine,'M/d/yy, h:mm a' ),
          luogo_id:part3.luogo_id
      }
      console.log(toCreate)
      this.actService.createOneActivity(toCreate)
        .subscribe((res)=>{
          console.log(res)
          this.dialogRef.close();
        },
        (error) => this._snackBar.open("Error", error.statusText, {
          duration: 2000,  
         }
        ));
      }
      else{
        this._snackBar.open("Date Error", "check end date", {
          duration: 2000,  
         }
        )
      }
     
    }
    getAvailableLocation(){
      var filter = {
        type:null,
        location:null,
        address:null
      }
      this.LocService.getFilteredPlace(filter)
        .subscribe((data)=>{
         this.lacations = data;
        },(error) => this._snackBar.open("Error", error.statusText, {
          duration: 2000,  
         }
        ));
    }    
    editAct(){
      var dateEdit = this.activityForm.value;
      var toEdit = this.activityForm.value;
      toEdit.datainizio=this.datepipe.transform(dateEdit.datainizio,'M/d/yy, h:mm a' );
      toEdit.datafine=this.datepipe.transform(dateEdit.datafine,'M/d/yy, h:mm a' );
      toEdit.id_attivita = this.id;
      this.actService.modActivity(toEdit)
        .subscribe((res)=>{
          console.log(res);
          this.dialogRef.close();
        },(error) => this._snackBar.open("Error", error.statusText, {
          duration: 2000,  
         }
        ));
    }
    deleteAct(){
      var toDel = this.id;
      let snackRef= this._snackBar.open("Are you sure?", "DELETE", {duration:1500});
      snackRef.onAction().subscribe(()=>{
        this.actService.delActivity(toDel)
        .subscribe((res)=>{
          console.log(res);
          this.dialogRef.close();
        },(error) => this._snackBar.open("Error", error.statusText, {
          duration: 2000,  
         }
        ));
      })
     
    }

}
