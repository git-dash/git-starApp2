import { Component, Input } from '@angular/core';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnChanges {
  msg: String;
  totalStars: any[];

  @Input() star: number;
  // @Input() message: string;

  constructor() { }

  ngOnChanges() {
    this.totalStars = new Array(5);
    // this.msg = this.message;
    // console.log(this.message);

  }

}
