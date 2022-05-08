import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of, forkJoin } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from '../../common-service/message/message.service';
import { ReqAPIOptionsInterface } from '../req_api/req-type';
import { RequireService } from '../req_api/Require.service';

@Injectable({
  providedIn: 'root'
})
export class IsloginedGuard implements CanActivate {
  constructor(
    private router: Router,
    private requireService: RequireService,
    private messageService: MessageService,
  ) {
  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // const url: string = state.url;
    return of(true)
    return this.checkLogin();
  }

  /**
   * 检查用户是否登录
   *
   * @memberof IsloginedGuard
   */
  checkLogin(): Observable<boolean> {
    if (!localStorage.getItem('token-info')) {
      this.router.navigate(['/login']);
      return of(false);
    }
    const token = JSON.parse(localStorage.getItem('token-info')!);
    const accessToken = token.accessToken;
    const reqoptions: ReqAPIOptionsInterface = {
      httpHeader: new HttpHeaders({ Authorization: 'Bearer ' + accessToken }),
    }
    return this.requireService.newReqApi(false, 'login', 'authInfo', reqoptions).pipe(
      map(
        (result: any) => {
          if (result.code === 1) {
            this.messageService.createCusMessage('success', '登录成功！');
            this.storeLoginUserInfo(result.data);
            return true;
          } else {
            this.messageService.createCusMessage('error', '用户认证失败，请重试！');
            this.router.navigate(['/login']);
            return false;
          }
        }
      ),
      catchError((err) => {
        console.log('认证操作异常', err);
        this.router.navigate(['/login']);
        throw new Error(err);
      })
    );
  }

  /**
   * 存储登录人员的相关信息
   *
   * @param {*} userInfo
   * @memberof IsloginedGuard
   */
  storeLoginUserInfo(userInfo: any) {
    const data = {
      data: userInfo,
      islogin: true,
    };
    sessionStorage.setItem('authInfo', JSON.stringify(data));
  }

}
