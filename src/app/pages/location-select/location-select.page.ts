import { UtilsService } from './../../services/utils.service';
import { Component, OnInit } from '@angular/core';
import { Map, latLng, tileLayer, Layer, marker, icon} from 'leaflet';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import {NativeGeocoder, NativeGeocoderOptions} from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';
import * as L from 'leaflet';

@Component({
  selector: 'app-location-select',
  templateUrl: './location-select.page.html',
  styleUrls: ['./location-select.page.scss'],
})
export class LocationSelectPage implements OnInit {

  map: Map;
  listUid: string;
  todoUid: string;
  returnPage: string;
  lat: number;
  lng: number;
  pickupLocation: string;
  marker: L.Marker;

  constructor(private geocoder: NativeGeocoder,
              private router: Router,
              private route: ActivatedRoute,
              private geolocation: Geolocation,
              private utilsService: UtilsService,
              private platform: Platform) {
   }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.returnPage = params.returnPage;
      this.listUid = params.listUid;
      this.todoUid = params.todoUid;
      this.lat = params.lat;
      this.lng = params.lng;
      this.pickupLocation = params.pickupLocation;
      if (this.lat || this.lng) {
        this.platform.ready().then(() => {
          this.geolocation.getCurrentPosition().then((resp) => {
            this.lat = resp.coords.latitude;
            this.lng = resp.coords.longitude;
            this.pickupLocation = this.getAddress(this.lat, this.lng);
            this.utilsService.showToaster('Lat : ' + this.lat + ' , Lng : ' + this.lng + ' , addr : ' + this.pickupLocation, 2000);
            this.locatePosition();
          }).catch((error) => {
            this.utilsService.showToaster('Error getting location : ' + error, 2000);
          });
        });
      }

    });
  }

  // Function used at startup to show map
  ionViewDidEnter() {
    this.loadMap();
  }

  loadMap() {
    setTimeout(() => {
      // Grenoble as default position
      this.map = new Map('map').setView([45.1847640338382, 5.733318328857423], 13);
      this.map.on('click', (e) => {
        this.onMapClick(e);
      });

      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
         // tslint:disable-next-line
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        minZoom: 2,
        maxZoom: 30,
      }).addTo(this.map);
    }, 50);
  }


  onMapClick(e) {
    this.lat = e.latlng.lat;
    this.lng = e.latlng.lng;
    this.pickupLocation = this.getAddress(this.lat, this.lng);
    this.utilsService.showToaster('Lat : ' + this.lat + ' , Lng : ' + this.lng, 1000);
    this.locatePosition();
  }

  // This may be the function to change location in the map
  // https://medium.com/@bviveksingh96/using-leaflet-with-ionic-4-f7acbd1c2464
  locatePosition() {
    if (!this.marker) {
      this.marker = marker([this.lat, this.lng], {
        icon: icon({
          iconSize: [ 25, 41 ],
          iconAnchor: [ 13, 41 ],
          iconUrl: 'leaflet/marker-icon.png',
          shadowUrl: 'leaflet/marker-shadow.png'
      })});
    } else {
      this.marker.setLatLng(new L.LatLng(this.lat, this.lng));
    }
    this.marker.bindPopup('<p>Lat : ' + this.lat + ' , Lng : ' + this.lng + '</p>').openPopup();
    this.map.addLayer(this.marker);
    this.map.flyTo(new L.LatLng(this.lat, this.lng));
  }

  select(): void {
    this.router.navigate([this.returnPage], { queryParams: {listUid: this.listUid, lat: this.lng, lng: this.lng,
                                                            todoUid: this.todoUid, pickupLocation: this.pickupLocation}});
  }

  getAddress(lat: number, long: number): string {
    const options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
    this.geocoder.reverseGeocode(lat, long, options).then(results => {
      return Object.values(results[0]).reverse();
    });
    return null;
  }

  /** Remove map when we have multiple map object */
  ionViewWillLeave() {
    this.map.remove();
  }
}
