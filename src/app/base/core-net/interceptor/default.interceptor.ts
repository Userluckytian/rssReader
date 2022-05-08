import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse
} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';


const Token = 'zLN0WMdWC28NLY2x3ZCBGCuSDGQMdV6yAX0SE%2FZVEKCa88vNumk2Ehb6QB7KG0Q4tN6mAASXGMPdjuoDYNtv1xW4hdQ%2BVlNTAoGBIKlX7tzqLd4eWoGztA%3D%3D';
/** Pass untouched request through to the next request handler. */
@Injectable()
export class NoopInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    const url = req.url;
    // tslint:disable-next-line: max-line-length
    if (
      (req.url.toString().includes('/geocms')) ||
      (req.url.toString().includes('/GeoCMS')) ||
      (req.url.toString().includes('/geoengine'))
    ) {
      req = req.clone({
        url: `${req.url}?token=${Token}`
      });
    }


    // 服务器响应结果
    return next.handle(req).pipe(tap(event => {
      if (event instanceof HttpResponse) {
        this.handleData(event);
      }
    }, error => {
      this.handleData(error);
    }));

  }

  handleData(event: HttpResponse<any> | HttpErrorResponse): Observable<any> {
    // 业务处理：一些通用操作
    switch (event.status) {
      case 200:
        if (event instanceof HttpResponse) {
          const body: any = event.body;
        }
        break;
      case 401: // 未登录状态码
        console.log('未登录状态码');
        break;
      case 404:
      case 500:
        console.log('后台接口发生错误');
        break;
      default:
        return of(event);
    }
    return of(event);
  }

}