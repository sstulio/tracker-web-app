import { Component, OnInit } from '@angular/core';
import { Location } from '../location';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent implements OnInit {

  locations: Location[];
  newLocation: Location;

  constructor(public locationService: LocationService) {
    this.locationService = locationService;
  }

  ngOnInit() {
    this.newLocation = new Location();
    this.locationService.list().subscribe(locations => {
      this.locations = locations;
    });
  }

  addLocation() {
    if (this.newLocation.name) {
      this.locationService.add(this.newLocation).subscribe(location => {
        this.newLocation = new Location();
        this.locations.push(location);
      });
    }
  }

}
