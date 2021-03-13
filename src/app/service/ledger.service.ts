import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { MainService } from './main.service';
@Injectable({
  providedIn: 'root'
})
export class LedgerService {
    httpUrl;
    constructor(private http: HttpClient, private main: MainService) {
      
      this.httpUrl = this.main.httpUrl ;
    }
    async getTrialBalance() {
      const resp = await this.http.get<any>(this.main.httpUrl + '/jrnl/getTrialBalance').toPromise().then(res => {
        return res;
      });
      return resp;
  
    }
    async getTbl() {
      const resp = await this.http.get<any>(this.main.httpUrl + '/jrnl/getTbl').toPromise().then(res => {
        return res;
      });
      return resp;
  
    }
    async getAccounts() {
        const resp = await this.http.get<any>(this.main.httpUrl + '/jrnl/getAccounts').toPromise().then(res => {
          return res;
        });
        return resp;
    
      }
    async deleteBill(obj) {
      const resp = await this.http.delete<any>(this.main.httpUrl + '/bill/deleteBill'+obj).toPromise().then(res => {
        return res;
      });
      return resp;
  
    }
    async createJrnl(obj) {
      const resp = await this.http.post<any>(this.main.httpUrl + '/jrnl/createJrnl',obj).toPromise().then(res => {
        return res;
      });
      return resp;
  
    }
    async updateBill(obj) {
      const resp = await this.http.put<any>(this.main.httpUrl + '/bill/updateBill',obj).toPromise().then(res => {
        return res;
      });
      return resp;
  
    }
}