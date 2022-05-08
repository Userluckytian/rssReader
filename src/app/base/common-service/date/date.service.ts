import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
const list = [
  {
    title: '第一条消息',
    createTime: "2020-04-01 13:39:06"
  },
  {
    title: '第二条消息',
    createTime: "2020-04-21 13:39:06"
  },
  {
    title: '第三条消息',
    createTime: "2020-04-20 13:39:06"
  },
  {
    title: '第四条消息',
    createTime: "2020-04-20 15:39:06"
  }
]

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor(
    private datePipe: DatePipe
  ) { }

  /**
   * 格式化日期为字符串
   *
   * @param {Date} date
   * @return {*} 
   * @memberof BusinessService
   */
  formateDateToString(date: Date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  /**
   * 降序
   * https://www.cnblogs.com/taxpolat/p/12744534.html
   * @param {Array<any>} list
   * @memberof DateService
   */
  DateDesc(list: Array<any>) {
    list.sort(function (a, b) {
      return b.createTime < a.createTime ? -1 : 1
    })
  }

  /**
   * 升序
   * https://www.cnblogs.com/taxpolat/p/12744534.html
   * @param {Array<any>} list
   * @memberof DateService
   */
  DateAsc(list: Array<any>) {
    list.sort(function (a, b) {
      return b.createTime < a.createTime ? 1 : -1
    })
  }
}
