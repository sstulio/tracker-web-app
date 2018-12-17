import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Tool } from '../tool';
import { Location } from '../../locations/location';

@Component({
  selector: 'app-change-location-dialog',
  templateUrl: './change-location-dialog.component.html',
  styleUrls: ['./change-location-dialog.component.scss']
})
export class ChangeLocationDialogComponent implements OnInit {

  tool: Tool;
  locations: Location[];
  oldLocation: Location;

  constructor(
    public dialogRef: MatDialogRef<ChangeLocationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.tool = Object.assign({}, this.data.tool);
    this.locations = this.data.locations;
    this.oldLocation = this.locations.find(l => l.id === this.data.tool.location.id);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  isFormValid(): boolean {
    return this.oldLocation.id === this.tool.location.id;
  }

}
