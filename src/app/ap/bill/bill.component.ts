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
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {

  constructor(private ledgerService: LedgerService,private billService: BillService,private mainService: MainService, private masterDataService: MasterDataService, private spinner: NgxSpinnerService) { }
 

  datasource;
  displayedColumns = [ 'id','bill_desc','bill_dt', 'party_id', 'bill_amt','status','action'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  billObj={lines:[],notes:[]}
  prodObj={};
  allProds=[];
  allParty=[]
  async ngOnInit() {
    await this.getAllProducts();
    await this.getAllParty();
    await this.getAllBill();
    
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
  addLine(){
    this.billObj['lines'].push({});
  }
  deleteLine(i){
    this.billObj['lines'].splice(i,1);
  }
  changeLine(i){
    var obj = this.billObj.lines[i];
    if(this.billObj.lines[i]['price']!=undefined && this.billObj.lines[i]['quantity']!=undefined){
      this.billObj.lines[i]['subtotal'] = this.billObj.lines[i]['price'] * this.billObj.lines[i]['quantity'];
    }
    if(this.billObj.lines[i]['subtotal']!=undefined && this.billObj.lines[i]['gst']!=undefined){
      this.billObj.lines[i]['total'] = Number((this.billObj.lines[i]['subtotal']+(this.billObj.lines[i]['subtotal'] * this.billObj.lines[i]['gst']/100)).toFixed(2));
    }
  }
  addNote(){
    this.billObj['notes'].push({});
  }
  deleteNote(i){
    this.billObj['notes'].splice(i,1);
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
      await this.getAllBill()
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
      await this.getAllBill()
      Swal.fire("Success","Bill Updated","success");
    }else{
      Swal.fire("Oops","Some Error Occurred","error");

    }
  }
  async getAllProducts(){
    var resp = await this.masterDataService.getAllProducts();
    //console.log(resp);
    if(resp['error'] == false){
      this.allProds = resp['data'];
      for(var i=0;i<this.allProds.length;i++){
        this.prodObj[this.allProds[i]['prod_cd']] = this.allProds[i]['prod_desc'];
      }
      // this.datasource = new MatTableDataSource(resp['data']);
      // this.datasource.sort = this.sort;
      // this.datasource.paginator = this.paginator;
    }else{
      Swal.fire("Oops","Error while getting products List","error")
    }
  }
  async getAllBill(){
    var resp = await this.billService.getAllBill();
    //console.log(resp);
    if(resp['error'] == false){
    
      this.datasource = new MatTableDataSource(resp['data']);
      this.datasource.sort = this.sort;
      this.datasource.paginator = this.paginator;
    }else{
      Swal.fire("Oops","Error while getting Bill","error")
    }
  }

  async deleteBill(element){
    //console.log(element);
    var obj = new Object();
    obj['id'] = element['id'];
    var resp = await this.billService.deleteBill(JSON.stringify(obj));
    if(resp['error'] == false){
      await this.getAllBill();
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
        this.partyObjInfo[this.allParty[i]['id']] = this.allParty[i]['party_desc']
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
    obj['db_cr_ind']='DB';
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
    obj1['db_cr_ind']='CR';
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
  print(element){
    console.log(element)
    var lines = JSON.parse(element['data'])['lines'];
    var notes = JSON.parse(element['data'])['notes'];
    console.log(notes);
    //console.log(lines);
    var txt = 'Real Data Online Bill'
      var dd = {
        pageSize: 'A4',
        header: function (currentPage, pageCount) {
          var obj = { text: txt , alignment: 'center', margin: [72, 40],bold: true };
          return obj;
        },

        pageOrientation: 'portrait',

        pageMargins: [40, 60, 40, 60],
        content: [
        ]
      };
      var header0 = {
        columns: [
          {
            width: '*',
            text: 'VENDOR BILL',
            bold: true,
            alignment: 'center'
          }

        ],
      }
      var header1 = {
        columns: [
          {
            width: '*',
            text: 'Bill Id :',
            bold: true
          },

          {
            width: '*',
            text: element['id']
          },
          {
            width: '*',
            text: 'Bill Date :',
            bold: true
          },

          {
            width: '*',
            text: element['bill_dt'].split('T')[0]
          }

        ],
      }
      var header2 = {
        columns: [
          {
            width: '*',
            text: 'Bill Description :',
            bold: true
          },
          {
            width: '*',
            text: element['bill_desc']


          },
          {
            width: '*',
            text: 'Party :',
            bold: true
          },

          {
            width: '*',
            text: this.partyObjInfo[element['party_id']]
          }
        ],
      }
      var header3 = {
        columns: [

          {
            width: '*',
            text: 'Bill Amount :',
            bold: true
          },
          {
            width: '*',
            text: element['bill_amt']
          },
          {
            width: '*',
            text: '',
            bold: true
          },
          {
            width: '*',
            text: ''
          }
        ],
      }
      var header4 = {
        columns: [

          {
            width: '*',
            text: 'Accountant Sign. :',
            bold: true
          },
          {
            width: '*',
            text: ''
          },
          {
            width: '*',
            text: 'Vendor Sig. :',
            bold: true
          },
          {
            width: '*',
            text: ''
          }
        ],
      }
     
      dd.content.push({ canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 0.05 }] });
      dd.content.push({ text: " " });
      dd.content.push(header0);
      dd.content.push({ text: " " });
      dd.content.push({ canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 0.05 }] });
      dd.content.push({ text: " " });
      dd.content.push(header1);
      dd.content.push({ text: " " });
      dd.content.push(header2);
      dd.content.push({ text: " " });
      dd.content.push(header3);
      dd.content.push({ text: " " });
    
      dd.content.push({ canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 0.05 }] });
      var tbl = {

        // layout: 'lightHorizontalLines',
        fontSize: 10,
        table: {

          headerRows: 1,
          widths: ['*', '*', '*', '*', '*', '*', '*'],
          body: [
            ['SNO', 'Product', 'Price', 'Quantity', { text: 'Sub Total', alignment: 'right' }, 'GST', { text: 'Total', alignment: 'right' }]
          ],

        }
      };
      dd.content.push(tbl);
      for (var i = 0; i < lines.length; i++) {
        var arr = []
        arr.push(i+1);
        arr.push(this.prodObj[lines[i]['prod_cd']]);
        arr.push({text:lines[i]['price'], alignment: 'right' });
        arr.push({text:lines[i]['quantity'], alignment: 'right' });
        arr.push({ text: lines[i]['subtotal'], alignment: 'right' });
        arr.push({text:lines[i]['gst'], alignment: 'right' });
        arr.push({ text: lines[i]['total'], alignment: 'right' });
        dd.content[dd.content.length - 1].table.body.push(arr);
      }
      dd.content.push({ text: " " });

      dd.content.push({ canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 0.05 }] });
      dd.content.push({ text: " " });

      dd.content.push(header4);
      dd.content.push({ text: " " });
      dd.content.push({ text: "Note :",bold: true });
      dd.content.push({ text: " " });
      for(var i=0;i<notes.length;i++){
        dd.content.push({ text: i+1+". "+notes[i]['note'] });
      }
      //this.spinner.hide()
      pdfMake.createPdf(dd).download("bill");

  }

  

 

  applyFilter(filterValue: string) {
    this.datasource.filter = filterValue.trim().toLowerCase();
  }

}
