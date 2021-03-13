import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { MainService } from '../../service/main.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { MasterDataService } from '../../service/master-data.service';
import { BillService } from '../../service/bill.service';
import { BpService } from '../../service/bp.service';

import { LedgerService } from '../../service/ledger.service';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import Swal from 'sweetalert2';
declare var $ : any;
@Component({
  selector: 'app-bp',
  templateUrl: './bp.component.html',
  styleUrls: ['./bp.component.css']
})
export class BpComponent implements OnInit {

  constructor(private bpService:BpService,private ledgerService: LedgerService,private billService: BillService,private mainService: MainService, private masterDataService: MasterDataService, private spinner: NgxSpinnerService) { }
 

  datasource;
  displayedColumns = [ 'id','bp_desc','bp_dt', 'party_id', 'acct_no','bank','ifsc','pan_no','party_phone_no','bp_amt','org_bank','status','action'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  billObj={lines:[],notes:[]}
  bpObj={};
  table;
  allParty=[]
  async ngOnInit() {
   
    await this.getAllParty();
    await this.getAllBp();
    
    $(document).ready(function () {
      $('#dtBasicExample1').DataTable();
      $('.dataTables_length').addClass('bs-select');
    });
    
  }
  partyObj={}
  partyObjInfo={}
  changeParty(){
    for(var i=0;i<this.allParty.length;i++){
      if(this.allParty[i]['id'] == this.billObj['party_id']){
        this.partyObj = this.allParty[i];
      }
    }
    if(this.billObj['remark'] =='' || this.billObj['remark'] == undefined){
      this.billObj['remark'] = "Bill of "+this.partyObj['party_desc']
    }
  }
  
  async createBill(){
    console.log(this.billObj);
    var obj = new Object();
    obj['party_id'] = this.billObj['party_id'];
    obj['bill_desc'] = this.billObj['remark'];
    obj['bill_amt'] =0;
    var tempObj={lines: this.billObj['lines'],notes: this.billObj['notes']}
    obj['data'] = JSON.stringify(tempObj);
    for(var i=0;i<this.billObj['lines'].length;i++){
      obj['bill_amt']+=this.billObj['lines'][i]['total'];
    }
    obj['bill_amt'] =  Number(obj['bill_amt'].toFixed(2));
    this.billObj['bill_amt'] = obj['bill_amt'];
    var resp = await this.billService.createBill(obj);
    if(resp['error'] == false){
      await this.process(this.billObj,resp['id'])
      await this.getAllBp()
      Swal.fire("Success","Bill Created","success");
    }else{
      Swal.fire("Oops","Some Error Occurred","error");

    }
  }
  async updateBill(){
    console.log(this.billObj);
    var obj = new Object();
    obj['party_id'] = this.billObj['party_id'];
    obj['bill_desc'] = this.billObj['remark'];
    obj['id'] = this.billObj['id'];
    obj['bill_dt'] = this.billObj['bill_dt'].split('T')[0];
    obj['bill_amt'] =0;
    var tempObj={lines: this.billObj['lines'],notes: this.billObj['notes']}
    obj['data'] = JSON.stringify(tempObj);
    for(var i=0;i<this.billObj['lines'].length;i++){
      obj['bill_amt']+=this.billObj['lines'][i]['total'];
    }
    obj['bill_amt'] =  Number(obj['bill_amt'].toFixed(2));
    this.billObj['bill_amt'] = obj['bill_amt'];

    console.log(obj);
    var resp = await this.billService.updateBill(obj);
    if(resp['error'] == false){
      await this.getAllBp()
      Swal.fire("Success","Bill Updated","success");
    }else{
      Swal.fire("Oops","Some Error Occurred","error");

    }
  }
  
  async getAllBp(){
    var resp = await this.bpService.getAllBp();
    console.log(resp);
    if(resp['error'] == false){
    
      this.datasource = new MatTableDataSource(resp['data']);
      this.datasource.sort = this.sort;
      this.datasource.paginator = this.paginator;
    }else{
      Swal.fire("Oops","Error while getting Bp","error")
    }
  }

  async deleteBp(element){
    //console.log(element);
    var obj = new Object();
    obj['id'] = element['id'];
    var resp = await this.bpService.deleteBp(JSON.stringify(obj));
    if(resp['error'] == false){
      await this.getAllBp();
      Swal.fire("Success",resp['data'],"success");

    }else{
      Swal.fire("Oops",resp['data'],"error");
    }

  }
  async getAllParty(){
    var resp = await this.masterDataService.getAllParty();
    //console.log(resp);
    if(resp['error'] == false){
      this.allParty = resp['data'];
      for(var i=0;i<this.allParty.length;i++){
        this.allParty[i]['party_desc'] = this.allParty[i]['party_legal_name'] + " - "+this.allParty[i]['party_phone_no'];
        this.partyObjInfo[this.allParty[i]['id']] = this.allParty[i];
      }
    }else{
      Swal.fire("Oops","Error occurred while getting party list","error")
    }
  }
  async process(billObj,id){
    console.log(billObj);
    var obj = new Object();
    obj['jrnl_desc']=billObj['remark'];
    obj['jrnl_type']='AUTO';
    obj['ledger_cat']='A';
    obj['acct_dt']='2020-10-10';//
    obj['ppd']='2020-10-10';//
    obj['jrnl_line_id']='1';
    obj['jrnl_line_desc']='Credit to Liability';
    obj['db_cr_ind']='CR';
    obj['txn_amt']=billObj['bill_amt'];
    obj['event_type']='BILL';
    obj['event_id']=id;
    obj['party_id']=billObj['party_id'];
    obj['acct_num']=1211;
    var obj1 = new Object();
    obj1['jrnl_desc']=billObj['remark'];
    obj1['jrnl_type']='AUTO';
    obj1['ledger_cat']='A';
    obj1['acct_dt']='2020-10-10';//
    obj1['ppd']='2020-10-10';//
    obj1['jrnl_line_id']='1';
    obj1['jrnl_line_desc']='Debited to Expense';
    obj1['db_cr_ind']='DB';
    obj1['txn_amt']=billObj['bill_amt'];
    obj1['event_type']='BILL';
    obj1['event_id']=id;
    obj1['party_id']=billObj['party_id'];
    obj1['acct_num']=1511;

    var ob = new Object();
    ob['jrnl'] = [];
    ob['jrnl'].push(obj);
    ob['jrnl'].push(obj1);
    console.log(ob);
    var resp = await this.ledgerService.createJrnl(ob);
    console.log(resp);
    if(resp['error'] == false){

    }else{

    }

   
  }
  openUpdate(element){
    console.log(element);
    this.billObj =Object.assign({},element);
    var dt = JSON.parse(this.billObj['data']);
    this.billObj['lines'] = dt['lines'];
    this.billObj['notes'] = dt['notes'];
    this.billObj['remark'] = this.billObj['bill_desc'];
    this.billObj['party_id'] = Number(this.billObj['party_id'] );
    this.changeParty();
    $('.nav-tabs a[href="#tab-7-3"]').tab('show');
  }
  allLiability=[]
  async searchLiability(){
    this.allLiability ==[]
    var obj = new Object();
    obj['party_id'] = this.bpObj['party_id'];
    obj['acct_num'] = '1211';
    console.log(obj)
    var resp = await this.bpService.searchLiability(obj);
    console.log(resp);
    if(resp['error'] == false){
      this.allLiability = resp['data'];
      $('#m').modal('show');
      $(document).ready(function () {
        $('#dtBasicExample').DataTable();
        $('.dataTables_length').addClass('bs-select');
      });
     
    }else{
      Swal.fire('','Error occurred during finding liability','error')
    }


  }
  rows=[]
  selectedRows(){
    console.log(this.allLiability);
    for(var i=0;i<this.allLiability.length;i++){
      if(this.allLiability[i]['checked'] == true){
        this.rows.push(this.allLiability[i]);
      }
    }
    console.log(this.rows);
    
    $('#dtBasicExample1').DataTable().ajax.reload();;


    $('#m').modal('hide');
  }
  deleteLine(i){
    this.rows.splice(i,1);
    $(document).ready(function () {
      $('#dtBasicExample1').DataTable();
      $('.dataTables_length').addClass('bs-select');
    });
  }

  

 

  applyFilter(filterValue: string) {
    this.datasource.filter = filterValue.trim().toLowerCase();
  }

}
