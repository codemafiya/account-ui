import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { MainService } from '../../service/main.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { MasterDataService } from '../../service/master-data.service';
import Swal from 'sweetalert2';
declare var $ : any;
@Component({
  selector: 'app-chart-of-account',
  templateUrl: './chart-of-account.component.html',
  styleUrls: ['./chart-of-account.component.css']
})
export class ChartOfAccountComponent implements OnInit {

  constructor(private mainService: MainService, private masterDataService: MasterDataService, private spinner: NgxSpinnerService) { }
 

  datasource;
  displayedColumns = [ 'lvl1_cd', 'lvl1_desc', 'lvl2_cd', 'lvl2_desc','lvl3_cd', 'lvl3_desc','lvl4_cd', 'lvl4_desc','action'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  eventTypes=[{code:'P',value:'Purchase'},{code:'S',value:'Sale'}];
  eventCats=[{code:'I',value:'Income'},{code:'E',value:'Expense'}]
  accObj={};
  async ngOnInit() {
    await this.getAllAccounts();
  }
  async getAllAccounts(){
    var resp = await this.masterDataService.getAllAccount();
    console.log(resp);
    if(resp['error'] == false){
      this.datasource = new MatTableDataSource(resp['data']);
      this.datasource.sort = this.sort;
      this.datasource.paginator = this.paginator;
    }else{
      console.log("some error occurred")
    }
  }
  async createAccount(){
    var resp = await this.masterDataService.createAccount(this.accObj);
    if(resp['error'] == false){
      await this.getAllAccounts();
      Swal.fire("Success","Account Created","success")
    }else{
      Swal.fire("Oops",resp['data'],"error")    }
  }
  async deleteChartOfAccount(element){
    console.log(element);
    var resp = await this.masterDataService.deleteAccount(JSON.stringify(element));
    if(resp['error'] == false){
      await this.getAllAccounts();
      Swal.fire("Success",resp['data'],"success")

    }else{
      Swal.fire("Oops",resp['data'],"error")
    }

  }
  async updateAccount(){
    var resp = await this.masterDataService.updateAccount(this.accObj);
    if(resp['error'] == false){
      await this.getAllAccounts();
      Swal.fire("Success","Account Updated","success")
    }else{
      Swal.fire("Oops",resp['data'],"error")    }
  }

  openUpdate(element){
    this.accObj = element;
    $('.nav-tabs a[href="#tab-7-3"]').tab('show');
  }

  

 

  applyFilter(filterValue: string) {
    this.datasource.filter = filterValue.trim().toLowerCase();
  }

}
