import { Component, OnInit } from '@angular/core';
import { WorkerService } from '../worker.service';
import { MatDialog } from '@angular/material';
import { Worker } from '../worker'
import { Location } from '../../locations/location';
import { AddWorkerDialogComponent } from '../add-worker-dialog/add-worker-dialog.component';
import { LocationService } from 'app/locations/location.service';
import { ChangeWorkerLocationDialogComponent } from '../change-worker-location-dialog/change-worker-location-dialog.component';
import { Transition } from 'app/transitions/transition';
import { WorkerHistoryDialogComponent } from '../worker-history-dialog/worker-history-dialog.component';

@Component({
  selector: 'app-worker-list',
  templateUrl: './worker-list.component.html',
  styleUrls: ['./worker-list.component.scss']
})
export class WorkerListComponent implements OnInit {

  locations: Location[] = [];

  constructor(public locationService: LocationService,
    public workerService: WorkerService,
    public dialog: MatDialog) {
    this.locationService = locationService;
  }

  ngOnInit() {
    this.locationService.list().subscribe(locations => {
      this.locations = locations;

      // set location for each worker
      this.locations.forEach(location => {
        location.workers.forEach(worker => worker.location.id = location.id);
      })
    });
  }

  hasWorkers(location: Location): boolean {
    return location.workers && location.workers.length > 0;
  }

  openAddWorkerDialog(location: Location): void {
    const dialogRef = this.dialog.open(AddWorkerDialogComponent, { data: { location: location } });
    dialogRef.afterClosed().subscribe(newWorker => {
      if (newWorker) {
        this.onAddWorkerDialogClosed(newWorker);
      }
    });
  }

  deleteWorker(worker: Worker): void {
    this.workerService.delete(worker.id).subscribe(() => {
      // remove deleted worker from location list
      const location = this.locations.find(location => location.workers.some(t => t.equalsTo(worker)));
      const workerIndex = location.workers.findIndex(t => t.equalsTo(worker));
      location.workers.splice(workerIndex, 1);
    });
  }

  listTransitions(worker: Worker): void {
    this.workerService.listTransitions(worker.id).subscribe(transitions => {
      this.openHistoryDialog(worker, transitions)
    });
  }

  openHistoryDialog(worker: Worker, transitions: Transition[]): void {
    this.dialog.open(WorkerHistoryDialogComponent, { data: { worker: worker, transitions: transitions }, width: '500px' }); 
  }

  openChangeLocationDialog(worker: Worker): void {
    const dialogRef = this.dialog.open(ChangeWorkerLocationDialogComponent, { data: { worker: worker, locations: this.locations }, width: '500px' });
    dialogRef.afterClosed().subscribe(updatedWorker => {
      if (updatedWorker) {
        this.onChangeLocationDialogClosed(updatedWorker);
      }
    });
  }

  onAddWorkerDialogClosed(newWorker: Worker) {
    this.workerService.add(newWorker).subscribe(worker => {
      this.locations.find(l => l.id === newWorker.location.id).workers.push(worker);
    });
  }

  onChangeLocationDialogClosed(updatedWorker: Worker) {
    this.workerService.update(updatedWorker).subscribe(worker => {

      // remove updated worker from old location list
      const oldLocation = this.locations.find(location => location.workers.some(t => t.equalsTo(worker)));
      const workerIndex = oldLocation.workers.findIndex(t => t.equalsTo(updatedWorker));
      oldLocation.workers.splice(workerIndex, 1);

      // add updated worker to new location list
      this.locations.find(
        location => location.id === updatedWorker.location.id).workers.push(worker);
    });
  }

}
