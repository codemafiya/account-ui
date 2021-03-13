import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { MainService } from './main.service';
@Injectable({
  providedIn: 'root'
})
export class EventService {


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
}