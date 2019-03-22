import { Http } from '@angular/http';
import { Injectable } from '@angular/core';


@Injectable()
export class RequestsService {

  constructor(private http: Http){}


  // function that send 'GET' request to Google api
  public getLatitudeAndLongitude(countryName: string) {
    return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${countryName}&key=AIzaSyDpLjFOXhx1hMJC7j-E3PevMYplBT9Q0NQ
    `);

  };

  public GetUsersInfo(){
    return this.http.get('https://glacial-escarpment-40412.herokuapp.com/users?_start=0&_end=5');
  }

}
