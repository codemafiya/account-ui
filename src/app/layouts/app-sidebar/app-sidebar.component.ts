import { Component } from '@angular/core';
import { MainService } from '../../service/main.service';
import { ProfileService } from '../../service/profile.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: '[app-sidebar]',
  templateUrl: './app-sidebar.component.html'
})
export class AppSidebar {

  user_id;
  user_email;
  imgURL;
  accUser

  constructor(private router: Router, private profileService: ProfileService, private sanitizer: DomSanitizer, private mainService: MainService) { }

  profile = {
    acc_id: 0,
    acct_name: "NONE",
    address1: "UNKNOWN",
    address2: "UNKNOWN",
    country: "UNKNOWN",
    creation_date: "2019-09-24T05:53:03.000Z",
    designation: "UNKNOWN",
    email: "UNKNOWN",
    first_name: "Unknown",
    last_name: "Unknown",
    password: "",
    phone_no: 0,
    postal_code: "UNKNOWN",
    city: "UNKNOWN",
    state: "UNKNOWN",
    user_id: 0,
    work_email: "UNKNOWN",
    work_phone_no: "UNKNOWN",
    work_phone_no_country_cd: "+91",
    country_cd: "+91",
    name: "UNKNOWN"
  }
  edit = 0;
  city;
  async ngOnInit() {

    //this.accUser = JSON.parse(localStorage.getItem('accUser'));
    //this.user_id = this.accUser.user_id;
    this.imgURL = './assets/img/acc.png';
    //await this.getUserInfo();
  }
  async getUserInfo(){
    var resp = await this.profileService.getUserProfileInfo(this.accUser.user_id);
    if(resp['error'] == false){
      this.profile = resp['data'][0];
    }else{
      
    }
  }

}