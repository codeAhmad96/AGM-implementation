import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
  display: any; // Property to store latitude and longitude data from the map
  center: google.maps.LatLngLiteral = {
    // Initial center coordinates for the map
    lat: 31.51679331043587,
    lng: 74.35149289364826,
  };
  zoom = 4; // Initial zoom level for the map
  move(event: google.maps.MapMouseEvent) {
    // Method to handle map click event and update the display property
    if (event.latLng != null) {
      this.display = event.latLng.toJSON();
    }
  }
}
