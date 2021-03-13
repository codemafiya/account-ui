import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { MainService } from '../../service/main.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { MasterDataService } from '../../service/master-data.service';
import Swal from 'sweetalert2';
declare var $ : any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private mainService: MainService, private masterDataService: MasterDataService, private spinner: NgxSpinnerService) { }
 

  datasource;
  displayedColumns = [ 'prod_cd', 'prod_desc', 'action'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  eventTypes=[{code:'P',value:'Purchase'},{code:'S',value:'Sale'}];
  eventCats=[{code:'I',value:'Income'},{code:'E',value:'Expense'}]
  prodObj={};
  async ngOnInit() {
    await this.getAllProducts();
  }
  async getAllProducts(){
    var resp = await this.masterDataService.getAllProducts();
    console.log(resp);
    if(resp['error'] == false){
      this.datasource = new MatTableDataSource(resp['data']);
      this.datasource.sort = this.sort;
      this.datasource.paginator = this.paginator;
    }else{
      console.log("some error occurred")
    }
  }
  async createProduct(){
    var resp = await this.masterDataService.createProduct(this.prodObj);
    if(resp['error'] == false){
      await this.getAllProducts();
      Swal.fire("Success","Product Created","success")
    }else{
      Swal.fire("Oops",resp['data'],"error")    }
  }
  async deleteProduct(element){
    console.log(element);
    var resp = await this.masterDataService.deleteProduct(JSON.stringify(element));
    if(resp['error'] == false){
      this.getAllProducts();
      Swal.fire("Success",resp['data'],"success")

    }else{
      Swal.fire("Oops",resp['data'],"error")
    }

  }
  async updateProduct(){
    var resp = await this.masterDataService.updateProduct(this.prodObj);
    if(resp['error'] == false){
      await this.getAllProducts();
      Swal.fire("Success","Product Updated","success")
    }else{
      Swal.fire("Oops",resp['data'],"error")    }
  }

  openUpdate(element){
    this.prodObj = element;
    $('.nav-tabs a[href="#tab-7-3"]').tab('show');
  }

  

 

  applyFilter(filterValue: string) {
    this.datasource.filter = filterValue.trim().toLowerCase();
  }

}
