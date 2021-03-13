import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Helpers } from "./helpers";
import { DomSanitizer } from '@angular/platform-browser';
import { MainService } from './service/main.service';
import { ProfileService } from './service/profile.service';
import { LoginService } from './service/login.service';
@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class AppComponent implements OnInit, AfterViewInit {
  title = 'app';
  accUser;
  constructor(private loginService: LoginService, private router: Router, private profileService: ProfileService, private sanitizer: DomSanitizer, private mainService: MainService) { }
  isLogin = false;
  async ngOnInit() {
    this.router.events.subscribe((route) => {
      if (route instanceof NavigationStart) {
        Helpers.setLoading(true);
        Helpers.bodyClass('fixed-navbar');
      }
      if (route instanceof NavigationEnd) {
        window.scrollTo(0, 0);
        Helpers.setLoading(false);
        // Initialize page: handlers ...
        Helpers.initPage();
      }

    });

    this.accUser = localStorage.getItem('accUser');
    if (this.accUser == undefined || this.accUser == null) {
      //this.router.navigate(['/overview']);
    } else {
     // await this.getAllAssignedComponent();
    }
  }


  
  imgURL
  ngAfterViewInit() { }





}
