import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { MainService } from './main.service';
@Injectable({
  providedIn: 'root'
})
export class MasterDataService {


  httpUrl;
  constructor(private http: HttpClient, private main: MainService) {
    
    this.httpUrl = this.main.httpUrl ;
  }
  async getAllEvents() {
    const resp = await this.http.get<any>(this.main.httpUrl + '/event/getAllEvent').toPromise().then(res => {
      return res;
    });
    return resp;

  }
  async deleteEvent(obj) {
    const resp = await this.http.delete<any>(this.main.httpUrl + '/event/deleteEvent'+obj).toPromise().then(res => {
      return res;
    });
    return resp;

  }
  async createEvent(obj) {
    const resp = await this.http.post<any>(this.main.httpUrl + '/event/createEvent',obj).toPromise().then(res => {
      return res;
    });
    return resp;

  }
  async updateEvent(obj) {
    const resp = await this.http.put<any>(this.main.httpUrl + '/event/updateEvent',obj).toPromise().then(res => {
      return res;
    });
    return resp;

  }
  async getAllProducts() {
    const resp = await this.http.get<any>(this.main.httpUrl + '/product/getAllProducts').toPromise().then(res => {
      return res;
    });
    return resp;

  }
  async deleteProduct(obj) {
    const resp = await this.http.delete<any>(this.main.httpUrl + '/product/deleteProduct'+obj).toPromise().then(res => {
      return res;
    });
    return resp;

  }
  async createParty(obj) {
    const resp = await this.http.post<any>(this.main.httpUrl + '/party/createParty',obj).toPromise().then(res => {
      return res;
    });
    return resp;

  }
  async updateParty(obj) {
    const resp = await this.http.put<any>(this.main.httpUrl + '/party/updateparty',obj).toPromise().then(res => {
      return res;
    });
    return resp;

  }
  async getAllParty() {
    const resp = await this.http.get<any>(this.main.httpUrl + '/party/getAllparty').toPromise().then(res => {
      return res;
    });
    return resp;

  }
  async deleteParty(obj) {
    const resp = await this.http.delete<any>(this.main.httpUrl + '/party/deleteParty'+obj).toPromise().then(res => {
      return res;
    });
    return resp;

  }
  async createProduct(obj) {
    const resp = await this.http.post<any>(this.main.httpUrl + '/product/createProduct',obj).toPromise().then(res => {
      return res;
    });
    return resp;

  }
  async updateProduct(obj) {
    const resp = await this.http.put<any>(this.main.httpUrl + '/product/updateProduct',obj).toPromise().then(res => {
      return res;
    });
    return resp;

  }
  async updateAccount(obj) {
    const resp = await this.http.put<any>(this.main.httpUrl + '/account/updateAccount',obj).toPromise().then(res => {
      return res;
    });
    return resp;

  }
  async createAccount(obj) {
    const resp = await this.http.post<any>(this.main.httpUrl + '/account/createAccount',obj).toPromise().then(res => {
      return res;
    });
    return resp;

  }
  async getAllAccount() {
    const resp = await this.http.get<any>(this.main.httpUrl + '/account/getAllAccount').toPromise().then(res => {
      return res;
    });
    return resp;

  }
  async deleteAccount(obj) {
    const resp = await this.http.delete<any>(this.main.httpUrl + '/account/deleteAccount'+obj).toPromise().then(res => {
      return res;
    });
    return resp;

  }
}