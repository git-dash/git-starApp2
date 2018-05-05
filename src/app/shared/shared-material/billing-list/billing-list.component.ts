import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-billing-list',
  templateUrl: './billing-list.component.html',
  styleUrls: ['./billing-list.component.css']
})
export class BillingListComponent implements OnChanges {

  @Input() dataSrc: any;
  displayedColumns: any;
  dataSource: any;
  constructor() { }

  ngOnChanges() {
    // console.log(this.dataSrc);
    // console.log(this.displayedColumns);

    this.dataSource = new MatTableDataSource(this.dataSrc);
    this.displayedColumns = environment.appBillingListTableColumns;
  }

}
