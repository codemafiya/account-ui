import { Component, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { Helpers } from "../helpers";
import { DomSanitizer } from '@angular/platform-browser';
import { MainService } from '../service/main.service';
import { ProfileService } from '../service/profile.service';
import { LoginService } from '../service/login.service';
import Swal from 'sweetalert2';
@Component({
  selector: '.page-wrapper',
  templateUrl: './layout.component.html',
  encapsulation: ViewEncapsulation.None,
})

export class LayoutComponent implements AfterViewInit {

  constructor(private loginService: LoginService, private profileService: ProfileService, private sanitizer: DomSanitizer, private mainService: MainService) { }

  accUser;
  imgURL;
  codeValueObj={};
  codeValueShowObj={};
  
  async ngOnInit(){
    this.accUser = JSON.parse(localStorage.getItem('accUser'));
    await this.getCodeValues();
  
  }
  async ngAfterViewInit() {

    Helpers.initLayout();
   
  }
  async getCodeValues(){
    var resp = await this.mainService.getCodeValues();
    console.log(resp);
    if(resp['error'] == false){
      var dt = resp['data'];
      var obj={};
      for(var i=0;i<dt.length;i++){
        if(obj[dt[i]['field']] == undefined){
          obj[dt[i]['field']] =[];
        }
        obj[dt[i]['field']].push(dt[i]);
      }
      this.mainService.codeValueTechObj = obj;
      console.log(this.mainService.codeValueTechObj);
    }else{
      Swal.fire("Oops","Error while getting Code Values",'error')
    }
  }


}
