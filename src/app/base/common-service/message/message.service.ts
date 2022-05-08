import { Injectable, TemplateRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

type status = ('info' | 'error' | 'success' | 'warning');
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(
    private message: NzMessageService,
  ) {

  }

  /**
   * 创建自定义的全局通知
   * @param {string} type info | error | success | warning
   * @param {string | TemplateRef<void>} des 要展示的内容
   * @param {number} duration 展示时间（ms）
   * @memberof KeyWordsEditComponent
   */
  createCusMessage(type: status, des: string | TemplateRef<void>, duration = 1000): void {
    this.message.create(type, des, {
      nzDuration: 1000,
      nzAnimate: false,
    });
  }

  /**
   * 处理接口返回内容
   *
   * @memberof RequireService
   */
  reduceResponce(responce: any) {
    if (responce.code === 1) {
      return responce.data;
    } else {
      this.createCusMessage('error', responce.msg, 3000);
    }
  }

}
