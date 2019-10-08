import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Tool } from '../tool';
import { Transition } from 'app/transitions/transition';

@Component({
  selector: 'app-tool-history-location-dialog',
  templateUrl: './tool-history-dialog.component.html',
  styleUrls: ['./tool-history-dialog.component.scss']
})
export class ToolHistoryDialogComponent implements OnInit {

  tool: Tool;
  transitions: Transition[];

  constructor(
    public dialogRef: MatDialogRef<ToolHistoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.tool = Object.assign({}, this.data.tool);
    this.transitions = this.data.transitions;
  }

  hasTransitions() {
    return this.transitions.length > 0
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
