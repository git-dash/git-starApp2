import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeVideo'
})
export class SafeVideoPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }
  transform(videoSource) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(videoSource);
  }

}
