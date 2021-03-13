import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { MainService } from '../../service/main.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { MasterDataService } from '../../service/master-data.service';
import { BillService } from '../../service/bill.service';
import { LedgerService } from '../../service/ledger.service';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import Swal from 'sweetalert2';
declare var $ : any;

@Component({
  selector: 'app-ge',
  templateUrl: './ge.component.html',
  styleUrls: ['./ge.component.css']
})
export class GeComponent implements OnInit {

  constructor(private ledgerService: LedgerService,private billService: BillService,private mainService: MainService, private masterDataService: MasterDataService, private spinner: NgxSpinnerService) { }

  async ngOnInit() {
    await this.getAllParty();
    await this.getAccounts();
  }
  partyObj={}
  allParty=[]
  async getAllParty(){
    var resp = await this.masterDataService.getAllParty();
    if(resp['error'] == false){
      this.allParty = resp['data'];
      for(var i=0;i<this.allParty.length;i++){
        this.allParty[i]['party_desc'] = this.allParty[i]['party_legal_name'] + " - "+this.allParty[i]['party_phone_no'];
      }
    }else{
      Swal.fire("Oops","Error occurred while getting party list","error")
    }
  }
  allAccounts=[]
  async getAccounts(){
    var resp = await this.ledgerService.getAccounts();
    console.log(resp);
    if(resp['error'] == false){
      this.allAccounts = resp['data'];
      for(var i=0;i<this.allAccounts.length;i++){
        this.allAccounts[i]['acct_desc']=this.allAccounts[i]['lvl4_cd']+" - "+this.allAccounts[i]['lvl4_desc']
      }
    }else{
      Swal.fire("Oops","Error occurred while getting account list","error")
    }
  }
  jrnl={jrnl_type:"MANUAL",ledger_cat:'A',lines:[]}
  changeParty(){
    for(var i=0;i<this.allParty.length;i++){
      if(this.allParty[i]['id'] == this.jrnl['party_id']){
        this.partyObj = this.allParty[i];
      }
    }
  }
  addLine(){
    this.jrnl['lines'].push({});
  }
  deleteLine(i){
    this.jrnl['lines'].splice(i,1);
  }
  async submit(){
    console.log(this.jrnl);
    var obj={jrnl:[]};
    for(var i=0;i<this.jrnl.lines.length;i++){
      var ob = Object.assign({},this.jrnl.lines[i]);
      ob['party_id'] = this.jrnl['party_id'] 
      ob['jrnl_desc'] = this.jrnl['jrnl_desc'] 

      ob['acct_dt'] = this.jrnl['acct_dt'] 
      ob['ledger_cat'] = this.jrnl['ledger_cat'] 
      ob['jrnl_type'] = this.jrnl['jrnl_type'] ;
      obj.jrnl.push(ob);

    }
    console.log(obj);
    var resp = await this.ledgerService.createJrnl(obj);
    console.log(resp);
    if(resp['error'] == false){
      Swal.fire("Success","Journal Posted","success")
    }else{
      Swal.fire("Oops","Some Error Occurred","error")

    }

  }


}
