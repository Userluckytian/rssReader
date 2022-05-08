import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
  name: 'fontcolor'
})
export class FontColorPipe implements PipeTransform {
  // 使用：<div class="top" [innerHTML]="item.name | fontcolor: SearchWords"></div>
  constructor(private sanitizer: DomSanitizer) {
  }
  transform(val: string, keyword: string): any {
    const Reg = new RegExp(keyword, 'i');
    if (val) {
      const res = val.replace(Reg, `<span style="color: #1077E9;">${keyword}</span>`);
      return this.sanitizer.bypassSecurityTrustHtml(res);
    }
  }

}
