import { Component, Input, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-guest-list',
  templateUrl: './guest-list.component.html',
  styleUrls: ['./guest-list.component.css']
})
export class GuestListComponent implements OnChanges {
  @Input() dataSrc: any;
  guestColumns: any;
  guestDataSource: any;
  constructor() { }

  ngOnChanges() {
    // console.log(this.dataSrc);
    // console.log(this.displayedColumns);

    this.guestDataSource = new MatTableDataSource(this.dataSrc);
    this.guestColumns = environment.appGuestListTableColumns;
  }

}
