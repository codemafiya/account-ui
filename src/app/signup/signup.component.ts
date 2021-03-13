import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { NgForm } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { LoginService } from '../service/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

declare var $: any;
import { GoogleLoginProvider, FacebookLoginProvider, AuthService } from 'angular-6-social-login';
import { SocialLoginModule, AuthServiceConfig } from 'angular-6-social-login';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  error = undefined;



  constructor( private snackBar: MatSnackBar, private router: Router, private loginService: LoginService, private spinner: NgxSpinnerService, public toastr: ToastrManager, public OAuth: AuthService, ) { }
  confirmPassword;
  password_login;
  email;
  pin;
  obj;
  ind;
  industries;
  password;
  socialusers = {
    provider: String,
    id: String,
    email: String,
    name: String,
    image: String,
    token: String,
    idToken: String
  }
  email_login;
  forgotEmail
  async ngOnInit() {
    localStorage.removeItem('accUser');
    $('body').addClass('empty-layout bg-silver-300');
  }


  // async signup(){
  //   var flag=true;
  //   if(this.ValidateEmail(this.email) && this.password == this.confirmPassword){
  //     var obj = new Object();
  //     obj['email'] = this.email;
  //     obj['password'] = this.password;
  //     var resp = await this.userService.signup(obj);
  //     if (resp['error'] == false) {
  //       this.spinner.hide();
  //       this.toastr.successToastr('Signup Successfull');
  //       this.router.navigate(['/login']);

  //     } else {
  //       this.spinner.hide();
  //       this.toastr.errorToastr(resp['data'], 'Oops!');
  //     }
  //   }else{
  //     this.toastr.errorToastr("Either email is not correct or password does not match", 'Oops!');

  //   }

    
     
  // }
  async verify() {
    this.spinner.show();
    this.error = undefined;
    if (!(this.ValidateEmail(this.email))) {
      return;
    }
    if (!(this.validatePassword(this.password))) {
      return;
    }

    if (this.confirmPassword !== this.password) {
      this.error = 'Password does not match'
      this.spinner.hide();
    } else {
      //$('#myModal').modal('show');

     

      
    }



  }

  // async Register() {
  //   this.spinner.show();
  //   this.error = undefined;
  //   if (this.obj['otp'] == this.pin) {

  //     var resp = await this.userService.signup(this.obj);

  //     if (resp['error'] == false) {
  //       this.spinner.hide();
  //       this.toastr.successToastr('Signup Sucessfull');
  //       $('#myModal').modal('hide');
  //       this.router.navigate(['/login']);
  //     } else {
  //       this.spinner.hide();
  //       $('#myModal').modal('hide');
  //       this.toastr.errorToastr(resp['data'], 'Oops!');
  //     }

  //     this.spinner.hide();

  //   }
  //   else {
  //     this.spinner.hide();
  //     this.toastr.errorToastr('Incorrect OTP', 'Oops!');

  //   }




  // }

  ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true)
    } else {
      this.snackBar.open("Email is not in correct format!", "Error", {
        duration: 5000,
      });
 
      return (false)
    }
  }

  validatePassword(newPassword) {
    var minNumberofChars = 6;
    var regularExpression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (newPassword.length < minNumberofChars) {
      this.snackBar.open("Password length is not at least 6!", "Error", {
        duration: 5000,
      });


      return false;
    } else if (!regularExpression.test(newPassword)) {
      this.snackBar.open("Password should contain atleast one number and one special character!", "Error", {
        duration: 5000,
      });
   

      return false;
    } else {
      return true;
    }
  }

  async sendPass() {
    this.spinner.show();
    var obj = new Object();
    obj['email'] = this.forgotEmail;
    var resp = await this.loginService.forgotPass(obj);
    if (resp['error'] == false) {
      this.spinner.hide();
      this.toastr.successToastr(resp['data']);
    } else {
      this.spinner.hide();
      this.toastr.errorToastr(resp['data']);

    }
  }


  // public socialSignIn(socialProvider: string) {
  //   let socialPlatformProvider;
  //   if (socialProvider === 'facebook') {
  //     socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
  //   } else if (socialProvider === 'google') {
  //     socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
  //   }

  //   this.OAuth.signIn(socialPlatformProvider).then(async socialusers => {
 
  //     var obj = Object();
  //     obj['user_id'] = socialusers['email'];
  //     obj['email'] = socialusers['email'];
  //     obj['password'] = '1234567890';
  //     obj['mode'] = socialProvider;

  //     this.spinner.show();

  //     var resp = await this.userService.signup(obj);
  //     if (resp['error'] == false) {
  //       this.spinner.hide();
  //       this.toastr.successToastr('Signup Sucessfull');
  //       this.router.navigate(['/login']);
  //     } else {
  //       this.spinner.hide();
  //       this.toastr.errorToastr(resp['data'], 'Oops!');
  //     }
  //   });
  // }

  ngOnDestroy() {
    $('body').removeClass('empty-layout bg-silver-300');
  }



}
