import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MainService } from '../../service/main.service';
import { AccountService } from '../../service/account.service';
import { Router } from '@angular/router';
import { ProfileService } from '../../service/profile.service';
import { DomSanitizer } from '@angular/platform-browser';
declare var $;
@Component({
  selector: '[app-header]',
  templateUrl: './app-header.component.html',
})
export class AppHeader implements AfterViewInit {

  accUser;
  accountInfo = { account_short_name: "", };
  profile = { name: "" };
  imgURL;

  account = { acct_name: 'NA' };
  constructor( private sanitizer: DomSanitizer, private profileService: ProfileService, private router: Router, private accountService: AccountService, public mainService: MainService) { }
  async ngOnInit() {
    //this.accUser = JSON.parse(localStorage.getItem('accUser'));
    $(document).ready(function () {
      $(".dropdown-toggle").dropdown();
    });

   
    this.mainService.profileImageUrl = './assets/img/acc.png'
    // await this.getAcctInfo();
    // await this.getProfileInfo();
    // await this.getUserImage();
    // await this.getAccountImgURL();
    // await this.getAllApprovalStatus();

  }
  async getProfileInfo() {
    var resp = await this.profileService.getUserProfileInfo(this.accUser.user_id);
    if (resp['error'] == false) {
      this.profile = resp.data[0];
    } else {
    }
  }

  async getAccountImgURL() {
    const res = await this.accountService.getAccountImage(this.accUser.b_acct_id);
    if (res) {
      const unsafeImageUrl = window.URL.createObjectURL(res);
      this.imgURL = this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl);
      this.mainService.accountImageUrl = this.imgURL;
    }
  }

  async getAcctInfo() {
    var resp = await this.accountService.getAccountInfo(this.accUser.b_acct_id);
    if (resp['error'] == false) {
      this.accountInfo = resp.data[0];
    } else {
    }
  }
  async getUserImage() {
    const res = await this.profileService.getImage(this.accUser.user_id);
    if (res) {
      const unsafeImageUrl = window.URL.createObjectURL(res);
      this.imgURL = this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl);
      this.mainService.profileImageUrl = this.imgURL;
    }
  }
  ngAfterViewInit() {
  }

 


}
