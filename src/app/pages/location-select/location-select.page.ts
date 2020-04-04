import { Component, OnInit } from '@angular/core';
import { Map, latLng, tileLayer, Layer, marker} from 'leaflet';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import {NativeGeocoder, NativeGeocoderOptions} from '@ionic-native/native-geocoder/ngx';
import * as L from 'leaflet';

@Component({
  selector: 'app-location-select',
  templateUrl: './location-select.page.html',
  styleUrls: ['./location-select.page.scss'],
})
export class LocationSelectPage implements OnInit {

  map: Map;
  listUid: string;
  returnPage: string;
  lat: number;
  lng: number;
  marker: L.Marker;

  constructor(private geocoder: NativeGeocoder, private router: Router,
              private route: ActivatedRoute) {
   }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.returnPage = params.returnPage;
      this.listUid = params.listUid;
      this.lat = params.lat;
      this.lng = params.lng;
    });
  }

  ionViewDidEnter(){
    this.loadMap();
  }

  loadMap(){
    setTimeout(() => {
      this.map = new Map('map').setView([this.lat, this.lng], 8);
      this.map.on('click', (e)=>{
        this.onMapClick(e);
      });

      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
         // tslint:disable-next-line
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        minZoom:10,
        maxZoom: 18,
      }).addTo(this.map);
    }, 50);
  }

  onMapClick(e) {
    this.lat = e.latlng.lat;
    this.lng = e.latlng.lng;
    let marker: any = L.marker([this.lat, this.lng]);
    let markerGroup = L.featureGroup();
    markerGroup.clearLayers();
    L.circle(marker.getLatLng(), 5).addTo(this.map);
    markerGroup.addLayer(marker);
    this.router.navigate([this.returnPage], { queryParams: { listUid: this.listUid, lat: this.lng, lng: this.lng} });
  }
}
