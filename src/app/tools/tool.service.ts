import { Injectable } from '@angular/core';
import { BaseService } from 'app/commons/service/base.service';
import { Tool } from './tool'
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolService extends BaseService<Tool> {

  resource = 'tool'

  constructor(public http: HttpClient) {
    super(http);
  }

  get(id: number): Observable<Tool> {
    return this.getEntity(id).pipe(map(data => {
      return new Tool(data);
    }))
  }

  list(): Observable<Tool[]> {
    return this.listEntity().pipe(
      map(list => list.map(item => new Tool(item))));
  }

  add(tool: Tool): Observable<Tool> {
    return this.addEntity(tool).pipe(map(data => {
      return new Tool(data);
    }))
  }

  update(tool: Tool): Observable<Tool> {
    return this.updateEntity(tool).pipe(map(data => {
      return new Tool(data);
    }))
  }

  delete(id: number): Observable<Tool> {
    return this.getEntity(id).pipe(map(data => {
      return new Tool(data);
    }))
  }

}
