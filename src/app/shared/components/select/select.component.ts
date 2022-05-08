import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.less']
})
export class SelectComponent implements OnInit {

  @Input() selectOptions: Array<NzSelectOptionInterface> = [];
  @Output() selectItem = new EventEmitter<any>();
  currentSelectItem: string = ''; // 当前选择的项的FeedUrl！
  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      if (this.selectOptions && this.selectOptions.length > 0) {
        this.currentSelectItem = this.selectOptions[0].value;
      }
    }, 500);
  }

  /**
   * 选择项改变时触发
   *
   * @param {*} $event
   * @memberof SelectComponent
   */
  ngSelectChange($event: string) {
    this.currentSelectItem = $event;
    this.selectItem.emit(this.currentSelectItem);
  }

}
