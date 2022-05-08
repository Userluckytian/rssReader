import { Injectable, TemplateRef, ViewContainerRef } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal/modal-ref';
import { NzModalService } from 'ng-zorro-antd/modal/modal.service';
@Injectable({
  providedIn: 'root'
})
export class ModelService {
  viewContainerRef!: ViewContainerRef; // ViewContainerRef 只能注入到组件或指令中，而不能注入到服务(service.ts)中。 中和的解决办法：https://www.yuque.com/yuqueyonghupid8l3/sugz8z/kup592
  constructor(
    private modal: NzModalService,
  ) { }

  /**
   * 模态窗
   *
   * @param {*} title  标题
   * @param {*} component  组件
   * @param {*} param 组件参数
   * @memberof BusinessService
   */
  createModel(title: string | TemplateRef<{}>, component: any, param: any, width: number) {
    // this.modal.create()函数返回对象类型是：NzModalRef，调用 NzModalRef.close(); // 或 NzModalRef.destroy(); 将直接销毁对话框
    const modelView: NzModalRef = this.modal.create({
      nzTitle: title || '详情',
      nzContent: component,
      nzStyle: { top: '100px' },
      nzWidth: width,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: param,
      nzOnOk: undefined,
      nzOnCancel: () =>
        new Promise((resolve, reject) => {
          modelView.destroy();
          console.log('The model has been destroyed!')
        }).catch(() => console.log('happen error，model destroy failed!')),
      nzFooter: null, // 设置undefined，会出现默认的设置！
    });
  }

}
