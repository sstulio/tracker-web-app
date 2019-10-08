import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Worker } from '../worker';

@Component({
  selector: 'app-add-worker-dialog',
  templateUrl: './add-worker-dialog.component.html',
  styleUrls: ['./add-worker-dialog.component.scss']
})
export class AddWorkerDialogComponent implements OnInit {

  newWorker: Worker;

  constructor(
    public dialogRef: MatDialogRef<AddWorkerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  cancel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.newWorker = new Worker(this.data);
  }

  isFormValid(): boolean {
    return this.newWorker.validate();
  }

}
