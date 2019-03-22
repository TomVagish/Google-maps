import { Component, OnInit} from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { RequestsService } from './requests.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [RequestsService]
})
export class AppComponent implements OnInit  {
  constructor(private modalService: NgbModal, private RequuestService: RequestsService) { }
  title = 'google-maps';

// var for get the current location for each user when the website show up
  location: any ;

  // array for Marking tracks  - in progress
  path = [
    {lat: 31.894756, lng: 34.809322, id: 1}, // Rehovot,israel
    {lat: 32.083333, lng: 34.7999968, id: 2}, // tel-aviv,israel
    {lat: 31.771959, lng: 35.217018, id: 3}, // jerusalem,israel
    {lat: 32.794044, lng: 34.989571, id: 4}, // haifa,israel
    {lat: 31.25181 , lng: 34.7913, id: 5}, // beer-sheva,israel

  ];

  // init location in map !
  latitude = 35.942844;
  longitude =  20.840266;



  // var for search input
  countrysearch: string;

  // var for users request from Rest api!
  usersData: any;
  // hide/show buttons on navbar
  flag = false;
  // var that response on change the zoom of the map
  zoom =  5;

  // alert vars
  notFoundCounetAlert = false;
  usersSetSuccessfullyOnMap = false;

  // var for reference to modal
  modalReference: any;

  // var for progress bar
  progressBarFlag = false;

  ngOnInit() {
 // get the current location of the user and set the lat & lng on google map!
 // ***** NOT WORK IN GOOGLE CHROME WITHOUT SSL ( HTTPS) *****
    if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      this.location = position.coords;
      this.latitude = this.location.latitude;
      this.longitude = this.location.longitude;
      this.zoom = 10;
    });
 }

  }


// response to open the modal,save ref to modal for close from different function!
  open(content) {
    this.modalReference = this.modalService.open(content);

  }





// when Mapclick occur the new coords set in lat & lng  Vars !
  onMapClick(event) {

    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;

  }



// request to google api with the choosen country from input search, clear form!
  getCoordsFromSearch(form: NgForm) {
     this.countrysearch = form.value.searchCountry;

     this.RequuestService.getLatitudeAndLongitude(this.countrysearch)
     .subscribe((res) => {
     this.setCoords(res.json());
     });

    form.reset();
  }


  // set the lat & lng from response to map, zoom in,
  setCoords(currentCountry) {
// check if google ppi found the country,else show alert!
    if (currentCountry.status !== 'OK') {
      // display alert with 'error' search
      this.notFoundCounetAlert = true;
      setTimeout(() => {
        // hide alert with 'error' search
        this.notFoundCounetAlert = false;
        }, 3000 );
    } else {


       this.latitude = currentCountry.results[0].geometry.location.lat;
       this.longitude = currentCountry.results[0].geometry.location.lng;
       this.zoom = 6;
    }
  }


 // request to users api
  getUsersLocation() {
    // display progress bar
    this.progressBarFlag = true;
      this.RequuestService.GetUsersInfo()
      .subscribe((res) => {
        this.setUsersLocation(res.json());
      });
  }

  // set the users array to local var,zoom out,disable  'get users button'
  setUsersLocation(usersObj) {
    this.usersData = usersObj;
    this.zoom = 1;
    this.flag = true;
    // hide progressbar
    this.progressBarFlag = false;
    // display alert with information
    this.usersSetSuccessfullyOnMap = true;

    setTimeout(() => {
      // hide alert with information
      this.usersSetSuccessfullyOnMap = false;
    }, 10000);

  }




}


