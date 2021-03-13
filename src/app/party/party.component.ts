import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { MainService } from '../service/main.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { MasterDataService } from '../service/master-data.service';
import Swal from 'sweetalert2';
declare var $ : any;

@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.css']
})
export class PartyComponent implements OnInit {

  constructor(private mainService: MainService, private masterDataService: MasterDataService, private spinner: NgxSpinnerService) { }
 

  datasource;
  displayedColumns = ['id','party_legal_name','party_email', 'party_phone_no','per_addr', 'party_gstin_no','action'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  // eventTypes=[{code:'P',value:'Purchase'},{code:'S',value:'Sale'}];
  // eventCats=[{code:'I',value:'Income'},{code:'E',value:'Expense'}]
  partyObj={};
  async ngOnInit() {
    await this.getAllParty();
  }
  async getAllParty(){
    var resp = await this.masterDataService.getAllParty();
    //console.log(resp);
    if(resp['error'] == false){
      this.datasource = new MatTableDataSource(resp['data']);
      this.datasource.sort = this.sort;
      this.datasource.paginator = this.paginator;
    }else{
      Swal.fire("Oops","Error occurred while getting party list","error")
    }
  }
  async createParty(){
    var resp = await this.masterDataService.createParty(this.partyObj);
    if(resp['error'] == false){
      await this.getAllParty();
      Swal.fire("Success","Party Created","success")
    }else{
      Swal.fire("Oops",resp['data'],"error")    }
  }
  async deleteParty(element){
    //console.log(element);
    var obj = {id:element['id']}
    var resp = await this.masterDataService.deleteParty(JSON.stringify(obj));
    if(resp['error'] == false){
      this.getAllParty();
      Swal.fire("Success",resp['data'],"success")

    }else{
      Swal.fire("Oops",resp['data'],"error")
    }

  }
  async updateParty(){
    var resp = await this.masterDataService.updateParty(this.partyObj);
    if(resp['error'] == false){
      await this.getAllParty();
      Swal.fire("Success","Party Updated","success")
    }else{
      Swal.fire("Oops",resp['data'],"error")    }
  }

  openUpdate(element){
    this.partyObj = element;
    $('.nav-tabs a[href="#tab-7-3"]').tab('show');
  }

  

 

  applyFilter(filterValue: string) {
    this.datasource.filter = filterValue.trim().toLowerCase();
  }

}
