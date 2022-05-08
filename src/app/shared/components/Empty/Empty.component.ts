import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-Empty',
  templateUrl: './Empty.component.html',
  styleUrls: ['./Empty.component.less']
})
export class EmptyComponent implements OnInit {

  /*
    loading格式：true or false;
    使用：loading值从外界来 
          <ng-template #noDataTemplate>
              <app-Empty [loading]="Loading"></app-Empty>
          </ng-template>
  */
  @Input() loading: boolean = false;
  constructor() { }

  ngOnInit() {
  }
}
