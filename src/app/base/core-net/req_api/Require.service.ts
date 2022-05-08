/*
  官方原版：https://www.npmjs.com/package/ngx-envconfig
  Github: https://github.com/kmanaseryan/ngx-envconfig
  Tip：This version is only a DIY version made to adapt to the development architecture and development system of our company
  todo项: 
    （1）防抖还没加入（loading操作实际会和防抖操作冲突。但这里还是保留了防抖操作）
    （2）并且要实现多次重复请求，取消前几次的请求！
*/
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit, OnDestroy, APP_INITIALIZER } from '@angular/core';
import { Observable, of, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment'; //path to your environment files
import { ConstParam } from './const-param';
import { debounceTime, map, mergeMap, switchMap, tap } from "rxjs/operators";
import { ReqAPIOptionsInterface, ReqContentInterface } from './req-type';
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class RequireService extends ConstParam implements OnInit {
  private _config: any; // 自己设置的环境配置文件的配置项
  private _env: any; // 环境变量。无需用户赋值，根据环境变量控制！
  private reqParam$ = new Subject<any>();

  constructor(protected _http: HttpClient) {
    super();
  }

  ngOnInit() {
  }

  load() {
    return new Promise((resolve, reject) => {
      this._env = 'development';
      if (environment.production)
        this._env = 'production';
      console.log('🚀 ~ 当前环境：', this._env);
      this._http.get(environment.config)
        .pipe().subscribe(
          (data: any) => {
            this._config = data;
            resolve(true);
          },
          (error: any) => {
            console.error(error);
            return throwError(error.json().error || 'Server error');
          });
    });
  }

  /**
   * 获取BaseApiRoute
   *
   * @param {string} parentNode  父节点
   * @param {string} childrenNode  子节点
   * @return {*}  {string}
   * @memberof RequireService
   */
  getApi(parentNode: string, childrenNode: string): Observable<any> {
    if (this._config) {
      let parentNodeisExist = _.has(this._config, parentNode);
      if (!parentNodeisExist) {
        throw new Error(`配置项${parentNode}不存在`);
      }
      let childrenNodeisExist = _.has(this._config[parentNode], childrenNode);
      if (!childrenNodeisExist) {
        throw new Error(`配置项${parentNode}上不存在${childrenNode}节点`);
      }
      return of(this._config[parentNode][childrenNode]);
    }
    throw new Error(`未找到接口配置文件`);
  }

  /**
   * 【同步】获取BaseApiRoute
   *
   * @param {string} parentNode  父节点
   * @param {string} childrenNode  子节点
   * @return {*}  {string}
   * @memberof RequireService
   */
  syncGetApi(parentNode: string, childrenNode: string): any {
    if (this._config) {
      let parentNodeisExist = _.has(this._config, parentNode);
      if (!parentNodeisExist) {
        throw new Error(`配置项${parentNode}不存在`);
      }
      let childrenNodeisExist = _.has(this._config[parentNode], childrenNode);
      if (!childrenNodeisExist) {
        throw new Error(`配置项${parentNode}上不存在${childrenNode}节点`);
      }
      return this._config[parentNode][childrenNode];
    }
    throw new Error(`未找到接口配置文件`);
  }


  /**
   * 获取静态资源
   *
   * @param {string} parentNode  父节点
   * @param {string} childrenNode  子节点
   * @memberof RequireService
   */
  getAssetsRecourse(parentNode: string, childrenNode: string): Observable<any> {
    return this.getApi(parentNode, childrenNode).pipe(
      mergeMap((data: any) => {
        return this._http.get(data.url);
      })
    );
  }


  /**
   * 尝试汇总API请求方式
   *
   * @param {string} parentNode  父节点
   * @param {string} childrenNode  子节点
   * @return {*}  {string}
   * @memberof RequireService
   */
  newReqApi(isdebounceime: boolean = false, parentNode: string, childrenNode: string, options?: ReqAPIOptionsInterface): Observable<any> {
    RequireService.loading = true;
    const reqContent = this.syncGetApi(parentNode, childrenNode);

    const reqOptions = {
      headers: options?.httpHeader || undefined,
      params: options?.param ? new HttpParams({ fromObject: options?.param }) : undefined,
    };
    const fullUrl = this.getFullUrl(reqContent.url);
    const newParam = { reqContent, fullUrl, reqOptions, bodyOptions: options?.body };
    if (isdebounceime) {
      // failed: 失败了！
      this.reqParam$.next(newParam)
      return this.reqParam$.pipe(debounceTime(1000)).pipe(mergeMap((responce: any) => {
        console.log('执行几遍？');
        // 执行添加或者编辑
        return this.doRequire(responce);
      }));
    } else {
      return this.doRequire(newParam);
    }
  }


  doRequire(params: any): Observable<any> {
    let Obser$!: Observable<any>;
    switch (params.reqContent.type) {
      case 'get':
        Obser$ = this._http.get(params.fullUrl, params.reqOptions)
        break;
      case 'post':
        Obser$ = this._http.post(params.fullUrl, params.bodyOptions, params.reqOptions)
        break;
      case 'delete':
        Obser$ = this._http.delete(params.fullUrl, params.reqOptions)
        break;
      default:
        break;
    }
    return Obser$.pipe(
      map(
        (response: any) => {
          RequireService.loading = false;
          return response
        }
      )
    );
  }

  /**
   * 获取完整的url地址
   *
   * @param {*} url
   * @return {*} 
   * @memberof RequireService
   */
  getFullUrl(url: string): string {
    if (url.indexOf('}}') > -1) {
      const urls = url.split('}}');
      const host = urls[0].split('{{')[1];
      if (environment.production) {
        return this.syncGetApi('production', host) + urls[1];
      } else {
        return this.syncGetApi('development', host) + urls[1];
      }
    } else {
      return url;
    }
  }

}


export function ConfigFactory(config: RequireService) {
  return () => config.load();
}
// APP_INITIALIZER 是在Angular2.x程序启动之前执行的一个函数；参见：https://angular.cn/api/core/APP_INITIALIZER
export function init() {
  return {
    provide: APP_INITIALIZER,
    useFactory: ConfigFactory,
    deps: [RequireService],  // https://angular.cn/api/core/FactorySansProvider#deps, 简言之，值列表将用作 useFactory 函数的参数。 然后执行useFactory！
    multi: true
  }
}

const ConfigModule = {
  init: init
}

export { ConfigModule };