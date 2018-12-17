import { Component, OnInit } from '@angular/core';
import { ToolService } from '../tool.service';
import { MatDialog } from '@angular/material';
import { Tool } from '../tool'
import { Location } from '../../locations/location';
import { AddToolDialogComponent } from '../add-tool-dialog/add-tool-dialog.component';
import { LocationService } from 'app/locations/location.service';
import { ChangeLocationDialogComponent } from '../change-location-dialog/change-location-dialog.component';

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
    this.locationService.list().subscribe(locations => {
      this.locations = locations;

      // set location for each tool
      this.locations.forEach(location => {
        location.tools.forEach(tool => tool.location.id = location.id);
      })
    });
  }

  hasTools(location: Location): boolean {
    return location.tools && location.tools.length > 0;
  }

  openAddToolDialog(location: Location): void {
    const dialogRef = this.dialog.open(AddToolDialogComponent, { data: { location: location } });
    dialogRef.afterClosed().subscribe(newTool => {
      if (newTool) {
        this.onAddToolDialogClosed(newTool);
      }
    });
  }

  openChangeLocationDialog(tool: Tool): void {
    const dialogRef = this.dialog.open(ChangeLocationDialogComponent, { data: { tool: tool, locations: this.locations }, width: '500px' });
    dialogRef.afterClosed().subscribe(updatedTool => {
      if (updatedTool) {
        this.onChangeLocationDialogClosed(updatedTool);
      }
    });
  }

  onAddToolDialogClosed(newTool: Tool) {
    this.toolService.add(newTool).subscribe(tool => {
      this.locations.find(l => l.id === newTool.location.id).tools.push(tool);
    });
  }

  onChangeLocationDialogClosed(updatedTool: Tool) {
    this.toolService.update(updatedTool).subscribe(tool => {

      // remove updated tool from old location list
      const oldLocation = this.locations.find(location => location.tools.some(t => t.equalsTo(tool)));
      const toolIndex = oldLocation.tools.findIndex(t => t.equalsTo(updatedTool));
      oldLocation.tools.splice(toolIndex, 1);

      // add updated tool to new location list
      this.locations.find(
        location => location.id === updatedTool.location.id).tools.push(tool);
    });
  }

}
