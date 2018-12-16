import { Component, OnInit } from '@angular/core';
import { ToolService } from '../tool.service';
import { MatDialog } from '@angular/material';
import { Tool } from '../tool'
import { Location } from '../../locations/location';
import { AddToolDialogComponent } from '../add-tool-dialog/add-tool-dialog.component';
import { LocationService } from 'app/locations/location.service';

@Component({
  selector: 'app-tool-list',
  templateUrl: './tool-list.component.html',
  styleUrls: ['./tool-list.component.scss']
})
export class ToolListComponent implements OnInit {

  locations: Location[] = [];

  constructor(public locationService: LocationService,
              public toolService: ToolService,
              public dialog: MatDialog) {
    this.locationService = locationService;
  }

  ngOnInit() {

    this.locationService.list().subscribe( locations => {
      this.locations = locations;
    });
  }

  hasTools (location: Location): boolean {
    return location.tools && location.tools.length > 0;
  }

  openAddToolDialog(location: Location): void {
    const dialogRef = this.dialog.open(AddToolDialogComponent, { data: { location: location}});
    dialogRef.afterClosed().subscribe(tool => {
      this.onAddToolDialogClosed(tool);
    });
  }

  onAddToolDialogClosed(newTool: Tool) {
    this.toolService.add(newTool).subscribe(tool => {
      this.locations.find(l => l.equalsTo(newTool.location)).tools.push(tool);
    });
  }

}
