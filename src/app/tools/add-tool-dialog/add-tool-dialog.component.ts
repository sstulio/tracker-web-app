import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Tool } from '../tool';

@Component({
  selector: 'app-add-tool-dialog',
  templateUrl: './add-tool-dialog.component.html',
  styleUrls: ['./add-tool-dialog.component.scss']
})
export class AddToolDialogComponent implements OnInit {

  newTool: Tool;

  constructor(
    public dialogRef: MatDialogRef<AddToolDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.newTool = new Tool(this.data);
  }

}
