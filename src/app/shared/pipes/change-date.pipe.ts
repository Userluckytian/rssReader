import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'changeDate'
})
export class ChangeDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    moment.locale('zh-cn');
    return moment(value, "yyyy-MM-DD hh:mm:ss").fromNow();
  }
  /**
   * 关于RSS2.0时间的处理：https://blog.csdn.net/weixin_30699443/article/details/99280368
   * DateTime.Now.AddHours(-8).ToString("r")
   */


}
