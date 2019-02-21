import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private http: Http, private modalService: NgbModal) { }
  title = 'google-maps';


  // init location in map = Israel!
  latitude = 31.046051;
  longitude  = 34.851612;

  // var for search input
  countrysearch: string;

  // var for users request from Rest api!
  usersData: any;
  flag = false;
  zoom: number = 8;


    closeResult: string;

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


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

  getCoordsfromsearch() {
    this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?components=locality:${this.countrysearch}country:ES&key=AIzaSyDpLjFOXhx1hMJC7j-E3PevMYplBT9Q0NQ`)
    .subscribe((res) => {
     this.setCoords(res.json());
    });
    this.countrysearch = '';
  }


  setCoords(currentCountry) {
    this.latitude = currentCountry.results[0].geometry.location.lat;
    this.longitude = currentCountry.results[0].geometry.location.lng;
  }



  getUsersLocation(){
      this.http.get('https://glacial-escarpment-40412.herokuapp.com/users')
      .subscribe((res)=>{
        this.setUsersLocation(res.json());
      })
  }

  setUsersLocation(usersObj) {
    this.usersData = usersObj;
    this.zoom = 1;
    this.flag = true;

  }

}


