import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgForOf } from '@angular/common';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  constructor(private http: Http, private modalService: NgbModal) { }
  title = 'google-maps';

// var for get the current location for each user when the website show up
  location: any ;

  // init location in map = Israel!
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
  modalReference: any ;

  ngOnInit() {
 // get the current location of the user and set the lat & lng on google map!
    if(navigator.geolocation){
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
    this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?components=locality:${this.countrysearch}country:ES&key=AIzaSyDpLjFOXhx1hMJC7j-E3PevMYplBT9Q0NQ`)
    .subscribe((res) => {
     this.setCoords(res.json());
    });

    form.reset();
  }


  // set the lat & lng from response to map, zoom in,
  setCoords(currentCountry) {
// check if google ppi found the country,else show alert!
    if (currentCountry.status === 'ZERO_RESULTS') {
      this.notFoundCounetAlert = true;
      setTimeout(() => {
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
      this.http.get('https://glacial-escarpment-40412.herokuapp.com/users?_start=0&_end=2')
      .subscribe((res) => {
        this.setUsersLocation(res.json());
      });
  }

  // set the users array to local var,zoom out,disable  'get users button'
  setUsersLocation(usersObj) {
    this.usersData = usersObj;
    this.zoom = 1;
    this.flag = true;
    this.usersSetSuccessfullyOnMap = true;

    setTimeout(() => {
      this.usersSetSuccessfullyOnMap = false;
    }, 10000);

  }

// function that get the latitude & longitude from modal and set them in map & close modal!
  userInModal(lat, lng) {

    this.modalReference.close();

    setTimeout(() => {
      this.latitude = lat + 1;
      this.longitude = lng + 1;

    }, 1000);



  }

}


