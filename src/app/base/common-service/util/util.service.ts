import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';


@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  /**
     * 从对象数组中提取属性值作为数组
     *
     * @param {Array<any>} ObjArray 对象数组！
     * @param {string} key 字段名
     * @return {*}  {Array<any>}
     * @memberof ArrayObjOperationService
     */
  getNewArrayFromObjArray(ObjArray: Array<any>, key: string): Array<any> {
    return _.map(ObjArray, key);
  }

  /**
   *Array变为Select下拉的Options选项
   *
   * @param {Array<any>} Array 数组
   * @param {string} [labelKey] select需要的label值
   * @param {string} [valueKey] select对象需要的value值
   * @return {*}  {Array<any>}
   * @memberof ArrayObjOperationService
   */
  arrayToSelectOptions(Array: Array<any>, labelKey?: string, valueKey?: string): Array<NzSelectOptionInterface> {
    const tempSelectOptions: Array<NzSelectOptionInterface> = [];
    if (labelKey && valueKey) {
      Array.forEach(element => {
        tempSelectOptions.push(
          { label: element[labelKey] || null, value: element[valueKey] }
        );
      });
    } else {
      Array.forEach(element => {
        tempSelectOptions.push(
          { label: element, value: element }
        );
      });
    }
    return tempSelectOptions;
  }

}
