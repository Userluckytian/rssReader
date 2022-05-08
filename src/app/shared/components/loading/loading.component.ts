import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.less']
})
export class LoadingComponent implements OnInit {


  @Input() tip = '加载中...';
  @Input() isLoading = false;

  constructor() { }

  ngOnInit() {
  }

}
