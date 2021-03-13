import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { NgxSpinnerService } from "ngx-spinner";
import { MatSnackBar } from '@angular/material/snack-bar';
import { GoogleLoginProvider, FacebookLoginProvider, AuthService } from 'angular-6-social-login';
import { SocialLoginModule, AuthServiceConfig } from 'angular-6-social-login';
declare var $;
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor( private router: Router, private loginService: LoginService, private spinner: NgxSpinnerService, private snackBar: MatSnackBar, public OAuth: AuthService) { }
  confirmPassword;
  password_login;
  email;
  ind;
  industries;
  password;
  forgotEmail;
  email_login;
  accUser;
  socialusers = {
    provider: String,
    id: String,
    email: String,
    name: String,
    image: String,
    token: String,
    idToken: String
  }
  fperUer
  async ngOnInit() {
    localStorage.removeItem('accUser');
    this.fperUer = JSON.parse(localStorage.getItem('accUser'));

    $(document).ready(function () {
      $('#goRight').on('click', function () {
        $('#slideBox').animate({
          'marginLeft': '0'
        });
        $('.topLayer').animate({
          'marginLeft': '100%'
        });
      });
      $('#goLeft').on('click', function () {
        $('#slideBox').animate({
          'marginLeft': '50%'
        });
        $('.topLayer').animate({
          'marginLeft': '0'
        });
      });
    });
  }
  otp;
  otp_flag = false;
  mobile_number;

  sendOtp() {
    this.otp_flag = true;
  }

  resendOtp() {

  }

  forgetPassWord() {
    $('#forget').modal('show');

  }
  phone_no;
  your_password;
  your_password_flag = false;
  async SubmitForgetPassword() {
    this.your_password = '123456';
    this.your_password_flag = true;

    this.spinner.show();
    var obj = new Object();
    obj['phone_no'] = this.phone_no;
    var resp = await this.loginService.manualloginWithOtp(JSON.stringify(obj));
    if (resp['error'] == false) {
      this.spinner.hide();
      this.your_password = resp['data'][0]['password'];
    } else {
      this.spinner.hide();
    }
  }

  close() {
    $('#forget').modal('hide');
  }
  async LoginWithOtp() {
    if (this.otp == '123456') {
      this.spinner.show();
      var obj = new Object();
      obj['phone_no'] = this.mobile_number;
      console.log(obj);
      var resp = await this.loginService.manualloginWithOtp(obj);
      if (resp['error'] == false) {
        this.spinner.hide();
        this.login = resp['data'];
        localStorage.setItem('accUser', JSON.stringify(this.login));
       
        this.router.navigate(['/index']);
      } else if (resp['error'] == true) {
        this.spinner.hide();
        
      }
    } else {
      this.snackBar.open("OTP Not Match!", "Error", {
        duration: 5000,
      });
    }
  }
  public socialSignIn(socialProvider: string) {
    let socialPlatformProvider;
    if (socialProvider === 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialProvider === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.OAuth.signIn(socialPlatformProvider).then(async socialusers => {
      var obj = Object();
      obj['user_id'] = socialusers['email'];
      obj['email'] = socialusers['email'];
      obj['password'] = '1234567890';
      obj['mode'] = socialProvider;

      this.spinner.show();

      var resp = await this.loginService.signloginwithsocialsiteIn(JSON.stringify(obj));
      if (resp['error'] == false && resp['data'].length > 0) {
        this.spinner.hide();
        localStorage.setItem('ebillUser', JSON.stringify(resp.data[0]));
        this.snackBar.open("Login Successfully", "Success", {
          duration: 5000,
        });

        this.router.navigate(['/env']);



      } else if (resp['data'].length == 0) {
        this.spinner.hide();
        this.snackBar.open("You are Not Registered ", "Error", {
          duration: 5000,
        });

      }
      else {
        this.spinner.hide();
        this.snackBar.open("Login Failed", "Error", {
          duration: 5000,
        });
      }
    });
  }
 
  login

  async Login() {
    this.spinner.show();
    var obj = new Object();
    obj['email'] = this.email;
    obj['user_id'] = this.email;
    obj['mode'] = 'manual';
    obj['password'] = this.password;


    var resp = await this.loginService.manuallogin(JSON.stringify(obj));
    if (resp['error'] == false) {
      this.spinner.hide();
      this.login = resp['data'][0];
      localStorage.setItem('ebillUser', JSON.stringify(this.login));
      // this.total_account = resp['data'];
      // await this.getAllAccount()
      //await this.getAllAssignedComponent();
      this.snackBar.open("Login Successfully", "Success", {
        duration: 5000,
      });
      this.router.navigate(['/index']);
    } else if (resp['error'] == true) {
      this.spinner.hide();
      this.snackBar.open("Login Failed", "Error", {
        duration: 5000,
      });
    }
  }


  async getAllAssignedComponent() {
    var resp = await this.loginService.getUserAccessComponentInfo(this.login.id);
    if (resp['error'] == false) {
      var allComponentCode = [];
      for (let i = 0; i < resp.data.length; i++) {
        allComponentCode.push(resp.data[i]['resource_code']);
      }


      var fperUer1 = JSON.parse(localStorage.getItem('accUser'));

      fperUer1['assigned_component'] = allComponentCode;
      localStorage.setItem('accUser', JSON.stringify(fperUer1));
      // this.mainService.allAssignedComponent = allComponentCode;
    } else {
      var fperUer1 = JSON.parse(localStorage.getItem('accUser'));
      fperUer1['assigned_component'] = [];
      localStorage.setItem('accUser', JSON.stringify(fperUer1));
      // this.mainService.allAssignedComponent = [];
    }
  }

  async sendPass() {
    this.spinner.show();
    var obj = new Object();
    obj['email'] = this.forgotEmail;
    var resp = await this.loginService.forgotPass(obj);
    if (resp['error'] == false) {
      this.spinner.hide();
      this.snackBar.open("Pass Sent Successfully", "Success", {
        duration: 5000,
      });
    } else {
      this.spinner.hide();
      this.snackBar.open(resp['data'], "Error", {
        duration: 5000,
      });

    }
  }
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

  validateMobile(inputtxt) {
    var phoneno = /^\d{10}$/;
    if (inputtxt.value.match(phoneno)) {
      return true;
    }
    else {
      alert("message");
      return false;
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
  async Register() {
    this.spinner.show();
    if (this.confirmPassword !== this.password) {
      this.snackBar.open("Password doesn't match", "Error", {
        duration: 5000,
      });
      this.spinner.hide();
    } else {


      var obj = new Object();
      obj['email'] = this.email;
      obj['password'] = this.password;
      obj['ind_id'] = this.ind.id;
      obj['ind_name'] = this.ind.industry_name;
      var resp = await this.loginService.signUp(obj);

      if (resp['error'] == false) {
        this.spinner.hide();
        this.snackBar.open("Signup Successfully", "Success", {
          duration: 5000,
        });
        this.router.navigate(['/login']);
      } else {
        this.spinner.hide();
        this.snackBar.open("Signup Failed", "Error", {
          duration: 5000,
        });
      }

      this.spinner.hide();


    }



  }



}
