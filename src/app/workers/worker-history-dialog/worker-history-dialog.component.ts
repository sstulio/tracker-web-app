import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Worker } from '../worker';
import { Location } from '../../locations/location';
import { Transition } from 'app/transitions/transition';

@Component({
  selector: 'app-worker-history-location-dialog',
  templateUrl: './worker-history-dialog.component.html',
  styleUrls: ['./worker-history-dialog.component.scss']
})
export class WorkerHistoryDialogComponent implements OnInit {

  worker: Worker;
  transitions: Transition[];

  constructor(
    public dialogRef: MatDialogRef<WorkerHistoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.worker = Object.assign({}, this.data.worker);
    this.transitions = this.data.transitions;
  }

  hasTransitions() {
    return this.transitions.length > 0
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
