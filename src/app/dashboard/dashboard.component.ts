import { Component, OnInit, ElementRef } from '@angular/core';

import { NgxSpinnerService } from "ngx-spinner";
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { ScriptLoaderService } from '../_services/script-loader.service';
import { LedgerService } from '../service/ledger.service';

declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 
  constructor(private ledgerService:LedgerService,private _script: ScriptLoaderService, private spinner: NgxSpinnerService
   ) { }
  accUser;
  async ngOnInit() {

    this.accUser = JSON.parse(localStorage.getItem('accUser'));
    await this.getTrialBalance()
  }
  income=0;
  expense=0;
  async getTrialBalance(){
    var resp = await this.ledgerService.getTrialBalance();
    console.log(resp);
    if(resp['error'] == false){
      var dt = resp['data'];
      for(var i=0;i<dt.length;i++){
        if(dt[i]['acct_num'] == '1411'){
          this.income+=dt[i]['balance']
        }
        if(dt[i]['acct_num'] == '1511'){
          this.expense+=dt[i]['balance'];

        }
      }
    }else{

    }
  }
  ngAfterViewInit() {
    this._script.load('./assets/js/scripts/dashboard_1_demo.js');
  }
 


}
