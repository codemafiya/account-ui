import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { MainService } from '../../service/main.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { EventService } from '../../service/event.service';
import Swal from 'sweetalert2';
declare var $ : any;
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  constructor(private mainService: MainService, private eventService: EventService, private spinner: NgxSpinnerService) { }
 

  datasource;
  displayedColumns = [ 'event_cd', 'event_desc', 'event_type_cd', 'event_cat_cd', 'action'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  eventTypes=[{code:'P',value:'Purchase'},{code:'S',value:'Sale'}];
  eventCats=[{code:'I',value:'Income'},{code:'E',value:'Expense'}]
  eventObj={};
  async ngOnInit() {
    await this.getAllEvents();
  }
  async getAllEvents(){
    var resp = await this.eventService.getAllEvents();
    console.log(resp);
    if(resp['error'] == false){
      this.datasource = new MatTableDataSource(resp['data']);
      this.datasource.sort = this.sort;
      this.datasource.paginator = this.paginator;
    }else{
      console.log("some error occurred")
    }
  }
  async createEvent(){
    var resp = await this.eventService.createEvent(this.eventObj);
    if(resp['error'] == false){
      await this.getAllEvents();
      Swal.fire("Success","Event Created","success")
    }else{
      Swal.fire("Oops",resp['data'],"error")    }
  }
  async deleteEvent(element){
    console.log(element);
    var resp = await this.eventService.deleteEvent(JSON.stringify(element));
    if(resp['error'] == false){
      this.getAllEvents();
      Swal.fire("Success",resp['data'],"success")

    }else{
      Swal.fire("Oops",resp['data'],"error")
    }

  }
  async updateEvent(){
    var resp = await this.eventService.updateEvent(this.eventObj);
    if(resp['error'] == false){
      await this.getAllEvents();
      Swal.fire("Success","Event Updated","success")
    }else{
      Swal.fire("Oops",resp['data'],"error")    }
  }

  openUpdate(element){
    this.eventObj = element;
    $('.nav-tabs a[href="#tab-7-3"]').tab('show');
  }

  

 

  applyFilter(filterValue: string) {
    this.datasource.filter = filterValue.trim().toLowerCase();
  }

  

}
