import { Component, OnInit, Inject } from '@angular/core';
import { Input } from '@angular/core/src/metadata/directives';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { Video } from '../../../entity/movie';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  // selector: 'app-play-video',
  templateUrl: './play-video.component.html',
  styleUrls: ['./play-video.component.css']
})
export class PlayVideoComponent {
  videoSource: string;

  title: string;
  videos: Array<Video>;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    // year = data.rel
    this.videoSource =
      '//www.youtube.com/embed/YE7VzlLtp-4';

    //  data.videos[0].key;


  }
  playVideo(key) {
    this.videoSource = key;
  }

  changeVideo(key) {
    this.videoSource = key;
  }
}
