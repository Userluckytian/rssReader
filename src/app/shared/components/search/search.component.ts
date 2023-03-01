import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit, OnDestroy {

  httpPattern = '([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+'
  rssUrl: string = ''; // rss地址
  rssFeedObser = new Subject<string>();
  @Output() outputAddress = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
    if (sessionStorage.getItem('enterRssLink')) {
      this.rssUrl = sessionStorage.getItem('enterRssLink') as string;
    }
    this.rssFeedObser.pipe(debounceTime(1000))
      .subscribe((rssLink: string) => {
        sessionStorage.setItem('enterRssLink', rssLink.trim());
        this.outputAddress.emit(rssLink.trim())
      })
  }

  /**
   * 获取给定RSS地址的订阅数据
   *
   * @memberof SearchComponent
   */
  getRssData() {
    this.rssFeedObser.next(this.rssUrl)
  }

  ngOnDestroy(): void {
    this.rssFeedObser.unsubscribe();
  }



}
