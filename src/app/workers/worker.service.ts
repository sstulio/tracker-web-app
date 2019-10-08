import { Injectable } from '@angular/core';
import { BaseService } from 'app/commons/service/base.service';
import { Worker } from './worker'
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Transition } from 'app/transitions/transition';
import { RESOURCE_ID_URL } from 'app/commons/service/base.service'

@Injectable({
  providedIn: 'root'
})
export class WorkerService extends BaseService<Worker> {

  resource = 'worker'

  constructor(public http: HttpClient) {
    super(http);
  }

  get(id: number): Observable<Worker> {
    return this.getEntity(id).pipe(map(data => {
      return new Worker(data);
    }))
  }

  list(): Observable<Worker[]> {
    return this.listEntity().pipe(
      map(list => list.map(item => new Worker(item))));
  }

  listTransitions(id: number): Observable<Transition[]> {
    return this.http.get<any[]>(`${RESOURCE_ID_URL(this.resource, id.toFixed(0))}/transitions`).pipe(
      map(list => list.map(item => new Transition(item))));
  }

  add(worker: Worker): Observable<Worker> {
    return this.addEntity(worker).pipe(map(data => {
      return new Worker(data);
    }))
  }

  update(worker: Worker): Observable<Worker> {
    return this.updateEntity(worker).pipe(map(data => {
      return new Worker(data);
    }))
  }

  delete(id: number): Observable<Worker> {
    return this.deleteEntity(id).pipe(map(data => {
      return new Worker(data);
    }))
  }

}
