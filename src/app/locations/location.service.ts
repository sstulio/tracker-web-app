import { Injectable } from '@angular/core';
import { BaseService } from 'app/commons/service/base.service';
import { Location } from './location'
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService extends BaseService<Location> {

  resource = 'location'

  constructor(public http: HttpClient) {
    super(http);
  }

  get(id: number): Observable<Location> {
    return this.getEntity(id).pipe(map(data => {
      return new Location(data);
    }))
  }

  list(): Observable<Location[]> {
    return this.listEntity().pipe(
      map(list => list.map(item => new Location(item))));
  }

  add(location: Location): Observable<Location> {
    return this.addEntity(location).pipe(map(data => {
      return new Location(data);
    }))
  }

  update(location: Location): Observable<Location> {
    return this.updateEntity(location).pipe(map(data => {
      return new Location(data);
    }))
  }

  delete(id: number): Observable<Location> {
    return this.getEntity(id).pipe(map(data => {
      return new Location(data);
    }))
  }

}
