import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild('search') public searchElementRef!: ElementRef;
  @ViewChild(GoogleMap) public map!: GoogleMap;

  ngZone: any;
  latitude: number | undefined;
  longitude: number | undefined;
  center!: { lat: any; lng: any };
  constructor() {}

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
  }

  ngAfterViewInit() {
    ///////// For Search Area

    // Binding autocomplete to search input control
    let autocomplete = new google.maps.places.Autocomplete(
      this.searchElementRef.nativeElement
    );
    // Align search box to center
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(
      this.searchElementRef.nativeElement
    );
    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();

        //verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }
        console.log({ place }, place.geometry.location?.lat());

        //set latitude, longitude and zoom
        this.latitude = place.geometry.location?.lat();
        this.longitude = place.geometry.location?.lng();
        this.center = {
          lat: this.latitude,
          lng: this.longitude,
        };
      });
    });
  }
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
