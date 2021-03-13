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
  selector: 'app-tbl',
  templateUrl: './tbl.component.html',
  styleUrls: ['./tbl.component.css']
})
export class TblComponent implements OnInit {

  constructor(private ledgerService: LedgerService,private billService: BillService,private mainService: MainService, private masterDataService: MasterDataService, private spinner: NgxSpinnerService) { }

  async ngOnInit() {
    await this.getTbl();

  }
  tbl=[];
  totaldb=0;
  totalcr=0;
  async getTbl(){
    this.tbl=[];
    var resp = await this.ledgerService.getTbl();
    console.log(resp);
    if(resp['error'] == false){
      var obj={};
      var dt =resp['data'];
      for(var i=0;i<dt.length;i++){
        if(obj[dt[i]['acct_num']] == undefined){
          obj[dt[i]['acct_num']] ={db:0,cr:0};
          
          this.tbl.push(dt[i]);
        }
        if(dt[i]['db_cr_ind'] == 'DB'){
          obj[dt[i]['acct_num']]['db'] +=dt[i]['balance'];
          this.totaldb+=dt[i]['balance']
        }else{
          obj[dt[i]['acct_num']]['cr'] +=dt[i]['balance'];
          this.totalcr+=dt[i]['balance']

        }
        obj[dt[i]['acct_num']]['db']=Number(obj[dt[i]['acct_num']]['db'].toFixed(2));
        obj[dt[i]['acct_num']]['cr']=Number(obj[dt[i]['acct_num']]['cr'].toFixed(2));
        this.totalcr = Number(this.totalcr.toFixed(2));
        this.totaldb = Number(this.totaldb.toFixed(2));

      }
      for(var i=0;i<this.tbl.length;i++){
        this.tbl[i]['cr'] = obj[this.tbl[i]['acct_num']]['cr'];
        this.tbl[i]['db'] = obj[this.tbl[i]['acct_num']]['db'];

      }
      console.log(this.tbl);

    }else{

    }
  }

}
