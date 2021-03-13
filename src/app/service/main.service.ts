import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainService {
 
  //httpUrl = 'http://139.59.61.84:3002';
  httpUrl = 'http://127.0.0.1:3001';
  constructor(private http: HttpClient) {
  }
 
  profileImageUrl;
  accountImageUrl;
  userprofileImageUrl;
  codeValueShowObj={};
  codeValueTechObj={};
  accountInfo={};
  userInfo={};
  taskcount=0;
  allAssignedComponent;
  componentCode;
  async getCodeValues(){
    const resp = await this.http.get<any>(this.httpUrl + '/codevalue/getCodeValues').toPromise().then(res => {
      return res;
    });
    return resp;
  }


  
}
