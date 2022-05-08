import { Component, ElementRef, ViewChild } from '@angular/core';
import { MessageService } from './base/common-service/message/message.service';
import { RssService } from './base/common-service/rss/rss.service';
import { ThemeService } from './base/core-net/theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  webSiteTitle: string = ''; // 订阅的RSS网站的名称
  NewsList: Array<any> = []; // 通过RSS获取的新闻列表
  NewsFeedList: Array<any> = []; // 新闻feed列表
  isLoading: boolean = false; // 是否正在加载？
  @ViewChild('downfile') aLinkDom!: ElementRef;
  constructor(
    private themeService: ThemeService,
    private rssService: RssService,
    private _messageService: MessageService,
  ) { }

  ngOnInit() {
    this.getRssData();
  }

  /**
   * 更换主题
   *
   * @memberof WelcomeComponent
   */
  toggleTheme() {
    this.themeService.toggleTheme().then();
  }
  /**
   * 获取RSS数据
   *
   * @memberof HomeComponent
   */
  getRssData() {
    this.isLoading = true;
    this.rssService.getRssFeedsList().then((list: any) => {
      this.NewsFeedList = list.NewsFeeds;
      this.getRssDataByLink(this.NewsFeedList[0].value);
    });
  }

  /**
   * 获取RSS订阅消息
   * （获取image返回403的解决办法：https://www.bbsmax.com/A/o75NZ8Ke5W/）
   * @memberof HomeComponent
   */
  async getRssDataByLink(rssLink: string, num: number = 10) {
    const rssJsonData: any =
      await this.rssService.getRssData(rssLink, num)
        .catch((error: any) => {
          this.isLoading = false;
          this._messageService.createCusMessage('error', error, 3000);
          throw new Error(error);
        })
    this.isLoading = false;
    this.webSiteTitle = rssJsonData.feed.title;
    this.NewsList = rssJsonData.items;
    console.log(this.NewsList);
  }


  /**
   * 更换Rss信息
   *
   * @param {string} rssLink
   * @memberof HomeComponent
   */
  changeNews(rssLink: string) {
    this.isLoading = true;
    this.getRssDataByLink(rssLink);
  }

  /**
   * 展示自己输入的订阅地址的RSS新闻
   *
   * @param {string} rssLink
   * @memberof HomeComponent
   */
  showCustomRssNews(rssLink: string) {
    this.changeNews(rssLink);
  }

  /**
   * 打开RSSLink网址
   *
   * @memberof HomeComponent
   */
  openNewTab() {
    window.open("https://www.yuque.com/pocv40/alcg2a/zgnuwd")
    // let linkDom = this.aLinkDom.nativeElement;
    // linkDom.href = "https://www.yuque.com/pocv40/alcg2a/zgnuwd";
    // linkDom.click();
  }

}
