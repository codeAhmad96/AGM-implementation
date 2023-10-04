import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild(GoogleMap) map!: GoogleMap;
  constructor() { }

  ngOnInit(): void {}

  ngAfterViewInit() {
    // For street view
    const streetView = this.map.getStreetView();
    streetView.setOptions({
      position: { lat: 38.9938386, lng: -77.2515373 },
      pov: { heading: 70, pitch: -10 },
    });

    streetView.setVisible(true);
  }
  // 30.238898158958982, 71.52564286425864
  mapOptions: google.maps.MapOptions = {
    center: { lat: 30.238898158958982, lng: 71.52564286425864 },
    zoom: 14,
    disableDefaultUI: true,
  };

  marker = {
    position: { lat: 30.238898158958982, lng: 71.52564286425864 },
  };
  display: any; // Property to store latitude and longitude data from the map
  // center: google.maps.LatLngLiteral = {
  //   // Initial center coordinates for the map
  //   lat: 31.51679331043587,
  //   lng: 74.35149289364826,
  // };
  zoom = 4; // Initial zoom level for the map
  move(event: google.maps.MapMouseEvent) {
    // Method to handle map click event and update the display property
    if (event.latLng != null) {
      this.display = event.latLng.toJSON();
    }
  }
}
