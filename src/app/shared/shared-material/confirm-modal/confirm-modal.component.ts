import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  // selector: 'confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {
  constructor( @Inject(MAT_DIALOG_DATA) public data: any) {

    // data.name = 'Coming From Movie';

  }
  ngOnInit() {


  }


}
