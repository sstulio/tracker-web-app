import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Worker } from '../worker';
import { Location } from '../../locations/location';

@Component({
  selector: 'app-change-worker-location-dialog',
  templateUrl: './change-worker-location-dialog.component.html',
  styleUrls: ['./change-worker-location-dialog.component.scss']
})
export class ChangeWorkerLocationDialogComponent implements OnInit {

  worker: Worker;
  locations: Location[];
  oldLocation: Location;

  constructor(
    public dialogRef: MatDialogRef<ChangeWorkerLocationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.worker = Object.assign({}, this.data.worker);
    this.locations = this.data.locations;
    this.oldLocation = this.locations.find(l => l.id === this.data.worker.location.id);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  isFormValid(): boolean {
    return this.oldLocation.id === this.worker.location.id;
  }

}
