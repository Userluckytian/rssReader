import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RssService {

  RssFeedLists: Array<any> = []; // 订阅的RSS网站的名称
  NewsList: Array<any> = []; // 通过RSS获取的新闻列表

  constructor(
    private http: HttpClient
  ) { }


  /**
   * 获取RSS订阅列表
   *
   * @memberof RssService
   */
  getRssFeedsList() {
    return this.http.get('./assets/config/rssfeed/feedList.json').toPromise();
  }

  /**
   * 获取Rss新闻
   * API Reference: https://rss2json.com/docs
   * @param {string} rssUrl  rss的订阅链接
   * @param {number} [num=5] // 指定获取新闻的数量，默认为5条
   * @memberof RssService
   */
  getRssData(rssUrl: string, num: number = 10) {
    if (rssUrl) {
      const params = {
        rss_url: rssUrl,
        api_key: 'xarpmigxyxhn9wx58ooskgo93xmp2qsoxsrzzw98', // put your api key here
        count: num,
        order_dir: 'desc', // 升序,
        // order_by: 'pubDate', // 升序,
      }
      const rssReqUrl = 'https://api.rss2json.com/v1/api.json'; // 返回json格式数据

      return this.http.get(rssReqUrl, { params }).pipe(catchError((error: any) => {
        throw new Error(error.error.message)
      })).toPromise();
    } else {
      return of(null).toPromise();
      throw new Error("RSS订阅地址无效！");
    }
  }



}
