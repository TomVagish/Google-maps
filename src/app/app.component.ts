import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private http: Http) { }
  title = 'google-maps';

  latitude = 31.046051;
  longitude  = 34.851612;




  ngOnInit() {

  }

  onMapClick(event) {
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;

  }


  getCoords(ThechosenCountry) {

   this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?components=locality:${ThechosenCountry}country:ES&key=AIzaSyDpLjFOXhx1hMJC7j-E3PevMYplBT9Q0NQ`)
    .subscribe((res) => {
     this.setCoords(res.json());
    });
  }

  setCoords(currentCountry) {
    console.log(currentCountry);
    this.latitude = currentCountry.results[0].geometry.location.lat;
    this.longitude = currentCountry.results[0].geometry.location.lng;
  }


}


