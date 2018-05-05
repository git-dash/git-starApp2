import { Component, OnChanges, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  // selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnChanges {

  feedbackForm: FormGroup;
  totalStars = new Array(5);
  star = 3;
  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<FeedbackComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.feedbackForm = this._formBuilder.group({
      'message': [null, Validators.required],
      'rating': [this.star, Validators.required]
    });
  }



  ngOnChanges() {


    // this.searchForm = this._formBuilder.group({
    //   'maxPeople': [1, Validators.required]
    // });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
