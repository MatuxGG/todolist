import { UtilsService } from './../../services/utils.service';
import { Component, OnInit } from '@angular/core';
import { Map, latLng, tileLayer, Layer, marker} from 'leaflet';
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
      if (this.lat || this.lng) {
        this.platform.ready().then(() => {
          this.geolocation.getCurrentPosition().then((resp) => {
            this.lat = resp.coords.latitude;
            this.lng = resp.coords.longitude;
            this.pickupLocation = this.getAddress(this.lat, this.lng);
            this.utilsService.showToaster('Lat : ' + this.lat + ' , Lng : ' + this.lng + ' , addr : ' + this.pickupLocation, 2000);
            this.loadMap();
          }).catch((error) => {
            this.utilsService.showToaster('Error getting location : ' + error, 2000);
          });
        });
      }

    });
  }

  // Function used at startup so commenting it
  // But to decomment after update position works
  /*ionViewDidEnter() {
    this.loadMap();
  }*/

  loadMap() {
    setTimeout(() => {
      this.map = new Map('map').setView([this.lat, this.lng], 8);
      this.map.on('click', (e) => {
        this.onMapClick(e);
      });

      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
         // tslint:disable-next-line
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        minZoom: 10,
        maxZoom: 18,
      }).addTo(this.map);
    }, 50);
  }


  onMapClick(e) {
    this.lat = e.latlng.lat;
    this.lng = e.latlng.lng;
    // tslint:disable-next-line: no-shadowed-variable
    const marker: any = L.marker([this.lat, this.lng]);
    const markerGroup = L.featureGroup();
    markerGroup.clearLayers();
    L.circle(marker.getLatLng(), 5).addTo(this.map);
    markerGroup.addLayer(marker);
    this.utilsService.showToaster('Lat : ' + this.lat + ' , Lng : ' + this.lng + ' , addr : ' + this.pickupLocation, 2000);
    this.router.navigate([this.returnPage], { queryParams: {listUid: this.listUid, lat: this.lng, lng: this.lng,
                                                            todoUid: this.todoUid, pickupLocation: this.pickupLocation}});
  }

  // This may be the function to change location in the map
  // https://medium.com/@bviveksingh96/using-leaflet-with-ionic-4-f7acbd1c2464
  locatePosition() {
    this.map.locate({ setView: true }).on('locationfound', (e: any) => {
      const newMarker = marker([this.lat, this.lng], {
        draggable: true
      }).addTo(this.map);
      newMarker.bindPopup('You are located here!').openPopup();
      this.getAddress(e.latitude, e.longitude);
      newMarker.on('dragend', () => {
        const position = newMarker.getLatLng();
        this.getAddress(position.lat, position.lng);
      });
    });
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
}
