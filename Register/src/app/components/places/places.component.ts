import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl,FormGroup, Validators } from '@angular/forms';
import { PlaceService } from 'src/app/services/place/place.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LocationType } from 'src/app/models/location-type';
import { MatSnackBar } from '@angular/material';
import { Place } from 'src/app/models/place';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit {

  displayedColumns: string[] = ['id','name', 'address', 'type','more'];
  dataSource: any;

  name:string;
  adress:string;
  type:number;
  filterLocForm:FormGroup
  locationTypes:LocationType[];

  constructor(private locServ: PlaceService, private dialog : MatDialog, public _snackBar : MatSnackBar,) { }

  ngOnInit() {
    this.getLocatinType();
    
    this.name=null;
    this.adress=null;
    this.type=null;
    this.filterLocForm = new FormGroup({
      "location":new FormControl(this.name),    
      "address":new FormControl(this.adress),
      "type":new FormControl(this.type),
     })
     this.getFilterLoc();
  }
  getFilterLoc(){
    var filter = this.filterLocForm.value;
    this.locServ.getFilteredPlace(filter)
      .subscribe(data=>{
        this.dataSource = data;
      },(error) => this._snackBar.open("Error", error.statusText, {
        duration: 2000,  
       }
      ));
  }
  getLocatinType(){
    this.locServ.getLocationType()
      .subscribe((data)=>{
        this.locationTypes = data
      },(error) => this._snackBar.open("Error", error.statusText, {
        duration: 2000,  
       }
      ));
  }
  removeFilter(){
    var filter ={
      location:null,
      address:null,
      type:null
    }
    this.filterLocForm.reset();
    this.locServ.getFilteredPlace(filter)
    .subscribe(data=>{
      this.dataSource = data;
    },(error) => this._snackBar.open("Error", error.statusText, {
      duration: 2000,  
     }
    ));
  }

  openDialog(element): void {
    
    const dialogRef = this.dialog.open(PlaceDialog, {
      width: '800px',
      height:'595px',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.removeFilter();
    });
  }
  openNewDialog(): void {
    
    const dialogRef = this.dialog.open(PlaceDialog, {
      width: '800px',
      height:'300px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

@Component({
  selector: 'place-dialog',
  templateUrl: 'places-dialog.components.html',
  styleUrls: ['./places.component.scss']
})


export class PlaceDialog  {

  id:number;
  name:string;
  address:string;
  type_id:number;

  locationTypes:LocationType[];
  LocationForm1: FormGroup;
  LocationForm2: FormGroup;
  newLocForm: FormGroup;

  hasStudents: boolean;
  isLinear=true;
  isNew:boolean
  
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<PlaceDialog>,
    public _snackBar : MatSnackBar,
    private locServ: PlaceService,
    @Inject(MAT_DIALOG_DATA) public data: Place) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(){
    this.getLocatinType()
    if(this.data != null){
      this.isNew = false
      this.id = this.data.location_id
      this.name = this.data.name;
      this.address = this.data.address;
      this.type_id = this.data.type.type_id
      this.newLocForm = new FormGroup({
        "location":new FormControl(this.name),    
        "address":new FormControl(this.address),
        "type":new FormControl(this.type_id),
       })
    }
    else{
      this.isNew=true;
      this.name=null;
      this.address=null;
      this.type_id=null;
      this.LocationForm1=this.formBuilder.group({
        "location":[this.name, Validators.required],    
        "address":[this.address, Validators.required]
       })
       this.LocationForm2=this.formBuilder.group({
        "type":[this.type_id, Validators.required]
       })
    }
   }
   getLocatinType(){
    this.locServ.getLocationType()
      .subscribe((data)=>{
        this.locationTypes = data
      },(error) => this._snackBar.open("Error", error.statusText, {
        duration: 2000,  
       }
      ));
  }
  createNewLoc(){
    var part1= this.LocationForm1.value;
    var part2= this.LocationForm2.value;
    var toCreate = {
      address:part1.address,
      location :part1.location,
      type: part2.type
    }
    this.locServ.createOnePlace(toCreate)
      .subscribe((res)=>{
        console.log(res)
        this.dialogRef.close();
      },(error) => this._snackBar.open("Error", error.statusText, {
        duration: 2000,  
       }
      ));
  }
  modifyLoc(){
    var toMod = this.newLocForm.value
     toMod.ID =this.data.location_id,
    this.locServ.modPlace(toMod)
      .subscribe((res)=>{
        console.log(res)
        this.dialogRef.close();
      },(error) => this._snackBar.open("Error", error.statusText, {
        duration: 2000,  
       }
      ));
  }
  deleteLoc(){
    let snackRef= this._snackBar.open("Are you sure?", "DELETE", {duration:1500});
      snackRef.onAction().subscribe(()=>{
        this.locServ.delPlace(this.data.location_id)
          .subscribe((res)=>{
            console.log(res)
            this.dialogRef.close();
          },(error) => this._snackBar.open("Error", "DELETE", {
            duration: 1500,  
          }
          ));
      })
    
  }
    

}

