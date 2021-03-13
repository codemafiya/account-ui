import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { MainService } from './main.service';
@Injectable({
  providedIn: 'root'
})
export class BpService {


  httpUrl;
  constructor(private http: HttpClient, private main: MainService) {
    
    this.httpUrl = this.main.httpUrl ;
  }
  async getAllBp() {
    const resp = await this.http.get<any>(this.main.httpUrl + '/bp/getAllBp').toPromise().then(res => {
      return res;
    });
    return resp;

  }
  async searchLiability(obj) {
    const resp = await this.http.get<any>(this.main.httpUrl + '/bp/searchLiability'+JSON.stringify(obj)).toPromise().then(res => {
      return res;
    });
    return resp;

  }
  async deleteBp(obj) {
    const resp = await this.http.delete<any>(this.main.httpUrl + '/bp/deleteBp'+obj).toPromise().then(res => {
      return res;
    });
    return resp;

  }
  async createBp(obj) {
    const resp = await this.http.post<any>(this.main.httpUrl + '/bp/createBp',obj).toPromise().then(res => {
      return res;
    });
    return resp;

  }
  async updateBp(obj) {
    const resp = await this.http.put<any>(this.main.httpUrl + '/bp/updateBp',obj).toPromise().then(res => {
      return res;
    });
    return resp;

  }
}