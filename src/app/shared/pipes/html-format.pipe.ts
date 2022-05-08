import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'htmlformat'
})
export class HtmlFormatPipe implements PipeTransform {

  constructor(
    private sanitizer: DomSanitizer
  ){

  }

  transform(HTMLValue: any, args?: any): any {
    return this.sanitizer.bypassSecurityTrustHtml(HTMLValue);
  }

}
